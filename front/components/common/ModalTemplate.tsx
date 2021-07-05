import * as React from 'react';
import ModalContainer from './ModalContainer';

const ModalTemplate: React.FunctionComponent = ({
    children
}) => {

    return (
        <ModalContainer>
            {children}
        </ModalContainer>
    );
};

export default ModalTemplate;