import * as React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { after, font } from 'lib/styles/common';

interface IProductQuantityProps {
    quantity: any;
    increase: () => void;
    decrease: () => void;
}

const ProductQuantity: React.FunctionComponent<IProductQuantityProps> = ({
    quantity,
    increase,
    decrease
}) => {

    return (
        <>
            <div css={productQuantity}
                className={quantity > 9 ? "product-quantity exceeded" : "product-quantity"}>
                <span className="product__head border-none">수량</span>
                <div className="product-quantity__wrapper">
                    <em>{quantity}</em>
                    <span
                        onClick={decrease}
                        className={quantity <= 1 ? "inactive counting" : "counting"}
                    >-
                    </span>
                    <span
                        onClick={increase}
                        className="counting"
                    >+
                    </span>
                </div>
            </div>
        </>
    );
};

const productQuantity = css`
    &.exceeded{
        ${after()}{
            display: block;
            content: '10개까지 구매 가능합니다.';
            clear: both;
            color: red;
            white-space: nowrap;
        }
    }
    .product__head{
        width: auto;
        display: inline-block;
    }
    .product-quantity__wrapper{
        display: inline-block;
        div,span{
            display: inline-block;
            text-align: left;
        }
        em{
            text-align: center;
            display: inline-block;
            min-width: 80px;
        }
        .counting{
            width: 20px;
            height: 20px;
            border: none;
            background: none;
            font: 300 25px/25px ${font.noto};
            color: #111111;
            padding: 10px;
            text-align: center;
            cursor: pointer;
            &.inactive{
                color: #cccccc;
            }
        }
    }
`

export default ProductQuantity;