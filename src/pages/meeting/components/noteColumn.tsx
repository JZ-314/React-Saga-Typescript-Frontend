import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notepad from '../../../components/notepad';
import VideoPreview from '../../../components/videoPreview';
import { RootState } from '../../../store';
import { endMeeting, startMeeting } from '../../../store/meeting/actions';

const NoteColumn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const isStarted = useSelector((state: RootState) => state.meeting.isStarted);

  useEffect(() => {
    setLoading(false);
    return () => {
      setLoading(false);
    };
  }, [isStarted]);

  const onClickStartMeetingBtn = () => {
    setLoading(true);
    dispatch(startMeeting());
  };

  const onClickEndMeetingBtn = () => {
    setLoading(true);
    dispatch(endMeeting());
  };
  return (
    <div className="note-column">
      <div className="note-column_preview">
        <VideoPreview />
      </div>
      {isStarted ? (
        <div className="d-flex justify-content-center">
          <button
            onClick={onClickEndMeetingBtn}
            className="btn btn-danger btn-lg mt-4 align-items-center justify-content-center rounded-3"
            disabled={loading}
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm text-light"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <i className="bi-telephone-minus icon text-light" />
            )}
            <span className="text-light fs-6 ps-2">End Meeting</span>
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <button
            onClick={onClickStartMeetingBtn}
            className="btn btn-primary btn-lg mt-4 align-items-center justify-content-center rounded-3"
            disabled={loading}
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm text-light"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <i className="bi-telephone icon text-light" />
            )}
            <span className="text-light fs-6 ps-2">Start Meeting</span>
          </button>
        </div>
      )}
      <div className="mt-4">
        <Notepad />
      </div>
    </div>
  );
};

export default NoteColumn;
