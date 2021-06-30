import * as React from 'react';
import { GetServerSideProps } from 'next';
import { loadUser } from "thunks/users";
import wrapper from "store";
import axios from 'axios';
import CartTemplate from 'components/cart/CartTemplate';
import CartContainer from 'components/cart/CartContainer';

const Cart: React.FunctionComponent = () => {

    return (
        <CartTemplate>
            <CartContainer />
        </CartTemplate>
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