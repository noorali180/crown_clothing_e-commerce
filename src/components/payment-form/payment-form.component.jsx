import "./payment-form.styles.scss";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useState } from "react";

import Button from "../button/button.component";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const amount = useSelector(selectCartTotal);
  const user = useSelector(selectCurrentUser);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();

    setIsPaymentLoading(true);

    if (!stripe || !elements) {
      return;
    }

    if (amount === 0) alert("Please add items to cart to continue shopping...");

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      header: "application/json",
      body: JSON.stringify({ amount: amount * 100 }),
    });

    const data = await response.json();

    const {
      paymentIntent: { client_secret },
    } = data;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.displayName || "Guest",
        },
      },
    });

    setIsPaymentLoading(false);

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded")
        alert("payment suceeded");
    }
  };

  return (
    <div className="payment-form-container">
      <form className="form-container" onSubmit={paymentHandler}>
      <h2 title= {'testing card number: 4242 4242 4242 4242'}>Card Payment Details:</h2>
        <CardElement />
        <Button buttonType={"payment"} isLoading={isPaymentLoading}> pay now </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
