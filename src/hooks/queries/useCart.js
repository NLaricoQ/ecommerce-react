import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getCart } from "../../services/Cart/getCart";

export const useCart = () => {
  const { token, isLogged } = useSelector((store) => store.auth);

  const query = useQuery({
    queryKey: ["cart", isLogged],
    queryFn: () => getCart(token),
    enabled: isLogged,
  });

  return query;
};
