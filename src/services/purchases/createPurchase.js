import { axiosInstance } from "../../api/axiosInstance";

export const createPurchase = async (token) => {
  try {
    await axiosInstance.post("purchases", undefined, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response)
      throw typeof error.response.data === "string"
        ? new Error(error.responde.data)
        : error.response.data;
    else throw new Error("Algo salió mal con la petición de comprar");
  }
};
