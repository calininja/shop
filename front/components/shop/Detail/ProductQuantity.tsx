import * as React from 'react';

interface IProductQuantityProps {
    quantity: any;
    increase: () => void;
    decrease: () => void;
}

const ProductQuantity: React.FunctionComponent<IProductQuantityProps> = ({ 
    quantity, 
    increase,
    decrease 
}) => {

    return (
        <>
            <div className={quantity > 9 ? "product-quantity exceeded" : "product-quantity"}>
                <span className="product__head border-none">수량</span>
                <div className="product-quantity__wrapper">
                    <em>{quantity}</em>
                    <span
                        onClick={decrease}
                        className={quantity <= 1 ? "inactive counting" : "counting"}
                    >-
                    </span>
                    <span
                        onClick={increase}
                        className="counting"
                    >+
                    </span>
                </div>
            </div>
        </>
    );
};

export default ProductQuantity;