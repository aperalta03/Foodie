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

    const handleCheckout = () => {
        console.log('Proceed to checkout');
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
