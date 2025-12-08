import axios from "axios";

export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER ||
  (typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:4000`
    : "http://localhost:4000");

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const USERS_API = `${HTTP_SERVER}/api/users`;

export interface Credentials {
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

// ---------- ADMIN & PUBLIC ----------
export const findAllUsers = async () => {
  const { data } = await axiosWithCredentials.get(USERS_API);
  return data;
};

export const findUserById = async (id: string) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${id}`);
  return data;
};

export const findUsersByRole = async (role: string) => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}?role=${role}`
  );
  return data;
};

export const findUsersByPartialName = async (name: string) => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}?name=${name}`
  );
  return data;
};

// ---------- ADMIN CRUD ----------
export const deleteUser = async (userId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${USERS_API}/${userId}`
  );
  return data;
};

export const updateUser = async (user: User) => {
  const { data } = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return data;
};

export const createUser = async (user: User) => {
  const { data } = await axiosWithCredentials.post(USERS_API, user);
  return data;
};

// ---------- AUTH ----------
export const signin = async (credentials: Credentials) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return data;
};

export const signup = async (user: User) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/signup`,
    user
  );
  return data;
};

export const signout = async () => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return data;
};

export const profile = async () => {
  try {
    const { data } = await axiosWithCredentials.post(
      `${USERS_API}/profile`
    );
    return data;
  } catch {
    return null;
  }
};
