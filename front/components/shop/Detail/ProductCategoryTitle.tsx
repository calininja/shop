import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from 'selectors/product';
import Link from 'next/link';
import { IProductState } from 'types/product';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

interface IProductCategoryProps {
    product: IProductState;
    products: IProductState[];
}

const ProductCategoryTitle: React.FunctionComponent<IProductCategoryProps> = ({
    products
}) => {

    const { product } = useSelector(selectProducts());

    return (
        <>
            <span css={productCategory}>
                {products?.map((v, i) => {
                    if (products[i].id == product.id) {
                        return (
                            <div key={v.id}>
                                {v.categories.name}
                            </div>
                        )
                    }
                })}
            </span>
            <h2 css={productTitle}>
                {product?.title}
            </h2>
        </>
    );
};

const productCategory = css`
    display: block;
    font: 300 16px/16px 'Noto Sans KR';
    color: #000000;
    margin-bottom: 15px;
`
const productTitle = css`
    font: 500 28px/28px 'Noto Sans KR';
    color: #111111;
    margin: 0 0 30px 0;
`

export default ProductCategoryTitle;