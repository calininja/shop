import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

axios.defaults.withCredentials = true;

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (data: any, thunkAPI) => {
    try {
      const response = await axios.post('api/user/', data, {
        withCredentials: true,
      })
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const signInUser = createAsyncThunk(
  "users/signInUser",
  async (data: any, thunkAPI) => {
    try {
      const response = await axios.post('api/user/login', data, {
        withCredentials: true,
      })
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const signOutUser = createAsyncThunk(
  "users/signOutUser",
  async (_, thunkAPI) => {
    try {
      return axios.post("api/user/logout", {}, {
        withCredentials: true,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const loadUser = createAsyncThunk(
  "users/loadUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("api/user/", {
        withCredentials: true,
      })
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);