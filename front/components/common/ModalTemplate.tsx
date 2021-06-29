import * as React from 'react';

interface IModalProps {
    toggle: boolean;
    close: () => void;
}

const ModalTemplate: React.FunctionComponent<IModalProps> = ({
    toggle,
    close,
    children
}) => {

    return (
        <section className={toggle ? "modal__container active" : "modal__container"}>
            <div className="wrapper">
                <button onClick={close} className="close">X</button>
                {children}
            </div>
        </section>
    );
};

export default ModalTemplate;