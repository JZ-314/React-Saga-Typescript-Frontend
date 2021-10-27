import _ from 'lodash';
import {
  conferenceJoined,
  connectionEstablished,
  endMeetingSuccess,
  localTrackUpdate,
  setParticipants,
  startMeetingSuccess,
  trackAdded,
  trackRemoved,
  turnCamera,
  turnMic,
  userJoined,
} from './actions';
import {
  CONFERENCE_JOINED,
  CONNECTION_ESTABLISHED,
  LOCAL_TRACK_UPDATE,
  TRACK_ADDED,
  TRACK_REMOVED,
  TURN_MIC,
  TURN_CAMERA,
  USER_JOINED,
  SET_PARTICIPANTS,
  START_MEETING_SUCCESS,
  END_MEETING_SUCCESS,
} from './constants';

type Action =
  | ReturnType<typeof startMeetingSuccess>
  | ReturnType<typeof endMeetingSuccess>
  | ReturnType<typeof connectionEstablished>
  | ReturnType<typeof conferenceJoined>
  | ReturnType<typeof localTrackUpdate>
  | ReturnType<typeof userJoined>
  | ReturnType<typeof setParticipants>
  | ReturnType<typeof trackAdded>
  | ReturnType<typeof trackRemoved>
  | ReturnType<typeof turnCamera>
  | ReturnType<typeof turnMic>;

export type InitialStateType = {
  isStarted: boolean;
  connection: any;
  room: any;
  participants: Array<any>;
  localTracks: Array<any>;
  remoteTracks: any;
  isCameraOn: boolean;
  isMicOn: boolean;
};

const initialState: InitialStateType = {
  isStarted: false,
  connection: null,
  room: null,
  participants: [],
  localTracks: [],
  remoteTracks: {},
  isCameraOn: false,
  isMicOn: false,
};

const reducer = (state: InitialStateType = initialState, action: Action): InitialStateType => {
  switch (action.type) {
    case START_MEETING_SUCCESS:
      return { ...state, isStarted: true };
    case END_MEETING_SUCCESS:
      return { ...state, isStarted: false };
    case CONNECTION_ESTABLISHED:
      return { ...state, connection: action.payload };
    case CONFERENCE_JOINED:
      return { ...state, room: action.payload };
    case LOCAL_TRACK_UPDATE:
      const localTracks = _updatedLocalTracks(state, action);
      return { ...state, localTracks: localTracks };
    case USER_JOINED:
      return { ...state, participants: action.payload };
    case SET_PARTICIPANTS:
      return { ...state, participants: action.payload };
    case TRACK_ADDED:
      return { ...state, remoteTracks: Object.assign(state.remoteTracks, { ...action.payload }) };
    case TRACK_REMOVED:
      return { ...state, remoteTracks: Object.assign(state.remoteTracks, { ...action.payload }) };
    case TURN_CAMERA:
      return { ...state, isCameraOn: action.payload };
    case TURN_MIC:
      return { ...state, isMicOn: action.payload };
    default:
      return state;
  }
};

const _updatedLocalTracks = (
  state: InitialStateType,
  action: ReturnType<typeof localTrackUpdate>,
) => {
  try {
    if (action.payload.length === 0) {
      return [];
    }
    const oldLocalTracks = [...state.localTracks];
    const addedLocalTracks = [...action.payload];
    for (let i = 0; i < addedLocalTracks.length; i++) {
      const sameTypeTrack = oldLocalTracks.find(
        (ot) => ot.disposed || ot.getType() === addedLocalTracks[i].getType(),
      );
      if (sameTypeTrack) {
        _.remove(oldLocalTracks, sameTypeTrack);
      }
      if (!addedLocalTracks[i].disposed) {
        oldLocalTracks.push(addedLocalTracks[i]);
      }
    }
    return oldLocalTracks;
  } catch (err) {
    return state.localTracks;
  }
};

export default reducer;
