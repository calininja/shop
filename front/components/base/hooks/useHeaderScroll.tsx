import * as React from 'react';
import { useEffect } from 'react';

export function useHeaderScroll() {

    const onScroll = (elem) => {
        const item: any = document.querySelector('.nav-scroll');
        const fixed = document.querySelector(elem);
        if (window.scrollY > item?.offsetTop) {
            fixed && fixed.classList.add('fixed');
        } else {
            fixed && fixed.classList.remove('fixed');
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", () => { onScroll('.header__container') });
        return () => {
            window.removeEventListener("scroll", () => { onScroll('.header__container') });
        };
    }, []);
};

export default useHeaderScroll;