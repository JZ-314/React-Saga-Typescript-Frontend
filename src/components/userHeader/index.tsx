/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import Logo from '../../assets/icons/logo';
import Switch from '../switch';
import HeaderDropdown from './HeaderDropdown';
import OutsideAlerter from '../outsideAlerter';
import { fetchCurrentUser, logout } from '../../store/app/actions';

const navigation = [
  {
    label: 'Home',
    slug: 'home',
    icon: 'house-door-fill',
    link: '/home',
  },
  {
    label: 'Meetings',
    slug: 'meetings',
    icon: 'calendar2',
    link: '/meetings',
  },
  {
    label: 'Teams',
    slug: 'teams',
    icon: 'folder',
    link: '/teams',
  },
  {
    label: 'Contacts',
    slug: 'contacts',
    icon: 'journal-plus',
    link: '/contacts',
  },
  {
    label: 'Settings',
    slug: 'settings',
    icon: 'gear',
    link: '/settings',
  },
];

const dropDownList = [{ id: 'settings', title: 'Account Settings' }];

type UserHeaderProps = {
  username?: string;
  onChangeFullScreen?: (e: boolean) => void;
};

const UserHeader = ({ onChangeFullScreen }: UserHeaderProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const isMeetingPage = location.pathname.includes('meeting');

  const [currentUser, setCurrentUser] = useState(null);
  const [userNav, setUserNav] = useState(navigation);
  const [selectedNav, setSelectedNav] = useState('home');
  const [isClickDropIcon, setIsClickDropIcon] = useState(false);

  useEffect(() => {
    const path = location.pathname;

    if (path === '/home') setSelectedNav('home');
    if (path.includes('/meetings')) setSelectedNav('meetings');
    if (path.includes('/team')) setSelectedNav('teams');
    if (path.includes('/contacts')) setSelectedNav('contacts');
    if (path.includes('/settings')) setSelectedNav('settings');
  }, [location]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetchCurrentUser();
      setCurrentUser(result.payload);

      if (result.payload.role !== 'manager') {
        setUserNav(navigation.filter((item) => item.slug !== 'teams'));
      }
    }

    fetchData();
  }, []);

  const handleClickLogout = async () => {
    setIsClickDropIcon(false);

    localStorage.setItem('currentUser', '');
    localStorage.setItem('accessToken', '');

    await dispatch(logout());
    history.push('/admin/login');
  };

  const handleClickUserIcon = (e: any) => {
    e.preventDefault();
    if (currentUser !== null) {
      setIsClickDropIcon(!isClickDropIcon);
    } else {
      handleClickLogout();
    }
  };

  return (
    <div className="user_header w-100 d-flex justify-content-between align-items-center text-light position-relative">
      <div className="d-flex align-items-center">
        <Logo size={30} />
        {isMeetingPage && onChangeFullScreen && (
          <div className="ms-5">
            <Switch
              label="Focus Mode"
              isInline={true}
              onChange={(e) => onChangeFullScreen(e.target.checked)}
            />
          </div>
        )}
      </div>
      <div className="d-flex align-items-center">
        {userNav.map((nav) => (
          <div
            role="menuitem"
            tabIndex={0}
            key={nav.label}
            className={`d-flex flex-column align-items-center mx-3 ${
              selectedNav === nav.slug && 'text-primary user_header__menu_selected'
            }`}
            onClick={() => {
              setSelectedNav(nav.slug);
              history.push(`${nav.link}`);
            }}
            onKeyDown={() => setSelectedNav(nav.slug)}
          >
            <i className={`bi-${nav.icon} icon fs-3`}></i>
            <span className={`fs-6 ${selectedNav === nav.slug && 'fw-bold'}`}>{nav.label}</span>
          </div>
        ))}
        <div className="d-flex align-items-center ms-5">
          <span className="fw-bold">{`Hi, ${currentUser?.username}`}</span>
          <div className="ms-2 rounded-circle user_header__image" onClick={handleClickUserIcon}>
            <img
              src={
                currentUser?.avatar
                  ? currentUser?.avatar
                  : '//ssl.gstatic.com/accounts/ui/avatar_2x.png'
              }
              className="user-avatar-image rounded-circle"
              alt=""
            />
          </div>
        </div>
        {isClickDropIcon && (
          <OutsideAlerter onClickOutside={() => setIsClickDropIcon(false)}>
            <HeaderDropdown
              listItems={dropDownList}
              onLogout={handleClickLogout}
              onClose={() => setIsClickDropIcon(false)}
            />
          </OutsideAlerter>
        )}
      </div>
    </div>
  );
};

export default UserHeader;
