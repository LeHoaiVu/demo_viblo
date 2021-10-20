import React from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Avatar, Grid, Paper, Typography } from '@material-ui/core'
import RegisterForm from './RegisterForm'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Header from '../../component/Header'

const Register = (props) => {
    const history = useHistory()

    const handleSubmit = async (formData) => {
        console.log(`Register information`, formData)
        let res = await axios.post('https://haloha-backend.herokuapp.com/api/users', {
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.userName,
            email: formData.email,
            password: formData.password,
        })
        if (res.data.success) {
            history.push('/login')
        } else {
            console.log(`res`, res)
            alert(res.data.error.message)
        }
    }

    return (
        <>
            <Header />
            <div
                style={{
                    marginTop: '120px',
                }}
            >
                <Grid>
                    <Paper
                        elevation={10}
                        style={{
                            padding: 15,
                            height: '75vh',
                            width: 350,
                            margin: '5px auto',
                            borderRadius: '10px',
                        }}
                    >
                        <Grid align="center">
                            <Avatar
                                style={{
                                    marginBottom: 20,
                                    backgroundColor: '#1bbd7e',
                                }}
                            >
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography variant="h6">Đăng Ký</Typography>
                        </Grid>
                        <RegisterForm onSubmit={handleSubmit} />
                    </Paper>
                </Grid>
            </div>
        </>
    )
}

export default Register
