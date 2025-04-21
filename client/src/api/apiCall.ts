export const apiCall = async <T>(request: () => Promise<any>): Promise<T> => {
  try {
    const response = await request();
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
