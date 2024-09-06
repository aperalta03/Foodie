import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase'; 
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import styles from './authentication.module.css';

const Authentication = () => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginOpen = () => setOpenLogin(true);
    const handleLoginClose = () => setOpenLogin(false);
    
    const handleRegisterOpen = () => setOpenRegister(true);
    const handleRegisterClose = () => setOpenRegister(false);

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User registered:', userCredential.user);
            handleRegisterClose();
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', userCredential.user);
            handleLoginClose();
        } catch (error) {
            console.error('Error logging in user:', error);
        }
    };

    const handleGoogleAuth = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('User signed in with Google:', result.user);
            handleLoginClose();
        } catch (error) {
            console.error('Error with Google sign-in:', error);
        }
    };

    return (
        <Box className={styles.authContainer}>
            {/* Login Button */}
            <Button className={styles.navButton} onClick={handleLoginOpen}>Login</Button>
            {/* Register Button */}
            <Button className={styles.navButton} onClick={handleRegisterOpen}>Registrate</Button>
            {/* Login Dialog */}
            <Dialog open={openLogin} onClose={handleLoginClose} classes={{ paper: styles.dialogPaper }}>
                <DialogTitle classes={{ root: styles.dialogTitleRoot }}>Login</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Email - Correo"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            color: 'var(--text-color)',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'black', // Change the border color
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black', // Change the border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black', // Border color when focused
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'black', // Label color
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'black', // Label color when focused
                            },
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Contraseña"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            color: 'var(--text-color)',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'black', // Change the border color
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black', // Change the border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black', // Border color when focused
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'black', // Label color
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'black', // Label color when focused
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions classes={{ root: styles.dialogActionsRoot }}>
                    <Box className={styles.authFirstRow}>
                        <Button
                            fullWidth
                            startIcon={<GoogleIcon />}
                            onClick={handleGoogleAuth}
                            classes={{ root: styles.googleButton }}
                            disableRipple
                        >
                            <p>Login con Google</p>
                        </Button>
                        <Button onClick={handleLogin} classes={{ root: styles.loginButton }}><p>Login</p></Button>
                    </Box>
                    <Button onClick={handleLoginClose} classes={{ root: styles.cancelButton }}><p>Cancelar</p></Button>
                </DialogActions>
            </Dialog>
            {/* Register Dialog */}
            <Dialog open={openRegister} onClose={handleRegisterClose} classes={{ paper: styles.dialogPaper }}>
                <DialogTitle classes={{ root: styles.dialogTitleRoot }}>Registrate</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Email - Correo"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            color: 'var(--text-color)',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'black', // Change the border color
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black', // Change the border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black', // Border color when focused
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'black', // Label color
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'black', // Label color when focused
                            },
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Contraseña"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            color: 'var(--text-color)',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'black', // Change the border color
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black', // Change the border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black', // Border color when focused
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'black', // Label color
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'black', // Label color when focused
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions classes={{ root: styles.dialogActionsRoot }}>
                    <Box className={styles.authFirstRow}>
                        <Button
                            fullWidth
                            startIcon={<GoogleIcon />}
                            onClick={handleGoogleAuth}
                            classes={{ root: styles.googleButton }}
                        >
                            <p>Registrate con Google</p>
                        </Button>
                        <Button onClick={handleRegister} classes={{ root: styles.registerButton }}><p>Registrate</p></Button>
                    </Box>
                    <Button onClick={handleRegisterClose} classes={{ root: styles.cancelButton }}><p>Cancelar</p></Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Authentication;
