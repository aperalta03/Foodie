import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Authentication from './authentication/authentication';
import { auth } from '@/firebase'; // Ensure you import your Firebase auth object

import styles from './userButton.module.css';

const UserButtons = () => {
    const [user, setUser] = useState(null); // State to track authenticated user
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); // Update the user state when authentication state changes
        });

        return () => unsubscribe(); // Clean up the subscription on unmount
    }, []);

    const handleCartClick = () => {
        console.log("Shopping Cart clicked!");
        router.push('/carrito');
    };

    const handleRecipeClick = () => {
        console.log("My Recipes clicked!");
        router.push('/user-recipes');
    };

    return (
        <Box className={styles.userButtonContainer}>
            {user ? (
                // If the user is logged in, show these buttons
                <>
                    <Button className={styles.navButton} onClick={handleRecipeClick}>
                        My Recipes
                    </Button>
                    <Button className={styles.cartButton} onClick={handleCartClick}>
                        <ShoppingCartOutlinedIcon className={styles.cartIcon} />
                    </Button>
                </>
            ) : (
                // If the user is not logged in, show the authentication options
                <Authentication />
            )}
        </Box>
    );
};

export default UserButtons;
