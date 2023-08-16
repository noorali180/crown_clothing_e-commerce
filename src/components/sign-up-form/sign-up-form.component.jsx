import { useState } from "react";
import Input from '../form-input/form-input.component'

import "./sign-up-form.styles.scss";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firbase/firbase.util";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const clearFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("password do not match, please insert correct password");
      return;
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const userDocRef = await createUserDocumentFromAuth(response.user, {
        displayName,
      });

      clearFormFields();
    } catch (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        alert("user already exists, try another emeail.");
      }
      console.log(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1>Don't have account, create one!</h1>

      <form onSubmit={handleSubmit}>
        <Input
        label="Name"
          type="text"
          required
          placeholder="enter name"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <label>Email:</label>
        <input
          type="email"
          required
          placeholder="enter email"
          onChange={handleChange}
          name="email"
          value={email}
        />

        <label>Password:</label>
        <input
          type="password"
          required
          placeholder="enter password"
          onChange={handleChange}
          name="password"
          value={password}
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          required
          placeholder="confirm password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
