import CxClient from '../utils/axios';

export const fetchUser = async (userId: string) => {
  try {
    const response = await CxClient.get(`/users/${userId}`);
    return response;
  } catch (e) {
    return e;
  }
};

export const fetchUsersByPayload = async (params: any) => {
  try {
    const response = await CxClient.post('/users/getByPayload', params);
    return response;
  } catch (e) {
    return e;
  }
};

export const updateUser = async (userId: string, params: any) => {
  try {
    const response = await CxClient.put(`/users/${userId}`, { ...params });
    return response;
  } catch (e) {
    return e;
  }
};

export const uploadUserImage = async (payload: any) => {
  try {
    const response: any = await CxClient.post(`/users/upload`, payload);
    return response.data;
  } catch (e) {
    return e;
  }
};

export const uploadUserAvatar = async (id: string, payload: any) => {
  try {
    const response: any = await CxClient.post(`/users/${id}/uploadAvatar`, payload);
    return response.data;
  } catch (e) {
    return e;
  }
};
