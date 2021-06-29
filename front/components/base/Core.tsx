import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCores } from 'selectors/core';
import ModalContainer from "../common/ModalContainer";
import usePopupCss from './hooks/usePopupCss';
import useHeaderScroll from './hooks/useHeaderScroll';
import useCartLoader from './hooks/useCartLoader';
import useViewedProduct from './hooks/useViewedProduct';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import { ToastContainer, Flip } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";


interface ICoreProps {
}

const Core: React.FunctionComponent<ICoreProps> = ({

}) => {
    const { visible } = useSelector(selectCores());

    useEffect(() => {
        // CALL IT ONCE IN YOUR APP
        injectStyle();
    }, [])

    usePopupCss();
    useHeaderScroll();
    useCartLoader();
    useViewedProduct();
    useInfiniteScroll();
    return (
        <>
            {visible ? <ModalContainer /> : ''}
            <ToastContainer
                transition={Flip}
                position="top-right"
                autoClose={2000}
                closeOnClick
                pauseOnHover
            />
        </>
    );
};

export default Core;