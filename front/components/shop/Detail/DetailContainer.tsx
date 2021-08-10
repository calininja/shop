import * as React from 'react';
import { useEffect, useCallback, memo } from 'react';
import { useState } from 'react';
import { selectProducts } from '../../../store/selectors/product';
import { useSelector, useDispatch } from 'react-redux';
import { addCartItem } from '../../../store/thunks/orders';
import { selectUsers } from '../../../store/selectors/user';
import { selectOrders } from '../../../store/selectors/order';
import DetailPresenter from '../../../components/shop/detail/DetailPresenter';
import useReviewLoader from '../../../components/base/hooks/useReviewLoader';
import useToggle from '../../../lib/hooks/useToggle';
import { toast } from 'react-toastify';
import { loadReviews } from '../../../store/thunks';

const DetailContainer: React.FunctionComponent = ({
}) => {

    // console.log('디테일 컨테이너 렌더링')
    // useEffect(() => {
    //     console.log('디테일 컨테이너 리렌더링')
    // }, [])

    const dispatch = useDispatch();
    const { me } = useSelector(selectUsers());
    const { product, products, reviews, allReviews, viewedProducts } = useSelector(selectProducts());
    const { isAddingCart, isLoadingCart, orders } = useSelector(selectOrders());
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [popData, setPopData] = useState(null);
    const [preview, setPreview] = useToggle(false);

    const obj = {
        id: product?.id,
        offset: null
    }
    useReviewLoader(obj);

    useEffect(() => {
        const data = {
            color,
            size,
            quantity
        };
        if (isAddingCart) {
            setPopData(data);
            return;
        }
    }, [color, size, quantity, popData, isAddingCart]);

    useEffect(() => {
        dispatch(loadReviews(obj));
    }, [isLoadingCart])

    const onClickSize = (v) => setSize(v);
    const onClickColor = (v) => setColor(v);
    const increase = () => quantity < 10 && setQuantity(quantity + 1);
    const decrease = () => quantity > 1 && setQuantity(quantity - 1);
    const onPreview = () => preview == true ? setPreview() : setPreview();

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (!me) {
            toast.error('로그인이 필요합니다.');
            return;
        }
        if (color == '') {
            toast.error('색상을 선택하여 주십시오.');
            return;
        }
        if (size == '') {
            toast.error('사이즈를 선택하여 주십시오.');
            return;
        }
        if (orders.length >= 10) {
            toast.error('10개 까지만 가능합니다.');
            return;
        }
        const formData = new FormData();
        formData.append('size', size);
        formData.append('color', color);
        formData.append('quantity', String(quantity));
        formData.append('id', product.id)
        dispatch(addCartItem(formData));
    }, [color, size, quantity, orders]);

    return (
        <DetailPresenter
            obj={obj}
            me={me}
            orders={orders}
            product={product}
            products={products}
            quantity={quantity}
            reviews={reviews}
            allReviews={allReviews}
            preview={preview}
            popData={popData}
            viewedProducts={viewedProducts}
            onClickSize={onClickSize}
            onClickColor={onClickColor}
            increase={increase}
            decrease={decrease}
            onPreview={onPreview}
            onSubmit={onSubmit}
        />
    );
};

export default memo(DetailContainer);