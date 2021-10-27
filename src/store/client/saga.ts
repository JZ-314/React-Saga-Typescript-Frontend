import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_CLIENT_MEETING_REQUEST } from './constants';
import * as actions from './actions';
import * as API from '../../apis/clientMeeting';

function* fetchClientMeetingRequestSaga(action: any) {
  try {
    const id = action.meta;
    const response = yield call(API.fetchClientMeeting, id);

    if (response.success) {
      if (response.data) {
        yield put(actions.fetchClientMeetingSuccess(response.data));
      } else {
        yield put(actions.fetchClientMeetingFailure('Meeting URL is invalid'));
      }
    } else {
      yield put(actions.fetchClientMeetingFailure(response.message));
    }
  } catch (e) {
    yield put(actions.fetchClientMeetingFailure(e));
  }
}

export default function* clientMeetingSaga() {
  yield takeLatest(FETCH_CLIENT_MEETING_REQUEST, fetchClientMeetingRequestSaga);
}
