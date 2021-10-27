import React, { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useSelector } from 'react-redux';
import Logo from '../../assets/icons/logo';
import UserLayout from '../../components/layout/user';
import VideoPreview from '../../components/videoPreview';
import { RootState } from '../../store';
// import { startMeeting } from '../../store/meeting/actions';
import ColumnSettings from './components/columSettings';
import NoteColumn from './components/noteColumn';
import VideoColumn, { Details } from './components/videoColumn';

const Meeting = () => {
  const handle = useFullScreenHandle();
  // const dispatch = useDispatch();
  const participants = useSelector((state: RootState) => {
    return state.meeting.participants;
  });
  const [showColumn, setShowColumn] = useState(true);
  const [isFullScreen, setFullScreen] = useState(false);

  const handleFullScreen = (e: boolean) => {
    setFullScreen(e);
  };

  // useEffect(() => {
  //   dispatch(startMeeting());
  // }, []);

  useEffect(() => {
    if (isFullScreen) {
      setTimeout(() => {
        handle.enter();
      }, 100);
    }
  }, [isFullScreen]);
  return (
    <>
      <UserLayout onChangeFullScreen={handleFullScreen}>
        <div className="row meeting-page">
          <div className="col-3">
            <ColumnSettings />
          </div>
          <div className="col-6">
            <VideoColumn
              participant={participants && participants.length > 0 ? participants[0] : null}
            />
          </div>
          <div className="col-3">
            <NoteColumn />
          </div>
        </div>
      </UserLayout>
      {isFullScreen && (
        <FullScreen handle={handle}>
          <div className="w-100 position-relative meeting-fullscreen">
            {showColumn ? (
              <div className="meeting-fullscreen_column p-5">
                <div className="d-flex">
                  <button className="btn btn-dark me-4" onClick={() => setShowColumn(!showColumn)}>
                    <i className="bi-x-lg icon text-light" />
                  </button>
                  <Logo size={40} />
                </div>
                <div className="mt-5 d-flex flex-column justify-content-between meeting-fullscreen_column_details">
                  <div>
                    <ColumnSettings />
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle d-flex justify-content-center align-items-center me-2 main-video_details_button">
                      <i className="bi-camera-video-fill icon text-primary" />
                    </div>
                    <span className="me-3"> Client</span>
                    <h2 className="fw-bold mb-0 ps-2 border-start border-light">{'Chris Bites'}</h2>
                  </div>
                </div>
              </div>
            ) : (
              <div className="meeting-fullscreen_open_column">
                <button className="btn btn-dark" onClick={() => setShowColumn(!showColumn)}>
                  <i className="bi-list icon text-light fs-4" />
                </button>
              </div>
            )}
            <div className="meeting-fullscreen_video">
              <VideoPreview />
            </div>
            <div className="meeting-fullscreen_notes d-flex justify-content-between">
              <div className="w-75">
                <Details />
              </div>
              <button
                className="btn btn-dark"
                onClick={() => {
                  handle.exit();
                  setFullScreen(false);
                }}
              >
                <i className="bi-fullscreen-exit icon text-light fs-4" />
              </button>
            </div>
          </div>
        </FullScreen>
      )}
    </>
  );
};

export default Meeting;
