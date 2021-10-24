import { Avatar, Box, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import CustomSelect from '../../component/CustomSelect'
import HeaderProfile from '../../component/HeaderProfile'

const validationSchema = yup.object({
    firstName: yup
        .string('Input your first name')
        .max(15, 'Number of characters can not be more than 15')
        .required('You have to input first name'),
    lastName: yup
        .string('Input your last name')
        .max(15, 'Number of characters can not be more than 15')
        .required('You have to input last name'),
    birthday: yup.date().required('You have to input your birthday'),
    // .test("age", "Bạn phải trên 18 tuổi", function(birthday) {
    //   const cutoff = new Date();
    //   cutoff.setFullYear(cutoff.getFullYear() - 18);
    //   return birthday <= cutoff;
    // }),
})

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
        label: 'Nữ',
    },
]

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        marginLeft: '300px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '50px',
        },
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
    profileInforTittle: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 18,
            fontWeight: 'bold',
        },
    },
    profileInforSubtittle: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 13,
        },
    },
    profileInforAvt: {
        width: 100,
        height: 100,
        marginBottom: 15,
        [theme.breakpoints.down('sm')]: {
            width: 60,
            height: 60,
            marginBottom: 15,
        },
    },
    textField: {
        marginBottom: 20,
        [theme.breakpoints.down('sm')]: {
            fontSize: 10,
        },
    },
    btnUpdateProfile: {
        marginTop: 20,
        [theme.breakpoints.down('sm')]: {
            marginTop: 20,
        },
    },
}))

const ProfileInfor = (props) => {
    const classes = useStyles()
 
    const validate = (values) => {
        const errors = {}

        if (values.gender === 'none') {
            errors.gender = 'You have to input your gender'
        }

        return errors
    }

    const formik = useFormik({
        initialValues: {
            firstName: props.auth.user.firstName,
            lastName: props.auth.user.lastName,
            birthday: props.auth.user.birthday ? props.auth.user.birthday.split('T')[0] : '',
            gender: props.auth.user.gender ? 'True' : 'False',
        },
        validationSchema: validationSchema,

        validate,

        onSubmit: async (values) => {
            values['gender'] = values['gender'].toLowerCase() === 'true'

            const res = await axios({
                method: 'put',
                url: 'https://haloha-backend.herokuapp.com/api/users',
                data: values,
                headers: {
                    Authorization: props.auth.token,
                },
            })
            if (res.data.success) {
                // Action update user into redux store
                let payload = JSON.parse(JSON.stringify(props.auth))
                payload.user = res.data.payload
                props.setAuth(payload)
            }
        },
    })

    return (
        <>
            <HeaderProfile props={props} />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Paper variant="outlined">
                        <Box style={{ margin: 20 }}>
                            <Typography variant="h5" gutterBottom className={classes.profileInforTittle}>
                                Thông Tin Cá Nhân
                            </Typography>
                            <Typography variant="subtitle2" className={classes.profileInforSubtittle}>
                                Quản lý thông tin cá nhân của bạn
                            </Typography>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar src={props.auth.user.avatar} className={classes.profileInforAvt} />
                        </Box>
                        <div style={{ padding: 10 }}>
                            <form onSubmit={formik.handleSubmit}>
                                <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    disabled
                                    fullWidth
                                    id="fullName"
                                    name="fullName"
                                    label="Tên tài khoản"
                                    value={props.auth.user.fullName}
                                    size="small"
                                />
                                <Grid container alignItems="center" justifyContent="center" direction="row" spacing={5}>
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
                                            size="small"
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
                                            size="small"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container alignItems="center" justifyContent="center" direction="row" spacing={5}>
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
                                            size="small"
                                        />
                                        {formik.errors.gender ? (
                                            <div
                                                style={{
                                                    fontSize: 12.5,
                                                    marginTop: '5px',
                                                    marginLeft: '12px',
                                                    color: 'red',
                                                    visibility: 'hidden',
                                                }}
                                            >
                                                {'error in gender. please check it'}
                                            </div>
                                        ) : null}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomSelect
                                            error={formik.errors.gender}
                                            onChange={(value) => formik.setFieldValue('gender', value.value)}
                                            value={formik.values.gender}
                                            options={genders}
                                            placeholder="Giới tính"
                                        />
                                        {formik.errors.gender ? (
                                            <div
                                                style={{
                                                    fontSize: 12.5,
                                                    marginTop: '5px',
                                                    marginLeft: '12px',
                                                    color: 'red',
                                                }}
                                            >
                                                {formik.errors.gender}
                                            </div>
                                        ) : null}
                                    </Grid>
                                </Grid>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    className={classes.btnUpdateProfile}
                                >
                                    Update
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
