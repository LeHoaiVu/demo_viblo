import React from "react";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Avatar, Grid, Paper, Typography } from "@material-ui/core";
import RegisterForm from "./RegisterForm";
import axios from "axios";
import { useHistory } from 'react-router-dom';

const Register = (props) => {

    const history = useHistory();

    const handleSubmit = async(formData) => {
        console.log(`formData`, formData)
        let res = await axios.post('https://haloha-backend.herokuapp.com/api/users',{
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.userName,
            email: formData.email,
            password: formData.password
        })
        if (res.data.success){
            alert('Đăng ký thành công');
            history.push("/login");
        }
        else{
            console.log(`res`, res)
            alert(res.data.error.message);
        }

    }

    return(
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
                        <Typography variant='h6'>Đăng Ký</Typography>
                    </Grid>
                        <RegisterForm onSubmit={handleSubmit} />
                </Paper>
            </Grid>
        </div>
    )
}

export default Register