import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../../store/selectors/product';
import { css } from '@emotion/react';
import media from '../../../../lib/styles/media';
import { after, font } from '../../../../lib/styles/common';

interface IProductSize {
    onClickSize: (v: string | object) => void;
}

const ProductSize: React.FunctionComponent<IProductSize> = ({
    onClickSize
}) => {

    const { product } = useSelector(selectProducts());
    const [activeSize, setActiveSize] = useState(null);

    return (
        <ul css={productSize}>
            <span className="product__head border-none">사이즈 선택</span>
            {
                product.sizes.length > 1 ?
                    product.sizes.map((v, i) => {
                        return (
                            <li
                                className={activeSize == i ? 'active' : ''}
                                key={i}
                                onClick={() => { setActiveSize(i); onClickSize(v.size) }}
                            >
                                {v.size}
                            </li>
                        )
                    })
                    :
                    <li
                        className={activeSize == 0 ? 'active' : ''}
                        key={product.id}
                        onClick={() => { setActiveSize(0); onClickSize(product.sizes[0].size) }}
                    >
                        {product.sizes[0].size}
                    </li>
            }
        </ul>
    );
};

const productSize = css`
   ${after()}
    li{
        float: left;
        width: calc(20% - 15px);
        padding: 15px 0;
        margin: 3px 2.5px;
        font: 500 15px/15px ${font.noto};
        color: #000000;
        text-transform: uppercase;
        border: 1px solid #ccc;
        border-radius: 5px;
        text-align: center;
        user-select: none;
        &:hover{
            border: 1px solid #000000;
        }
        &.active{
            position: relative;
            background: #000000;
            color: #ffffff;
        }
    }
    ${media.large} {
        width: 100%;
        min-width: unset;
        li{
            width: calc(33.3% - 15px);
        }
    }
`

export default ProductSize;