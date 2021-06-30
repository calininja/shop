import * as React from 'react';

interface IProductProps {
}

const DetailTemplate: React.FunctionComponent<IProductProps> = ({
    children
}) => {

    return (
        <section className="detail__container">
            {children}
        </section>
    );
};

export default DetailTemplate;