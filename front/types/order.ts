import { SerializedError } from "@reduxjs/toolkit";

export interface IOrderInitialState {
    orders: IOrderState[];
    nonMemberCart: any,
    isAddingCart: boolean;
    isDeletingCart: boolean;
    isLoadingCart: boolean;
    error: SerializedError | any;
}

export interface IOrderState {
    id: number | any,
    size: string,
    color: string,
    quantity: number,
    carts: {
        id: number,
        userId: number,
        date: number | null,
        status: number | null
    },
    images: {
        id: number,
        productId: number,
        src: string,
    },
    products: {
        id: number,
        title: string,
        content: string,
        prdnumber: number,
        price: number
    }
    // date: string,
}
