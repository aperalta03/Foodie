import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, updateDoc, onSnapshot, arrayRemove } from 'firebase/firestore';
import { db, auth } from '../firebase';

import styles from './carrito.module.css';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearIcon from '@mui/icons-material/Clear';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export const clearCart = async (user) => {
    if (user) {
        const userDocRef = doc(db, 'users', user.uid);

        try {
            await updateDoc(userDocRef, {
                cart: [],  // Empty the cart
            });
            console.log('Cart has been cleared.');
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    } else {
        console.error('No user found for clearing the cart.');
    }
};  

const Carrito = () => {
    const [cart, setCart] = useState([]);
    const [user] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            const userCartRef = doc(db, 'users', user.uid);
            const unsubscribe = onSnapshot(userCartRef, (doc) => {
                setCart(doc.data()?.cart || []);
            });

            return () => unsubscribe();
        }
    }, [user]);

    const handleBackClick = () => {
        router.back();
    };


    const handleCheckout = async () => {
        const stripe = await stripePromise;

        // Call your API route to create a checkout session
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cart, userId: user.uid }),
        });

        const session = await response.json();

        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.error(result.error.message);
        }
    };

    const handleRemoveItem = async (item) => {
        if (user) {
            const userCartRef = doc(db, 'users', user.uid);
            await updateDoc(userCartRef, {
                cart: arrayRemove(item)
            });
        }
    };  

    return (
        <Box className={styles.carritoPage}>
            <Box className={styles.header}>
                <IconButton 
                    color="default"
                    onClick={handleBackClick} 
                    className={styles.volverButton}
                >
                    <ArrowBackIcon />   
                </IconButton> 
            </Box>
            <Box className={styles.cartItems}>
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <Box key={index} className={styles.cartItem}>
                            <Image src={item.image} alt={item.title} width={100} height={100} className={styles.cartImage} />
                            <Box className={styles.itemDetails}>
                                <Typography variant="h6" className={styles.itemTitle}>{item.title}</Typography>
                                <Typography variant="body1" className={styles.itemPrice}>{item.price || '$1'}</Typography>
                            </Box>
                            <IconButton 
                                onClick={() => handleRemoveItem(item)} 
                                className={styles.removeIconButton}
                            >
                                <ClearIcon />
                            </IconButton>
                        </Box>
                    ))
                ) : (
                    <Box className={styles.emptyCartContainer}>
                        <Typography className={styles.emptyCartText} >Tu carrito esta vacio!</Typography>
                        <Typography className={styles.emptyCartText} >Ve a agregar mas recetas!</Typography>
                    </Box>
                )}
            </Box>
            {cart.length > 0 && (
                <Box className={styles.checkoutContainer}>
                    <Button className={styles.checkoutButton} onClick={handleCheckout}>
                        Pagar
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Carrito;
