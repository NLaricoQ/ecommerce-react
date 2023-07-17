import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { addProductToCart } from "../../services/Cart/addProductToCart";

export const useAddProductToCart = () => {
  const token = useSelector((store) => store.auth.token);

  // Retorna el objeto queryclient que gestiona todo el caché de React query
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ quantity, productId }) =>
      addProductToCart({ token, quantity, productId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  return mutation;
};
