import { useNavigate, useParams } from "react-router-dom";
import { useProductById } from "../../hooks/queries/useProductById";
import ProductList from "../../components/home/ProductList/ProductList";
import { useEffect, useState } from "react";
import { useAddProductToCart } from "../../hooks/queries/useAddProductToCart";
import { useSelector } from "react-redux";
import { useCart } from "../../hooks/queries/useCart";
import "./ProductDetail.css";
const ProductDetail = () => {
  const cartQuery = useCart();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { mutate } = useAddProductToCart();
  const { data, isLoading, isError, error } = useProductById(productId);

  const isLogged = useSelector((store) => store.auth.isLogged);
  const isProductInCart =
    cartQuery.data?.some((cartProduct) => cartProduct.productId === data?.id) ??
    false;
  const quantityInCart =
    cartQuery.data?.find(
      (cartProduct) => Number(cartProduct.productId) === Number(productId)
    )?.quantity ?? 1;
  const [quantity, setQuantity] = useState(Number(quantityInCart));
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
  const handleAddCart = () => {
    if (isLogged) mutate({ quantity, productId });
    else navigate("/login");
  };
  useEffect(() => {
    setQuantity(Number(quantityInCart));
  }, [quantityInCart]);
  if (isLoading) return <p>Loading Product</p>;
  if (isError) return <p>{error.message ?? "No se pudo cargar el producto"}</p>;

  return (
    <section>
      <section className="product-detail-section">
        <div className="product-detail-img">
          {data.images && data.images.length > 0 && (
            <img
              src={data.images[0].url}
              alt={data.title}
              className="product-img"
            />
          )}
        </div>

        <div>
          <h3>{data.brand}</h3>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
          <div>
            <div>
              <h3>Price</h3>
              <p>
                <em>${data.price}</em>
              </p>
            </div>
            <div>
              <h3>Quantity</h3>
              <div className="quantity-btn">
                <button className="btn-quantity" onClick={decrement}>
                  -
                </button>
                <span>{quantity}</span>
                <button className="btn-quantity" onClick={increment}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        {!isProductInCart && (
          <button onClick={handleAddCart} className="add-cart-btn">
            Add to cart
          </button>
        )}
        {isProductInCart && (
          <button className="update-cart-btn">Update in cart</button>
        )}
      </section>
      <div className="product-list_detail">
        <ProductList categories={data.categoryId} excludedIds={[data.id]} />
      </div>
    </section>
  );
};

export default ProductDetail;
