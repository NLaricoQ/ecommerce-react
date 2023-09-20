import { useState } from "react";
import "./CartProduct.css";
import { useSelector } from "react-redux";
import { useUpdateCart } from "../../../hooks/queries/useUpdateCart";
import { useDeleteProductFromCart } from "../../../hooks/queries/useDeleteProductFromCart";

const CartProduct = ({ cartProduct }) => {
  const initialQuantity = Number(cartProduct.quantity);
  const price = parseFloat(cartProduct.product.price.replace("$", ""));
  const { mutate, isLoading } = useUpdateCart();
  const deleteMutation = useDeleteProductFromCart();
  const [quantity, setQuantity] = useState(initialQuantity);
  const isLogged = useSelector((store) => store.auth.isLogged);

  const increment = () => {
    const newQuantity = quantity + 1;
    const stock = 10;
    if (newQuantity <= stock) setQuantity(newQuantity);
    else console.log("Diez es el máximo");
  };
  const decrement = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  const handleUpdate = () => {
    if (isLogged)
      mutate({ cartProductId: cartProduct.id, newQuantity: quantity });
  };

  const handleDelete = () => {
    if (isLogged) deleteMutation.mutate(cartProduct.id);
  };

  return (
    <article className="cart-product">
      <div className="car-product_img">
        <img
          className="car-product-img"
          src={cartProduct.product.images[0].url}
          alt={cartProduct.product.title}
        />
      </div>
      <div className="cart-product_detail">
        <button
          className="cart-product_btn_trash"
          onClick={handleDelete}
          disabled={deleteMutation.isLoading}
        >
          <i className="bx bxs-trash"></i>
        </button>
        <header className="cart-product_header">
          <h4 className="car-product_title">{cartProduct.product.title}</h4>
        </header>
        <div>
          <div className="car-product-controls">
            <button className="cart-product_btn" onClick={decrement}>
              -
            </button>
            <span>{quantity}</span>
            <button className="cart-product_btn" onClick={increment}>
              +
            </button>
          </div>
          {initialQuantity !== quantity && (
            <button onClick={handleUpdate} disabled={isLoading}>
              Update Cart
            </button>
          )}
        </div>
        <div>
          <h5>
            Total:{" "}
            <p className="price-p">
              <em>${initialQuantity * price}</em>
            </p>
          </h5>
        </div>
      </div>
    </article>
  );
};

export default CartProduct;
