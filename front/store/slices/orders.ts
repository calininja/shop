import { createSlice } from "@reduxjs/toolkit";
import handleError from "../../lib/redux/handle-error";
import hydrate from "../../lib/redux/hydrate";
import {
  addCartItem,
  deleteCartItem,
  deleteCartItemsAll,
  loadCart,
} from "../../store/thunks/orders";
import { IOrderInitialState } from '../types/order';

const initialState: IOrderInitialState = {
  orders: [],
  isAddingCart: false,
  isDeletingCart: false,
  isLoadingCart: false,
  error: null,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...(action.payload as any)[ordersSlice.name],
        };
      })
      // 장바구니 담기
      .addCase(addCartItem.pending, (state, action) => {
        state.isAddingCart = true;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.isAddingCart = false;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.isAddingCart = false;
        state.error = action.payload
      })
      // 장바구니 상품 삭제
      .addCase(deleteCartItem.pending, (state, action) => {
        state.isDeletingCart = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isDeletingCart = false;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isDeletingCart = false;
        state.error = action.payload
      })
      // 장바구니 상품 전체 삭제(주문완료)
      .addCase(deleteCartItemsAll.pending, (state, action) => {
        state.isDeletingCart = true;
      })
      .addCase(deleteCartItemsAll.fulfilled, (state, action) => {
        state.isDeletingCart = false;
      })
      .addCase(deleteCartItemsAll.rejected, (state, action) => {
        state.isDeletingCart = false;
        state.error = action.payload
      })
      // 장바구니 로드
      .addCase(loadCart.pending, (state, action) => {
        state.isLoadingCart = true;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.isLoadingCart = false;
        state.orders = action.payload.data;
      })
      .addCase(loadCart.rejected, (state, action) => {
        state.isLoadingCart = false;
        state.error = action.payload
      })
      .addDefaultCase((state, action) => {
        state.error = null;
      })
  },
});