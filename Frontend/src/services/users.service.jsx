import { httpClient } from "../httpClient/httpClient";

export const LoginUser = async (body) => {
  try {
    const response = await httpClient.post("/login", body);
    localStorage.setItem("token", response.data.token);
  } catch (error) {
    return error;
  }
};

export const FilterRequest = async (body) => {
  const response = await httpClient.post("/users/filter", body);
  return response;
};

export const GetUsers = async () => {
  const response = await httpClient.get("/users");
  return response;
};

export const GetUser = async (id) => {
  const response = await httpClient.get(`/users/${id}`);
  return response;
};

export const CreateUser = async (body) => {
  const response = await httpClient.post("/users", body);
  return response;
};

export const UpdateUser = async (id, body) => {
  const response = await httpClient.put(`/users/${id}`, body);
  return response;
};
