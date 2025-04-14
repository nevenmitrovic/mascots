import axios from "axios";
import { Location } from "../utils/types/dataTypes";

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "an error occurred",
  };
};

const api = axios.create({
  baseURL: `http://localhost:8000/api/v1`,
});

export const fetchAllLocations = async () => {
  try {
    const response = await api("/locations");
    if (!response.status) {
      console.log(response);
      return;
    }
    return response.data;
  } catch (error) {
    renderError(error);
  }
};

export const createLocation = async (formData: Location) => {
  try {
    const response = await api.post(`/locations`, formData);
    console.log(response);
    if (!response.status) {
      return;
    }
    return response.data;
  } catch (error) {
    renderError(error);
  }
};

export const editLocation = async (formData: Location) => {
  try {
    const response = await api.put(`/locations/${formData.id}`, formData);
    if (!response.status) {
      return;
    }
    return response.data;
  } catch (error) {
    renderError(error);
  }
};

export const deleteLocation = async ({ id }: { id: string }) => {
  try {
    const response = await api(`/locations/${id}`);
    if (!response.status) {
      return;
    }
    return response.data;
  } catch (error) {
    renderError(error);
  }
};
