import apiClient from "./apiClient";

export const getAllRooms = async (params = {}) => {
  const response = await apiClient.get("/api/rooms", { params });
  return response.data;
};

export const getLatestRooms = async () => {
  const response = await apiClient.get("/api/rooms/latest");
  return response.data;
};

export const getRoomById = async (id) => {
  const response = await apiClient.get(`/api/rooms/${id}`);
  return response.data;
};

export const createRoom = async (roomData) => {
  const response = await apiClient.post("/api/rooms", roomData);
  return response.data;
};

export const updateRoom = async (id, roomData) => {
  const response = await apiClient.patch(`/api/rooms/${id}`, roomData);
  return response.data;
};

export const deleteRoom = async (id) => {
  const response = await apiClient.delete(`/api/rooms/${id}`);
  return response.data;
};

export const getMyListings = async () => {
  const response = await apiClient.get("/api/rooms/my-listings");
  return response.data;
};