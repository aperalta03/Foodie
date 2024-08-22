import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from './carrito.module.css';

const items = [
    {
        title: 'Recipe 1',
        image: '/recipe1.jpg',
        price: '$10',
    },
    {
        title: 'Recipe 2',
        image: '/recipe2.jpg',
        price: '$15',
    },
];

const Carrito = () => {
    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    };

    return (
        <Box className={styles.carritoPage}>
            {/* Volver Button */}
            <Box className={styles.header}>
                <Button className={styles.volverButton} onClick={handleBackClick}>
                    Volver
                </Button>
            </Box>
            {/* Cart Items */}
            <Box className={styles.cartItems}>
                {items.map((item, index) => (
                    <Box key={index} className={styles.cartItem}>
                        <Image src={item.image} alt={item.title} width={100} height={100} className={styles.cartImage} />
                        <Box className={styles.itemDetails}>
                            <Typography variant="h6" className={styles.itemTitle}>{item.title}</Typography>
                            <Typography variant="body1" className={styles.itemPrice}>{item.price}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
            {/* Pagar Button */}
            <Box className={styles.checkoutContainer}>
                <Button className={styles.checkoutButton}>Pagar</Button>
            </Box>
        </Box>
    );
};

export default Carrito;
