import CxClient from '../utils/axios';

export const fetchMeeting = async (id: string) => {
  try {
    const response = await CxClient.get(`/meetings/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};

export const fetchMeetingsByPayload = async (params: any) => {
  try {
    const response = await CxClient.post('/meetings/getByPayload', params);
    return response.data;
  } catch (e) {
    return e;
  }
};

export const createMeeting = async (params: any) => {
  try {
    const response = await CxClient.post(`/meetings`, { ...params });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const updateMeeting = async (id: string, params: any) => {
  try {
    const response = await CxClient.patch(`/meetings/${id}`, { ...params });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const deleteMeeting = async (id: string) => {
  try {
    const response = await CxClient.delete(`/meetings/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
