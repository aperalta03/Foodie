import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import styles from './authentication.module.css';

const Authentication = () => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);

    const handleLoginOpen = () => setOpenLogin(true);
    const handleLoginClose = () => setOpenLogin(false);
    
    const handleRegisterOpen = () => setOpenRegister(true);
    const handleRegisterClose = () => setOpenRegister(false);

    const handleLogin = () => {
        // Placeholder function for back-end login logic
        console.log("Login function called");
    };

    const handleRegister = () => {
        // Placeholder function for back-end registration logic
        console.log("Register function called");
    };

    const handleGoogleAuth = () => {
        // Placeholder function for Google authentication
        console.log("Google Auth function called");
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
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
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
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
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
                    <Button
                        fullWidth
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleAuth}
                        classes={{ root: styles.googleButton }}
                    >
                        Login con Google
                    </Button>
                    <Button onClick={handleLoginClose} classes={{ root: styles.cancelButton }}>Cancelar</Button>
                    <Button onClick={handleLogin} classes={{ root: styles.loginButton }}>Login</Button>
                </DialogActions>
            </Dialog>
            {/* Register Dialog */}
            <Dialog open={openRegister} onClose={handleRegisterClose} classes={{ paper: styles.dialogPaper }}>
                <DialogTitle classes={{ root: styles.dialogTitleRoot }}>Registrate</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
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
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
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
                    <Button
                        fullWidth
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleAuth}
                        classes={{ root: styles.googleButton }}
                    >
                        Registrate con Google
                    </Button>
                    <Button onClick={handleRegisterClose} classes={{ root: styles.cancelButton }}>Cancelar</Button>
                    <Button onClick={handleRegister} classes={{ root: styles.registerButton }}>Registrate</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Authentication;
