import * as React from 'react';
import { useEffect, useRef } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import wrapper from 'store';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import ListContainer from '../../../components/shop/ListContainer';
import { loadUser } from "thunks/users";
import { loadCategories } from 'thunks/products';
import { selectProducts } from 'selectors/product';
import { loadCart } from 'thunks/orders';

const CategoryAccessories: React.FunctionComponent = () => {

    const dispatch = useDispatch();
    const countRef = useRef([]);
    const { products, hasMoreProduct, isLoadingPost } = useSelector(selectProducts());

    useEffect(() => {
        function onScroll() {
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMoreProduct && !isLoadingPost) {
                    const data = {
                        lastId: products[products.length - 1]?.id,
                        categoryId: 3
                    }
                    const lastId = products[products.length - 1]?.id;
                    if (!countRef.current.includes(data.lastId)) {
                        dispatch(loadCategories(data));
                    }
                    countRef.current.push(lastId);
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMoreProduct, isLoadingPost, products]);

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
