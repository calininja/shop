import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCores } from 'selectors/core';


export default function usePopup () {
    const { visible } = useSelector(selectCores());

    useEffect(() => {
        const main = document.querySelector('main');
        const body = document.querySelector('body');
        if (visible) {
            main.style.filter = 'blur(3px)';
            body.style.overflow = 'hidden';
        } else {
            main.style.filter = 'unset';
            body.style.overflow = 'unset';
        }
    }, [visible])

};