import { useRouter } from 'next/router';
import { Box, Typography, Button } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import recipes from '../../app/data/recipes.json';
import styles from './recipe.module.css';

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
                // If the document exists, update the 'cart' field
                await updateDoc(userCartRef, {
                    cart: arrayUnion(recipe)
                });
            } else {
                // If the document does not exist, create it with the 'cart' field
                await setDoc(userCartRef, {
                    cart: [recipe],
                    // Add any other fields you want to initialize here
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
