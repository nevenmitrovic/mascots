import { apiCall } from "./apiCall";
import api from "./axiosInstance";

export const fetchAll = async <T>(URLextension: string): Promise<T[]> => {
  return apiCall(() => api.get(`/${URLextension}`));
};

export const createItem = async <T>(
  URLextension: string,
  data: Partial<T>
): Promise<T> => {
  return apiCall(() => api.post(`/${URLextension}`, data));
};

export const editItem = async <T>(
  URLextension: string,
  id: string,
  data: Partial<T>
): Promise<T> => {
  return apiCall(() => api.put(`/${URLextension}/${id}`, data));
};

export const deleteItem = async (
  URLextension: string,
  id: string
): Promise<void> => {
  return apiCall(() => api.delete(`/${URLextension}/${id}`));
};
