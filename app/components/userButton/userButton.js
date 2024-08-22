import React, { useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';

import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Authentication from './authentication/authentication';

import styles from './userButton.module.css';

const UserButtons = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const handleCartClick = () => {
        console.log("Shopping Cart clicked!");
        router.push('/carrito');
    };

    const handleRecipeClick = () => {
        console.log("My Recipes clicked!");
        router.push('/user-recipes');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <Box className={styles.userButtonContainer}>
            <IconButton onClick={toggleMenu}>
                <PersonIcon className={styles.personIcon} />
            </IconButton>
            {menuOpen && (
                <Box className={styles.menu}>
                    <Authentication />
                    <Button className={styles.navButton} onClick={handleRecipeClick}>
                        My Recipes
                    </Button>
                    <Button className={styles.cartButton} onClick={handleCartClick}>
                        <ShoppingCartOutlinedIcon className={styles.cartIcon} />
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default UserButtons;
