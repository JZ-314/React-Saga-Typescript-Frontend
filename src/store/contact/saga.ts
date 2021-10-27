import {
  FETCH_CONTACT_REQUEST,
  FETCH_CONTACTS_BY_PAYLOAD_REQUEST,
  CREATE_CONTACT_REQUEST,
  UPDATE_CONTACT_REQUEST,
  DELETE_CONTACT_REQUEST,
} from './constants';
import * as actions from './actions';
import * as API from '../../apis/contact';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchContactRequestSaga(action: any) {
  try {
    const id = action.meta;
    const response = yield call(API.fetchContact, id);

    if (response.success) {
      yield put(actions.fetchContactSuccess(response.data));
    } else {
      yield put(actions.fetchContactFailure(response.message));
    }
  } catch (e) {
    yield put(actions.fetchContactFailure(e));
  }
}

function* fetchContactsByPayloadRequestSaga(action: any) {
  try {
    const param = action.payload;
    const response = yield call(API.fetchContactsByPayload, param);

    if (response.success) {
      yield put(actions.fetchContactsByPayloadSuccess(response.data));
    } else {
      yield put(actions.fetchContactsByPayloadFailure(response.message));
    }
  } catch (e) {
    yield put(actions.fetchContactsByPayloadFailure(e));
  }
}

function* createContactRequestSaga(action: any) {
  const param = action.payload;
  try {
    const response = yield call(API.createContact, param);

    if (response.success) {
      yield put(actions.createContactSuccess(response));
    } else {
      yield put(actions.createContactFailure(response.message));
    }
  } catch (e) {
    yield put(actions.createContactFailure(e));
  }
}

function* updateContactRequestSaga(action: any) {
  const param = action.payload;
  const id = action.meta;
  try {
    const response = yield call(API.updateContact, id, param);

    if (response.success) {
      yield put(actions.updateContactSuccess(response));
    } else {
      yield put(actions.updateContactFailure(response.message));
    }
  } catch (e) {
    yield put(actions.updateContactFailure(e));
  }
}

function* deleteContactRequestSaga(action: any) {
  const id = action.meta;
  try {
    const response = yield call(API.deleteContact, id);

    if (response.success) {
      yield put(actions.deleteContactSuccess(response));
    } else {
      yield put(actions.deleteContactFailure(response.message));
    }
  } catch (e) {
    yield put(actions.deleteContactFailure(e));
  }
}

export default function* contactSaga() {
  yield takeLatest(FETCH_CONTACT_REQUEST, fetchContactRequestSaga);
  yield takeEvery(FETCH_CONTACTS_BY_PAYLOAD_REQUEST, fetchContactsByPayloadRequestSaga);
  yield takeEvery(CREATE_CONTACT_REQUEST, createContactRequestSaga);
  yield takeEvery(UPDATE_CONTACT_REQUEST, updateContactRequestSaga);
  yield takeEvery(DELETE_CONTACT_REQUEST, deleteContactRequestSaga);
}
