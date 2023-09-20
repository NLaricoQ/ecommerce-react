import { useProducts } from "../../../hooks/queries/useProducts";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

const ProductList = ({ categories, title, excludedIds = [] }) => {
  const { data, isLoading, isError } = useProducts(categories, title);
  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Opps, algo salió mal</p>;
  return (
    <ul className="product-list">
      {data
        .filter((product) => !excludedIds.includes(product.id))
        .sort((a, b) => a.id - b.id)
        .map((product) => (
          <li key={product.id} className="product-list_item">
            <ProductCard product={product} />
          </li>
        ))}
    </ul>
  );
};

export default ProductList;
