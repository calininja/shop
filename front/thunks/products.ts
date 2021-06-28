import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

axios.defaults.withCredentials = true;

export const addCategory = createAsyncThunk(
  "products/addCategory",
  async (data: any, thunkAPI) => {
    try {
      const response = await axios.post('api/product/category', data, {
        withCredentials: true,
      })
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "products/deleteCategory",
  async (id: any, thunkAPI) => {
    try {
      const response = await axios.delete(`api/product/category/${id}`, {
        withCredentials: true,
      })
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const loadCategories = createAsyncThunk(
  "products/loadCategories",
  async (data: any, thunkAPI) => {
    try {
      const response = await axios.get(`api/product/category?lastId=${data.lastId || 0}&categoryId=${data.categoryId}`, {
        withCredentials: true,
      })
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data: any, thunkAPI) => {
    try {
      const response = await axios.post('api/product', data, {
        withCredentials: true,
      })
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: any, thunkAPI) => {
    try {
      const response = await axios.delete(`api/product/${id}`, {
        withCredentials: true,
      })
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const loadProducts = createAsyncThunk(
  "products/loadProducts",
  async (data: any, thunkAPI) => {
    try {
      const response = await axios.get(`api/product?lastId=${data || 0}`, {
        withCredentials: true,
      })
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const loadProduct = createAsyncThunk(
  "products/loadProduct",
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get(`api/product/${id}`, {
        withCredentials: true,
      })
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const uploadImages = createAsyncThunk(
  "products/uploadImages",
  async (file: any, thunkAPI) => {
    try {
      const response = await axios.post(`api/product/images`, file, {
        withCredentials: true,
      })
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const addReview = createAsyncThunk(
  "products/addReview",
  async (data: object, thunkAPI) => {
    try {
      const response = await axios.post('api/product/addReview', data, {
        withCredentials: true,
      })
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const deleteReviews = createAsyncThunk(
  "products/deleteReviews",
  async (data: any, thunkAPI) => {
    try {
      const response = await axios.delete(`api/product/deleteReview/${data}`, {
        withCredentials: true,
      })
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const loadReviews = createAsyncThunk(
  "products/loadReviews",
  async (data: any, thunkAPI) => {
    try {
      const response = await axios.get(`api/product/loadReviews?prdId=${data.id}&offset=${data.offset || 0}`, {
        withCredentials: true,
      })
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const addViewedProducts = createAsyncThunk(
  "products/addViewedProducts",
  async (data: any, thunkAPI) => {
    try {
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

