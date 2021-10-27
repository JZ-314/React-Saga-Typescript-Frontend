import {
  FETCH_CONTACT_REQUEST,
  FETCH_CONTACT_SUCCESS,
  FETCH_CONTACT_FAILURE,
  FETCH_CONTACTS_BY_PAYLOAD_REQUEST,
  FETCH_CONTACTS_BY_PAYLOAD_SUCCESS,
  FETCH_CONTACTS_BY_PAYLOAD_FAILURE,
  CREATE_CONTACT_REQUEST,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAILURE,
  UPDATE_CONTACT_REQUEST,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAILURE,
  DELETE_CONTACT_REQUEST,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAILURE,
} from './constants';

export const fetchContactRequest = (id: string) => ({ type: FETCH_CONTACT_REQUEST, meta: id });
export const fetchContactSuccess = (payload: any) => ({ type: FETCH_CONTACT_SUCCESS, payload });
export const fetchContactFailure = (errors: any) => ({ type: FETCH_CONTACT_FAILURE, errors });

export const fetchContactsByPayloadRequest = (params: any) => ({
  type: FETCH_CONTACTS_BY_PAYLOAD_REQUEST,
  payload: params,
});
export const fetchContactsByPayloadSuccess = (payload: any) => ({
  type: FETCH_CONTACTS_BY_PAYLOAD_SUCCESS,
  payload,
});
export const fetchContactsByPayloadFailure = (errors: any) => ({
  type: FETCH_CONTACTS_BY_PAYLOAD_FAILURE,
  errors,
});

export const createContactRequest = (params: any) => ({
  type: CREATE_CONTACT_REQUEST,
  payload: params,
});
export const createContactSuccess = (payload: any) => ({ type: CREATE_CONTACT_SUCCESS, payload });
export const createContactFailure = (errors: any) => ({ type: CREATE_CONTACT_FAILURE, errors });

export const updateContactRequest = (id: string, params: any) => ({
  type: UPDATE_CONTACT_REQUEST,
  payload: params,
  meta: id,
});
export const updateContactSuccess = (payload: any) => ({ type: UPDATE_CONTACT_SUCCESS, payload });
export const updateContactFailure = (errors: any) => ({ type: UPDATE_CONTACT_FAILURE, errors });

export const deleteContactRequest = (id: string) => ({
  type: DELETE_CONTACT_REQUEST,
  meta: id,
});
export const deleteContactSuccess = (payload: any) => ({ type: DELETE_CONTACT_SUCCESS, payload });
export const deleteContactFailure = (errors: any) => ({ type: DELETE_CONTACT_FAILURE, errors });
