import { combineReducers } from "@reduxjs/toolkit";
import { coresSlice } from "store/slices/cores";
import { usersSlice } from "store/slices/users";
import { productsSlice } from "store/slices/products";
import { ordersSlice } from "store/slices/orders";

const rootReducer = combineReducers({
  cores: coresSlice.reducer,
  users: usersSlice.reducer,
  products: productsSlice.reducer,
  orders: ordersSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
