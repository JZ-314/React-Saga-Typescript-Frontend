import {
  FETCH_TEAM_REQUEST,
  FETCH_TEAMS_BY_PAYLOAD_REQUEST,
  CREATE_TEAM_REQUEST,
  UPDATE_TEAM_REQUEST,
  DELETE_TEAM_REQUEST,
} from './constants';
import * as actions from './actions';
import * as API from '../../apis/teams';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchTeamRequestSaga(action: any) {
  try {
    const id = action.meta;
    const response = yield call(API.fetchTeam, id);

    if (response.success) {
      yield put(actions.fetchTeamSuccess(response.data));
    } else {
      yield put(actions.fetchTeamFailure(response.message));
    }
  } catch (e) {
    yield put(actions.fetchTeamFailure(e));
  }
}

function* fetchTeamsByPayloadRequestSaga(action: any) {
  try {
    const param = action.payload;
    const response = yield call(API.fetchTeamsByPayload, param);

    if (response.success) {
      yield put(actions.fetchTeamsByPayloadSuccess(response.data));
    } else {
      yield put(actions.fetchTeamsByPayloadFailure(response.message));
    }
  } catch (e) {
    yield put(actions.fetchTeamsByPayloadFailure(e));
  }
}

function* createTeamRequestSaga(action: any) {
  const param = action.payload;
  try {
    const response = yield call(API.createTeam, param);

    if (response.success) {
      yield put(actions.createTeamSuccess(response));
    } else {
      yield put(actions.createTeamFailure(response.message));
    }
  } catch (e) {
    yield put(actions.createTeamFailure(e));
  }
}

function* updateTeamRequestSaga(action: any) {
  const param = action.payload;
  const id = action.meta;
  try {
    const response = yield call(API.updateTeam, id, param);

    if (response.success) {
      yield put(actions.updateTeamSuccess(response));
    } else {
      yield put(actions.updateTeamFailure(response.message));
    }
  } catch (e) {
    yield put(actions.updateTeamFailure(e));
  }
}

function* deleteTeamRequestSaga(action: any) {
  const id = action.meta;
  try {
    const response = yield call(API.deleteTeam, id);

    if (response.success) {
      yield put(actions.deleteTeamSuccess(response));
    } else {
      yield put(actions.deleteTeamFailure(response.message));
    }
  } catch (e) {
    yield put(actions.deleteTeamFailure(e));
  }
}

export default function* teamsSaga() {
  yield takeLatest(FETCH_TEAM_REQUEST, fetchTeamRequestSaga);
  yield takeEvery(FETCH_TEAMS_BY_PAYLOAD_REQUEST, fetchTeamsByPayloadRequestSaga);
  yield takeEvery(CREATE_TEAM_REQUEST, createTeamRequestSaga);
  yield takeEvery(UPDATE_TEAM_REQUEST, updateTeamRequestSaga);
  yield takeEvery(DELETE_TEAM_REQUEST, deleteTeamRequestSaga);
}
