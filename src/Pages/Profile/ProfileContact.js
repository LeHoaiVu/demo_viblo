import React from 'react'
import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import * as yup from 'yup'
import { useFormik } from 'formik'
import CustomSelect from '../../component/CustomSelect'
import HeaderProfile from '../../component/HeaderProfile'

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
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
    formProfileContact: {
        padding: 10,
    },
    profileContactTittle: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 18,
            fontWeight: 'bold',
        },
    },
    profileContactSubtittle: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 13,
        },
    },
    btnFormProfileContact: {
        marginTop: 50,
        [theme.breakpoints.down('sm')]: {
            marginTop: 30,
        },
    },
}))

const universities = [
    {
        value: 'none',
        label: 'Chọn trường đại học của bạn',
    },
    {
        value: 'BKA',
        label: 'Đại học Bách Khoa Hà Nội (BKA)',
    },
    {
        value: 'DDT',
        label: 'Đại học Tôn Đức Thắng (DTT)',
    },
    {
        value: 'QSC',
        label: 'Đại học Công nghệ Thông Tin - Đại Học Quốc Gia TPHCM (QSC)',
    },
    {
        value: 'KMA',
        label: 'Học Viện Kỹ Thuật Mật Mã (KMA)',
    },
]

const validationSchema = yup.object({
    realName: yup
        .string('Nhập tên thật của bạn của bạn')
        .max(15, 'Tên không được dài quá 15 ký tự')
        .required('Bạn cần phải nhập tên thật'),
    address: yup
        .string('Nhập tên thật của bạn của bạn')
        .min(5, 'Địa chỉ chưa hợp lệ')
        .required('Bạn cần phải nhập tên thật'),
    phoneNumber: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Bạn cần phải nhập số điện thoại'),
})

function ProfileContact(props) {
    const validate = (values) => {
        const errors = {}

        if (!values.university || values.university === 'none') {
            errors.university = 'Bạn phải chọn trường đại học'
        }

        return errors
    }

    const formik = useFormik({
        initialValues: {
            realName: '',
            phoneNumber: '',
            address: '',
            university: '',
        },
        validationSchema: validationSchema,

        validate,

        onSubmit: (values) => {
            console.log(`Information updated`, values)

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
    })

    const classes = useStyles()

    return (
        <>
            <HeaderProfile props={props} />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Paper variant="outlined">
                        <Box style={{ margin: 20 }}>
                            <Typography variant="h5" gutterBottom className={classes.profileContactTittle}>
                                Thông Tin Liên Hệ
                            </Typography>
                            <Typography variant="subtitle2" className={classes.profileContactSubtittle}>
                                Quản lý thông tin liên hệ của bạn
                            </Typography>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        ></Box>
                        <div>
                            <form onSubmit={formik.handleSubmit} className={classes.formProfileContact}>
                                <Grid container alignItems="center" justifyContent="center" direction="row" spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            id="realName"
                                            name="realName"
                                            label="Tên thật"
                                            value={formik.values.realName}
                                            onChange={formik.handleChange}
                                            error={formik.touched.realName && Boolean(formik.errors.realName)}
                                            helperText={formik.touched.realName && formik.errors.realName}
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            label="Số điện thoại"
                                            value={formik.values.phoneNumber}
                                            onChange={formik.handleChange}
                                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                            size="small"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container alignItems="center" justifyContent="center" direction="row" spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            id="address"
                                            name="address"
                                            label="Địa chỉ"
                                            value={formik.values.address}
                                            onChange={formik.handleChange}
                                            error={formik.touched.address && Boolean(formik.errors.address)}
                                            helperText={formik.touched.address && formik.errors.address}
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomSelect
                                            error={formik.errors.university}
                                            onChange={(value) => formik.setFieldValue('university', value.value)}
                                            value={formik.values.university}
                                            options={universities}
                                            placeholder="Chọn trường đại học"
                                        />
                                        {formik.errors.university ? (
                                            <div
                                                style={{
                                                    fontSize: 12.5,
                                                    marginTop: '5px',
                                                    marginLeft: '12px',
                                                    color: 'red',
                                                }}
                                            >
                                                {formik.errors.university}
                                            </div>
                                        ) : null}
                                    </Grid>
                                </Grid>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    className={classes.btnFormProfileContact}
                                >
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

export default ProfileContact
