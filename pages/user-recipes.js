import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
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

    const handleDownload = () => {
        if (currentRecipe) {
            window.open(currentRecipe, '_blank');
        }
    };

    const handlePrint = () => {
        if (currentRecipe) {
            const printWindow = window.open(currentRecipe, '_blank');
            printWindow.print();
        }
    };

    const currentRecipe = filteredRecipes[currentRecipeIndex];

    return (
        <Box className={styles.pageContainer}>
            <IconButton className={styles.gohome} onClick={handleBackClick}>
                <ArrowBackIcon />
                <HomeIcon />
            </IconButton>
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
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'var(--primaryfade-color)', // Default border color
                                },
                                '&:hover fieldset': {
                                    borderColor: 'var(--primaryfade-color)', // Border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'var(--primaryfade-color)', // Border color when focused
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'var(--primaryfade-color)', // Label color by default
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'var(--primaryfade-color)', // Label color when focused
                            },
                        }}
                    />
                    </Box>
                    {filteredRecipes.length === 0 ? (
                        <Typography className={styles.errorText}>
                        No se encontraron recetas para &quot;{searchTerm}&quot;.
                        </Typography>
                    ) : (
                        <Box className={styles.recipeContainer}>
                            <IconButton onClick={handlePreviousRecipe} className={styles.navButton}>
                                <ArrowBackIcon />
                            </IconButton>
                            <Box className={styles.pdfViewer}>
                                {currentRecipe && (
                                    <>
                                        <iframe
                                            src={currentRecipe}
                                            title={`Recipe ${currentRecipeIndex + 1}`}
                                            width="100%"
                                            height="600px"
                                            className={styles.pdfFrame}
                                            frameBorder="0"
                                        />
                                        <Box className={styles.actionButtons}>
                                            <IconButton onClick={handleDownload} className={styles.actionButton}>
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton onClick={handlePrint} className={styles.actionButton}>
                                                <PrintIcon />
                                            </IconButton>
                                        </Box>
                                    </>
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
