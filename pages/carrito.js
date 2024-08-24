import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './carrito.module.css';

const Carrito = () => {
    const [cart, setCart] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(cartItems);
    }, []);

    const handleBackClick = () => {
        router.back();
    };

    const handleCheckout = () => {
        console.log('Proceed to checkout');
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
