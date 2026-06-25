import apiClient from "./apiClient";

export const createBooking = async (bookingData) => {
  const response = await apiClient.post("/api/bookings", bookingData);
  return response.data;
};

export const getMyBookings = async () => {
  const response = await apiClient.get("/api/bookings/my-bookings");
  return response.data;
};

export const cancelBooking = async (bookingId) => {
  const response = await apiClient.patch(`/api/bookings/${bookingId}/cancel`);
  return response.data;
};