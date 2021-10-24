import React from 'react'
import { Paper, makeStyles, TextField, Typography, Grid, Container, Button } from '@material-ui/core'
import HeaderHome from '../../component/HeaderHome'
import * as yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import CustomSelect from '../../component/CustomSelect'
import DraftEditorCustom from '../../component/DraftEditorCustom'
import { useHistory } from 'react-router-dom'

const hashtagRegex = /(?:\s|^)#[A-Za-z0-9\-\.\_]+(?:\s|$)/g

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'white',
    },
    formPost: {
        margin: '100px auto',
        padding: 15,
        [theme.breakpoints.down('sm')]: {
            margin: '70px auto',
        },
    },
    newPost: {
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
            fontSize: 14,
            fontWeight: 'bold',
        },
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        marginLeft: '300px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '50px',
        },
    },
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
    textField: {
        marginBottom: 20,
        [theme.breakpoints.down('sm')]: {
            fontSize: 10,
        },
    },
    btnPost: {
        marginTop: 20,
        [theme.breakpoints.down('sm')]: {
            marginTop: 20,
        },
    },
}))

const validationSchema = yup.object({
    title: yup.string('Input the title').required('You have to input the title'),
    subtitle: yup.string('Input the subtitle').required('You have to input the subtitle'),
    content: yup.string('Input the content').required('You have to input the content'),
    hashtags: yup
        .string('Input the hashtags')
        .required('You have to input the hashtags')
        .matches(hashtagRegex, 'Hashtag is not valid'),
    thumbnail: yup.string('Input the thumbnail').required('You have to input the thumbnail'),
})

function PublishingPost(props) {
    const classes = useStyles()
    const history = useHistory()
    let categories = props.categories.docs

    categories = JSON.parse(JSON.stringify(categories).split('"name":').join('"label":'))
    categories = JSON.parse(JSON.stringify(categories).split('"_id":').join('"value":'))
    const validate = (values) => {
        const errors = {}

        if (values.category == 'Tất cả' || values.category === '') {
            errors.category = 'You have to input the category'
        }

        return errors
    }

    const formik = useFormik({
        initialValues: {
            title: 'Title',
            subtitle: 'Subtitle',
            content: 'Content',
            hashtags: 'Hashtags',
            thumbnail: 'Thumbnail',
            category: 'Category',
        },
        validationSchema: validationSchema,

        validate,

        onSubmit: async (values) => {
            values['hashtags'] = values['hashtags'].split(',')
            const res = await axios({
                method: 'post',
                url: 'https://haloha-backend.herokuapp.com/api/posts',
                data: values,
                headers: {
                    Authorization: props.auth.token,
                },
            })

            if (res.data.success) {
                // Action update user into redux store
                // let payload = JSON.parse(JSON.stringify(props.auth))
                // payload.user = res.data.payload
                console.log(`res`, res)
                history.push(`/p/${res.data.payload._id}`)
            } else {
                alert(res.data.error.message)
            }
            console.log(`values`, values)
        },
    })
    return (
        <div className={classes.root}>
            <HeaderHome props={props} />
            <Container maxWidth="lg">
                <Paper elevation={4} className={classes.formPost}>
                    <Grid align="center">
                        <Typography className={classes.newPost} gutterBottom variant="h6">
                            NEW POST
                        </Typography>
                    </Grid>
                    <div style={{ padding: 10 }}>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                fullWidth
                                id="title"
                                name="title"
                                label="Title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                                size="small"
                            />
                            <Grid container alignItems="center" justifyContent="center" direction="row" spacing={5}>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="subtitle"
                                        name="subtitle"
                                        label="Subtitle"
                                        value={formik.values.subtitle}
                                        onChange={formik.handleChange}
                                        error={formik.touched.subtitle && Boolean(formik.errors.subtitle)}
                                        helperText={formik.touched.subtitle && formik.errors.subtitle}
                                        size="small"
                                    />
                                    {formik.errors.hashtags ? (
                                        <div
                                            style={{
                                                fontSize: 12.5,
                                                marginTop: '5px',
                                                marginLeft: '12px',
                                                color: 'red',
                                                visibility: 'hidden',
                                            }}
                                        >
                                            {'error in hashtags. please check it'}
                                        </div>
                                    ) : null}
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="hashtags"
                                        name="hashtags"
                                        label="Hashtags"
                                        value={formik.values.hashtags}
                                        onChange={formik.handleChange}
                                        error={formik.touched.hashtags && Boolean(formik.errors.hashtags)}
                                        helperText={formik.touched.hashtags && formik.errors.hashtags}
                                        size="small"
                                    />
                                    {formik.errors.subtitle ? (
                                        <div
                                            style={{
                                                fontSize: 12.5,
                                                marginTop: '5px',
                                                marginLeft: '12px',
                                                color: 'red',
                                                visibility: 'hidden',
                                            }}
                                        >
                                            {'error in subtitle. please check it'}
                                        </div>
                                    ) : null}
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                alignItems="center"
                                justifyContent="center"
                                direction="row"
                                spacing={5}
                                style={{ marginBottom: 15 }}
                            >
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="thumbnail"
                                        name="thumbnail"
                                        label="Thumbnail"
                                        value={formik.values.thumbnail}
                                        onChange={formik.handleChange}
                                        error={formik.touched.thumbnail && Boolean(formik.errors.thumbnail)}
                                        helperText={formik.touched.thumbnail && formik.errors.thumbnail}
                                        size="small"
                                    />
                                    {formik.errors.category ? (
                                        <div
                                            style={{
                                                fontSize: 12.5,
                                                marginTop: '5px',
                                                marginLeft: '12px',
                                                color: 'red',
                                                visibility: 'hidden',
                                            }}
                                        >
                                            {'error in category. please check it'}
                                        </div>
                                    ) : null}
                                </Grid>

                                <Grid item xs={6}>
                                    <CustomSelect
                                        error={formik.errors.category}
                                        onChange={(value) => formik.setFieldValue('category', value.value)}
                                        value={formik.values.category}
                                        options={categories}
                                        placeholder="Category"
                                    />
                                    {formik.errors.category ? (
                                        <div
                                            style={{
                                                fontSize: 12.5,
                                                marginTop: '5px',
                                                marginLeft: '12px',
                                                color: 'red',
                                            }}
                                        >
                                            {formik.errors.category}
                                        </div>
                                    ) : null}
                                    {formik.errors.thumbnail ? (
                                        <div
                                            style={{
                                                fontSize: 12.5,
                                                marginTop: '5px',
                                                marginLeft: '12px',
                                                color: 'red',
                                                visibility: 'hidden',
                                            }}
                                        >
                                            {'error in thumbnail. please check it'}
                                        </div>
                                    ) : null}
                                </Grid>
                            </Grid>
                            {/* <TextField
                                className={classes.textField}
                                variant="outlined"
                                fullWidth
                                id="content"
                                name="content"
                                label="Content"
                                value={formik.values.content}
                                onChange={formik.handleChange}
                                error={formik.touched.content && Boolean(formik.errors.content)}
                                helperText={formik.touched.content && formik.errors.content}
                                size="small"
                            /> */}
                            <DraftEditorCustom
                                htmlText={formik.values.content}
                                onChange={(htmlText) => formik.setFieldValue('content', htmlText)}
                            />
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth
                                type="submit"
                                className={classes.btnPost}
                            >
                                Post
                            </Button>
                        </form>
                    </div>
                </Paper>
            </Container>
        </div>
    )
}

export default PublishingPost
