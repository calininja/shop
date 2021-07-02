import * as React from 'react';
import { css } from '@emotion/react';

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
        <section css={ModalTemplateContainer} className={toggle ? "modal__container active" : "modal__container"}>
            <div className="wrapper">
                <button onClick={close} className="close">X</button>
                {children}
            </div>
        </section>
    );
};

const ModalTemplateContainer = css`
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    @keyframes fade-in-bottom {
        from {
            opacity: 0;
            top: 100%;
            transform: scale(0.5);
        }
        to {
            opacity: 1;
            top: 0%;
            transform: scale(1);
        }
    }
    &.active{
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fade-in-bottom 0.7s;
        animation-fill-mode: forwards;
        transition: all 0.5s ease-in;
        z-index: 2;
    }
    .wrapper{
        position: relative;
        width: auto;
        height: auto;
        .close{
            position: absolute;
            top: 10px;
            right: 10px;
            border: 0;
            cursor: pointer;
            background: none;
            z-index: 2;
        }
    }
`

export default ModalTemplate;