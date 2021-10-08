import React from 'react';
import {  Box, Grid, Paper, Typography } from "@material-ui/core";
import ForgotPasswordForm from './ForgotPasswordForm';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

    const handleSubmit = (formData) => {
        console.log(`Send formData`, formData);
    }

    return (
        <div style={{
            marginTop: '150px',
        }}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Link to='/home' style={{textDecoration: 'none'}}>
                    <img 
                        alt='logo'
                        style={{
                            width: 120,
                            height: 40,
                            margin: '20px auto',
                        }}
                        src="images/logo.png"
                        >
                    </img>
                </Link>
            </Box>
            <Grid>
                <Paper elevation={10}
                    style={{
                        padding: 20,
                        height: 308,
                        width: 760,
                        margin: '20px auto',  
                    }}
                >

                <Typography variant='h6' gutterBottom>
                    Forgot Your Password
                </Typography>
                <Typography variant='body2' gutterBottom>
                    You forgot your password? Don't worry! Give us the email which is used to register your Viblo account. We'll mail you a link to reset your password.
                </Typography>
                <ForgotPasswordForm 
                    onSubmit={handleSubmit}
                />
                </Paper>
            </Grid>
        </div>
    )
}

export default ForgotPassword
