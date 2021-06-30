import * as React from 'react';

interface IListTemplateProps {
}

const ListTemplate: React.FunctionComponent<IListTemplateProps> = ({
    children
}) => {

    return (
        <section className="shop__container">
            {children}
        </section>
    );
};

export default ListTemplate;