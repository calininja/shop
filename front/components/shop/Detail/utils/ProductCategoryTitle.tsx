import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../../store/selectors/product';
import { IProductState } from '../../../../store/types/product';
import { css } from '@emotion/react';
import { font } from '../../../../lib/styles/common';

interface IProductCategoryProps {
    product: IProductState;
    products: IProductState[];
}

const ProductCategoryTitle: React.FunctionComponent<IProductCategoryProps> = ({
    products
}) => {

    const { product } = useSelector(selectProducts());

    return (
        <div css={productCategoryTitleWrapper}>
            <span className='product__category'>
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
            <h2 className='product__title'>
                {product?.title}
            </h2>
        </div>
    );
};

const productCategoryTitleWrapper = css`
    .product__category{
        display: block;
        font: 300 16px/16px ${font.noto};
        color: #000000;
        margin-bottom: 15px;
    }
    .product__title{
        font: 500 28px/28px ${font.noto};
        color: #111111;
        margin: 0 0 30px 0;
    }
`

export default ProductCategoryTitle;