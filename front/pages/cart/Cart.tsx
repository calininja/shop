import * as React from 'react';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrders } from 'selectors/order';
import { GetServerSideProps } from 'next';
import { selectUsers } from 'selectors/user';
import { loadUser } from "thunks/users";
import { deleteCartItem } from 'thunks/orders';
import wrapper from "store";
import axios from 'axios';
import Link from 'next/link';
import CartContainer from 'components/cart/CartContainer';
import Button from 'components/common/Button';

const Cart: React.FunctionComponent = () => {

    const dispatch = useDispatch();
    const { me } = useSelector(selectUsers());
    const { orders } = useSelector(selectOrders());
    const [itemCheck, setItemCheck] = useState([]);

    const amount = useCallback(() => {
        const arr = [];
        orders.forEach((v, i) => {
            if (itemCheck.includes(v.id)) arr.push(v.products.price * v.quantity);
        })
        const result = arr.length > 0 && arr.reduce((acc, cur, i) => acc + cur);
        return arr.length > 0 ? result + 3000 : 0;
    }, [orders, itemCheck]);

    const removeItem = useCallback((val) => {
        dispatch(deleteCartItem(val));
    }, [me]);

    const handleAllCheck = useCallback((checked) => {
        if (checked) {
            const idArray = [];
            orders.forEach((el) => idArray.push(el.id));
            setItemCheck(idArray);
            return
        } else {
            setItemCheck([]);
        }
    }, [itemCheck, orders]);

    const handleSingleCheck = useCallback((checked, id) => {
        if (checked) {
            setItemCheck([...itemCheck, id]);
        } else {
            setItemCheck(itemCheck.filter((el) => el !== id));
        }
    }, [itemCheck]);

    return (
        <section className="cart__container">
            <div className="cart__head">
                <h2>장바구니</h2>
                <span>{orders.length}개 상품</span>
            </div>
            <div className="cart__main">
                {orders.length >= 1 &&
                    <CartContainer
                        orders={orders}
                        removeItem={removeItem}
                        handleAllCheck={handleAllCheck}
                        handleSingleCheck={handleSingleCheck}
                        itemCheck={itemCheck}
                    />
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
        </section>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context: any) => {
    const state = await context.store.getState();
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) axios.defaults.headers.Cookie = cookie;
    if (!state.users.me) await context.store.dispatch(loadUser());

    return {
        props: {
            pathname: "/Cart",
        }
    };
});

export default Cart;