import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { productsSlice } from "store/slices/products";
import { AppState } from "store/store";

export const selectProducts = () =>
  createDraftSafeSelector(
    (state: AppState) => state,
    (state: AppState) => state?.[productsSlice.name]
  );
