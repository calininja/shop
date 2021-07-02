import * as React from 'react';
import Link from 'next/link';
import { backUrl } from 'config/config';
import { css } from '@emotion/react';
import { font } from 'lib/styles/common';
import media from 'lib/styles/media';

interface IViewdProducts {
    viewedProducts: any;
}

const ViewedProduct: React.FunctionComponent<IViewdProducts> = ({
    viewedProducts
}) => {

    return (
        <div css={latestProductWrapper}>
            <h3>최근 본 상품</h3>
            {viewedProducts && viewedProducts.map((v) => {
                return (
                    <Link
                        href={`/shop/detail/${v.id}`}
                        as={`/shop/detail/${v.id}`}
                        key={v.id}
                    >
                        <a>
                            <img src={`${backUrl}/${v.images[0].src}`} alt="" />
                            <p>{v.title}</p>
                        </a>
                    </Link>
                )
            })}
        </div>
    );
};

const latestProductWrapper = css`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    width: 30%;
    margin: 0 auto;
    h3{
        font: 400 28px/28px ${font.noto};
        color: #000000;
        text-align: center;
        margin-bottom: 20px;
    }
    a{
        width: calc(33.3% - 6px);
        display: inline-block;
        background: #ffffff;
        margin: 0 1px;
        border: 1px solid #000000;
        img{
            width: 100%;
        }
        p{
            font: 500 12px/12px ${font.noto};
            color: #000000;
            text-align: center;
            padding: 10px 0;
            white-space: nowrap;
        }
    }
    ${media.large} {
        width: 90%;
        position: relative;
        bottom: 0;
        left: 0;
        transform: unset;
    }
`

export default ViewedProduct;