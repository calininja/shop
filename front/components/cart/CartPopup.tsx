import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectOrders } from 'selectors/order';
import ProgressBar from '../common/ProgressBar';
import Link from 'next/link';

interface IOrdersProps {
    popData: any;
}

const CartPopup: React.FunctionComponent<IOrdersProps> = ({ popData }) => {

    const [progress, setProgress] = useState(0);
    const { isAddingCart } = useSelector(selectOrders());
    const popupRef: React.MutableRefObject<HTMLInputElement> = useRef(null);

    // 프로그레스바
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
        <section className="cart-popup__container" ref={popupRef}>
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
        </section>
    );
};

export default CartPopup;