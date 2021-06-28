import * as React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import wrapper from 'store';
import { useRouter } from 'next/router';
import { connect, useDispatch, useSelector } from 'react-redux';
import { selectProducts } from 'selectors/product';
import { loadProduct, loadProducts, loadReviews } from 'thunks/products';
import { loadUser } from "thunks/users";
import DetailContainer from '../../../components/shop/Detail/DetailContainer';
import { selectOrders } from 'selectors/order';

const detail: React.FunctionComponent = ({ }) => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { id }: any = router.query;
  const { product } = useSelector(selectProducts());
  const { isLoadingCart } = useSelector(selectOrders());

  useEffect(() => {
    dispatch(loadReviews(obj));
  }, [isLoadingCart])

  const obj = {
    id: product?.id,
    offset: null
  }

  return (
    <div>
      {
        product ?
          <DetailContainer obj={obj} /> : ''
      }
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context: any) => {
  const state = await context.store.getState();
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) axios.defaults.headers.Cookie = cookie;

  const { id } = context.params;
  if (!state.users.me) await context.store.dispatch(loadUser());
  await context.store.dispatch(loadProduct(id));
  await context.store.dispatch(loadProducts(null));

  return {
    props: {
      pathname: "/shop/detail",
    }
  };
}
);

export default connect(state => state)(detail);