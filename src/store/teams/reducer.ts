import {
  FETCH_TEAM_REQUEST,
  FETCH_TEAM_SUCCESS,
  FETCH_TEAM_FAILURE,
  FETCH_TEAMS_BY_PAYLOAD_REQUEST,
  FETCH_TEAMS_BY_PAYLOAD_SUCCESS,
  FETCH_TEAMS_BY_PAYLOAD_FAILURE,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_FAILURE,
  UPDATE_TEAM_REQUEST,
  UPDATE_TEAM_SUCCESS,
  UPDATE_TEAM_FAILURE,
  DELETE_TEAM_REQUEST,
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_FAILURE,
} from './constants';

import {
  fetchTeamRequest,
  fetchTeamSuccess,
  fetchTeamFailure,
  fetchTeamsByPayloadRequest,
  fetchTeamsByPayloadSuccess,
  fetchTeamsByPayloadFailure,
  createTeamRequest,
  createTeamSuccess,
  createTeamFailure,
  updateTeamRequest,
  updateTeamSuccess,
  updateTeamFailure,
  deleteTeamRequest,
  deleteTeamSuccess,
  deleteTeamFailure,
} from './actions';

type Action =
  | ReturnType<typeof fetchTeamRequest>
  | ReturnType<typeof fetchTeamSuccess>
  | ReturnType<typeof fetchTeamFailure>
  | ReturnType<typeof fetchTeamsByPayloadRequest>
  | ReturnType<typeof fetchTeamsByPayloadSuccess>
  | ReturnType<typeof fetchTeamsByPayloadFailure>
  | ReturnType<typeof createTeamRequest>
  | ReturnType<typeof createTeamSuccess>
  | ReturnType<typeof createTeamFailure>
  | ReturnType<typeof updateTeamRequest>
  | ReturnType<typeof updateTeamSuccess>
  | ReturnType<typeof updateTeamFailure>
  | ReturnType<typeof deleteTeamRequest>
  | ReturnType<typeof deleteTeamSuccess>
  | ReturnType<typeof deleteTeamFailure>;

type InitialStateType = {
  team: any;
  teamList: any;
  data: any;
  loading: boolean;
  errors: any;
};

const initialState: InitialStateType = {
  team: null,
  teamList: null,
  data: null,
  loading: false,
  errors: [],
};

const reducer = (state: InitialStateType = initialState, action: Action): InitialStateType => {
  switch (action.type) {
    case FETCH_TEAM_REQUEST:
      return { ...state, loading: true };
    case FETCH_TEAM_SUCCESS:
      return { ...state, loading: false, data: action.payload, errors: [] };
    case FETCH_TEAM_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case FETCH_TEAMS_BY_PAYLOAD_REQUEST:
      return { ...state, loading: true };
    case FETCH_TEAMS_BY_PAYLOAD_SUCCESS:
      return { ...state, loading: false, teamList: action.payload, errors: [] };
    case FETCH_TEAMS_BY_PAYLOAD_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case CREATE_TEAM_REQUEST:
      return { ...state, loading: true };
    case CREATE_TEAM_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case CREATE_TEAM_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case UPDATE_TEAM_REQUEST:
      return { ...state, loading: true };
    case UPDATE_TEAM_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case UPDATE_TEAM_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case DELETE_TEAM_REQUEST:
      return { ...state, loading: true };
    case DELETE_TEAM_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case DELETE_TEAM_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    default:
      return state;
  }
};

export default reducer;
