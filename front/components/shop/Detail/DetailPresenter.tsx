import * as React from 'react';
import ProductImage from './ProductImage';
import ProductSize from './ProductSize';
import ProductColor from './ProductColor';
import CartPopup from '../../cart/CartPopup';
import ViewedProduct from '../../common/ViewedProduct';
import ProductQuantity from './ProductQuantity';
import ProductCategoryTitle from './ProductCategoryTitle';
import ProductPreview from './ProductPreview';
import { User } from 'types/user';
import { IProductState } from 'types/product';
import { IOrderState } from 'types/order';
import { IReviewState } from 'types/review';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

export interface IDetailPresenterProps {
    obj: any;
    me: User;
    product: IProductState;
    products: IProductState[];
    orders: IOrderState[];
    reviews: IReviewState[];
    allReviews: number;
    quantity: number;
    preview: boolean;
    popData: {};
    viewedProducts: any;
    onClickSize: (v) => void;
    onClickColor: (v) => void;
    increase: () => void;
    decrease: () => void;
    onPreview: () => void;
    onSubmit: (e) => void;
}

const DetailPresenter: React.FunctionComponent<IDetailPresenterProps> = ({
    obj,
    me,
    product,
    products,
    quantity,
    preview,
    orders,
    reviews,
    allReviews,
    popData,
    viewedProducts,
    onClickSize,
    onClickColor,
    increase,
    decrease,
    onPreview,
    onSubmit,
}) => {

    return (
        <>
            <ProductImage
                product={product}
            />
            <div css={productInformationWrapper}>
                <form action="" onSubmit={onSubmit}>
                    <ProductCategoryTitle
                        product={product}
                        products={products}
                    />
                    <ProductColor
                        products={products}
                        onClickColor={onClickColor}
                    />
                    <ProductSize
                        onClickSize={onClickSize}
                    />
                    <ProductQuantity
                        quantity={quantity}
                        increase={increase}
                        decrease={decrease}
                    />
                    <div css={productPrice}>
                        <span>{product ? product.price.toLocaleString() : ''}</span> 원
                    </div>
                    <button css={productCart} type="submit">
                        장바구니
                    </button>
                </form>
                <div css={productDescription}>
                    <span className="product__head">상세설명</span>
                    <pre>
                        <p className="product-description__body">{product?.content}</p>
                    </pre>
                </div>
                <ProductPreview
                    obj={obj}
                    preview={preview}
                    reviews={reviews}
                    allReviews={allReviews}
                    onPreview={onPreview}
                />
            </div>
            {viewedProducts && <ViewedProduct viewedProducts={viewedProducts} />}
            {me && orders && <CartPopup popData={popData} />}
        </>
    );
};

const productInformationWrapper = css`
    display: inline-block;
    width: calc(35% - 50px);
    padding: 20px 0 20px 50px;
    vertical-align: top;
    ul[class*=options]{
        min-width: 574px;
        margin: 20px 0;
        cursor: pointer;
    }
    .product__head{
        display: block;
        width: 100%;
        font: 500 16px/16px 'Noto Sans KR';
        color: #000000;
        margin: 10px 0;
        padding: 20px 0;
        border-top: 1px solid #cccccc;
        text-align: left;
        &.border-none{
            border-top: 0;
        }
    }
    @media(max-device-width: 414px){
        float: none;
        width: 100%;
        padding-left: 0;
    }
`
const productPrice = css`
    margin: 1rem 0;
    span{
        font: 400 25px/25px Noto Sans KR;
    }
`
const productCart = css`
    width: 70%;
    max-width: 300px;
    background: #111111;
    border: 0;
    font: 400 16px/55px 'Noto Sans KR';
    height: 55px;
    color: #ffffff;
    margin: 20px 0 10px;
    border-radius: 100px;
    &:hover{
        background: #202020;
    }
`
const productDescription = css`
    width: 100%;
    .product-description__body{
        font: 400 14px/25px 'Noto Sans KR';
        color: #000000;
        margin: 20px 0 40px;
        white-space: pre-line;
    }
`

export default DetailPresenter;