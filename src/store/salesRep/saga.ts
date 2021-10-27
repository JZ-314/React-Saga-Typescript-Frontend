import {
  FETCH_SALES_REP_REQUEST,
  FETCH_SALES_REPS_BY_PAYLOAD_REQUEST,
  CREATE_SALES_REP_REQUEST,
  UPDATE_SALES_REP_REQUEST,
  DELETE_SALES_REP_REQUEST,
} from './constants';
import * as actions from './actions';
import * as API from '../../apis/salesRep';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchSalesRepRequestSaga(action: any) {
  try {
    const id = action.meta;
    const response = yield call(API.fetchSalesRep, id);

    if (response.success) {
      yield put(actions.fetchSalesRepSuccess(response.data));
    } else {
      yield put(actions.fetchSalesRepFailure(response.message));
    }
  } catch (e) {
    yield put(actions.fetchSalesRepFailure(e));
  }
}

function* fetchSalesRepsByPayloadRequestSaga(action: any) {
  try {
    const param = action.payload;
    const response = yield call(API.fetchSalesRepsByPayload, param);

    if (response.success) {
      yield put(actions.fetchSalesRepsByPayloadSuccess(response.data));
    } else {
      yield put(actions.fetchSalesRepsByPayloadFailure(response.message));
    }
  } catch (e) {
    yield put(actions.fetchSalesRepsByPayloadFailure(e));
  }
}

function* createSalesRepRequestSaga(action: any) {
  const param = action.payload;
  try {
    const response = yield call(API.createSalesRep, param);

    yield put(actions.createSalesRepSuccess(response));
  } catch (e) {
    yield put(actions.createSalesRepFailure(e));
  }
}

function* updateSalesRepRequestSaga(action: any) {
  const param = action.payload;
  const id = action.meta;
  try {
    const response = yield call(API.updateSalesRep, id, param);

    yield put(actions.updateSalesRepSuccess(response));
  } catch (e) {
    yield put(actions.updateSalesRepFailure(e));
  }
}

function* deleteSalesRepRequestSaga(action: any) {
  const id = action.meta;
  const param = action.payload;
  try {
    const response = yield call(API.deleteSalesRep, id, param);

    if (response.success) {
      yield put(actions.deleteSalesRepSuccess(response));
    } else {
      yield put(actions.deleteSalesRepFailure(response.message));
    }
  } catch (e) {
    yield put(actions.deleteSalesRepFailure(e));
  }
}

export default function* salesRepsSaga() {
  yield takeLatest(FETCH_SALES_REP_REQUEST, fetchSalesRepRequestSaga);
  yield takeEvery(FETCH_SALES_REPS_BY_PAYLOAD_REQUEST, fetchSalesRepsByPayloadRequestSaga);
  yield takeEvery(CREATE_SALES_REP_REQUEST, createSalesRepRequestSaga);
  yield takeEvery(UPDATE_SALES_REP_REQUEST, updateSalesRepRequestSaga);
  yield takeEvery(DELETE_SALES_REP_REQUEST, deleteSalesRepRequestSaga);
}
