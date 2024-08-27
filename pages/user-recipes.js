import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

import styles from './user-recipes.module.css';

const UserRecipes = () => {
    const [user] = useAuthState(auth);
    const [recipes, setRecipes] = useState([]);
    const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchUserRecipes = async () => {
            if (user) {
                const userDoc = doc(db, 'users', user.uid);
                const userSnapshot = await getDoc(userDoc);
                const userRecipes = userSnapshot.data()?.recipes || [];
                setRecipes(userRecipes);
                setFilteredRecipes(userRecipes);
            }
        };

        fetchUserRecipes();
    }, [user]);

    useEffect(() => {
        if (recipes.length > 0) {
            const results = recipes.filter((recipe) =>
                recipe.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredRecipes(results);
        }
    }, [searchTerm, recipes]);

    const handleNextRecipe = () => {
        setCurrentRecipeIndex((prevIndex) =>
            prevIndex === filteredRecipes.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePreviousRecipe = () => {
        setCurrentRecipeIndex((prevIndex) =>
            prevIndex === 0 ? filteredRecipes.length - 1 : prevIndex - 1
        );
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleBackClick = () => {
        router.push("./home");
    };

    const currentRecipe = filteredRecipes[currentRecipeIndex];

    return (
        <Box className={styles.pageContainer}>
            <Button className={styles.gohome} onClick={handleBackClick}>Volver</Button>
            {!user ? (
                <Typography className={styles.errorText}>
                    Por favor entra a tu cuenta para ver tus recetas.
                </Typography>
            ) : (
                <>
                    <Box className={styles.searchContainer}>
                        <TextField
                            label="Search Recipes"
                            variant="outlined"
                            fullWidth
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className={styles.searchBar}
                        />
                    </Box>
                    {filteredRecipes.length === 0 ? (
                        <Typography className={styles.errorText}>
                            No se encontraron recetas para "{searchTerm}".
                        </Typography>
                    ) : (
                        <Box className={styles.recipeContainer}>
                            <IconButton onClick={handlePreviousRecipe} className={styles.navButton}>
                                <ArrowBackIcon />
                            </IconButton>
                            <Box className={styles.pdfViewer}>
                                {currentRecipe && (
                                    <iframe
                                        src={currentRecipe}
                                        title={`Recipe ${currentRecipeIndex + 1}`}
                                        width="100%"
                                        height="600px"
                                        className={styles.pdfFrame}
                                        frameBorder="0"
                                    />
                                )}
                            </Box>
                            <IconButton onClick={handleNextRecipe} className={styles.navButton}>
                                <ArrowForwardIcon />
                            </IconButton>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default UserRecipes;
