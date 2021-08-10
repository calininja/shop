import * as React from 'react';
import { memo } from 'react';
import ProductImage from '../../../components/shop/detail/utils/ProductImage';
import ProductSize from '../../../components/shop/detail/utils/ProductSize';
import ProductColor from '../../../components/shop/detail/utils/ProductColor';
import CartPopup from '../../../components/cart/CartPopup';
import ViewedProduct from '../../../components/base/ViewedProduct';
import ProductQuantity from '../../../components/shop/detail/utils/ProductQuantity';
import ProductCategoryTitle from '../../../components/shop/detail/utils/ProductCategoryTitle';
import ProductPreview from '../../../components/shop/detail/utils/ProductPreview';
import { User } from '../../../store/types/user';
import { IProductState } from '../../../store/types/product';
import { IOrderState } from '../../../store/types/order';
import { IReviewState } from '../../../store/types/review';
import { css } from '@emotion/react';
import media from '../../../lib/styles/media';
import { font } from '../../../lib/styles/common';

export interface IDetailPresenterProps {
    obj: {
        id: number,
        offset: null
    };
    me: User;
    product: IProductState;
    products: IProductState[];
    orders: IOrderState[];
    reviews: IReviewState[];
    allReviews: number;
    quantity: number;
    preview: boolean;
    popData: {};
    viewedProducts: IProductState[];
    onClickSize: (v: string) => void;
    onClickColor: (v: string) => void;
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
        <div css={detailPresenterWrapper}>
            <ProductImage
                product={product}
            />
            <div className='detail__information'>
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
                    <div className='product__price'>
                        <span>{product ? product.price.toLocaleString() : ''}</span> 원
                    </div>
                    <button className='product__cart' type="submit">
                        장바구니
                    </button>
                </form>
                <div className='product__description'>
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
        </div>
    );
};

const detailPresenterWrapper = css`
    .detail__information{
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
            font: 500 16px/16px ${font.noto};
            color: #000000;
            margin: 10px 0;
            padding: 20px 0;
            border-top: 1px solid #cccccc;
            text-align: left;
            &.border-none{
                border-top: 0;
            }
        }
        .product__price{
            margin: 1rem 0;
            span{
                font: 400 25px/25px ${font.noto};
            }
        }
        .product__cart{
            width: 70%;
            max-width: 300px;
            background: #111111;
            border: 0;
            font: 400 16px/55px ${font.noto};
            height: 55px;
            color: #ffffff;
            margin: 20px 0 10px;
            border-radius: 100px;
            &:hover{
                background: #202020;
            }
        }
        .product__description{
            width: 100%;
            .product-description__body{
                font: 400 14px/25px ${font.noto};
                color: #000000;
                margin: 20px 0 40px;
                white-space: pre-line;
            }  
        }
        ${media.large}{
            float: none;
            width: 100%;
            padding-left: 0;
        }
    }
`
export default memo(DetailPresenter);