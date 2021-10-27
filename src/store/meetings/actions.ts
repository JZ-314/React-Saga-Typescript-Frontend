import {
  FETCH_MEETING_REQUEST,
  FETCH_MEETING_SUCCESS,
  FETCH_MEETING_FAILURE,
  FETCH_MEETINGS_BY_PAYLOAD_REQUEST,
  FETCH_MEETINGS_BY_PAYLOAD_SUCCESS,
  FETCH_MEETINGS_BY_PAYLOAD_FAILURE,
  CREATE_MEETING_REQUEST,
  CREATE_MEETING_SUCCESS,
  CREATE_MEETING_FAILURE,
  UPDATE_MEETING_REQUEST,
  UPDATE_MEETING_SUCCESS,
  UPDATE_MEETING_FAILURE,
  DELETE_MEETING_REQUEST,
  DELETE_MEETING_SUCCESS,
  DELETE_MEETING_FAILURE,
} from './constants';

export const fetchMeetingRequest = (id: string) => ({ type: FETCH_MEETING_REQUEST, meta: id });
export const fetchMeetingSuccess = (payload: any) => ({ type: FETCH_MEETING_SUCCESS, payload });
export const fetchMeetingFailure = (errors: any) => ({ type: FETCH_MEETING_FAILURE, errors });

export const fetchMeetingsByPayloadRequest = (params: any) => ({
  type: FETCH_MEETINGS_BY_PAYLOAD_REQUEST,
  payload: params,
});
export const fetchMeetingsByPayloadSuccess = (payload: any) => ({
  type: FETCH_MEETINGS_BY_PAYLOAD_SUCCESS,
  payload,
});
export const fetchMeetingsByPayloadFailure = (errors: any) => ({
  type: FETCH_MEETINGS_BY_PAYLOAD_FAILURE,
  errors,
});

export const createMeetingRequest = (params: any) => ({
  type: CREATE_MEETING_REQUEST,
  payload: params,
});
export const createMeetingSuccess = (payload: any) => ({ type: CREATE_MEETING_SUCCESS, payload });
export const createMeetingFailure = (errors: any) => ({ type: CREATE_MEETING_FAILURE, errors });

export const updateMeetingRequest = (id: string, params: any) => ({
  type: UPDATE_MEETING_REQUEST,
  payload: params,
  meta: id,
});
export const updateMeetingSuccess = (payload: any) => ({ type: UPDATE_MEETING_SUCCESS, payload });
export const updateMeetingFailure = (errors: any) => ({ type: UPDATE_MEETING_FAILURE, errors });

export const deleteMeetingRequest = (id: string) => ({
  type: DELETE_MEETING_REQUEST,
  meta: id,
});
export const deleteMeetingSuccess = (payload: any) => ({ type: DELETE_MEETING_SUCCESS, payload });
export const deleteMeetingFailure = (errors: any) => ({ type: DELETE_MEETING_FAILURE, errors });
