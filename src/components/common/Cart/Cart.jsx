import { useSelector } from "react-redux";
import { useCart } from "../../../hooks/queries/useCart";
import { useCreatePurchase } from "../../../hooks/queries/useCreatePurchase";
import CartProduct from "../CartProduct/CartProduct";
import "./Cart.css";
const Cart = ({ isVisible }) => {
  const isLogged = useSelector((store) => store.auth.isLogged);
  const { data, isLoading, isError, error } = useCart();
  const createPurchaseMutation = useCreatePurchase();
  const reducer = (acc, cartProduct) => {
    const quantity = Number(cartProduct.quantity);
    const price = Number(cartProduct.product.price);
    return acc + quantity * price;
  };
  const total = data?.reduce(reducer, 0) ?? 0;
  const toggleCart = isVisible
    ? "wrapper-cart"
    : "wrapper-cart wrapper-cart--hidden";
  const handleCheckout = () => {
    if (isLogged) createPurchaseMutation.mutate();
  };
  if (isLoading) return <p>Loading cart...</p>;

  if (isError)
    return <p>{error.message ?? "No se pudo cargar el estado del carrito"}</p>;
  return (
    <div className={toggleCart}>
      <aside className="cart">
        <h2 className="cart_title">Shopping Car</h2>
        {!data.length && <p>The cart is empty</p>}
        {Boolean(data.length) && (
          <div className="cart-container_list">
            <ul className="cart_list">
              {data.map((cartProduct) => (
                <li key={cartProduct.id} className="cart-li">
                  <CartProduct cartProduct={cartProduct} />
                </li>
              ))}
            </ul>
            <div>
              <p className="total-price-p">
                <span>Total :</span>
                <em>${total.toFixed(2)}</em>
              </p>
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={createPurchaseMutation.isLoading || isLoading}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Cart;
