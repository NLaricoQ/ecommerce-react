import { Link, useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { useAddProductToCart } from "../../../hooks/queries/useAddProductToCart";
import { useSelector } from "react-redux";
import { useCart } from "../../../hooks/queries/useCart";
const ProductCard = ({ product }) => {
  const { mutate } = useAddProductToCart();
  const { data, isLoading } = useCart();
  const isLogged = useSelector((store) => store.auth.isLogged);
  const navigate = useNavigate();

  let isProductInCart = data?.some(
    (cartProduct) => cartProduct.productId === product.id
  );
  const isAddVisible = !isLogged || !isProductInCart;
  const handleAdd = (e) => {
    e.preventDefault();
    if (!isLogged) navigate("/login");
    else mutate({ quantity: 1, productId: product.id });

    console.log(
      `El usuario quiere agregar al carrito el producto ${product.title}`
    );
  };
  return (
    <Link to={"/product/" + product.id}>
      <article className="product-cart">
        <header className="product-car_header">
          <div className="product-car_container-img">
            <img
              className="product-car_img product-car_container-img--visible"
              src={product.images[0].url}
              alt={product.title + "image 1"}
            />
            <img
              className="product-car_img product-car_container-img--hidden"
              src={product.images[1].url}
              alt={product.title + "image 2"}
            />
          </div>
          <p className="product-cart_paragraph">{product.brand}</p>
          <h2 className="product-title">{product.title}</h2>
        </header>
        <section className="product-cart_body">
          <h3 className="product-title">Price</h3>
          <p className="product-cart_paragraph">
            <em>{product.price}</em>
          </p>
        </section>
        {isAddVisible && (
          <button
            className="product-cart_btn"
            onClick={handleAdd}
            disabled={isLoading}
          >
            <i className="bx bxs-cart-add"></i>
          </button>
        )}
        {!isAddVisible && <p>This product is already in the cart</p>}
      </article>
    </Link>
  );
};

export default ProductCard;
