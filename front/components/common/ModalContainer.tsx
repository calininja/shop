import * as React from 'react';
import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCores } from 'selectors/core';
import { showModal } from 'slices/cores';
import SignInForm from 'pages/user/SignInForm';
import SignUpForm from 'pages/user/SignUpForm';
import AddReviewForm from 'components/shop/Detail/AddReviewForm';
import Review from 'components/shop/Detail/Review';
import ModalTemplate from './ModalTemplate';

const ModalContainer: React.FunctionComponent = ({

}) => {
    const [toggle, setToggle] = useState(false);
    const { visible, mode } = useSelector(selectCores());
    const dispatch = useDispatch();

    useEffect(() => {
        visible ? setToggle(true) : setToggle(false);
    }, [visible])

    const close = useCallback(() => {
        setToggle(false)
        dispatch(showModal(false))
    }, [toggle])

    return (
        <>
            <div className="overlay"></div>
            <ModalTemplate toggle={toggle} close={close} >
                {mode == 'LOGIN' && <SignInForm />}
                {mode == 'JOIN' && <SignUpForm />}
                {mode == 'REVIEW' && <Review />}
                {mode == 'ADD_REVIEW' && <AddReviewForm />}
            </ModalTemplate>
        </>
    );
};

export default ModalContainer;