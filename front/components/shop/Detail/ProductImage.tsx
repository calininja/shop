import Slick from '../../common/Slick';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from 'selectors/product';

const ProductImage: React.FunctionComponent = () => {

    const { product } = useSelector(selectProducts());

    return (
        <div className="product-image">
            <Slick image={product.images} />
        </div>
    );
};

export default ProductImage;