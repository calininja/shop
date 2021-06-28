import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { ordersSlice } from "slices/orders";
import { AppState } from "store";

export const selectOrders = () =>
  createDraftSafeSelector(
    (state: AppState) => state,
    (state: AppState) => state?.[ordersSlice.name]
  );
