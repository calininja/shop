import * as React from 'react';
import Link from 'next/link';
import Button from '../../components/common/Button';
import { backUrl } from '../../config/config';
import { css } from '@emotion/react';
import { after, font } from 'lib/styles/common';
import media from '../../lib/styles/media';

interface ICartPresenterProps {
    me: any;
    orders: any;
    amount: () => number;
    removeItem: (val: string) => void;
    handleAllCheck: (e) => void;
    handleSingleCheck: (checked: boolean, id: number) => void;
    itemCheck: number[];
}

const CartPresenter: React.FunctionComponent<ICartPresenterProps> = ({
    me,
    orders,
    amount,
    removeItem,
    handleAllCheck,
    handleSingleCheck,
    itemCheck,
}) => {

    return (
        <div css={CartPresenterWrapper}>
            <h3>{orders.length}개 상품</h3>
            <div className="cart__main">
                <div className="cart__check-all">
                    <input type="checkbox" name="group" id="checkAll"
                        checked={
                            itemCheck.length === orders.length
                                ? true
                                : false
                        }
                        onChange={(e) => { handleAllCheck(e.target.checked) }}
                    />
                    <label htmlFor="checkAll">전체 선택</label>
                </div>
                {
                    orders.map((v, i) => {
                        const id = v.products.id;
                        return (
                            <div key={i} className="cart__item">
                                <input type="checkbox" name="item" className="item"
                                    checked={itemCheck.includes(v.id) ? true : false}
                                    onChange={(e) => { handleSingleCheck(e.target.checked, v.id) }}
                                />
                                <div className="cart__item__inner">
                                    <Link
                                        href={'/shop/detail/[id]'}
                                        as={`/shop/detail/${id}`}
                                    >
                                        <a>
                                            <img src={`${backUrl}/${v.images.src}`} alt="" className="cart-image" />
                                        </a>
                                    </Link>
                                    <div className="cart__item__title"><h3>{v.products.title}</h3></div>
                                    <div>상품 번호: {v.products.id}</div>
                                    <div>사이즈: {v.size.toUpperCase()}</div>
                                    <div>색상: <span className="color" style={{ background: v.color }}></span></div>
                                    <div>수량: {v.quantity}</div>
                                    <div>가격: {v.products.price.toLocaleString()} 원</div>
                                </div>
                                <div className="cart-delete" onClick={() => { removeItem(v.id) }}>삭제</div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="cart__side">
                <h3>결제 예정 금액</h3>
                <div className="cart__side__body">
                    <div className="shipping-cost">배송비: <span><em>3,000</em> 원</span></div>
                    <div className="shipping-cost">상품 할인 금액: <span><em>0</em> 원</span></div>
                    <div className="shipping-cost total-price">총 주문 금액: <span><em>{amount().toLocaleString()}</em> 원</span></div>
                    <div className="shipping-cost point">예상 포인트액: <span><em>{Number((amount()) * 0.05)} (5%)</em></span></div>
                    <Link
                        href={{
                            pathname: itemCheck.length >= 1 ? '/order' : '',
                            query: itemCheck.length >= 1 ? {
                                user: me ? me.signinId : 'anonymous',
                                price: amount(),
                                point: Math.ceil((amount()) * 0.05)
                            } : ''
                        }}
                    >
                        <Button type="submit" className='custom-button'>
                            <a>
                                주문하기
                            </a>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
};

const CartPresenterWrapper = css`
    >h3{
        font: 400 14px/14px ${font.noto};
        color: #999;
        text-align: center
    }
    ${after()}
    .cart__main{
        width: 70%;
        margin: 0 auto;
        float: left;
        .cart__check-all{
            border-top: 1px solid #e5e5e5;
            margin: 30px 5px 0 0;
            padding: 20px 30px 10px;
            input{
                margin-right: 5px;
            }
            label{
                font: 400 14px/14px ${font.noto};
                color: #111111;
            }
        }
        .cart__item{
            font: 400 14px/14px ${font.noto};
            color: #111111;
            border-top: 1px solid #e5e5e5;
            padding: 18px 30px;
            margin: 10px 0;
            ${after()}
            .cart__item__inner{
                float: left;
                width: 100%;
                ${after()}
                .cart-image{
                    float: right;
                    width: 100px;
                    border: 1px solid #e5e5e5;
                    z-index: 2;
                }
                .cart__item__title{
                    h3{
                        font: 500 16px/16px ${font.noto};
                        margin: 10px 0 15px;
                    }
                }
                >div:not(.cart__item__title){
                    padding: 5px 0;
                    font: 400 14px/14px ${font.noto};
                    span.color{
                        display: inline-block;
                        width: 15px;
                        height: 15px;
                        vertical-align: middle;
                    }
                }
            }
        }
        .cart-delete{
            float: right;
            cursor: pointer;
            font: 300 16px/16px ${font.noto};
            color: #111111;
            margin: 5px 0;
        }
        ${media.large} {
            width: 100%;
            min-width: unset;
            float: none;
            .cart__item{
                .cart__item__inner{
                    .cart-image{
                        float: unset;
                    }
                }
            }
        }
    }
    .cart__side{
        float: right;
        position: relative;
        top: 27px;
        width: calc(30% - 32px);
        margin: 0 auto;
        margin-left: 30px;
        border: 1px solid #e5e5e5;
        white-space: pre-wrap;
        h3{
            font: 500 16px/16px ${font.noto};
            color: #111111;
            background-color: #e5e5e5;
            padding: 20px 15px;
        }
        .cart__side__body{
            padding: 20px;
            ${after()}
            .shipping-cost{
                display: block;
                font: 400 14px/14px ${font.noto};
                color: #111111;
                margin: 0 0 20px 0;
                span{
                    float: right;
                    em{
                        display: inline-block;
                        font: 500 13px/13px ${font.noto};
                    }
                }
                &.total-price{
                    margin: 20px 0;
                    span{
                        em{
                            font: 500 20px/20px ${font.noto};
                        }
                    }
                }
                &.point{
                    span{
                        em{
                            font: 400 15px/15px ${font.noto};
                            color: #06c;
                        }
                    }
                }
            }
            .custom-button{
                width: 100%;
                height: 50px;
                margin: 25px 0;
                background-color: plum;
                border:0;
                border-radius: 0;
                a{
                    color: #ffffff;
                    letter-spacing: 2px;
                }
                &:hover{
                    background-color: rgb(220, 150, 220);
                }
            }
        }
        ${media.large} {
            width: 100%;
            top: 5%;
            left: 0;
            margin-left: 0;
        }
    }
`


export default CartPresenter;
