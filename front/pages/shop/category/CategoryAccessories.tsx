import * as React from 'react';
import { connect, useSelector } from 'react-redux';
import wrapper from 'store';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { loadUser } from "thunks/users";
import { loadCategories } from 'thunks/products';
import { loadCart } from 'thunks/orders';
import ListContainer from '../../../components/shop/ListContainer';
import ListTemplate from '../../../components/shop/ListTemplate';

const CategoryAccessories: React.FunctionComponent = () => {

    return (
        <ListTemplate>
            <ListContainer />
        </ListTemplate>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context: any) => {
    const state = await context.store.getState();
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) axios.defaults.headers.Cookie = cookie;
    if (!state.users.me) await context.store.dispatch(loadUser());
    const data = {
        lastId: 0,
        categoryId: 3
    }
    await context.store.dispatch(loadCategories(data));
    if (state.users.me) await context.store.dispatch(loadCart(state.users.me.id));

    return {
        props: {
            pathname: "/category/CategoryAccessories",
        }
    };
}
);


export default connect(state => state)(CategoryAccessories);
