import CxClient from '../utils/axios';

export const fetchSalesRep = async (id: string) => {
  try {
    const response = await CxClient.get(`/salesReps/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};

export const fetchSalesRepsByPayload = async (params: any) => {
  try {
    const response = await CxClient.post('/salesReps/getByPayload', params);
    return response.data;
  } catch (e) {
    return e;
  }
};

export const createSalesRep = async (params: any) => {
  try {
    const response = await CxClient.post(`/salesReps`, { ...params });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const updateSalesRep = async (id: string, params: any) => {
  try {
    const response = await CxClient.patch(`/salesReps/${id}`, { ...params });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const deleteSalesRep = async (id: string, params: any) => {
  try {
    const response = await CxClient.post(`/salesReps/delete`, params);
    return response.data;
  } catch (e) {
    return e;
  }
};
