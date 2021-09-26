import { Avatar, Box, Button, Container, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from "axios";
import CustomSelect from "../../component/CustomSelect";
import HeaderProfile from "../../component/HeaderProfile";


const validationSchema = yup.object({
    firstName: yup
        .string('Nhập họ của bạn')
        .max(15,'Tên không được dài quá 15 ký tự')
        .required('Bạn cần phải nhập họ'),
    lastName: yup
        .string('Nhập tên của bạn')
        .max(15,'Tên không được dài quá 15 ký tự')
        .required('Bạn cần phải nhập tên'),
    birthday: yup.date()
        .required('Bạn phải nhập ngày sinh')
        .test("age", "Bạn phải trên 18 tuổi", function(birthday) {
          const cutoff = new Date();
          cutoff.setFullYear(cutoff.getFullYear() - 18);      
          return birthday <= cutoff;
        }),

});


const genders = [
    {
        value: 'none',
        label: 'Chọn giới tính của bạn',
    },
    {
        value: 'True',
        label: 'Nam',
    },
    {
        value: 'False',
        label: 'Nữ'
    },
];

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
    selectGender: {
        height: '56px',
    },
}));

const ProfileInfor = (props) => {
    const classes = useStyles();
    const validate = values => {
        const errors = {}
    
        if(!values.gender || values.gender==='none'){
          errors.gender='Bạn phải nhập giới tính';
        }
    
        return errors;
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName:'',
            birthday: '',
            gender: ''
        },
        validationSchema: validationSchema,

        validate,

        onSubmit: async (values) => {

            values['gender'] = (values['gender'].toLowerCase() === 'true');
            
            const res = await axios({
                method: 'put',
                url: 'https://haloha-backend.herokuapp.com/api/users',
                data: values,
                headers: {
                    Authorization: props.auth.token
                }
            });
            if (res.data.success) {
                // Action update user into redux store
                let payload = JSON.parse(JSON.stringify(props.auth));
                
                for (let i=0;i<payload.user.length;i++) {
                    if (payload.user[i].id === res.payload.id) {
                        payload.user[i] = res.payload;
                        break;
                    }
                }
                window.location.reload();
                props.setAuth(payload);
            }

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
                                <Typography variant='h5' gutterBottom>Thông Tin Cá Nhân</Typography>
                                <Typography variant='subtitle2'>Quản lý thông tin cá nhân của bạn</Typography>
                            </Box>
                            <Box 
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar 
                                    src={props.auth.user.avatar}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        marginBottom: 15,
                                    }}
                                />
                            </Box>
                            <div>
                                <form onSubmit={formik.handleSubmit}>
                                    <TextField
                                        style={{marginBottom: 20}}
                                        variant="outlined"
                                        disabled
                                        fullWidth
                                        id="fullName"
                                        name="fullName"
                                        label="Tên tài khoản"
                                        value={props.auth.user.fullName}
                                    />
                                    <Grid 
                                        container
                                        alignItems="center"
                                        justifyContent="center"
                                        direction="row"
                                        spacing={5}
                                    >
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                id="firstName"
                                                name="firstName"
                                                label="Họ"
                                                value={formik.values.firstName}
                                                onChange={formik.handleChange}
                                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                                helperText={formik.touched.firstName && formik.errors.firstName}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                id="lastName"
                                                name="lastName"
                                                label="Tên"
                                                value={formik.values.lastName}
                                                onChange={formik.handleChange}
                                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                                helperText={formik.touched.lastName && formik.errors.lastName}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid 
                                        container
                                        alignItems="center"
                                        justifyContent="center"
                                        direction="row"
                                        spacing={5}
                                    >
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                id="birthday"
                                                label="Ngày sinh"
                                                type="date"
                                                value={formik.values.birthday}
                                                onChange={formik.handleChange}
                                                error={formik.touched.birthday && Boolean(formik.errors.birthday)}
                                                helperText={formik.touched.birthday && formik.errors.birthday}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomSelect
                                                error={formik.errors.gender}
                                                onChange={(value)=>formik.setFieldValue('gender', value.value)}
                                                value={formik.values.gender}
                                                options={genders}
                                                placeholder="Giới tính"
                                            />
                                            {formik.errors.gender ? 
                                                <div style={{fontSize: 12.5, marginTop: '5px', marginLeft: '12px', color:'red'}}>
                                                    {formik.errors.gender}
                                                </div>
                                            : null}
                                        </Grid>
                                    </Grid>
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

export default ProfileInfor