import * as React from 'react';
import { css } from '@emotion/react';
import media from '../../lib/styles/media';
import { font } from '../../lib/styles/common';

interface ICartTemplateProps {
}

const CartTemplate: React.FunctionComponent<ICartTemplateProps> = ({
    children
}) => {
    return (
        <>
            <section css={CartTemplateContainer}>
                <div className="cart__head">
                    <h2>장바구니</h2>
                </div>
                {children}
            </section>
        </>
    )
};

const CartTemplateContainer = css`
    width: 100%;
    margin: 0 auto 150px;
    .cart__head{
        text-align: center;
        margin: 30px 0;
        h2{
            font: 500 28px/28px ${font.noto};
            color: #111111;
            margin-bottom: 20px;
            text-align: center;
        }
    }
    ${media.large} {
        padding: 0.5rem
    }
`


export default CartTemplate;
