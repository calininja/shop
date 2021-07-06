import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../store/selectors/order';
import ProgressBar from '../common/ProgressBar';
import Link from 'next/link';
import { font } from '../../lib/styles/common';
import { css } from '@emotion/react';

interface IOrdersProps {
    popData: any;
}

const CartPopup: React.FunctionComponent<IOrdersProps> = ({ popData }) => {

    const [progress, setProgress] = useState(0);
    const { isAddingCart } = useSelector(selectOrders());
    const popupRef: React.MutableRefObject<HTMLInputElement> = useRef(null);

    useEffect(() => {
        const ref = popupRef.current.classList;
        if (isAddingCart == true) {
            setProgress(0);
            ref.add('activated');
        }
        const timer = setInterval(() => {
            ref.contains('activated') && setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
            progress == 100 ? ref.remove('activated') : '';
        };
    }, [isAddingCart, progress]);

    return (
        <div css={cartPopupWrapper} ref={popupRef}>
            <div className="item">
                <div>사이즈: <span>{popData?.size.toUpperCase()}</span></div>
                <div>색상: <span className="color" style={{ 'background': popData?.color }}></span></div>
                <div>수량: <span>{popData?.quantity}</span></div>
            </div>
            <Link
                href={'/cart'}
                as={`/cart`}
            ><a className="move-to-cart">장바구니 이동</a>
            </Link>
            <ProgressBar progress={progress} />
        </div>
    );
};

const cartPopupWrapper = css`
    display: none;
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 150px;
    height: auto;
    background: #ffffff;
    border: 1px solid #cccccc;
    padding: 20px;
    z-index: 2;
    @keyframes fade-in-right {
        from {
            opacity: 0;
            right: -50%;
        }
        to {
            opacity: 1;
            right: 0%;
        }
    }
    &.activated{
        display: block;
        animation: fade-in-right 0.5s;
        animation-fill-mode: forwards;
    }
    .item{
        padding: 0 0 8px 0;
        div{
            font: 400 14px/14px ${font.noto};
            color: #111111;
            margin: 10px 0;
        }
        span.color{
            display: inline-block;
            width: 15px;
            height: 15px;
            vertical-align: middle;
        }
    }
    .move-to-cart{
        display: inline-block;
        font: 400 14px/35px ${font.noto};
        height: 35px;
        color: #ffffff;
        border: 1px solid #111111;
        padding: 0 20px;
        background: #111111;
    }
`

export default CartPopup;