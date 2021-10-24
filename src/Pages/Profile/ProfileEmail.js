import React from 'react'
import { Box, Button, Container, Divider, InputLabel, Paper, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import * as yup from 'yup'
import { useFormik } from 'formik'
import HeaderProfile from '../../component/HeaderProfile'

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
    email: {
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
        [theme.breakpoints.down('sm')]: {
            marginRight: '10px',
        },
    },
    mainEmail: {
        marginRight: '15px',
        fontSize: '13px',
        backgroundColor: '#40ff00',
        inlineSize: 'max-content',
        color: 'black',
        borderRadius: '8px',
        padding: '5px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
            whiteSpace: 'nowrap',
            height: '25px',
            marginRight: '5px',
        },
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
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
            whiteSpace: 'nowrap',
            height: '25px',
        },
    },
    btnEmail: {
        marginTop: 50,
        [theme.breakpoints.down('sm')]: {
            marginTop: 20,
        },
    },
    profileEmailTittle: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 18,
            fontWeight: 'bold',
        },
    },
    profileEmailSubtittle: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 13,
        },
    },
}))

const validationSchema = yup.object({
    emails: yup.string('Nhập email cần thêm').email('Email không hợp lệ').required('Bạn cần nhập email thêm'),
})

function ProfileEmail(props) {
    const classes = useStyles()

    const formik = useFormik({
        initialValues: {
            emails: '',
        },
        validationSchema: validationSchema,

        onSubmit: (values) => {
            console.log(`Information was updated`, values)

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

    return (
        <>
            <HeaderProfile props={props} />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Paper variant="outlined">
                        <Box style={{ margin: 20 }}>
                            <Typography variant="h5" gutterBottom className={classes.profileEmailTittle}>
                                Emails
                            </Typography>
                            <Typography variant="subtitle2" className={classes.profileEmailSubtittle}>
                                Your backup email address will be used as an additional destination for security-relevant account notifications and can also be used for password resets.
                            </Typography>
                        </Box>
                        <div style={{ margin: 20 }}>
                            <form onSubmit={formik.handleSubmit}>
                                <Box className={classes.boxItems}>
                                    <Box className={classes.boxItemEmail}>{props.auth.user.email}</Box>
                                    <Box className={classes.mainEmail}>Official Email</Box>
                                    <Box className={classes.boxItemVerified}>Verified</Box>
                                </Box>
                                <Divider style={{ margin: 20 }} />
                                <InputLabel style={{ marginTop: 15, marginBottom: 10, fontSize: 12 }}>
                                    Add new email
                                </InputLabel>
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
                                    fullWidth
                                    size="small"
                                />

                                <Button
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    className={classes.btnEmail}
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

export default ProfileEmail
