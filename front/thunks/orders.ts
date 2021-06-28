import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

axios.defaults.withCredentials = true;

export const addCartItem = createAsyncThunk(
  "orders/addCartItem",
  async (data: any, thunkAPI) => {
    try {
      const response = await axios.post(`api/order/`, data, {
        withCredentials: true,
      })
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const deleteCartItem = createAsyncThunk(
  "orders/deleteCartItem",
  async (id: any, thunkAPI) => {
    try {
      const response = await axios.delete(`api/order/${id}`, {
        withCredentials: true,
      })
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const deleteCartItemsAll = createAsyncThunk(
  "orders/deleteCartItemsAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(`api/order/deleteAll`, {
        withCredentials: true,
      })
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const loadCart = createAsyncThunk(
  "orders/loadCart",
  async (data: number | null, thunkAPI) => {
    try {
      const response = await axios.get(`api/order/${data}`, {
        withCredentials: true,
      })
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);