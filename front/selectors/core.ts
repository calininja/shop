import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { coresSlice } from "slices/cores";
import { AppState } from "store";

export const selectCores = () =>
  createDraftSafeSelector(
    (state: AppState) => state,
    (state: AppState) => state?.[coresSlice.name]
  );
