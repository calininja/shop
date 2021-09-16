import * as React from 'react';
import { useState, useCallback } from 'react';

interface ICouponProps {
    getCoupon: (data: any) => void;
    couponList: any;
}

const CouponContainer: React.FunctionComponent<ICouponProps> = ({
    getCoupon,
    couponList
}) => {

    const [couponId, setCouponId] = useState(0);
    const [guard, setGuard] = useState(0);

    const onClickInputToggle = useCallback((id) => {
        if (guard == id) {
            setGuard(0);
            setCouponId(0);
            return true;
        }
        setGuard(id);
        setCouponId(id);
    }, [couponId])

    return (
        <section className="coupon-popup__container">
            {couponList.map((v, i) => {
                return (
                    <div key={i} className='coupon-item'>
                        <input
                            type="checkbox"
                            id={`coupon${v.id}`}
                            checked={couponId == v.id ? true : false}
                            onClick={() => { onClickInputToggle(v.id); getCoupon(v.coupon); }} />
                        <label htmlFor={`coupon${v.id}`}><span>{v.name} </span><em>{v.coupon}</em>%</label>
                    </div>
                )
            })}
        </section>
    );
};

export default CouponContainer;