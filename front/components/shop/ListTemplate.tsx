import * as React from 'react';
import { css } from '@emotion/react';
import { after } from 'lib/styles/common';

const ListTemplate: React.FunctionComponent = ({
    children
}) => {

    return (
        <section css={ListTemplateWrapper}>
            {children}
        </section>
    );
};

const ListTemplateWrapper = css`
    ${after()}
`

export default ListTemplate;