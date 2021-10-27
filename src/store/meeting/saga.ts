import { takeEvery, call, take, put, cps, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import {
  CONNECTION_ESTABLISHED,
  LOCAL_TRACK_READY,
  START_MEETING,
  USER_JOINED,
  CONFERENCE_JOINED,
  TRACK_ADDED,
  TRACK_REMOVED,
  TURN_CAMERA,
  LOCAL_TRACK_UPDATE,
  TURN_MIC,
  USER_LEFT,
  END_MEETING,
} from './constants';
import * as actions from './actions';
import { onRemoteTrack, onTrackRemoved } from './functions';

interface JitsiMeetJS {
  events: any;
  logLevels: any;
  JitsiConnection: any;
  mediaDevices: any;
  init: (obj: any) => void;
  setLogLevel: (obj: any) => void;
  createLocalTracks: any;
}
declare const window: {
  JitsiMeetJS: JitsiMeetJS;
  jQuery: any;
  $: any;
};
const JitsiMeetJS: JitsiMeetJS = window.JitsiMeetJS;
window.jQuery = $;
window.$ = $;
global.jQuery = $;

const initOptions = {
  disableAudioLevels: false,

  // The ID of the jidesha extension for Chrome.
  desktopSharingChromeExtId: 'mbocklcggfhnbahlnepmldehdhpjfcjp',

  // Whether desktop sharing should be disabled on Chrome.
  desktopSharingChromeDisabled: false,

  // The media sources to use when using screen sharing with the Chrome
  // extension.
  desktopSharingChromeSources: ['screen', 'window'],

  // Required version of Chrome extension
  desktopSharingChromeMinExtVersion: '0.1',

  // Whether desktop sharing should be disabled on Firefox.
  desktopSharingFirefoxDisabled: false,
  enableAnalyticsLogging: true,

  disableSimulcast: false,
  resolution: 720,

  constraints: {
    video: {
      aspectRatio: 16 / 9,
      height: {
        ideal: 720,
        max: 1080,
        min: 720,
      },
    },
  },
  disableAP: true,
  disableAEC: true,
  disableNS: true,
  disableAGC: true,
  disableHPF: true,
  stereo: true,
};

export const options = {
  hosts: {
    domain: process.env.REACT_APP_DOMAIN,
    muc: process.env.REACT_APP_MUC, // FIXME: use XEP-0030
  },
  serviceUrl: process.env.REACT_APP_SERVICE_URL, // FIXME: use xep-0156 for that

  // The name of client node advertised in XEP-0115 'c' stanza
  clientNode: process.env.REACT_APP_CLIENT_NODE,
  channelLastN: -1,
};

const confOptions = {
  statisticsId: null,
  p2p: {
    enabled: true,
  },
};

function* startMeetingSaga() {
  yield JitsiMeetJS.init(initOptions);
  JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
  const connection = new JitsiMeetJS.JitsiConnection(null, null, options);
  const connectionChannel = yield call(createConnection, connection);

  yield connection.connect();

  // Create local track
  if (JitsiMeetJS.mediaDevices.isDeviceChangeAvailable('output')) {
    let _devices = [];
    try {
      _devices = yield cps((cb) =>
        JitsiMeetJS.mediaDevices.enumerateDevices((devices) => {
          cb(null, devices);
        }),
      );
    } catch (err) {
      console.log(err);
    }
    if (_devices && _devices.length > 0) {
      const deviceOptions = [];
      const meetingState = yield select((state) => state.meeting);
      if (meetingState.isCameraOn) {
        deviceOptions.push('video');
      }
      if (meetingState.isMicOn) {
        deviceOptions.push('audio');
      }
      try {
        if (deviceOptions.length > 0) {
          const localTracks = yield JitsiMeetJS.createLocalTracks({
            devices: deviceOptions,
          });
          yield put(actions.localTrackReady(localTracks));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  while (true) {
    try {
      const _action = yield take(connectionChannel);
      switch (_action.type) {
        case CONNECTION_ESTABLISHED:
          yield put(actions.connectionEstablished(connection));
          break;
        default:
          yield put(_action);
          break;
      }
    } catch (err) {
      console.error('socket error:', err);
    }
  }
}

function* endMeetingSaga(action) {
  const state = yield select((state) => state.meeting);
  if (state.room && state.room.isJoined()) {
    const localTracks = state.room.getLocalTracks();
    for (let i = 0; i < localTracks.length; i++) {
      if (!localTracks[i].disposed) {
        yield localTracks[i].dispose();
      }
    }

    yield state.room.leave();
    yield state.connection.disconnect();
    yield put(actions.endMeetingSuccess());
  }
}

const createConnection = (connection) => {
  return eventChannel((emit) => {
    const connectionEstablished = (event) => {
      emit(actions.connectionEstablished(connection));
    };

    connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
      connectionEstablished,
    );

    const removeEventListeners = () => {
      connection.removeEventListener(
        JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
        connectionEstablished,
      );
    };

    return removeEventListeners;
  });
};

function* connectionEstablishedSaga(action) {
  const connection = action.payload;
  const room = connection.initJitsiConference('conference', { ...confOptions });
  const currentUser = yield select((state) => state.app.currentUser);
  room.setReceiverVideoConstraint(1080);
  room.setSenderVideoConstraint(1080);
  room.setDisplayName(currentUser.username);
  yield room.join();
  const roomChannel = yield call(joinRoom, room);

  while (true) {
    try {
      const _action = yield take(roomChannel);
      switch (_action.type) {
        case CONFERENCE_JOINED:
          yield put(actions.startMeetingSuccess());
          yield put(actions.conferenceJoined(_action.payload));
        case USER_JOINED:
          console.log(USER_JOINED, room.getParticipants());
          yield put(actions.setParticipants(room.getParticipants()));
          break;
        case USER_LEFT:
          console.log(USER_LEFT, room.getParticipants());
          yield put(actions.setParticipants(room.getParticipants()));
          break;
        case TRACK_ADDED:
          const track = _action.payload;
          const state = yield select((state) => state.meeting);
          const participantTracks = onRemoteTrack(state, track);
          if (participantTracks) {
            yield put(actions.trackAdded(participantTracks));
          }
          break;
        case TRACK_REMOVED:
          const _track = _action.payload;
          const _state = yield select((state) => state.meeting);
          const _participantTracks = onTrackRemoved(_state, _track);
          if (_participantTracks) {
            yield put(actions.trackRemoved(participantTracks));
          }
          break;
        default:
          yield put(_action);
          break;
      }
    } catch (err) {
      console.error('socket error:', err);
    }
  }
}

const joinRoom = (room: any) => {
  return eventChannel((emit) => {
    const conferenceJoined = () => {
      emit(actions.conferenceJoined(room));
    };
    const userJoined = (id: string, participant: any) => {
      emit(actions.userJoined({ id, participant }));
    };
    const userLeft = (id: string, participant: any) => {
      emit(actions.userLeft({ id, participant }));
    };
    const trackAdded = (track) => {
      console.log('trackAdded:', track);
      emit(actions.trackAdded(track));
    };
    const trackRemoved = (track) => {
      console.log('trackRemoved: ', track);
      emit(actions.trackRemoved(track));
    };

    room.addEventListener(JitsiMeetJS.events.conference.CONFERENCE_JOINED, conferenceJoined);
    room.addEventListener(JitsiMeetJS.events.conference.USER_JOINED, userJoined);
    room.addEventListener(JitsiMeetJS.events.conference.USER_LEFT, userLeft);
    room.addEventListener(JitsiMeetJS.events.conference.TRACK_ADDED, trackAdded);
    room.addEventListener(JitsiMeetJS.events.conference.TRACK_REMOVED, trackRemoved);

    const removeEventListeners = () => {
      room.removeEventListener(JitsiMeetJS.events.conference.CONFERENCE_JOINED, conferenceJoined);
      room.removeEventListener(JitsiMeetJS.events.conference.USER_JOINED, userJoined);
      room.removeEventListener(JitsiMeetJS.events.conference.USER_LEFT, userLeft);
      room.removeEventListener(JitsiMeetJS.events.conference.TRACK_ADDED, trackAdded);
      room.removeEventListener(JitsiMeetJS.events.conference.TRACK_REMOVED, trackRemoved);
    };

    return removeEventListeners;
  });
};

function* localTrackReadySaga(action) {
  const localTracks: Array<any> = action.payload;
  const localTrackChannels = [];
  for (let i = 0; i < localTracks.length; i++) {
    localTrackChannels[i] = yield call(addTrack, localTracks[i]);
  }

  yield put(actions.localTrackUpdate(localTracks));

  while (true) {
    try {
      for (let i = 0; i < localTrackChannels.length; i++) {
        const _action = yield take(localTrackChannels[i]);
        yield put(_action);
      }
    } catch (err) {
      console.error('socket error:', err);
    }
  }
}

const addTrack = (localTrack: any) => {
  return eventChannel((emit) => {
    const trackAudioOutputChanged = () => {
      emit(actions.trackAudioOutputChanged(localTrack));
    };
    localTrack.addEventListener(
      JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
      trackAudioOutputChanged,
    );

    const removeEventListeners = () => {
      localTrack.removeEventListener(
        JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
        trackAudioOutputChanged,
      );
    };
    return removeEventListeners;
  });
};

function* conferenceJoinedSaga(action) {
  const { room, localTracks } = yield select((state) => state.meeting);
  if (room) {
    for (let i = 0; i < localTracks.length; i++) {
      room.addTrack(localTracks[i]);
    }
  }
}

function* turnCameraSaga(action) {
  const isCameraOn = action.payload;
  const meetingState = yield select((state) => state.meeting);
  const room = meetingState.room;
  const currentLocalVideoTrack =
    room && room.isJoined()
      ? room.getLocalVideoTrack()
      : meetingState.localTracks.find((t) => t.getType() === 'video');
  if (currentLocalVideoTrack) {
    if (!isCameraOn) {
      yield currentLocalVideoTrack.dispose();
      yield put(actions.localTrackUpdate([currentLocalVideoTrack]));
    }
  } else {
    yield JitsiMeetJS.init(initOptions);
    JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
    if (isCameraOn) {
      const [newVideoTrack] = yield JitsiMeetJS.createLocalTracks({
        devices: ['video'],
        maxFps: 60,
        minFps: 30,
      });
      yield put(actions.localTrackReady([newVideoTrack]));
      // room.addTrack(newVideoTrack);
    }
  }
}

function* turnMicSaga(action) {
  const isMicOn = action.payload;
  const meetingState = yield select((state) => state.meeting);
  const room = meetingState.room;
  const currentLocalAudioTrack =
    room && room.isJoined()
      ? room.getLocalAudioTrack()
      : meetingState.localTracks.find((t) => t.getType() === 'audio');
  if (currentLocalAudioTrack) {
    if (!isMicOn) {
      yield currentLocalAudioTrack.dispose();
      // Remove old and current disposed track
      yield put(actions.localTrackUpdate([currentLocalAudioTrack]));
    }
  } else {
    if (isMicOn) {
      yield JitsiMeetJS.init(initOptions);
      JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);

      const [newVideoTrack] = yield JitsiMeetJS.createLocalTracks({
        devices: ['audio'],
        maxFps: 60,
        minFps: 30,
      });
      yield put(actions.localTrackReady([newVideoTrack]));
      // room.addTrack(newVideoTrack);
    }
  }
}

function* localTrackUpdateSaga(action) {
  const { room } = yield select((state) => state.meeting);
  if (room && room.isJoined()) {
    const tracks = action.payload;
    for (let i = 0; i < tracks.length; i++) {
      if (!tracks[i].disposed) {
        try {
          yield room.addTrack(tracks[i]);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
}

export default function* meetingSaga() {
  yield takeEvery(START_MEETING, startMeetingSaga);
  yield takeEvery(END_MEETING, endMeetingSaga);
  yield takeEvery(CONNECTION_ESTABLISHED, connectionEstablishedSaga);
  yield takeEvery(LOCAL_TRACK_READY, localTrackReadySaga);
  yield takeEvery(LOCAL_TRACK_UPDATE, localTrackUpdateSaga);
  yield takeEvery(CONFERENCE_JOINED, conferenceJoinedSaga);
  yield takeEvery(TURN_CAMERA, turnCameraSaga);
  yield takeEvery(TURN_MIC, turnMicSaga);
}
