import apiClient from "./apiClient";

export const registerUserInDB = async (userData) => {
  const response = await apiClient.post("/api/auth/register", userData);
  return response.data;
};

export const loginUserInDB = async (loginData) => {
  const response = await apiClient.post("/api/auth/login", loginData);
  return response.data;
};

export const googleLoginInDB = async (userData) => {
  const response = await apiClient.post("/api/auth/google-login", userData);
  return response.data;
};

export const logoutUserFromDB = async () => {
  const response = await apiClient.post("/api/auth/logout");
  return response.data;
};

export const getLoggedInUser = async () => {
  const response = await apiClient.get("/api/auth/me");
  return response.data;
};