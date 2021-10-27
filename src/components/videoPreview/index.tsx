import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { turnCamera, turnMic } from '../../store/meeting/actions';
import Video from '../videoPlace';

type VideoProps = {
  source?: any;
  username?: string;
  hideUser?: boolean;
  showGrid?: boolean;
  showRecordButton?: boolean;
  showTraining?: boolean;
};

const VideoPreview = ({
  username = 'Jon Smith',
  showGrid = false,
  hideUser = false,
  showTraining = false,
  showRecordButton = false,
}: VideoProps) => {
  const dispatch = useDispatch();
  const [recordOn, setRecordOn] = useState(false);
  const meetingState = useSelector((state: RootState) => state.meeting);
  const currentUser = useSelector((state: RootState) => state.app.currentUser);
  const cameraOn = meetingState.isCameraOn;
  const micOn = meetingState.isMicOn;

  const videoTrack = meetingState.localTracks.find((t) => t.getType() === 'video');

  const onCameraClick = (e) => {
    if (e.type === 'click') dispatch(turnCamera(!cameraOn));
  };

  const onMicClick = (e) => {
    if (e.type === 'click') dispatch(turnMic(!micOn));
  };

  return (
    <div className="position-relative video_preview">
      {videoTrack && (
        <Video
          videoTrack={{ jitsiTrack: videoTrack }}
          className="video_preview__video_place position-absolute"
        />
      )}
      {showGrid && <div className="video_preview__grid" />}
      {!hideUser && (
        <div className="video_preview_user d-flex align-items-center justify-content-center rounded-3 px-3">
          <span>{currentUser?.username}</span>{' '}
          <div className="video_preview_user_record rounded-circle ms-2" />
        </div>
      )}
      {showTraining && (
        <div className="video_preview_training d-flex align-items-center justify-content-center py-2 px-3">
          <span className="fs-4">Training</span>
        </div>
      )}
      <div className="video_preview_btn_grid d-flex">
        {showRecordButton && (
          <div
            role="button"
            tabIndex={0}
            onClick={() => setRecordOn(!recordOn)}
            onKeyDown={() => setRecordOn(!recordOn)}
            className={`video_preview_btn_icons d-flex align-items-center justify-content-center me-2 rounded-3 ${
              !recordOn && 'selected'
            }`}
          >
            <i className="icon bi-record-circle fs-4" />
          </div>
        )}
        <div
          role="button"
          tabIndex={0}
          onClick={onMicClick}
          onKeyDown={onMicClick}
          className={`video_preview_btn_icons d-flex me-2 align-items-center justify-content-center rounded-3 ${
            !micOn && 'selected'
          }`}
        >
          <i className="icon bi-mic fs-4" />
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={onCameraClick}
          onKeyDown={onCameraClick}
          className={`video_preview_btn_icons d-flex align-items-center justify-content-center rounded-3  ${
            !cameraOn && 'selected'
          }`}
        >
          <i className="icon bi-camera-video fs-4" />
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
