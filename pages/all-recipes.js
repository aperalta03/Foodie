import React from 'react';
import { Box } from '@mui/material';
import Recipes from '../app/components/recipes/recipes';
import recipes from '../app/data/recipes.json';
import styles from './all-recipes.module.css';

const AllRecipes = () => {
  return (
    <Box className={styles.Page}>
      <Recipes recipes={recipes} />
    </Box>
  );
};

export default AllRecipes;
