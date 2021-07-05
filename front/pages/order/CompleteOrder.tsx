import * as React from 'react';
import { useEffect } from 'react';
import { connect, useSelector } from "react-redux";
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import wrapper from "store/store";
import { loadUser } from "store/thunks/users";
import { loadCart } from 'store/thunks/orders';
import { deleteCartItemsAll } from 'store/thunks/orders';
import { useDispatch } from 'react-redux';
import { selectOrders } from 'store/selectors/order';
import { selectUsers } from 'store/selectors/user';
import { css } from '@emotion/react';
import media from 'lib/styles/media';
import { font } from 'lib/styles/common';

const CompleteOrder: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const { price, name } = router.query
  const { me } = useSelector(selectUsers());
  const { orders } = useSelector(selectOrders());

  useEffect(() => {
    if (me && orders.length >= 1) {
      dispatch(deleteCartItemsAll());
      dispatch(loadCart(me.id));
      return
    }
  }, [orders])

  return (
    <section css={completeOrderContainer}>
      <div className="complete-order__wrapper">
        <h2>주문이 정상적으로 완료 되었습니다.</h2>
        <p>주문번호: {Math.floor(Math.random() * (50000 - 10000))}</p>
        <span>주문자: {name}</span>
        <em>총 주문 금액: <b>{Number(price).toLocaleString()}</b> 원</em>
      </div>
    </section>
  )
};

const completeOrderContainer = css`
  .complete-order__wrapper{
    width: 40%;
    margin: 0 auto;
    text-align: left;
    padding: 200px 0;
    white-space: pre-wrap;
    h2, p, span, em{
        color: #000000;
        display: block;
    }
    p, span{
        margin: 20px 0;
    }
    h2{
        font: 700 50px/65px ${font.noto};
        margin-bottom: 50px;
    }
    p{
        font: 400 16px/16px ${font.noto};
    }
    span{
        font: 400 16px/16px ${font.noto};
    }
    em{
        font: 400 16px/16px ${font.noto};
        b{
            font: 500 23px/23px ${font.noto};
        }
    }
    ${media.large} {
        width: 100%;
        padding: 2rem 1rem 5rem 1rem;
    }
  }
`

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
