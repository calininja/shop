import * as React from 'react';
import { useEffect, useCallback } from 'react';
import { useState } from 'react';
import { selectProducts } from 'selectors/product';
import { useSelector, useDispatch } from 'react-redux';
import { addCartItem } from 'thunks/orders';
import { selectUsers } from 'selectors/user';
import { selectOrders } from 'selectors/order';
import ProductImage from './ProductImage';
import ProductSize from './ProductSize';
import ProductColor from './ProductColor';
import CartPopup from '../../cart/CartPopup';
import ViewedProduct from '../../common/ViewedProduct';
import useReviewLoader from 'components/base/hooks/useReviewLoader';
import useToggle from 'lib/hooks/useToggle';
import { toast } from 'react-toastify';
import ProductQuantity from './ProductQuantity';
import ProductCategory from './ProductCategory';
import PreviewContainer from './PreviewContainer';

interface IProductProps {
    obj: {
        id: number,
        offset: null
    }
}

const DetailContainer: React.FunctionComponent<IProductProps> = ({ obj }) => {

    const dispatch = useDispatch();
    const { me } = useSelector(selectUsers());
    const { product, products, reviews, allReviews, viewedProducts } = useSelector(selectProducts());
    const { isAddingCart, orders, error } = useSelector(selectOrders());
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [popData, setPopData] = useState(null);
    const [preview, setPreview] = useToggle(false);

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

    // onClick 사이즈 & 컬러
    const onClickSize = (v) => setSize(v);
    const onClickColor = (v) => setColor(v);

    // 증가 & 감소
    const increase = () => quantity < 10 && setQuantity(quantity + 1);
    const decrease = () => quantity > 1 && setQuantity(quantity - 1);

    // 리뷰 프리뷰
    const onClickPreview = () => preview == true ? setPreview() : setPreview();

    // 회원 장바구니 Submit
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
        if (color && size) {
            return dispatch(addCartItem(formData));
        };
    }, [color, size, quantity, orders]);

    return (
        <section className="detail__container">
            <ProductImage />
            <div className="product-information">
                <form action="" onSubmit={onSubmit}>
                    <ProductCategory 
                        products={products}
                    />
                    <h2 className="product__title">
                        {product.title}
                    </h2>
                    <ProductColor 
                        products={products} 
                        onClickColor={onClickColor} 
                    />
                    <ProductSize 
                        onClickSize={onClickSize} 
                    />
                    <ProductQuantity 
                        quantity={quantity}
                        increase={increase}
                        decrease={decrease}
                    />
                    <div className="product__price">
                        <span>{product.price ? product.price.toLocaleString() : ''}</span> 원
                    </div>
                    <div className="product-submenu">
                        <button className="product-cart" type="submit">
                            장바구니
                        </button>
                    </div>
                </form>
                <div className="product-description__container">
                    <span className="product__head">상세설명</span>
                    <pre>
                        <p className="product-description">{product.content}</p>
                    </pre>
                </div>
                <PreviewContainer
                    obj={obj}
                    preview={preview}
                    reviews={reviews}
                    allReviews={allReviews}
                    onClickPreview={onClickPreview}
                />
            </div>
            {viewedProducts && <ViewedProduct viewedProducts={viewedProducts} />}
            {me && orders && <CartPopup popData={popData} />}
        </section>
    );
};

export default DetailContainer;