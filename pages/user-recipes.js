import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import { useRouter } from 'next/navigation';
import styles from './user-recipes.module.css';

const UserRecipes = () => {
  const [user] = useAuthState(auth);
  const [recipes, setRecipes] = useState([]);
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleBackClick = () => {
    router.push('./home');
  };

  const handleDownload = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  const handlePrint = (pdfUrl) => {
    const printWindow = window.open(pdfUrl, '_blank');
    printWindow.print();
  };

  return (
    <Box className={styles.pageContainer}>
      {/* Navbar */}
      <Box className={styles.navbar}>
        <IconButton className={styles.gohome} onClick={handleBackClick}>
          <ArrowBackIcon />
          <HomeIcon />
        </IconButton>
        <TextField
          label="Buscar recetas"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchBar}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'var(--primaryfade-color)',
              },
              '&:hover fieldset': {
                borderColor: 'var(--primaryfade-color)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--primaryfade-color)',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'var(--primaryfade-color)',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'var(--primaryfade-color)',
            },
          }}
        />
      </Box>

      {!user ? (
        <Typography className={styles.errorText}>
          Por favor entra a tu cuenta para ver tus recetas.
        </Typography>
      ) : (
        <>
          {filteredRecipes.length === 0 ? (
            <Typography className={styles.errorText}>
              No se encontraron recetas para &quot;{searchTerm}&quot;.
            </Typography>
          ) : (
            <Box className={styles.recipesGrid}>
              {filteredRecipes.map((recipe, index) => (
                <Box key={index} className={styles.pdfContainer}>
                  <iframe   
                    src={`${recipe}#toolbar=0`}
                    title={`Recipe ${index + 1}`}
                    className={styles.pdfFrame}
                  />
                  {/* Action buttons placed outside of the iframe */}
                  <Box className={styles.actionButtons}>
                    <IconButton onClick={() => handleDownload(recipe)} className={styles.actionButton}>
                      <DownloadIcon />
                    </IconButton>
                    <IconButton onClick={() => handlePrint(recipe)} className={styles.actionButton}>
                      <PrintIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default UserRecipes;
