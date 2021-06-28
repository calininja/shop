import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { productsSlice } from "slices/products";
import { AppState } from "store";

export const selectProducts = () =>
  createDraftSafeSelector(
    (state: AppState) => state,
    (state: AppState) => state?.[productsSlice.name]
  );
