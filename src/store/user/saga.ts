import {
  FETCH_USER_REQUEST,
  FETCH_USERS_BY_PAYLOAD_REQUEST,
  UPDATE_USER_REQUEST,
  UPLOAD_USER_IMAGE_REQUEST,
} from './constants';
import * as actions from './actions';
import * as API from '../../apis/user';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchUserRequestSaga(action: any) {
  try {
    const id = action.meta;
    const response = yield call(API.fetchUser, id);

    yield put(actions.fetchUserSuccess(response.data));
  } catch (e) {
    yield put(actions.fetchUserFailure(e));
  }
}

function* fetchUsersByPayloadRequestSaga(action: any) {
  try {
    const param = action.payload;
    const response = yield call(API.fetchUsersByPayload, param);

    yield put(actions.fetchUsersByPayloadSuccess(response.data));
  } catch (e) {
    yield put(actions.fetchUsersByPayloadFailure(e));
  }
}

function* updateUserRequestSaga(action: any) {
  const param = action.payload;
  const id = action.meta;
  try {
    const response = yield call(API.updateUser, id, param);

    localStorage.setItem('currentUser', JSON.stringify(response.data.user));

    yield put(actions.updateUserSuccess(response.data));
  } catch (e) {
    yield put(actions.updateUserFailure(e));
  }
}

function* uploadUserImageRequestSaga(action: any) {
  const param = action.payload;
  try {
    const response = yield call(API.uploadUserImage, param);

    if (response.success) {
      yield put(actions.uploadUserImageSuccess(response.data));
    } else {
      yield put(actions.uploadUserImageFailure(response.message));
    }
  } catch (e) {
    yield put(actions.uploadUserImageFailure(e));
  }
}

export default function* userSaga() {
  yield takeLatest(FETCH_USER_REQUEST, fetchUserRequestSaga);
  yield takeEvery(FETCH_USERS_BY_PAYLOAD_REQUEST, fetchUsersByPayloadRequestSaga);
  yield takeEvery(UPDATE_USER_REQUEST, updateUserRequestSaga);
  yield takeEvery(UPLOAD_USER_IMAGE_REQUEST, uploadUserImageRequestSaga);
}
