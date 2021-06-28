import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCart } from 'thunks';
import { selectUsers } from 'selectors/user';
import { selectOrders } from 'selectors/order';

const useCartLoader = () => {
    const dispatch = useDispatch();
    const { me } = useSelector(selectUsers());
    const { isAddingCart, isDeletingCart } = useSelector(selectOrders());

    // 전역 카트 로드 및 DB 카트 저장/삭제 후 리로드
    useEffect(() => {
        if (me) {
            dispatch(loadCart(me.id));
        } else if (me && isAddingCart == false && isDeletingCart == false) dispatch(loadCart(me.id));
    }, [me, isAddingCart, isDeletingCart]);

};

export default useCartLoader;