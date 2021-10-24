import {
    Avatar,
    Box,
    Container,
    CssBaseline,
    Grid,
    makeStyles,
    Typography,
    Button,
    Tooltip,
    Toolbar,
    IconButton,
    Divider,
} from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import VisibilityIcon from '@material-ui/icons/Visibility'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import CommentIcon from '@material-ui/icons/Comment'
import dateFormat from 'dateformat'
import { Link } from 'react-router-dom'

/**
 * 
 * @param {String} htmlString 
 * @returns HTML DOM
 */
const renderHtmlFromHtmlString = (htmlString) => {
    try {
        return <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    } catch (error) {
        console.log(error.message)
        return ''
    }
}

export function timeCalculate(past, now) {
    now = new Date()

    let nowDate = Date.parse(now)
    let pastDate = Date.parse(past)

    let diffTime = (nowDate - pastDate) / 1000 // convert miliseconds to seconds
    let diff = Math.round(diffTime / (3600 * 24)) //day

    if (diff < 1) {
        diff = diff * 24 //hours
        if (diff < 1) {
            diff = diff * 60 // minutes
            if (diff < 1) {
                diff = diff * 60 // seconds
                return `${diff} giây trước`
            } else {
                return `${diff} phút trước`
            }
        } else {
            return `${diff} giờ trước`
        }
    } else {
        return `${diff} ngày trước`
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'white',
        marginTop: 70,
        [theme.breakpoints.down('sm')]: {
            marginTop: '10px 0px 0px',
            overflowX: 'hidden',
        },
    },
    logoHeader: {
        marginTop: 65,
        width: '100%',
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
        marginLeft: 100,
        marginRight: 100,
        color: 'white',
    },
    toolbarthird: {
        backgroundColor: '#99c2ff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
        margin: 12,
        color: 'white',
        fontFamily: 'cursive',
        fontSize: '12px',
        '&:hover': {
            borderBottom: 'solid 1px white',
        },
    },
    boxLink: {
        flexWrap: 'wrap',
    },
    btnWrite: {
        backgroundColor: '#0066ff',
        color: 'white',
        fontFamily: 'sans-serif',

        '&:hover': {
            backgroundColor: '#99c2ff',
        },
    },
    tabBar: {
        color: 'white',
    },
    imgPost: {
        padding: 25,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '40%',
        },
    },
    postInfor: {
        [theme.breakpoints.down('sm')]: {
            marginTop: 10,
        },
    },
    postTime: {
        color: '#9eadb6',
        fontSize: 13,
        [theme.breakpoints.down('sm')]: {
            fontSize: 11,
        },
    },
    postContainer: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '100%',
        },
    },
}))

DetailedPostMain.propTypes = {
    post: PropTypes.any.isRequired,
}

function DetailedPostMain(props) {
    const { post } = props

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container maxWidth="lg" className={classes.postContainer}>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={8}>
                        <Grid container direction="row">
                            <Grid item xs={12} md={4}>
                                <Box display="flex">
                                    <Link to={`/u/${post.user._id}`} style={{ textDecoration: 'none' }}>
                                        <Avatar src={post.user.fullName} style={{ height: 50, width: 50 }} />
                                    </Link>
                                    <Box style={{ marginLeft: 5 }}>
                                        <Box display="flex">
                                            <Link to={`/u/${post.user._id}`} style={{ textDecoration: 'none' }}>
                                                {post.user.fullName}
                                            </Link>
                                            <Typography
                                                style={{ color: '#9eadb6', fontSize: 14, margin: '0px 5px' }}
                                            >{`@${post.user.email.replace(/@.*$/, '')}`}</Typography>
                                        </Box>
                                        <Button
                                            variant="outlined"
                                            style={{ height: 20, textTransform: 'none', fontSize: 12 }}
                                        >
                                            Follow
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={8} className={classes.postInfor}>
                                <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                                    <Grid item>
                                        <Typography className={classes.postTime}>
                                            {`Posted at ${dateFormat(post.createdAt)} - ${timeCalculate(
                                                post.createdAt
                                            )}`}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Grid container>
                                            <Grid item>
                                                <Tooltip title={`Views: ${post.views_count}`} style={{ height: 15 }}>
                                                    <IconButton display="flex">
                                                        <VisibilityIcon color="disabled" style={{ height: 20 }} />
                                                        <Typography
                                                            style={{ fontSize: 11, padding: 2, color: '#9eadb6' }}
                                                        >
                                                            {post.views_count}
                                                        </Typography>
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                            <Grid item>
                                                <Tooltip
                                                    title={`Comments: ${post.comments_count}`}
                                                    style={{ height: 15 }}
                                                >
                                                    <IconButton display="flex">
                                                        <CommentIcon color="disabled" style={{ height: 17 }} />
                                                        <Typography
                                                            style={{ fontSize: 11, padding: 2, color: '#9eadb6' }}
                                                        >
                                                            {post.comments_count}
                                                        </Typography>
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                            <Grid item>
                                                <Tooltip
                                                    title={`Likes: ${post.likes_count}`}
                                                    style={{ height: 12 }}
                                                >
                                                    <IconButton display="flex">
                                                        <ThumbUpAltIcon color="disabled" style={{ height: 17 }} />
                                                        <Typography
                                                            style={{ fontSize: 11, padding: 2, color: '#9eadb6' }}
                                                        >
                                                            {post.likes_count}
                                                        </Typography>
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Typography variant="h4" gutterBottom style={{ padding: 25, fontWeight: 'bold' }}>
                            {post.title}
                        </Typography>
                        <Divider style={{ marginLeft: 25 }} />
                        <Typography variant="body2" gutterBottom style={{ padding: 25 }}>
                            {/* {post.content.replace(/(<([^>]+)>)/gi, '')} */}
                            {renderHtmlFromHtmlString(post.content)}
                        </Typography>
                        <img src={post.thumbnail} alt={post.title} className={classes.imgPost} />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default DetailedPostMain
