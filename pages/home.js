import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import Navbar from '../app/components/navbar/navbar';
import LandingPage from '../app/components/landingPage/landingPage';
import Recipes from '../app/components/recipes/recipes';

import styles from './home.module.css';
import recipes from '../app/data/recipes.json';

const Home = () => {
    const [navbarVisible, setNavbarVisible] = useState(false);
    const [sticky, setSticky] = useState(false);

    // Parallax effect function
    useEffect(() => {
        const handleScroll = () => {
            const page = document.querySelector('.Page');
            if (page) {
                const scrollPosition = window.scrollY;
                page.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
            }

            // Detect when to trigger sticky navbar
            const triggerHeight = window.innerHeight * 0.8;
            if (window.scrollY > triggerHeight) {
                setSticky(true);
                setNavbarVisible(true);
            } else {
                setSticky(false);
                setNavbarVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Box className={styles.Page}>
            <Navbar navbarVisible={navbarVisible} sticky={sticky} />
            <LandingPage />
            <Recipes recipes={recipes} />
        </Box>
    );
};

export default Home;
