import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from '../../assets/icons/chart';
import Logo from '../../assets/icons/logo';
import JitsiComponent from '../../components/jitsiComponent';
import { RootState } from '../../store';
import { fetchCurrentUser } from '../../store/app/actions';
import * as actions from '../../store/client/actions';

type props = {
  history: any;
  match: { params: { id: string } };
};

export default function ClientMeeting(props: props) {
  const meeting_id = props.match.params.id;
  const dispatch = useDispatch();
  const clientState = useSelector((state: RootState) => state.client);
  const appState = useSelector((state: RootState) => state.app);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  useEffect(() => {
    if (appState.currentUser && meeting_id) {
      props.history.push(`/meeting/${meeting_id}`);
    } else {
      if (meeting_id) dispatch(actions.fetchClientMeetingRequest(meeting_id));
    }
  }, [dispatch, meeting_id, appState, props.history]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return isOpen && clientState.meeting ? (
    <JitsiComponent handleClose={handleClose} meeting={clientState.meeting} />
  ) : (
    <>
      <div className="sign_in_page d-flex justify-content-center align-items-center text-light position-relative">
        <div className="sign_in_page__icon">
          <Chart size={50} />
        </div>
        <div className="sign_in_page__box d-flex flex-column">
          <div className="mx-auto mb-5 logo-wrapper">
            <Logo size={52} />
          </div>
          <h3 className="fw-bold fs-2">
            {clientState.errors ? clientState.errors : 'Welcome to Affect Cx Use'}
          </h3>
        </div>
      </div>
    </>
  );
}
