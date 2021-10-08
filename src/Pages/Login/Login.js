import React from "react";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Avatar, Grid, Paper, Typography } from "@material-ui/core";
import LoginForm from './LoginForm';
import axios from 'axios';
import { USER_TOKEN } from '../../utils/localStorage';
import Header from "../../component/Header";
import { Link } from 'react-router-dom';

const Login = (props) => {
    const handleSubmit = async (formData) => {
        const res = await axios.post("https://haloha-backend.herokuapp.com/api/users/login",{
            username: formData.email,
            password: formData.password,
        });
        if (res.data.success) {
            let payload = {
                user: res.data.payload.user,
                token: res.data.payload.token,
                logged: true,
            }
            props.setAuth(payload);

            // set token into localstorage
            USER_TOKEN.set(res.data.payload.token)

            props.history.push('/home');
        } else {
            // delete token from localstorage
            USER_TOKEN.delete()

            alert("Sai tên tài khoản hoặc mật khẩu");
        }

    }

    return(
        <>
            <Header/>
            <div style={{
                marginTop: '150px',
            }}>
                <Grid>
                    <Paper elevation={10}
                        style={{
                            padding: 20,
                            height: '60vh',
                            width: 400,
                            margin: '20px auto',  
                        }}
                    >
                        <Grid align='center'>
                            <Avatar
                                style={{
                                    marginBottom: 40,
                                    backgroundColor:'#1bbd7e'
                                }}
                            >
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography variant='h6'>Đăng Nhập</Typography>
                        </Grid>
                        <LoginForm onSubmit={handleSubmit} />
                        <Grid align="center"
                            style={{
                                marginTop: 30,
                            }}
                        >
                            <Typography >
                                <Link to="/forgot-password" style={{textDecoration: 'none'}}>
                                    Quên mật khẩu ? 
                            </Link>
                            </Typography>
                            <Typography > Bạn không có tài khoản ?
                                <Link to="/register" style={{textDecoration: 'none'}}>
                                    Đăng Ký 
                            </Link>
                            </Typography>
                        </Grid>
                    </Paper>
                </Grid>
            </div>
        </>
    )
}

export default Login