import React from 'react';
import { Box, Button, Container, Divider, InputLabel, Paper, TextField, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { useFormik } from 'formik';
import HeaderProfile from '../../component/HeaderProfile';


const useStyles = makeStyles((theme) => ({
    content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
		marginLeft: '300px'
	},
  	appBarSpacer: theme.mixins.toolbar,
    container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
	},
    email: {
        width: '350px',
        marginBottom: '15px',
    },
    boxItems: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'left',
    },
    boxItemEmail: {
        fontSize: '13px',
        marginRight: '15px',
        padding: '5px',
    },
    mainEmail: {
        marginRight: '15px',
        fontSize: '13px',
        backgroundColor: '#40ff00',
        inlineSize: 'max-content',
        color: 'white',
        borderRadius: '8px',
        padding: '5px',
    },
    boxItemVerified: {
        border: '1px solid #124d00',
        marginRight: '15px',
        fontSize: '13px',
        backgroundColor: '#ecffe6',
        inlineSize: 'max-content',
        color: '#124d00',
        borderRadius: '8px',
        padding: '5px',
    }
}));

const validationSchema = yup.object({
    emails: yup
        .string('Nhập email cần thêm')
        .email('Email không hợp lệ')
        .required('Bạn cần nhập email thêm'),
});

function ProfileEmail(props) {

    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            emails: '',
        },
        validationSchema: validationSchema,

        onSubmit: (values) => {

            console.log(`values`, values)

            // values['gender'] = (values['gender'].toLowerCase() === 'true');
            
            // const res = await axios({
            //     method: 'put',
            //     url: 'https://haloha-backend.herokuapp.com/api/users',
            //     data: values,
            //     headers: {
            //         Authorization: props.auth.token
            //     }
            // });
            // if (res.data.success) {
            //     // Action update user into redux store
            //     let payload = JSON.parse(JSON.stringify(props.auth));
                
            //     for (let i=0;i<payload.user.length;i++) {
            //         if (payload.user[i].id === res.payload.id) {
            //             payload.user[i] = res.payload;
            //             break;
            //         }
            //     }
            //     window.location.reload();
            //     props.setAuth(payload);
            // }

        },

    });

    return (
        <>
            <HeaderProfile props={props}/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Paper variant="outlined">
                            <Box style={{margin: 20}}>
                                <Typography variant='h5' gutterBottom>Emails</Typography>
                                <Typography variant='subtitle2'>Email dự phòng của bạn cũng sẽ nhận được những thông báo liên quan đến bảo mật tài khoản và cũng được sử dụng để đặt lại mật khẩu</Typography>
                            </Box>
                            <div style={{margin: 20}}>
                                <form onSubmit={formik.handleSubmit}>
                                    <Box 
                                        className={classes.boxItems}    
                                    >
                                        <Box
                                            className={classes.boxItemEmail}
                                        >
                                            {props.auth.user.email}
                                        </Box>
                                        <Box  
                                            className={classes.mainEmail} 
                                        >
                                            Email chính
                                        </Box>
                                        <Box  
                                            className={classes.boxItemVerified} 
                                        >
                                            Đã xác minh
                                        </Box>
                                    </Box>
                                    <Divider style={{margin: 20}}/>
                                    <InputLabel style={{marginTop: 15, marginBottom: 10, fontSize: 12}}>Thêm địa chỉ email mới</InputLabel>
                                    <TextField
                                        className={classes.email}
                                        variant="outlined"
                                        id="emails"
                                        name="emails"
                                        label="Email"
                                        placeholder="you@your.domain"
                                        value={formik.values.emails}
                                        onChange={formik.handleChange}
                                        error={formik.touched.emails && Boolean(formik.errors.emails)}
                                        helperText={formik.touched.emails && formik.errors.emails}
                                    />
                            
                                    <Button color="primary" variant="contained" fullWidth type="submit" style={{marginTop: 50}}>
                                        Cập Nhật
                                    </Button>
                                </form>
                            </div>
                        </Paper>
                    </Container>
            </main>
        </>
    )
}

export default ProfileEmail
