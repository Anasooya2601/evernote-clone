import { useEffect, useState } from 'react';

export const DarkMode = () => {
    const [theme, setTheme] = useState('dark');
    const [mountedComponent, setMountedComponent] = useState(false)

    const setMode = mode => {
        window.localStorage.setItem('theme', mode)
        setTheme(mode)
    };

    const toggleTheme = () => {
        theme === 'dark' ? setMode('light') : setMode('dark')
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme ? setTheme(localTheme) : setMode('dark')
        setMountedComponent(true)
    }, []);

    return [theme, toggleTheme, mountedComponent]
};