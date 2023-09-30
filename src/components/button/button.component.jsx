import { Spinner } from "../loading-spinner/spinner.component";
import "./button.styles.scss";

/*
    Three types of button...
    1). default
    2). inverted
    3). google sign in
*/

const BUTTON_TYPE_CLASSES = {
  inverted: "inverted",
  google: "google-sign-in",
  payment: "button-payment"
};

const Button = ({ children, buttonType, isLoading, ...otherOptions }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]} ${isLoading ? 'button-payment': ''}`}
      {...otherOptions}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
