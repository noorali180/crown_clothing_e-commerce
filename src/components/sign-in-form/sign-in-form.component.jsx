// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import "./sign-in-form.styles.scss";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import {
  //   auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  //   signInWithGoogleRedirect,
} from "../../utils/firbase/firbase.util";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const clearFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      setCurrentUser(response.user);

      clearFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("User not found with this email");
          break;
        case "auth/wrong-password":
          alert("Wrong password with current eamail");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    const response = await signInWithGooglePopup();

    // will pass the authorized user...
    await createUserDocumentFromAuth(response.user);

    setCurrentUser(response.user);
  };

  //   useEffect(async () => {
  //     const response = await getRedirectResult(auth);
  //     console.log(response);
  //   }, []);

  //   const logGoogleUserRedirect = async () => {
  //     const response = await signInWithGoogleRedirect();
  //     console.log(response);
  //   };

  return (
    <div className="sign-in-container">
      {/* <button onClick={logGoogleUserRedirect}>
        Click to sign in with google redirect
      </button> */}

      <h2>I already have an account</h2>
      <span>SignIn with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
