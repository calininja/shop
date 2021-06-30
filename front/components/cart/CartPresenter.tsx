import * as React from 'react';
import Link from 'next/link';
import Button from 'components/common/Button';
import { backUrl } from '../../config/config';

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
        <>
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
                                getPrice: amount(),
                                point: Math.ceil((amount()) * 0.05)
                            } : ''
                        }}
                    >
                        <Button type="submit">
                            <a>
                                주문하기
                            </a>
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
};


export default CartPresenter;
