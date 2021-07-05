import * as React from 'react';

const OrderTemplate: React.FunctionComponent = ({
    children
}) => {
    return (
        <section>
            {children}
        </section>
    );
};

export default OrderTemplate;