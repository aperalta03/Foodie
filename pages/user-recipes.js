import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import styles from './user-recipes.module.css';

const UserRecipes = () => {
    const [user] = useAuthState(auth);
    const [recipes, setRecipes] = useState([]);
    const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);

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
        const results = recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRecipes(results);
    }, [searchTerm, recipes]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

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

    const currentRecipe = filteredRecipes[currentRecipeIndex];

    return (
        <Box className={styles.pageContainer}>
            {/* Handle cases where user is not logged in or no recipes are found */}
            {!user ? (
                <Typography className={styles.errorText}>Porfavor entra a tu cuenta para ver tus recetas.</Typography>
            ) : filteredRecipes.length === 0 ? (
                <Typography className={styles.errorText}>No tienes recetas.</Typography>
            ) : (
                <>
                    {/* Search Bar */}
                    <TextField
                        label="Search Recipes"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={styles.searchBar}
                    />
                    <Box className={styles.recipeContainer}>
                        {/* Navigation Buttons */}
                        <IconButton onClick={handlePreviousRecipe} className={styles.navButton}>
                            <ArrowBackIcon />
                        </IconButton>

                        {/* Recipe PDF Viewer */}
                        <Box className={styles.pdfViewer}>
                            <iframe
                                src={filteredRecipes[currentRecipeIndex].recipe}
                                title={filteredRecipes[currentRecipeIndex].title}
                                className={styles.pdfFrame}
                            />
                        </Box>

                        {/* Navigation Buttons */}
                        <IconButton onClick={handleNextRecipe} className={styles.navButton}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default UserRecipes;
