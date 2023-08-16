// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import "./sign-in-form.scss";

import {
  //   auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  //   signInWithGoogleRedirect,
} from "../../utils/firbase/firbase.util";

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();

    // will pass the authorized user...
    const userDocRef = await createUserDocumentFromAuth(response.user);
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
    <div>
      This is sign in page...
      {/* <button onClick={logGoogleUserRedirect}>
        Click to sign in with google redirect
      </button> */}
      <button onClick={logGoogleUser}>
        Click to sign in with google popup
      </button>
    </div>
  );
};

export default SignIn;
