import { useRouter } from 'next/router';
import { Box, Typography, Button } from '@mui/material';
import recipes from '../../app/data/recipes.json';
import styles from './recipe.module.css';

const RecipeDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    const recipe = recipes.find((r) => r.title === id);

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(recipe);
        localStorage.setItem('cart', JSON.stringify(cart));
        router.push('/'); // Redirect to home
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <Box className={styles.recipeContainer}>
            <Box className={styles.leftPane}>
                <Button onClick={handleBack} className={styles.addToCartButton}>Volver</Button>
                <Typography variant="h3">{recipe.title}</Typography>
                <Typography variant="body1" className={styles.description}>
                    {recipe.description}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    className={styles.addToCartButton}
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </Button>
            </Box>
            <Box className={styles.rightPane}>
                <Box className={styles.pdfBlur}>
                    <img
                        src={`${recipe.recipe.replace('.pdf', '_preview.jpg')}`}
                        alt="PDF Preview"
                        className={styles.pdfPreview}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default RecipeDetail;
