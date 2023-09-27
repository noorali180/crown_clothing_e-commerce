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
  };

  return (
    <div className="payment-form-container">
      <form className="form-container">
        <CardElement />
        <Button buttonType={"inverted"}> pay now </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
