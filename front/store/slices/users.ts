import { createSlice } from "@reduxjs/toolkit";
import handleError from "lib/redux/handle-error";
import hydrate from "lib/redux/hydrate";
import {
  registerUser,
  signInUser,
  signOutUser,
  loadUser
} from "store/thunks/users";
import { IUserInitialState } from "../types/user";

const initialState: IUserInitialState = {
  me: null,
  isSigningUp: false,
  isSignUpDone: false,
  isSigningIn: false,
  isSigningOut: false,
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    registerDone: (state) => {
      state.isSignUpDone = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...(action.payload as any)[usersSlice.name],
        };
      })
      // 회원가입
      .addCase(registerUser.pending, (state, action) => {
        state.isSigningUp = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.isSignUpDone = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload
      })
      // 로그인
      .addCase(signInUser.pending, (state, action) => {
        state.isSigningIn = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isSigningIn = false;
        state.me = action.payload.data;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isSigningIn = false;
        state.error = action.payload
      })
      // 로그아웃
      .addCase(signOutUser.pending, (state, action) => {
        state.isSigningOut = true;
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        state.isSigningOut = false;
        state.me = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.error = action.payload
      })
      // 로드유저
      .addCase(loadUser.pending, (state, action) => {
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.me = action.payload;
        }
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.error = action.payload
      })

      // .addMatcher(handleError, (state, action) => {
      //   state.error = action.payload.error;
      // })
      .addDefaultCase((state, action) => {
        state.error = null;
      })
  }
});

export const {
  registerDone
} = usersSlice.actions;
