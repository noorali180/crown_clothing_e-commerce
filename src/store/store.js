import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// persist redux library is used to retain the state by using local storage, whenever page is reloaded...
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// we want to use logger middleware only when project environment is in development environment, not in production phase...
const middlewares = [process.env.NODE_ENV !== "production" && logger].filter(
  Boolean
);
// this is to enable the compose of redux dev tools extension in chrome, if not available then use the default compose of redux library to compose the middlewares...
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined,composedEnhancers);
export const persistor = persistStore(store);
