import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { usersSlice } from "../../store/slices/users";
import { AppState } from "../../store/store";

export const selectUsers = () =>
  createDraftSafeSelector(
    (state: AppState) => state,
    (state: AppState) => state?.[usersSlice.name]
  );
