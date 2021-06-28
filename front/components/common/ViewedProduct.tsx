import * as React from 'react';
import Link from 'next/link';
import { backUrl } from 'config/config';

interface IViewdProducts {
    viewedProducts: any;
}

const ViewedProduct: React.FunctionComponent<IViewdProducts> = ({
    viewedProducts
}) => {

    return (
        <div className="latest-product__container">
            <h3>최근 본 상품</h3>
            {viewedProducts && viewedProducts.map((v) => {
                return (
                    <Link
                        href={`/shop/detail/${v.id}`}
                        as={`/shop/detail/${v.id}`}
                        key={v.id}
                    >
                        <a>
                            <img src={`${backUrl}/${v.images[0].src}`} alt="" />
                            <p>{v.title}</p>
                        </a>
                    </Link>
                )
            })}
        </div>
    );
};

export default ViewedProduct;