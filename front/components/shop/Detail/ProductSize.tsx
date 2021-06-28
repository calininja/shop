import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from 'selectors/product';

interface IProductSize {
    onClickSize: (v: string | object) => void;
}

const ProductSize: React.FunctionComponent<IProductSize> = ({ onClickSize }) => {

    const { product } = useSelector(selectProducts());
    const [activeSize, setActiveSize] = useState(null);

    return (
        <>
            <span className="product__head border-none">사이즈 선택</span>
            <ul className="product-size product-options">
                {
                    product.sizes.length > 1 ?
                        product.sizes.map((v, i) => {
                            return (
                                <li
                                    className={activeSize == i ? 'active' : ''}
                                    key={i}
                                    onClick={() => { setActiveSize(i); onClickSize(v.size) }}
                                >
                                    {v.size}
                                </li>
                            )
                        })
                        :
                        <li
                            className={activeSize == 0 ? 'active' : ''}
                            key={product.id}
                            onClick={() => { setActiveSize(0); onClickSize(product.sizes[0].size) }}
                        >
                            {product.sizes[0].size}
                        </li>
                }
            </ul>
        </>
    );
};

export default ProductSize;