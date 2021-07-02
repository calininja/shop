import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import wrapper from "store";
import axios from 'axios';
import { loadUser } from "thunks/users";
import AddressPopup from '../../components/order/AddressPopup';
import Coupon from 'components/order/Coupon';
import useInputs from 'lib/hooks/useInputs';
import Link from 'next/link';
import LabelInput from 'components/common/LabelInput';
import { css } from '@emotion/react';
import { font } from 'lib/styles/common';
import media from 'lib/styles/media';
import Button from 'components/common/Button';


const Order: React.FunctionComponent = () => {
    const router = useRouter()
    const { getPrice, user, point } = router.query
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
            (Number(getPrice)) - (Number(getPrice)) * Number('0.0' + couponData)
            :
            Number(getPrice)
        return result
    }

    const onClickOrder = useCallback(() => {
        if (!achieve) return alert('empty');
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
        <section css={orderContainer}>
            <h2>주문서 작성</h2>
            <LabelInput
                label="이름"
                name="name"
                value={name}
                placeholder="이름"
                onChange={onChange}
                type="text"
            />
            <LabelInput
                label="휴대폰"
                name="phone"
                value={phone}
                onChange={onChange}
                placeholder="'-'는 제외하여 작성 해주세요."
                type="text"
                required
            />
            <LabelInput
                label="이메일"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="이메일 주소"
                type="text"
                id="email"
                required
            />
            <div>
                <AddressPopup
                    findAddress={findAddress}
                    onChange={onChange}
                    addressState={addressState}
                />
            </div>
            <div className="order__get-price">
                <div className="order__coupon-box">
                    <button>
                        보유한 쿠폰 <em>{couponList.length}</em> 장
                    </button>
                    <Coupon
                        getCoupon={getCoupon}
                        couponList={couponList}
                    />
                </div>
                <div className="order__point">
                    <span>지급 포인트액: </span><em>{Number(point)}</em>
                </div>
                <div className="order__total-price">
                    {
                        <ul>
                            <li>
                                <div>원가: </div>
                                <span>{Number(getPrice).toLocaleString()}</span><div> 원</div>
                            </li><br />
                            <li>
                                <div>할인 금액: </div>
                                <span className="discount">{couponData > 1 ? (Number(getPrice) - calcPrice()).toLocaleString() : 0}</span><div> 원</div>
                            </li><br />
                            <li>
                                <div>총 주문 금액: </div>
                                <em>{calcPrice().toLocaleString()}</em><div> 원</div>
                            </li>
                        </ul>
                    }
                </div>
            </div>
            <Link
                href={{
                    pathname: `${achieve == true ? '/order/CompleteOrder' : ''}`,
                    query: {
                        user,
                        name,
                        getPrice,
                        point
                    }
                }}
            >
                <a>
                    <Button onClick={onClickOrder}>결제하기</Button>
                </a>
            </Link>
        </section>
    );
};

const orderContainer = css`
    max-width: 410px;
    margin: 3rem auto 0 auto;
    h2{
        text-align: center;
        font: 500 28px/28px ${font.noto};
        color: #111111;
        margin-bottom: 50px;
    }
    .label-input__block{
        margin: 5px 0;
        >label, >input{
            display: inline-block;
        }
        >label{
            font: 300 13px/13px ${font.noto};
        color: #111111;
            width: 20%;
        }
        >input{
            width: 80%;
        }
    }
    >div{
        .table{
            display: inline-block;
            width: 20%;
            height: 100%;
        }
        button{
            border: 0;
            padding: 10px 10px;
            border-radius: 1px;
            font: 400 13px/13px "Noto Sans KR";
            color: #111111;
            vertical-align: middle;
        }
    }

    .order__get-price{
        >div{
            >em{
                font: 300 12px/12px ${font.noto};
                color: #06c;
            }
        }
        .order__coupon-box{
            height: auto;
            min-height: 160px;
            margin: 20px 0;
            button{
                background: none;
                width: 100%;
                text-align: left;
                border: 1px solid #cccccc;
                padding: 0 20px;
                font: 400 13px/40px ${font.noto};
                color: #111111;
            }
        }
        .order__total-price{
            ul{
                li{
                    position: relative;
                    display: inline-block;
                    min-width: 400px;
                    text-align: right;
                    min-height: 25px;
                    >div{
                        position: absolute;
                        bottom: 0;
                    }
                    >div:not(:last-child){
                        left: 0;
                        font: 400 13px/13px ${font.noto};
                        color: #111111;
                    }
                    span, em{
                        display: inline-block;
                        position: absolute;
                        right: 25px;
                        bottom: 0;
                        font: 500 16px/16px ${font.noto};
                        color: #111111;
                        letter-spacing: 0.3px;
                    }
                    span{
                    }
                    em{
                        color: #06c;   
                    }
                    >div:not(:first-child){
                        right: 0;
                    }
                    ${media.large} {
                        min-width: unset;
                        width: 100%;
                    }
                }
            }
        }
        .order__point{
            text-align: left;
            padding: 15px 0;
            border-top: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
            span{
                font: 400 13px/13px ${font.noto};
                color: #111111;
            }
        }
        .coupon-popup__container{
            padding: 15px 0;
            overflow-y: auto;
            height: 100px;
            .coupon-item{
                line-height: 28px;
                input{
                    vertical-align: middle;
                }
                label{
                    font: 400 13px/13px ${font.noto};
                    color: #111111;
                    margin-left: 3px;
                    span, em{
                        z-index: -1;
                    }
                }
            }
            &.coupon-popup__container::-webkit-scrollbar {
                width: 2px;
            }
            &.coupon-popup__container::-webkit-scrollbar-thumb {
                background: #cccccc;
            }
            &.coupon-popup__container::-webkit-scrollbar-track {
                background: #ffffff;
            }
        }
        ${media.large} {
            .order__coupon-box{
                button{
                    width: 100%;
                }
            }   
        }
    }
    .custom-button{
        display: block;
        margin: 50px 0 50px auto;
    }
    ${media.large} {
        padding: 1rem;
    }
`

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context: any) => {
    const state = await context.store.getState();
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) axios.defaults.headers.Cookie = cookie;
    if (!state.users.me) await context.store.dispatch(loadUser());
    return {
        props: {
            pathname: "/Order",
        }
    };
});

export default Order;