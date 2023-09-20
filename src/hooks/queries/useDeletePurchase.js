import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { emptyPurchase } from "../../services/purchases/emptyPurchase";

export const useEmptyPurchases = () => {
  const token = useSelector((store) => store.auth.token);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => emptyPurchase(token), // Llamada a la función para vaciar las compras
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
  });
  return mutation;
};
