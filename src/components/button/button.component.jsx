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
};

const Button = ({ children, buttonType, ...otherOptions }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherOptions}
    >
      {children}
    </button>
  );
};

export default Button;
