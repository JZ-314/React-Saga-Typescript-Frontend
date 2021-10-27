import React from 'react';
import { useSelector } from 'react-redux';
import AudioPlace from '../../../components/audioPlace';
import Video from '../../../components/videoPlace';
import { RootState } from '../../../store';

const data = {
  name: 'Chris Bates',
  attention: '47%',
  voice: 'Low Interest',
  behavior: 'Bored',
  person: 'Male Uk',
};

const personInfo = [
  {
    label: 'Tone',
    value: 'Clear',
  },
  {
    label: 'Total Speak Time',
    value: '45 Seconds',
  },
  {
    label: 'Total Quiet Time',
    value: '4 Minutes',
  },
  {
    label: 'Vocal Variety',
    value: '1.2 Hz',
  },
  {
    label: 'Vocal Energy',
    value: '20 Hz',
  },
  {
    label: 'Since Last Spoke',
    value: '2 Minutes 35 Secs',
  },
];

export const Details = () => {
  return (
    <div className="d-flex justify-content-between rounded-3">
      <div className="d-flex flex-column">
        <span>Attention</span>
        <span className="fs-5 d-flex mt-2 fw-bold">{data.attention}</span>
      </div>
      <div className="d-flex flex-column">
        <span>Voice indicator</span>
        <span className="fs-5 d-flex mt-2 fw-bold">{data.voice}</span>
      </div>
      <div className="d-flex flex-column">
        <span>Behavior indicator</span>
        <span className="fs-5 d-flex mt-2 fw-bold">{data.behavior}</span>
      </div>
    </div>
  );
};

const CallInfo = () => {
  return (
    <div className="main-video_call_info py-3 px-4">
      <p className="text-light fs-5 fw-bold">{data.person}</p>
      <div className="row">
        {personInfo.map((info) => (
          <div key={info.value} className="col-4 d-flex mb-3">
            <span className="fw-lighter">{`${info.label} :`}</span>
            <span className="fw-lighter text-primary d-flex ms-4">{info.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

type props = {
  participant: any;
};

const VideoColumn = (props: props) => {
  const { participant } = props;
  const videoTrack = useSelector((state: RootState) => {
    const remoteTracks = state.meeting.remoteTracks;
    const keys = Object.keys(remoteTracks);
    const participantTracks = keys
      .map((k) => remoteTracks[k])
      .find((ts) => ts.find((t: any) => t.getType() === 'video'));
    if (participantTracks) {
      return participantTracks.find((t: any) => {
        return t.getType() === 'video';
      });
    } else {
      return null;
    }
  });

  const audioTrack = useSelector((state: RootState) => {
    const remoteTracks = state.meeting.remoteTracks;
    const keys = Object.keys(remoteTracks);
    const participantTracks = keys
      .map((k) => remoteTracks[k])
      .find((ts) => ts.find((t: any) => t.getType() === 'audio'));
    if (participantTracks) {
      return participantTracks.find((t: any) => {
        return t.getType() === 'audio';
      });
    } else {
      return null;
    }
  });
  return (
    <div>
      <div className="main-video position-relative rounded-3">
        {videoTrack && (
          <Video
            videoTrack={{ jitsiTrack: videoTrack }}
            className="main-video__video_place position-absolute w-100 h-100 rounded-3"
          />
        )}
        {audioTrack && (
          <AudioPlace
            audioTrack={{ jitsiTrack: audioTrack }}
            participantId={audioTrack.getParticipantId()}
          />
        )}
        <div className="main-video_details d-flex position-absolute bottom-0 w-100 p-3">
          <div>
            <div className="d-flex align-items-center">
              <div className="rounded-circle d-flex justify-content-center align-items-center me-2 main-video_details_button">
                <i className="bi-camera-video-fill icon text-primary" />
              </div>
              <span className="me-3"> {participant ? 'Client' : 'No client'}</span>
              <h2 className="fw-bold mb-0 ps-2 border-start border-light">
                {participant ? participant.getDisplayName() : ''}
              </h2>
            </div>
            {participant && <span className="mt-3 d-flex">See more details</span>}
          </div>
          <div className="w-50 ms-auto">{participant && <Details />}</div>
        </div>
      </div>
      <div className="mt-4">
        <CallInfo />
      </div>
    </div>
  );
};

export default VideoColumn;
