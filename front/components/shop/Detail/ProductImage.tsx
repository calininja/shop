import Slick from '../../common/Slick';
import * as React from 'react';
import { IProductState } from 'types/product';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

interface IProductImageProps {
    product: IProductState;
}

const ProductImage: React.FunctionComponent<IProductImageProps> = ({
    product
}) => {

    return (
        <div css={productImage}>
            <Slick image={product?.images} />
        </div>
    );
};

const productImage = css`
    display: inline-block;
    width: 55%;
    vertical-align: top;
    img{
        width: 100%;
    }
    @media (max-device-width: 414px) {
        float: none;
        width: 100%;
    }
`

export default ProductImage;