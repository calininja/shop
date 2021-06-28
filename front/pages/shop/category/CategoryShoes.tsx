import * as React from 'react';
import { connect, useSelector } from 'react-redux';
import wrapper from 'store';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import ListContainer from '../../../components/shop/ListContainer';
import { loadUser } from "thunks/users";
import { loadCategories } from 'thunks/products';
import { selectProducts } from 'selectors/product';
import { loadCart } from 'thunks/orders';

const CategoryShoes: React.FunctionComponent = () => {

    const { products } = useSelector(selectProducts());

    return (
        <section className="shop__container">
            <div className="shop__wrapper">
                {
                    products.map((v, i) => {
                        return (
                            <div className="wrap" key={v.id}>
                                <ListContainer post={v} posts={products} />
                            </div>
                        )
                    })
                }
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
    const data = {
        lastId: 0,
        categoryId: 2
    }
    await context.store.dispatch(loadCategories(data));
    if (state.users.me) await context.store.dispatch(loadCart(state.users.me.id));

    return {
        props: {
            pathname: "/category/CategoryShoes",
        }
    };
}
);


export default connect(state => state)(CategoryShoes);
