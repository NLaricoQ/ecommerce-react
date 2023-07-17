import { axiosInstance } from "../../api/axiosinstance";

export const updateCart = async ({ cartProductId, newQuantity, token }) => {
  try {
    const body = { quantity: newQuantity };
    await axiosInstance.put(`cart/${cartProductId}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response)
      throw typeof error.response.data === "string"
        ? new Error(error.responde.data)
        : error.response.data;
    else
      throw new Error(
        "Algo salió mal con la petición de actualización del carrito de compras"
      );
  }
};