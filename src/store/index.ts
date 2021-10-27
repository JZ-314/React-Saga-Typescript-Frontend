import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import app from './app/reducer';
import user from './user/reducer';
import contact from './contact/reducer';
import meeting from './meeting/reducer';
import meetings from './meetings/reducer';
import teams from './teams/reducer';
import salesRep from './salesRep/reducer';
import client from './client/reducer';

import appSaga from './app/saga';
import userSaga from './user/saga';
import contactSaga from './contact/saga';
import meetingSaga from './meeting/saga';
import meetingsSaga from './meetings/saga';
import teamsSaga from './teams/saga';
import salesRepSaga from './salesRep/saga';
import clientSaga from './client/saga';

const rootReducer = combineReducers({
  app,
  user,
  contact,
  meeting,
  meetings,
  teams,
  salesRep,
  client,
});

export function* rootSaga() {
  yield all([
    appSaga(),
    userSaga(),
    contactSaga(),
    meetingSaga(),
    meetingsSaga(),
    teamsSaga(),
    salesRepSaga(),
    clientSaga(),
  ]);
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
