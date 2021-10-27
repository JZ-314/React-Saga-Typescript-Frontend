import {
  FETCH_MEETING_REQUEST,
  FETCH_MEETINGS_BY_PAYLOAD_REQUEST,
  CREATE_MEETING_REQUEST,
  UPDATE_MEETING_REQUEST,
  DELETE_MEETING_REQUEST,
} from './constants';
import * as actions from './actions';
import * as API from '../../apis/meeting';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchMeetingRequestSaga(action: any) {
  try {
    const id = action.meta;
    const response = yield call(API.fetchMeeting, id);

    if (response.success) {
      yield put(actions.fetchMeetingSuccess(response.data));
    } else {
      yield put(actions.fetchMeetingFailure(response.message));
    }
  } catch (e) {
    yield put(actions.fetchMeetingFailure(e));
  }
}

function* fetchMeetingsByPayloadRequestSaga(action: any) {
  try {
    const param = action.payload;
    const response = yield call(API.fetchMeetingsByPayload, param);

    if (response.success) {
      yield put(actions.fetchMeetingsByPayloadSuccess(response.data));
    } else {
      yield put(actions.fetchMeetingsByPayloadFailure(response.message));
    }
  } catch (e) {
    yield put(actions.fetchMeetingsByPayloadFailure(e));
  }
}

function* createMeetingRequestSaga(action: any) {
  const param = action.payload;
  try {
    const response = yield call(API.createMeeting, param);

    if (response.success) {
      yield put(actions.createMeetingSuccess(response));
    } else {
      yield put(actions.createMeetingFailure(response.message));
    }
  } catch (e) {
    yield put(actions.createMeetingFailure(e));
  }
}

function* updateMeetingRequestSaga(action: any) {
  const param = action.payload;
  const id = action.meta;
  try {
    const response = yield call(API.updateMeeting, id, param);

    if (response.success) {
      yield put(actions.updateMeetingSuccess(response));
    } else {
      yield put(actions.updateMeetingFailure(response.message));
    }
  } catch (e) {
    yield put(actions.updateMeetingFailure(e));
  }
}

function* deleteMeetingRequestSaga(action: any) {
  const id = action.meta;
  try {
    const response = yield call(API.deleteMeeting, id);

    if (response.success) {
      yield put(actions.deleteMeetingSuccess(response));
    } else {
      yield put(actions.deleteMeetingFailure(response.message));
    }
  } catch (e) {
    yield put(actions.deleteMeetingFailure(e));
  }
}

export default function* meetingsSaga() {
  yield takeLatest(FETCH_MEETING_REQUEST, fetchMeetingRequestSaga);
  yield takeEvery(FETCH_MEETINGS_BY_PAYLOAD_REQUEST, fetchMeetingsByPayloadRequestSaga);
  yield takeEvery(CREATE_MEETING_REQUEST, createMeetingRequestSaga);
  yield takeEvery(UPDATE_MEETING_REQUEST, updateMeetingRequestSaga);
  yield takeEvery(DELETE_MEETING_REQUEST, deleteMeetingRequestSaga);
}
