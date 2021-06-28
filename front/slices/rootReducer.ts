import { combineReducers } from "@reduxjs/toolkit";
import { coresSlice } from "slices/cores";
import { usersSlice } from "slices/users";
import { productsSlice } from "slices/products";
import { ordersSlice } from "slices/orders";

const rootReducer = combineReducers({
  cores: coresSlice.reducer,
  users: usersSlice.reducer,
  products: productsSlice.reducer,
  orders: ordersSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
