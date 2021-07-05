import * as React from 'react';
import { connect, useSelector } from "react-redux";
import { GetServerSideProps } from 'next';
import axios from 'axios';
import wrapper from "store/store";
import { loadUser } from "store/thunks/users";
import { loadProducts } from 'store/thunks/products';
import { selectProducts } from 'store/selectors/product';
import LatestProduct from 'components/home/LatestProduct';
import { css } from '@emotion/react';
import { backUrl } from 'config/config';

const Home: React.FunctionComponent = () => {

  const { products } = useSelector(selectProducts());

  return (
    <>
      <section css={homeContainer}>
        <img style={{ 'position': 'relative', 'top': '-50px' }} src="https://i.natgeofe.com/n/4e57f727-4dfd-4f7d-9c27-9edd6f73cfd0/miami-travel_2x1.jpg" alt="" />
        <LatestProduct item={products} />
      </section>
      {/* <div onClick={() => { axios.get(`${backUrl}/api/puppeteer`) }}>자동화 테스트 클릭</div> */}
    </>
  )
};

const homeContainer = css`
  width: 100%;
  margin: 0 auto 150px;
  img{
      width: 100%;
  }
`


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context: any) => {
  const state = await context.store.getState();
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) axios.defaults.headers.Cookie = cookie;
  if (!state.users.me) await context.store.dispatch(loadUser());
  await context.store.dispatch(loadProducts(null));
  // await axios.get(`${backUrl}/api/puppeteer`);

  return {
    props: {
      pathname: "/",
    }
  };
}
);

export default connect(state => state)(Home);
