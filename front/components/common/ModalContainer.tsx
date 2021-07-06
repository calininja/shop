import * as React from 'react';
import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCores } from '../../store/selectors/core';
import { showModal } from '../../store/slices/cores';
import ModalPresenter from './ModalPresenter';
import { css } from '@emotion/react';

const ModalContainer: React.FunctionComponent = ({

}) => {

    const [toggle, setToggle] = useState(false);
    const { visible, mode } = useSelector(selectCores());
    const dispatch = useDispatch();

    useEffect(() => {
        visible ? setToggle(true) : setToggle(false);
    }, [visible]);

    const onClose = useCallback(() => {
        setToggle(false);
        dispatch(showModal(false));
    }, [toggle]);

    return (
        <div css={modalContainer}>
            <div className="overlay"></div>
            <ModalPresenter toggle={toggle} mode={mode} onClose={onClose} />
        </div>
    );
};

const modalContainer = css`
    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    .overlay{
        display: block;
        position: fixed;
        animation: fade-in 0.7s;
        animation-fill-mode: forwards;
        transition: all 0.5s ease-in;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        background: rgba(255,255,255,0.4);
        z-index: 1;
    }
`

export default ModalContainer;