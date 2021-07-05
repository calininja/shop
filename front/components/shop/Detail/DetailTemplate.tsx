import * as React from 'react';
import { css } from '@emotion/react';
import media from 'lib/styles/media';

const DetailTemplate: React.FunctionComponent = ({
    children
}) => {

    return (
        <section css={detailTemplateWrapper}>
            {children}
        </section>
    );
};

const detailTemplateWrapper = css`
    position: relative;
    margin: 70px auto 0;
    min-height: 1500px;
    button{
        cursor: pointer;
    }
    ${media.large}{
        padding: 1rem;
        min-height: unset;
    }
`

export default DetailTemplate;