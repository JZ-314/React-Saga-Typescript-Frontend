/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../store/app/actions';

type props = {
  userId: string;
  item: any;
  onClick?: any;
};

export default function TeamPreview({ item, userId }: props) {
  const dispatch = useDispatch();
  // const history = useHistory();

  // const handleClickTeam = () => {
  //   history.push(`/team/${item.id}`);
  // };

  const handleClickDetail = async () => {
    await dispatch(
      openModal({
        modal: 'TEAM_MODAL',
        params: {
          action: 'edit',
          userId,
          formData: item,
        },
      }),
    );
  };

  return (
    <div className="team-item-wrapper rounded-3">
      <div className="team-image-wrapper">
        <img
          src={item?.image || '//ssl.gstatic.com/accounts/ui/avatar_2x.png'}
          className="team-avatar-img rounded-3"
          alt=""
        />
      </div>
      <div className="team-info-wrapper">
        <h5>{item?.name}</h5>
        <div className="team-detail-button mt-4 d-flex justify-content-between">
          <a onClick={handleClickDetail}>
            <span className="text-primary">Edit</span>
          </a>
          <Link to={`/team/${item.id}`}>
            <span className="text-primary">Members</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
