import { axiosInstance } from "../../api/axiosInstance";

export const emptyPurchase = async (token) => {
  try {
    await axiosInstance.delete("purchases", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response)
      throw typeof error.response.data === "string"
        ? new Error(error.responde.data)
        : error.response.data;
    else throw new Error("Algo salió mal con la compra");
  }
};
