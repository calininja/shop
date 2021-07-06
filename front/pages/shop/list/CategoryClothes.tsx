import * as React from 'react';
import { connect, useSelector } from 'react-redux';
import wrapper from '../../../store/store';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { loadUser } from "../../../store/thunks/users";
import { loadCategories } from '../../../store/thunks/products';
import { loadCart } from '../../../store/thunks/orders';
import ListContainer from '../../../components/shop/list/ListContainer';
import ListTemplate from '../../../components/shop/list/ListTemplate';

const CategoryClothes: React.FunctionComponent = () => {

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
        categoryId: 1
    }
    await context.store.dispatch(loadCategories(data));
    if (state.users.me) await context.store.dispatch(loadCart(state.users.me.id));

    return {
        props: {
            pathname: "/category/CategoryClothes",
        }
    };
}
);


export default connect(state => state)(CategoryClothes);
