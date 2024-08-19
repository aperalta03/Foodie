// index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './index.module.css';

const Loading = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  }, [router]);

  return (
    <Container className={styles.container} maxWidth={false}>
      <CircularProgress color="secondary" size={100}/>
      <Typography className={styles.title}> Loading...</Typography>
    </Container> 
  );
};

export default Loading;