import { createSlice } from "@reduxjs/toolkit";
import handleError from "../../lib/redux/handle-error";
import hydrate from "../../lib/redux/hydrate";
import {
  addProduct,
  deleteProduct,
  addCategory,
  deleteCategory,
  loadCategories,
  loadProduct,
  loadProducts,
  uploadImages,
  addReview,
  deleteReviews,
  loadReviews,
  addViewedProducts
} from "../../store/thunks/products";
import { IProductInitialState } from '../types/product';

const initialState: IProductInitialState = {
  product: null,
  products: [],
  imagePaths: [],
  hasMoreProduct: false,
  isAddingProduct: false,
  isDeletingProduct: false,
  isLoadingPost: false,
  isAddingReview: false,
  isDeletingReview: false,
  error: null,
  reviews: [],
  allReviews: 0,
  start: 0,
  end: 10,
  current: 1,
  viewedProducts: []
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    deleteImage: (state, action) => {
      const index = state.imagePaths.findIndex((v, i) => i === action.payload);
      state.imagePaths.splice(index, 1);
    },
    currentPageNumber: (state, action) => {
      state.current = action.payload;
    },
    updateStartEndPage: (state, action) => {
      state.start = action.payload.start;
      state.end = action.payload.end;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...(action.payload as any)[productsSlice.name],
        };
      })
      // 카테고리 추가
      .addCase(addCategory.pending, (state, action) => {
      })
      .addCase(addCategory.fulfilled, (state, action) => {
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.payload
      })
      // 카테고리 삭제
      .addCase(deleteCategory.pending, (state, action) => {
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.payload
      })
      // 카테고리 로드
      .addCase(loadCategories.pending, (state, action) => {
        state.isLoadingPost = true;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.isLoadingPost = false;
        state.products = state.products.concat(action.payload.data);
        state.hasMoreProduct = action.payload.data.length === 20;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.error = action.payload
      })
      // 상품 추가
      .addCase(addProduct.pending, (state, action) => {
        state.isAddingProduct = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isAddingProduct = false;
        state.products = [action.payload.data, ...state.products]
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isAddingProduct = false;
        state.error = action.payload
      })
      // 상품 삭제
      .addCase(deleteProduct.pending, (state, action) => {
        state.isDeletingProduct = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isDeletingProduct = false;
        state.products = [action.payload.data, ...state.products]
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isDeletingProduct = false;
        state.error = action.payload
      })
      // 상품리스트 로드
      .addCase(loadProducts.pending, (state, action) => {
        state.isLoadingPost = true;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.isLoadingPost = false;
        state.products = state.products.concat(action.payload.data);
        state.hasMoreProduct = action.payload.data.length === 20;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.error = action.payload
      })
      // 상품상세 로드
      .addCase(loadProduct.pending, (state, action) => {
      })
      .addCase(loadProduct.fulfilled, (state, action) => {
        state.product = action.payload.data;
      })
      .addCase(loadProduct.rejected, (state, action) => {
        state.error = action.payload
      })
      // 이미지 업로드
      .addCase(uploadImages.pending, (state, action) => {
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        action.payload.data.forEach((p) => {
          state.imagePaths.push(p);
        });
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.error = action.payload
      })
      // 리뷰 등록
      .addCase(addReview.pending, (state, action) => {
        state.isAddingReview = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isAddingReview = false;
        state.reviews = [action.payload.data, state.reviews];
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isAddingReview = false;
        state.error = action.payload
      })
      // // 리뷰 삭제
      .addCase(deleteReviews.pending, (state, action) => {
        state.isDeletingReview = true;
      })
      .addCase(deleteReviews.fulfilled, (state, action) => {
        state.isDeletingReview = false;
        state.reviews = [action.payload.data, ...state.reviews]
      })
      .addCase(deleteReviews.rejected, (state, action) => {
        state.isDeletingReview = false;
        state.error = action.payload
      })
      // 리뷰 로드
      .addCase(loadReviews.pending, (state, action) => {
        state.isLoadingPost = true;
      })
      .addCase(loadReviews.fulfilled, (state, action) => {
        state.isLoadingPost = false;
        state.reviews = action.payload.data.result;
        state.allReviews = action.payload.data.allReviews.length;
      })
      .addCase(loadReviews.rejected, (state, action) => {
        state.error = action.payload
      })
      // // 최근 본 상품 추가
      .addCase(addViewedProducts.pending, (state, action) => {
        state.isAddingProduct = true;
      })
      .addCase(addViewedProducts.fulfilled, (state, action) => {
        state.isAddingProduct = false;
        state.viewedProducts = action.payload;
      })
      .addCase(addViewedProducts.rejected, (state, action) => {
        state.error = action.payload
      })

      // .addMatcher(handleError, (state, action) => {
      //   state.error = action.payload.error;
      // })
      .addDefaultCase((state, action) => {
        state.error = null;
      })
  },
});
export const {
  deleteImage,
  currentPageNumber,
  updateStartEndPage,
} = productsSlice.actions;
