import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firbase/firbase.util";

// pass the actual value to be hold in createContext...
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const USER_ACTIONS = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTIONS.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      throw new Error(`UNHANDLED ERROR: ${type} cannot be recognized in UserReducer.`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const {currentUser} = state;

  // const [currentUser, setCurrentUser] = useState(null);

  const setCurrentUser = (user) => {
    dispatch({type: USER_ACTIONS.SET_CURRENT_USER, payload: user});
  }
  
  // we  will aattach the auth observer whenever the app mounts first time, to observer the auth all the time.
  useEffect(() => {
    // because it is an open listen, we have to force stop it from listening when it finished listening...
    // Note: no matter if page is refreshed,
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
