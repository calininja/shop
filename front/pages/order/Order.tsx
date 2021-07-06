import * as React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import wrapper from '../../store/store';
import { loadUser } from '../../store/thunks/users';
import OrderTemplate from '../../components/order/OrderTemplate';
import OrderContainer from '../../components/order/OrderContainer';

const Order: React.FunctionComponent = () => {
    const router = useRouter()
    const { price, user, point } = router.query

    return (
        <OrderTemplate>
            <OrderContainer
                user={user}
                price={price}
                point={point}
            />
        </OrderTemplate>
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
            pathname: "/Order",
        }
    };
});

export default Order;