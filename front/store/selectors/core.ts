import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { coresSlice } from "store/slices/cores";
import { AppState } from "store/store";

export const selectCores = () =>
  createDraftSafeSelector(
    (state: AppState) => state,
    (state: AppState) => state?.[coresSlice.name]
  );
