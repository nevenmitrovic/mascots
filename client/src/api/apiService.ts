import { apiRequest } from "./apiRequest";
import api from "./axiosInstance";

export const fetchAll = async <T>(URLextension: string): Promise<T[]> => {
  return apiRequest(() => api.get(`/${URLextension}`));
};

export const createItem = async <T>(
  URLextension: string,
  data: T
): Promise<T> => {
  console.log(data)
  return apiRequest(() => api.post(`/${URLextension}`, data));
};

export const editItem = async <T>(
  URLextension: string,
  id: string,
  data: T
): Promise<T> => {
  return apiRequest(() => api.put(`/${URLextension}/${id}`, data));
};

export const partialEditItem = async <T>(
  URLextension: string,
  id: string,
  data: T
): Promise<T> => {
  return apiRequest(() => api.patch(`/${URLextension}/${id}`, data));
};

export const deleteItem = async (
  URLextension: string,
  id: string
): Promise<void> => {
  return apiRequest(() => api.delete(`/${URLextension}/${id}`));
};
