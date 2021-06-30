import Slick from '../../common/Slick';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from 'selectors/product';

interface IProductImageProps {
    product: any;
}

const ProductImage: React.FunctionComponent<IProductImageProps> = ({
    product
}) => {

    return (
        <div className="product-image">
            <Slick image={product?.images} />
        </div>
    );
};

export default ProductImage;