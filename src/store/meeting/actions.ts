import {
  CONFERENCE_JOINED,
  CONNECTION_ESTABLISHED,
  END_MEETING,
  LOCAL_TRACK_UPDATE,
  LOCAL_TRACK_READY,
  SET_PARTICIPANTS,
  START_MEETING,
  TRACK_ADDED,
  TRACK_AUDIO_OUTPUT_CHANGED,
  USER_JOINED,
  TRACK_REMOVED,
  TURN_CAMERA,
  TURN_MIC,
  START_MEETING_SUCCESS,
  END_MEETING_SUCCESS,
  USER_LEFT,
} from './constants';

export const startMeeting = () => ({
  type: START_MEETING,
});

export const startMeetingSuccess = () => ({
  type: START_MEETING_SUCCESS,
});

export const endMeeting = () => ({
  type: END_MEETING,
});

export const endMeetingSuccess = () => ({
  type: END_MEETING_SUCCESS,
});

export const connectionEstablished = (payload: any) => ({
  type: CONNECTION_ESTABLISHED,
  payload: payload,
});

export const conferenceJoined = (payload: any) => ({
  type: CONFERENCE_JOINED,
  payload: payload,
});

export const userJoined = (payload: any) => ({
  type: USER_JOINED,
  payload: payload,
});

export const userLeft = (payload: any) => ({
  type: USER_LEFT,
  payload: payload,
});

export const trackAdded = (payload: any) => ({
  type: TRACK_ADDED,
  payload: payload,
});

export const trackRemoved = (payload: any) => ({
  type: TRACK_REMOVED,
  payload: payload,
});

export const setParticipants = (payload: any) => ({
  type: SET_PARTICIPANTS,
  payload: payload,
});

export const localTrackReady = (payload: any) => ({
  type: LOCAL_TRACK_READY,
  payload: payload,
});

export const localTrackUpdate = (payload: any) => ({
  type: LOCAL_TRACK_UPDATE,
  payload: payload,
});

export const trackAudioOutputChanged = (payload: any) => ({
  type: TRACK_AUDIO_OUTPUT_CHANGED,
  payload: payload,
});

export const turnCamera = (payload: any) => ({
  type: TURN_CAMERA,
  payload: payload,
});

export const turnMic = (payload: any) => ({
  type: TURN_MIC,
  payload: payload,
});
