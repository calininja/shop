import useInputs from 'lib/hooks/useInputs';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import OrderPresenter from './OrderPresenter';

export interface IOrderTemplate {
    user: string | string[];
    price: string | string[];
    point: string | string[];
}

const OrderContainer: React.FunctionComponent<IOrderTemplate> = ({
    price,
    user,
    point
}) => {

    const [value, onChange] = useInputs({
        name: '',
        phone: '',
        email: '',
        address: '',
        zipcode: '',
        detailAddress: ''
    })
    const { name, phone, email, detailAddress } = value;
    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [achieve, setAchieve] = useState(false);
    const [couponData, setCouponData] = useState(0);

    useEffect(() => {
        const valid = Object.entries(addressState).map((v) => v[1]).includes('');
        if (valid) {
            setAchieve(false);
        } else {
            setAchieve(true);
        }
    }, [name, phone, email, zipcode, address, detailAddress])

    const findAddress = useCallback((val1, val2) => {
        setAddress(val1);
        setZipcode(val2);
    }, [address, zipcode])

    const getCoupon = useCallback((data) => {
        if (couponData == data) return setCouponData(0);
        setCouponData(data);
    }, [couponData])

    function calcPrice() {
        const result = couponData > 1 ?
            (Number(price)) - (Number(price)) * Number('0.0' + couponData)
            :
            Number(price)
        return result
    }

    const onOrder = useCallback(() => {
        if (!achieve) {
            toast.error('장바구니가 비어 있습니다.');
            return;
        }
    }, [achieve])


    const addressState = {
        name, phone, zipcode, address, detailAddress
    }

    const couponList = [
        {
            id: 1,
            name: '10주년 감사 쿠폰',
            coupon: '5'
        },
        {
            id: 2,
            name: '설날 특별 할인 쿠폰',
            coupon: '7'
        },
        {
            id: 3,
            name: '할인 쿠폰',
            coupon: '3'
        },
    ]

    return (
        <OrderPresenter
            price={price}
            user={user}
            point={point}

            achieve={achieve}
            addressState={addressState}
            couponList={couponList}
            couponData={couponData}
            value={value}
            findAddress={findAddress}
            getCoupon={getCoupon}
            calcPrice={calcPrice}
            onOrder={onOrder}
            onChange={onChange}
        />
    );
};

export default OrderContainer;