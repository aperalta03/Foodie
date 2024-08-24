import React from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import styles from './recipes.module.css';

const Recipes = ({ recipes = [] }) => {
    const router = useRouter();

    const handleRecipeClick = (title) => {
        router.push(`/recipe/${title}`);
    };

    return (
        <Box className={styles.recipesContainer}>
            {recipes.map((recipe) => (
                <Box
                    key={recipe.title}
                    className={styles.recipeCard}
                    onClick={() => handleRecipeClick(recipe.title)}
                    onMouseOver={(e) => e.currentTarget.querySelector('video').play()}
                    onMouseOut={(e) => e.currentTarget.querySelector('video').pause()}
                >
                    <Box className={styles.backgroundBlur}></Box>
                    <video className={styles.recipeVideo} muted loop playsInline>
                        <source src={recipe.video} type="video/mp4" alt={recipe.title} />
                        Your browser does not support the video tag.
                    </video>
                    <Box className={styles.recipeContent}>
                        <Typography variant="h4">{recipe.title}</Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default Recipes;
