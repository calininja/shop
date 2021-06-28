import { configureStore, ThunkAction, ThunkDispatch, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createWrapper, Context } from "next-redux-wrapper";
import { Action } from "redux";
import rootReducer, { RootState } from "slices/rootReducer";

const store = (context: Context) => {
  const config = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    })
  });
  return config;
}

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = ThunkDispatch<AppState, unknown, Action>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper(store, {
  debug: process.env.NODE_ENV !== 'production',
});

export default wrapper;
