import * as React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import media from 'lib/styles/media';


const DetailTemplate: React.FunctionComponent = ({
    children
}) => {

    return (
        <section css={detailContainer}>
            {children}
        </section>
    );
};

const detailContainer = css`
    position: relative;
    margin: 70px auto 0;
    min-height: 1500px;
    .product-information{
        float: none;
        width: 100%;
        padding-left: 0;
    }
    button{
        cursor: pointer;
    }
    ${media.large}{
        padding: 1rem;
        min-height: unset;
    }
`

export default DetailTemplate;