import * as React from 'react';
import { useEffect } from 'react';
import { useState, useCallback } from 'react';

export default function useDarkmode() {
    const [dark, setDark] = useState(false);
    // darkmode
    const onClickDarkMode = useCallback((e) => {
        e.preventDefault();
        if (dark == false) {
            document.querySelector('body').classList.add("darkmode");
            localStorage.setItem('color-theme', 'dark');
            setDark(true)
        } else {
            document.querySelector('body').classList.remove("darkmode");
            localStorage.setItem('color-theme', 'light');
            setDark(false)
        }
    }, [dark])

    useEffect(() => {
        const isUserColorTheme = localStorage.getItem('color-theme');
        if (isUserColorTheme == 'dark') {
            document.querySelector('body').classList.add("darkmode");
            setDark(true);
        } else {
            document.querySelector('body').classList.remove("darkmode");
            setDark(false);
        }
    }, [dark])
    return { dark, setDark, onClickDarkMode };
};
