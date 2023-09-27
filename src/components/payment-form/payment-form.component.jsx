import "./payment-form.styles.scss";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from "../button/button.component";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      header: "application/json",
      body: JSON.stringify({ amount: 1000 }),
    });

    const data = await response.json();

    const {
      paymentIntent: { client_secret },
    } = data;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Noor Ali",
        },
      },
    });

    if(paymentResult.error){
      alert(paymentResult.error.message);
    }
    else{
      if(paymentResult.paymentIntent.status === 'succeeded') alert('payment suceeded');
    }
  };

  return (
    <div className="payment-form-container">
      <form className="form-container" onClick={paymentHandler}>
        <CardElement />
        <Button buttonType={"inverted"}> pay now </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
