import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

// Types
interface RootState {
  user: User;
}

declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}
