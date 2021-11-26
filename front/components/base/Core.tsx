import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCores } from '../../store/selectors/core';
import ModalTemplate from "../common/ModalTemplate";
import usePopupCss from '../../hooks/usePopupCss';
import useHeaderScroll from '../../hooks/useHeaderScroll';
import useCartLoader from '../../hooks/useCartLoader';
import useViewedProduct from '../../hooks/useViewedProduct';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { ToastContainer, Flip } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";

const Core: React.FunctionComponent = ({

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
            {visible ? <ModalTemplate /> : ''}
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