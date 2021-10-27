/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../store/app/actions';

type props = {
  userId: string;
  item: any;
  onClick?: any;
};

export default function TeamPreview({ item }: props) {
  const dispatch = useDispatch();

  const { user } = item;

  const handleClick = async () => {
    await dispatch(
      openModal({
        modal: 'SALES_REP_MODAL',
        params: {
          action: 'edit',
          formData: {
            id: item.id,
            username: user.username,
            email: user.email,
            userId: user.id,
          },
        },
      }),
    );
  };

  return (
    <div className="team-item-wrapper rounded-3">
      <div className="team-image-wrapper">
        <img
          src={user?.image || '//ssl.gstatic.com/accounts/ui/avatar_2x.png'}
          className="team-avatar-img rounded-3"
          alt=""
        />
      </div>
      <div className="team-info-wrapper" onClick={handleClick}>
        <h5>{user?.username}</h5>
        <p>{user?.email}</p>
      </div>
    </div>
  );
}
