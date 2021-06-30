import * as React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

interface IProductProps {
}

const DetailTemplate: React.FunctionComponent<IProductProps> = ({
    children
}) => {

    return (
        <section css={detailStyle}>
            {children}
        </section>
    );
};

const detailStyle = css`
    position: relative;
    margin: 70px auto 0;
    min-height: 1500px;
`

export default DetailTemplate;