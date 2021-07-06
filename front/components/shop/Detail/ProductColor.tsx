import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../store/selectors/product';
import Link from 'next/link';
import { css } from '@emotion/react';
import media from '../../../lib/styles/media';
import { after, font } from '../../../lib/styles/common';

interface IProductColorProps {
    products: any;
    onClickColor: (v: string | object) => void;
}

const ProductColor: React.FunctionComponent<IProductColorProps> = ({
    products,
    onClickColor
}) => {

    const { product } = useSelector(selectProducts());
    const [activeColor, setActiveColor] = useState(null);

    return (
        <>
            <ul css={productColor}>
                <span className="product__head border-none">컬러</span>
                {
                    products.length > 1 && products.filter((v, i) => {
                        return v.title == product.title;
                    }).map((v, i) => {
                        const id = v?.id;
                        return (
                            <Link
                                href={'/shop/detail/[id]'}
                                as={`/shop/detail/${id}`}
                                key={id}
                            >
                                <a>
                                    <li
                                        style={{ "background": v.colors[0].color }}
                                        className={activeColor == i ? 'active' : ''}
                                        key={i}
                                        onClick={() => { setActiveColor(i); onClickColor(v.colors[0].color) }}
                                    >
                                    </li>
                                </a>
                            </Link>
                        )
                    }).reverse()
                }
            </ul>
        </>
    );
};

const productColor = css`
    ${after()}
    min-width: 350px;
    li{
        float: left;
        width: calc(15% - 15px);
        padding: 10px 0;
        margin: 0 2.5px;
        color: #000000;
        text-transform: uppercase;
        border: 1px solid #ffffff;
        text-indent: -9999px;
        &:nth-child(4){
            clear: both;
        }
        &:hover{
            border: 1px solid #000000;
        }
        &.active{
            position: relative;
            border: 1px solid #000000;
            ${after(
    `position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                border-bottom: 2px solid #000000;
                box-sizing: border;`
)}
        }
        ${media.large}{
            width: calc(20% - 15px);
        }
    }
`

export default ProductColor;