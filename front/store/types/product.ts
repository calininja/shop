import { SerializedError } from "@reduxjs/toolkit";
import { IReviewState } from "store/types/review";

export interface IProductInitialState {
    product: IProductState;
    products: IProductState[];
    imagePaths: string[];
    hasMoreProduct: boolean;
    isAddingProduct: boolean;
    isDeletingProduct: boolean;
    isLoadingPost: boolean;
    isAddingReview: boolean;
    isDeletingReview: boolean;
    error: SerializedError | any;
    reviews: IReviewState[];
    allReviews: number;
    start: number;
    end: number;
    current: number;
    viewedProducts: any;
}

export interface IProductState {
    id: any;
    title: string;
    content: string;
    price: number;
    images: {
        id: number,
        src: string,
        productId: number
    }[];
    sizes: {
        id: number,
        prdnumber: number,
        size: string,
    }[];
    colors: {
        id: number,
        prdnumber: number,
        color: string,
    }[];
    categories: {
        id: number,
        name: string,
    }
}

export interface IPostState {
    post: IProductState;
}