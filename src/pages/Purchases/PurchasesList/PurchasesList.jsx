import { usePurchases } from "../../../hooks/queries/usePurchases";
import Loader from "../../../components/common/Loader/Loader";
import "./PurchasesList.css";

const PurchasesList = () => {
  const { data, isLoading, isError, error } = usePurchases();

  if (isLoading)
    return (
      <div className="loader-purchases">
        <Loader />
      </div>
    );

  if (isError)
    return <p>{error.message ?? "No se pudo cargar la lista de compras"}</p>;

  function purchaseDate(date) {
    const objectDate = new Date(date);
    const day = objectDate.getDate();
    const month = objectDate.getMonth() + 1;
    const year = objectDate.getFullYear();
    const hour = objectDate.getHours();
    const minute = objectDate.getMinutes();
    const second = objectDate.getSeconds();
    const formatDay = day < 10 ? `0${day}` : day;
    const formatMonth = month < 10 ? `0${month}` : month;
    const formatHour = hour < 10 ? `0${hour}` : hour;
    const formatMinute = minute < 10 ? `0${minute}` : minute;
    const formatSecond = second < 10 ? `0${second}` : second;

    return `${formatDay}/${formatMonth}/${year} ${formatHour}:${formatMinute}:${formatSecond}`;
  }

  function calculateTotalPrice(purchases) {
    return purchases.reduce((total, purchase) => {
      const purchasePrice =
        purchase.quantity * parseFloat(purchase.product.price.replace("$", ""));
      return total + purchasePrice;
    }, 0);
  }

  return (
    <div className="purchases-container">
      <ul className="purchases-list">
        {data.map((purchase) => (
          <li key={purchase.id} className="purchases-list__item">
            <article className="purchase-container">
              <div className="purchase-img-container">
                {purchase.product.images && purchase.product.images[0] && (
                  <img
                    src={purchase.product.images[0].url}
                    alt={purchase.product.title}
                  />
                )}
              </div>
              <h5 className="purchase-title">{purchase.product.title}</h5>
              <p className="purchase-date">
                {purchaseDate(purchase.createdAt)}
              </p>
              <div className="purchase-quantity-container">
                <p className="purchase-quantity">{purchase.quantity}</p>
              </div>
              <h5 className="purchase-price">
                ${" "}
                {(
                  purchase.quantity *
                  parseFloat(purchase.product.price.replace("$", ""))
                ).toFixed(2)}
              </h5>
            </article>
          </li>
        ))}
      </ul>
      <p className="purchases-total">
        Total: ${calculateTotalPrice(data).toFixed(2)}
      </p>
    </div>
  );
};

export default PurchasesList;
