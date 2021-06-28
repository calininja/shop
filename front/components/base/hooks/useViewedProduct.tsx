import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from 'selectors/product';
import { addViewedProducts } from 'thunks/products';
// import { addViewedProducts } from 'slices/products';

export default function useViewedProduct () {
    const dispatch = useDispatch();
    const { product } = useSelector(selectProducts());
    const [getSession, setGetSession] = useState(false);

    // 최근 본 상품
    useEffect(() => {
        const pagePropsValue = location.pathname;
        let existingItems = JSON.parse(sessionStorage.getItem("AllItemsIHaveSeen"));
        if (existingItems == null) existingItems = [];
        if (existingItems.length >= 4) existingItems.shift();

        // 페이지 이니셜라이징
        if (getSession == false) {
            setGetSession(true);
            dispatch(addViewedProducts(existingItems))
            setGetSession(false);
        };
        // 세션 저장 
        if (
            pagePropsValue.includes('/shop/detail') &&
            !JSON.stringify(existingItems).includes(JSON.stringify(product))
        ) {
            sessionStorage.setItem('AnItemIHaveSeen', JSON.stringify(product));
            if (product != null) {
                existingItems.push(product);
                sessionStorage.setItem("AllItemsIHaveSeen", JSON.stringify(existingItems));
                setGetSession(true);
                return;
            };
        };
        if (getSession) {
            dispatch(addViewedProducts(existingItems));
            setGetSession(false);
        };

    }, [getSession, product]);
};
