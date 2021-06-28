import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from 'selectors/product';
import Link from 'next/link';

interface IProductColor {
    products: any;
    onClickColor: (v: string | object) => void;
}

const ProductColor: React.FunctionComponent<IProductColor> = ({ products, onClickColor }) => {

    const { product } = useSelector(selectProducts());
    const [activeColor, setActiveColor] = useState(null);

    return (
        <>
            <span className="product__head border-none">컬러</span>
            <ul className="product-color product-options">
                {
                    products.length > 1 && products.filter((v, i) => {
                        return v.title == product.title;
                    }).map((v, i) => {
                        const id = v?.id;
                        return (
                            <Link
                                href={'/shop/detail/[id]'}
                                as={`/shop/detail/${id}`}
                                key={id}
                            >
                                <a>
                                    <li
                                        style={{ "background": v.colors[0].color }}
                                        className={activeColor == i ? 'active' : ''}
                                        key={i}
                                        onClick={() => { setActiveColor(i); onClickColor(v.colors[0].color) }}
                                    >
                                    </li>
                                </a>
                            </Link>
                        )
                    }).reverse()
                }
            </ul>
        </>
    );
};

export default ProductColor;