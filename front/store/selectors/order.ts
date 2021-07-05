import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { ordersSlice } from "store/slices/orders";
import { AppState } from "store/store";

export const selectOrders = () =>
  createDraftSafeSelector(
    (state: AppState) => state,
    (state: AppState) => state?.[ordersSlice.name]
  );
