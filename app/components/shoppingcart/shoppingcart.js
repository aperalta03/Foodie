import React from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import styles from './shoppingcart.module.css';
import { useRouter } from 'next/navigation'

const ShoppingCartButton = () => {
    const router = useRouter();
    const handleClick = () => {
        // Placeholder function for future functionality
        console.log("Shopping Cart clicked!");
        router.push('/carrito')
    };

    return (
        <a className={styles.cartButton} onClick={handleClick}>
            <ShoppingCartOutlinedIcon className={styles.cartIcon} />
        </a>
    );
};

export default ShoppingCartButton;