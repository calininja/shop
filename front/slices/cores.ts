import { createAction, createSlice } from "@reduxjs/toolkit";
import handleError from "lib/redux/handle-error";
import hydrate from "lib/redux/hydrate";
import {
 
} from "thunks/users";
import { ICoreInitialState } from "../types/core";

const initialState: ICoreInitialState = {
  visible: false,
  mode: '',
  error: null,
};

export const coresSlice = createSlice({
  name: "cores",
  initialState,
  reducers: {
    showModal: (state, action) => {
      if(action.payload.visible == true) {
        state.mode = action.payload.mode;
        state.visible = true;
      }else{
        state.visible = false;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...(action.payload as any)[coresSlice.name],
        };
      })

      .addDefaultCase((state, action) => {
        state.error = null;
      })
  },
});
export const {showModal} = coresSlice.actions;
