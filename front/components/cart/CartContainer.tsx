import * as React from 'react';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrders } from 'store/selectors/order';
import { selectUsers } from 'store/selectors/user';
import { deleteCartItem } from 'store/thunks';
import CartPresenter from './CartPresenter';

interface ICartContainerProps {
}

const CartContainer: React.FunctionComponent<ICartContainerProps> = ({
}) => {

    const dispatch = useDispatch();
    const { me } = useSelector(selectUsers());
    const { orders } = useSelector(selectOrders());
    const [itemCheck, setItemCheck] = useState([]);

    const amount = useCallback(() => {
        const arr = [];
        orders.forEach((v, i) => {
            if (itemCheck.includes(v.id)) arr.push(v.products.price * v.quantity);
        })
        const result = arr.length > 0 && arr.reduce((acc, cur, i) => acc + cur);
        return arr.length > 0 ? result + 3000 : 0;
    }, [orders, itemCheck]);

    const removeItem = useCallback((val) => {
        dispatch(deleteCartItem(val));
    }, [me]);

    const handleAllCheck = useCallback((checked) => {
        if (checked) {
            const idArray = [];
            orders.forEach((el) => idArray.push(el.id));
            setItemCheck(idArray);
            return
        } else {
            setItemCheck([]);
        }
    }, [itemCheck, orders]);

    const handleSingleCheck = useCallback((checked, id) => {
        if (checked) {
            setItemCheck([...itemCheck, id]);
        } else {
            setItemCheck(itemCheck.filter((el) => el !== id));
        }
    }, [itemCheck]);

    return (
        <>
            <CartPresenter
                me={me}
                orders={orders}
                amount={amount}
                removeItem={removeItem}
                handleAllCheck={handleAllCheck}
                handleSingleCheck={handleSingleCheck}
                itemCheck={itemCheck}
            />
        </>
    )
};


export default CartContainer;
