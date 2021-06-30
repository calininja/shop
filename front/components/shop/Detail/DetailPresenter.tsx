import * as React from 'react';
import ProductImage from './ProductImage';
import ProductSize from './ProductSize';
import ProductColor from './ProductColor';
import CartPopup from '../../cart/CartPopup';
import ViewedProduct from '../../common/ViewedProduct';
import ProductQuantity from './ProductQuantity';
import ProductCategory from './ProductCategory';
import PreviewContainer from './PreviewContainer';
import { User } from 'types/user';
import { IProductState } from 'types/product';
import { IOrderState } from 'types/order';
import { IReviewState } from 'types/review';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';


interface IDetailPresenterProps {
    obj: {
        id: number,
        offset: null
    }
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
    onClickPreview: () => void;
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
    onClickPreview,
    onSubmit
}) => {

    return (
        <>
            <ProductImage
                product={product}
            />
            <div className="product-information">
                <form action="" onSubmit={onSubmit}>
                    <ProductCategory
                        products={products}
                    />
                    <h2 className="product__title">
                        {product?.title}
                    </h2>
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
                    <div className="product__price">
                        <span>{product ? product.price.toLocaleString() : ''}</span> 원
                    </div>
                    <div className="product-submenu">
                        <button className="product-cart" type="submit">
                            장바구니
                        </button>
                    </div>
                </form>
                <div className="product-description">
                    <span className="product__head">상세설명</span>
                    <pre>
                        <p className="product-description__body">{product?.content}</p>
                    </pre>
                </div>
                <PreviewContainer
                    obj={obj}
                    preview={preview}
                    reviews={reviews}
                    allReviews={allReviews}
                    onClickPreview={onClickPreview}
                />
            </div>
            {viewedProducts && <ViewedProduct viewedProducts={viewedProducts} />}
            {me && orders && <CartPopup popData={popData} />}
        </>
    );
};


export default DetailPresenter;