import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from 'selectors/product';
import Link from 'next/link';

interface IProductCategoryProps {
    products: any;
}

const ProductCategory: React.FunctionComponent<IProductCategoryProps> = ({
    products
}) => {

    const { product } = useSelector(selectProducts());

    return (
        <>
            <span className="category">
                {products.map((v, i) => {
                    if (products[i].id == product.id) {
                        return (
                            <div key={v.id}>
                                {v.categories.name}
                            </div>
                        )
                    }
                })}
            </span>
        </>
    );
};

export default ProductCategory;