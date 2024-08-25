import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { auth } from '@/firebase';

import styles from './userButton.module.css';

import Authentication from './authentication/authentication';

const UserButtons = () => {
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRecipeClick = () => {
        router.push('/user-recipes');
        handleMenuClose();
    };

    const handleCartClick = () => {
        router.push('/carrito');
        handleMenuClose();
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/');
        handleMenuClose();
    };

    return (
        <Box className={styles.userButtonContainer}>
            {user ? (
                <>
                    <IconButton onClick={handleMenuOpen} className={styles.personIcon}>
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        classes={{ paper: styles.menu }}
                    >
                        <MenuItem onClick={handleRecipeClick} className={styles.navButton}>
                            <MenuBookIcon className={styles.cartIcon} /> Mis Recetas
                        </MenuItem>
                        <MenuItem onClick={handleCartClick} className={styles.cartButton}>
                            <ShoppingCartOutlinedIcon className={styles.cartIcon} /> Carrito
                        </MenuItem>
                        <MenuItem onClick={handleLogout} className={styles.navButton}>
                            <ArrowBackIcon className={styles.cartIcon} /> Logout
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <Authentication />
            )}
        </Box>
    );
};

export default UserButtons;
