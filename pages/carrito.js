import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, updateDoc, onSnapshot, arrayRemove } from 'firebase/firestore';
import { db, auth } from '../firebase';
import styles from './carrito.module.css';

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
                <Button className={styles.volverButton} onClick={handleBackClick}>
                    Volver
                </Button>
            </Box>
            <Box className={styles.cartItems}>
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <Box key={index} className={styles.cartItem}>
                            <Image src={item.image} alt={item.title} width={100} height={100} className={styles.cartImage} />
                            <Box className={styles.itemDetails}>
                                <Typography variant="h6" className={styles.itemTitle}>{item.title}</Typography>
                                <Typography variant="body1" className={styles.itemPrice}>{item.price || '$0'}</Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleRemoveItem(item)}
                                >
                                    Remove
                                </Button>
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Typography variant="h6">Your cart is empty</Typography>
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
