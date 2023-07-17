import { axiosInstance } from "../../api/axiosinstance";

export const login = async ({ email, password }) => {
  try {
    const credentials = { email, password };
    const res = await axiosInstance.post("users/login", credentials);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
