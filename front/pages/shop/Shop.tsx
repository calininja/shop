import * as React from 'react';
import { connect } from 'react-redux';
import wrapper from 'store';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { loadUser } from "thunks/users";
import { loadCart } from 'thunks/orders';

const Shop: React.FunctionComponent = () => {

    return (
        <section className="shop__container">
            <div className="img__wrapper scroll">
                <img src="https://images.unsplash.com/photo-1523380677598-64d85d015339?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80" alt="" />
            </div>
        </section >
    );
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
            pathname: "/Shop",
        }
    };
});


export default connect(state => state)(Shop);
