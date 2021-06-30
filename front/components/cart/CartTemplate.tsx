import * as React from 'react';

interface ICartTemplateProps {
}

const CartTemplate: React.FunctionComponent<ICartTemplateProps> = ({
    children
}) => {
    return (
        <>
            <section className="cart__container">
                <div className="cart__head">
                    <h2>장바구니</h2>
                </div>
                {children}
            </section>
        </>
    )
};


export default CartTemplate;
