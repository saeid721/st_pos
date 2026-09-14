import React, { useState, useEffect } from 'react';
import { FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(() => {
        // Check local storage to keep the user preference
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark';
        }
        return false;
    });

    useEffect(() => {
        // Update the class on the document body based on state
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2  dark:bg-gray-800 text-black dark:text-white rounded"
        >
            <FiMoon
                className="text-gray-600 hover:text-gray-800 cursor-pointer"
                size={24}
            />
        </button>
    );
};

export default ThemeToggle;
