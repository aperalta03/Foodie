import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import recipes from '../../app/data/recipes.json';
import styles from './recipe.module.css';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const RecipeDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user] = useAuthState(auth);

    const recipe = recipes.find((r) => r.title === id);

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    const handleAddToCart = async () => {
        if (user) {
            const userCartRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userCartRef);

            if (docSnap.exists()) {
                await updateDoc(userCartRef, {
                    cart: arrayUnion(recipe)
                });
            } else {
                await setDoc(userCartRef, {
                    cart: [recipe],
                    payment: {},
                    recipes: [],
                });
            }

            router.push('/');
        } else {
            alert('Please log in to add items to your cart.');
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <Box className={styles.recipeContainer}>
            {/* Left Pane for Video */}
            <Box className={styles.leftPane}>
                <video className={styles.recipeVideo} autoPlay loop muted playsInline>
                    <source src={recipe.video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </Box>
            {/* Right Pane for Recipe Details */}
            <Box className={styles.rightPane}>
                <Box className={styles.recipeDetails}>
                    <Typography className={styles.title}>{recipe.title}</Typography>
                    <Typography className={styles.calories}>
                        {recipe.calories}
                    </Typography>
                    <Box className={styles.tagsContainer}>
                        {recipe.tags.map((tag, index) => (
                            <Typography key={index} className={styles.tag}>
                                {tag}
                            </Typography>
                        ))}
                    </Box>
                    <Typography className={styles.description}>
                        {recipe.description}
                    </Typography>
                    {/* Buttons Container */}
                    <Box className={styles.buttonsContainer}>
                        <IconButton 
                            color="default"
                            onClick={handleBack} 
                            className={styles.volverButton}
                        >
                            <ArrowBackIcon />
                        </IconButton> 
                        <IconButton
                            color="primary"
                            className={styles.addToCartButton}
                            onClick={handleAddToCart}
                        >
                            <AddShoppingCartIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default RecipeDetail;
