import { axiosInstance } from "../../api/axiosInstance";

export const getAllCategories = async () => {
  try {
    const res = await axiosInstance.get("categories/");
    return res.data;
  } catch (error) {
    // La peticion llegó hacia el backend, pero el mismo no respondió satisfactoriamente
    // Respondio algo fuera del status 200
    if (error.response) throw error.response.data;
    else throw new Error("Algo salió mal con la petición de categorias");
  }
};
