import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal } from '../../store/app/actions';

import CalendarEventModal from '../../pages/meetings/components/eventModal';
import TeamModal from '../../pages/teams/components/teamModal';
import SalesRepModal from '../../pages/team/components/salesRepModal';
import EditContactModal from '../../pages/contacts/components/modals/editModal';
import DeleteContactModal from '../../pages/contacts/components/modals/deleteModal';

const Modal = () => {
  const dispatch = useDispatch();
  const app = useSelector((state: any) => state.app);

  const handleCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, []);

  const renderModal = () => {
    switch (app.currentModal) {
      case 'CALENDAR_EVENT_MODAL':
        return <CalendarEventModal closeModal={handleCloseModal} />;
      case 'TEAM_MODAL':
        return <TeamModal closeModal={handleCloseModal} />;
      case 'SALES_REP_MODAL':
        return <SalesRepModal closeModal={handleCloseModal} />;
      case 'EDIT_CONTACT':
        return <EditContactModal closeModal={handleCloseModal} />;
      case 'DELETE_CONTACT':
        return <DeleteContactModal closeModal={handleCloseModal} />;
      default:
        return null;
    }
  };

  if (!app.modalOpen) {
    return null;
  }

  return (
    <div className="modal-wrapper">
      <div className="modal-container">{renderModal()}</div>
    </div>
  );
};

export default Modal;
