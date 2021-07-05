import { SerializedError } from "@reduxjs/toolkit";

export interface ICoreInitialState {
  visible: boolean;
  mode: string;
  error: SerializedError | any;
}
