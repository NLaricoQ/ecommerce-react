import { useState } from "react";
import { Link } from "react-router-dom";
import PurchasesList from "./PurchasesList/PurchasesList";
import "./Purchases.css";
import { useEmptyPurchases } from "../../hooks/queries/useDeletePurchase";

const Purchases = () => {
  const emptyPurchasesMutation = useEmptyPurchases();
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    Name: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [purchaseCancelled, setPurchaseCancelled] = useState(false);

  const handleEmptyPurchases = () => {
    emptyPurchasesMutation.mutate();
    setPurchaseComplete(true);
  };

  const resetPurchaseProcess = () => {
    setPurchaseComplete(false);
    setPurchaseCancelled(true);
  };

  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmitPaymentForm = (e) => {
    e.preventDefault();
    setPurchaseComplete(true);
  };

  return (
    <div className="purchases">
      <h1>Purchases</h1>
      <PurchasesList />
      {!purchaseComplete && !purchaseCancelled && (
        <div>
          {showPaymentForm ? (
            <div className="payment-form">
              <h2 className="payment-title">Enter Payment Details</h2>
              <form onSubmit={handleSubmitPaymentForm}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="Name"
                    value={paymentDetails.Name}
                    onChange={handlePaymentDetailsChange}
                  />
                </label>
                <label>
                  Card Number:
                  <input
                    type="number"
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handlePaymentDetailsChange}
                  />
                </label>

                <label>
                  Expiration Date:
                  <input
                    type="month"
                    name="expirationDate"
                    value={paymentDetails.expirationDate}
                    onChange={handlePaymentDetailsChange}
                  />
                </label>
                <label>
                  CVV:
                  <input
                    type="number"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handlePaymentDetailsChange}
                  />
                </label>
                <div className="payment__cancel-btn">
                  <button
                    className="payment-btn"
                    type="submit"
                    onClick={handleEmptyPurchases}
                    disabled={emptyPurchasesMutation.isLoading}
                  >
                    PAY
                  </button>
                  <button
                    className="payment-btn"
                    onClick={() => setShowPaymentForm(false)}
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="details-cancel_btn">
              <button
                className="empty-purchases-btn"
                onClick={() => setShowPaymentForm(true)}
              >
                Enter Payment Details
              </button>
              <button
                className="empty-purchases-btn"
                onClick={() => {
                  resetPurchaseProcess();
                  emptyPurchasesMutation.mutate();
                }}
                disabled={emptyPurchasesMutation.isLoading}
              >
                Cancel Purchase
              </button>
            </div>
          )}
        </div>
      )}
      {purchaseCancelled && (
        <div>
          <p>Purchase Cancelled</p>
          <p>
            Go back to the <Link to="/">main page</Link>.
          </p>
        </div>
      )}
      {purchaseComplete && (
        <div>
          <p className="purchase-complete-message">Thanks for your Purchase</p>
          <p>
            Go back to the <Link to="/">main page</Link>.
          </p>
        </div>
      )}
    </div>
  );
};

export default Purchases;
