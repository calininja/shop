import { SerializedError } from "@reduxjs/toolkit";

export interface IUserInitialState {
  me?: User,
  isSigningUp: boolean;
  isSignUpDone: boolean;
  isSigningIn: boolean;
  isSigningOut: boolean;
  error: SerializedError | any;
}

export interface User {
  id: number;
  signinId: string | number;
  password: any;
  address: string;
};
