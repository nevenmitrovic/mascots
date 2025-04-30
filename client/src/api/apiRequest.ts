import { type AxiosResponse } from "axios";

export const apiRequest = async <T>(request: () => Promise<any>): Promise<T> => {
  try {
    const response:AxiosResponse = await request();
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
