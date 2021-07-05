import * as React from 'react';
import { css } from '@emotion/react';
import SignInForm from 'components/auth/SignInForm';
import SignUpForm from 'components/auth/SignUpForm';
import AddReviewForm from 'components/shop/Detail/AddReviewForm';
import Review from 'components/shop/Detail/Review';

interface IModalProps {
    toggle: boolean;
    mode: string;
    onClose: () => void;
}

const ModalPresenter: React.FunctionComponent<IModalProps> = ({
    toggle,
    mode,
    onClose
}) => {

    return (
        <section css={modalPresenter(mode, toggle)} className='modal__container'>
            <div className="wrapper">
                <button onClick={onClose} className="close">X</button>
                {mode == 'LOGIN' && <SignInForm />}
                {mode == 'JOIN' && <SignUpForm />}
                {mode == 'REVIEW' && <Review />}
                {mode == 'ADD_REVIEW' && <AddReviewForm />}
            </div>
        </section >
    );
};

const modalPresenter = (mode: string, toggle: boolean) => css`
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
    ${toggle &&
    css`
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fade-in-bottom 0.7s;
        animation-fill-mode: forwards;
        transition: all 0.5s ease-in;
        z-index: 2;
    `}
    .wrapper{
        position: relative;
        width: ${mode == 'REVIEW' ? '100%' : 'auto'};
        height: ${mode == 'REVIEW' ? '100%' : 'auto'};
        .close{
            position: absolute;
            top: 10px;
            right: 10px;
            border: 0;
            cursor: pointer;
            background: none;
            z-index: 10;
        }
    }
`

export default ModalPresenter;