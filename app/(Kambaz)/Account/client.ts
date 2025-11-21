import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER ||
  (typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:4000`
    : "http://localhost:4000");

export const USERS_API = `${HTTP_SERVER}/api/users`;


interface Credentials {
  username: string;
  password: string;
}

export interface User {
  _id?: string;
  username: string;
  password: string;
  email?: string;
  role?: string;
}


export const signin = async (credentials: Credentials) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
  return response.data;
};

export const signup = async (user: User) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const updateUser = async (user: User) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const profile = async () => {
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
  } catch {
    return null;
  }
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

