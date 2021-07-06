import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts } from '../../../store/selectors/product';
import { loadProducts } from '../../../store/thunks';


export default function useInfiniteScroll() {
    const dispatch = useDispatch();
    const countRef = useRef([]);
    const { products, hasMoreProduct, isLoadingPost } = useSelector(selectProducts());

    useEffect(() => {
        function onScroll() {
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMoreProduct && !isLoadingPost) {
                    const lastId = products[products.length - 1]?.id;
                    if (!countRef.current.includes(lastId)) {
                        dispatch(loadProducts(lastId));
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
}
