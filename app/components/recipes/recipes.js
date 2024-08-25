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
                >
                    <Box className={styles.backgroundBlur}></Box>
                    <Box
                        component="img"
                        src={recipe.image}
                        alt={recipe.title}
                        className={styles.recipeImage}
                    />
                    <Box className={styles.recipeContent}>
                        <Typography variant="h4">{recipe.title}</Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default Recipes;