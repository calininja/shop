import * as React from 'react';
import { useEffect } from 'react';
import { connect, useSelector } from "react-redux";
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import wrapper from "store";
import { loadUser } from "thunks/users";
import { loadCart, updateNonmemberCart } from 'thunks/orders';
import { deleteCartItemsAll } from 'thunks/orders';
import { useDispatch } from 'react-redux';
import { selectOrders } from 'selectors/order';
import { selectUsers } from 'selectors/user';

const CompleteOrder: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const { getPrice, name } = router.query
  const { me } = useSelector(selectUsers());
  const { orders } = useSelector(selectOrders());

  useEffect(() => {
    if (me && orders.length >= 1) {
      dispatch(deleteCartItemsAll());
      dispatch(loadCart(me.id));
      return
    }
    sessionStorage.removeItem("entry");
    sessionStorage.removeItem("allEntries");
    dispatch(updateNonmemberCart([]))
  }, [orders])

  return (
    <section className="complete-order__container">
      <div className="complete-order__wrapper">
        <h2>주문이 정상적으로 완료 되었습니다.</h2>
        <p>주문번호: 125399</p>
        <span>주문자: {name}</span>
        <em>총 주문 금액: <b>{Number(getPrice).toLocaleString()}</b> 원</em>
      </div>
    </section>
  )
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context: any) => {
  const state = await context.store.getState();
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) axios.defaults.headers.Cookie = cookie;
  if (!state.users.me) await context.store.dispatch(loadUser());
  if (state.users.me) await context.store.dispatch(loadCart(state.users.me.id));

  return {
    props: {
      pathname: "/CompleteOrder",
    }
  };
}
);

export default connect(state => state)(CompleteOrder);
