import {
    Grid,
    Tab,
    Tabs,
    Toolbar,
    CssBaseline,
    Container,
    Box,
    Typography,
    Divider,
    Avatar,
    Paper,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import HomeSidebar from './HomeSidebar'
import ArtTrackOutlinedIcon from '@material-ui/icons/ArtTrackOutlined'
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined'
import PropTypes from 'prop-types'
import Pagination from '@material-ui/lab/Pagination'
import React from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import VisibilityIcon from '@material-ui/icons/Visibility'
import CommentIcon from '@material-ui/icons/Comment'
import dateFormat from 'dateformat'
import { Link, useHistory } from 'react-router-dom'
import numberWithCommas from '../../utils/numberWithCommas'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { timeCalculate } from '../Post/DetailedPostMain'

function TabPanel({ children, value, index, postes, limit, page, onChange, ...other }) {
    const classes = useStyles()
    const history = useHistory()
    const theme = useTheme()
    const mobileMatch = useMediaQuery(theme.breakpoints.up('sm'))
    console.log(`mobilematch`, mobileMatch)
    return (
        <div
            style={{
                backgroundColor: 'white',
            }}
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Grid container spacing={5} className={classes.mainGrid}>
                    <Grid item xs={12} md={8}>
                        <Box p={3} style={{ display: 'flex' }}>
                            <Box style={{ flexGrow: 1 }}>
                                <Typography variant="h6" className={classes.tabTextHeader}>
                                    {children}
                                </Typography>
                            </Box>
                            <Box style={{ display: 'flex', gap: '1rem' }}>
                                <ListAltOutlinedIcon />
                                <ArtTrackOutlinedIcon />
                            </Box>
                        </Box>
                        <Divider style={{ marginBottom: '20px' }} />
                        <Grid container spacing={2} style={{ marginBottom: '10px' }}>
                            {postes === null && <Typography className={classes.tex}>Không có bài đăng nào</Typography>}
                            {postes?.docs?.length > 0 &&
                                postes.docs.map((post, index) => (
                                    <Grid key={index} item xs={12}>
                                        {mobileMatch ? (
                                            <Paper elevation={6} className={classes.postItem}>
                                                <Box display="flex" flexGrow={1}>
                                                    <Grid container direction="column">
                                                        <Link
                                                            to={`/p/${post.slug}`}
                                                            style={{
                                                                textDecoration: 'none',
                                                                color: 'black',
                                                            }}
                                                        >
                                                            <Box
                                                                component="div"
                                                                className={classes.cardTittle}
                                                                sx={{
                                                                    textOverflow: 'ellipsis',
                                                                    my: 2,
                                                                    overflow: 'hidden',
                                                                    bgcolor: 'background.paper',
                                                                }}
                                                            >
                                                                {post.title}
                                                            </Box>
                                                        </Link>
                                                        <Box
                                                            component="div"
                                                            className={classes.subCardTittle}
                                                            sx={{
                                                                textOverflow: 'ellipsis',
                                                                my: 2,
                                                                overflow: 'hidden',
                                                                bgcolor: 'background.paper',
                                                            }}
                                                        >
                                                            {post.subtitle}
                                                        </Box>

                                                        <Grid container justifyContent="space-between">
                                                            <Grid item xs={6}>
                                                                <Grid container>
                                                                    <Grid item>
                                                                        <Link
                                                                            to={`/u/${post.user._id}`}
                                                                            style={{
                                                                                textDecoration: 'none',
                                                                            }}
                                                                        >
                                                                            <Avatar
                                                                                src={post.user.avatar}
                                                                                onClick={() =>
                                                                                    history.push(`/u/${post.user._id}`)
                                                                                }
                                                                            />
                                                                        </Link>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Link
                                                                            to={`/u/${post.user._id}`}
                                                                            style={{
                                                                                textDecoration: 'none',
                                                                                color: 'black',
                                                                            }}
                                                                        >
                                                                            <Typography
                                                                                variant="subtitle2"
                                                                                style={{
                                                                                    padding: 8,
                                                                                    color: 'royalblue',
                                                                                    fontWeight: 600,
                                                                                }}
                                                                            >
                                                                                {post.user.fullName}
                                                                            </Typography>
                                                                        </Link>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item xs={6} style={{ margin: '9px 0px 10px 0px' }}>
                                                                <Typography
                                                                    variant="subtittle2"
                                                                    className={classes.dateTimePost}
                                                                >
                                                                    {dateFormat(post.createdAt)}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>

                                                        <Box display="flex" style={{ marginTop: 10 }}>
                                                            <Box display="flex">
                                                                <ThumbUpAltIcon color="disabled" />
                                                                <Typography
                                                                    variant="caption"
                                                                    style={{
                                                                        padding: 5,
                                                                        color: '#668c99',
                                                                    }}
                                                                >
                                                                    {numberWithCommas(post.likes_count)}
                                                                </Typography>
                                                            </Box>
                                                            <Box
                                                                display="flex"
                                                                style={{
                                                                    margin: '0px 10px',
                                                                }}
                                                            >
                                                                <VisibilityIcon color="disabled" />
                                                                <Typography
                                                                    variant="caption"
                                                                    style={{
                                                                        padding: 5,
                                                                        color: '#668c99',
                                                                    }}
                                                                >
                                                                    {numberWithCommas(post.views_count)}
                                                                </Typography>
                                                            </Box>
                                                            <Box
                                                                display="flex"
                                                                style={{
                                                                    margin: '0px 10px',
                                                                }}
                                                            >
                                                                <CommentIcon
                                                                    color="disabled"
                                                                    style={{
                                                                        height: 20,
                                                                        marginTop: 4,
                                                                    }}
                                                                />
                                                                <Typography
                                                                    variant="caption"
                                                                    style={{
                                                                        padding: 5,
                                                                        color: '#668c99',
                                                                    }}
                                                                >
                                                                    {numberWithCommas(post.comments_count)}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </Grid>
                                                </Box>
                                                <>
                                                    <Link
                                                        to={`/p/${post.slug}`}
                                                        style={{
                                                            textDecoration: 'none',
                                                        }}
                                                    >
                                                        <img
                                                            src={post.thumbnail}
                                                            alt={post.title}
                                                            style={{
                                                                maxWidth: 200,
                                                                maxHeight: 150,
                                                                objectFit: 'cover',
                                                            }}
                                                        />
                                                    </Link>
                                                </>
                                            </Paper>
                                        ) : (
                                            <Paper elevation={6} className={classes.postItem}>
                                                <Link
                                                    to={`/p/${post.slug}`}
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: 'black',
                                                    }}
                                                >
                                                    <Box
                                                        component="div"
                                                        className={classes.cardTittle}
                                                        sx={{
                                                            textOverflow: 'ellipsis',
                                                            my: 2,
                                                            overflow: 'hidden',
                                                            bgcolor: 'background.paper',
                                                        }}
                                                    >
                                                        {post.title}
                                                    </Box>
                                                </Link>
                                                <Box display="flex">
                                                    <Box display="flex" justifyContent="space-between">
                                                        <Link
                                                            to={`/p/${post.slug}`}
                                                            style={{
                                                                textDecoration: 'none',
                                                            }}
                                                        >
                                                            <img
                                                                src={post.thumbnail}
                                                                alt={post.title}
                                                                className={classes.imgPost}
                                                            />
                                                        </Link>
                                                    </Box>

                                                    <Box style={{ marginLeft: 15 }}>
                                                        <Box display="flex">
                                                            <Link
                                                                to={`/u/${post.user._id}`}
                                                                style={{
                                                                    textDecoration: 'none',
                                                                }}
                                                            >
                                                                <Avatar
                                                                    style={{ width: 35, height: 35 }}
                                                                    src={post.user.avatar}
                                                                    onClick={() => history.push(`/u/${post.user._id}`)}
                                                                />
                                                            </Link>
                                                            <div className={classes.userNamePost}>
                                                                <Link
                                                                    to={`/u/${post.user._id}`}
                                                                    style={{
                                                                        textDecoration: 'none',
                                                                        color: 'black',
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="subtitle2"
                                                                        style={{
                                                                            color: 'royalblue',
                                                                            fontWeight: 600,
                                                                            fontSize: 11,
                                                                        }}
                                                                    >
                                                                        {post.user.fullName}
                                                                    </Typography>
                                                                </Link>
                                                                <Typography
                                                                    variant="subtittle2"
                                                                    className={classes.dateTimePost}
                                                                >
                                                                    {timeCalculate(post.createdAt)}
                                                                </Typography>
                                                            </div>
                                                        </Box>
                                                        <Box
                                                            component="div"
                                                            className={classes.subCardTittle}
                                                            sx={{
                                                                textOverflow: 'ellipsis',
                                                                my: 2,
                                                                overflow: 'hidden',
                                                                bgcolor: 'background.paper',
                                                            }}
                                                        >
                                                            {post.subtitle}
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box display="flex" style={{ marginTop: 3 }}>
                                                    <Box display="flex" style={{ marginRight: 8 }}>
                                                        <ThumbUpAltIcon
                                                            color="disabled"
                                                            style={{ width: 15, height: 15 }}
                                                        />
                                                        <Typography
                                                            variant="caption"
                                                            style={{
                                                                paddingLeft: 2,
                                                                color: '#668c99',
                                                                fontSize: 10,
                                                            }}
                                                        >
                                                            {numberWithCommas(post.likes_count)}
                                                        </Typography>
                                                    </Box>
                                                    <Box display="flex" style={{ marginRight: 8 }}>
                                                        <VisibilityIcon
                                                            color="disabled"
                                                            style={{ width: 16, height: 16 }}
                                                        />
                                                        <Typography
                                                            variant="caption"
                                                            style={{
                                                                paddingLeft: 2,
                                                                color: '#668c99',
                                                                fontSize: 10,
                                                            }}
                                                        >
                                                            {numberWithCommas(post.views_count)}
                                                        </Typography>
                                                    </Box>
                                                    <Box display="flex">
                                                        <CommentIcon
                                                            color="disabled"
                                                            style={{ width: 15, height: 15, marginTop: 1 }}
                                                        />
                                                        <Typography
                                                            variant="caption"
                                                            style={{
                                                                paddingLeft: 2,
                                                                color: '#668c99',
                                                                fontSize: 10,
                                                            }}
                                                        >
                                                            {numberWithCommas(post.comments_count)}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Paper>
                                        )}
                                    </Grid>
                                ))}
                        </Grid>
                        <Grid container justifyContent="center" alignItems="center">
                            {postes?.docs?.length > 0 && (
                                <Pagination
                                    count={postes.totalPages}
                                    variant="outlined"
                                    shape="rounded"
                                    page={page}
                                    onChange={onChange}
                                />
                            )}
                        </Grid>
                    </Grid>
                    <HomeSidebar />
                </Grid>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'white',
    },
    logoHeader: {
        marginTop: 65,
        width: '100%',
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        marginLeft: 100,
        marginRight: 100,
        color: 'white',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 10,
            marginRight: 10,
        },
    },
    toolbarthird: {
        backgroundColor: '#99c2ff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    toolbarthirdText: {
        fontSize: 13,
        [theme.breakpoints.down('sm')]: {
            fontSize: 10,
        },
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
        [theme.breakpoints.down('sm')]: {
            fontSize: 11,
            fontWeight: 650,
            maxWidth: '100%',
        },
    },
    tabTextHeader: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 20,
        [theme.breakpoints.down('sm')]: {
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            fontSize: 13,
            padding: 5,
        },
    },
    postItem: {
        display: 'flex',
        height: 180,
        padding: '15px',
        [theme.breakpoints.down('lg')]: {
            width: 780,
        },
        [theme.breakpoints.down('md')]: {
            width: 660,
        },
        [theme.breakpoints.down('sm')]: {
            width: 350,
            flexDirection: 'column',
        },
    },
    cardTittle: {
        marginTop: 1,
        textOverflow: 'ellipsis',
        my: 2,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        fontWeight: 'bold',
        marginBottom: 10,
        width: 375,
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
            width: 300,
        },
    },
    subCardTittle: {
        marginTop: 1,
        textOverflow: 'ellipsis',
        my: 2,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        marginBottom: 10,
        width: 430,
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('sm')]: {
            marginTop: 5,
            width: 200,
            whiteSpace: 'pre-line',
            fontSize: 12,
            height: 30,
        },
    },
    imgPost: {
        maxWidth: 200,
        maxHeight: 150,
        objectFit: 'cover',
        [theme.breakpoints.down('sm')]: {
            maxWidth: 130,
            maxHeight: 95,
        },
        [theme.breakpoints.down('md')]: {
            maxWidth: 100,
            maxHeight: 90,
        },
        [theme.breakpoints.down('lg')]: {
            maxWidth: 80,
            maxHeight: 60,
        },
    },
    dateTimePost: {
        marginTop: 5,
        color: '#808080',
        [theme.breakpoints.down('sm')]: {
            fontSize: 11,
            marginTop: -2,
        },
    },
    userNamePost: {
        marginLeft: 5,
    },
}))

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    }
}

function TabsBar(props) {
    const classes = useStyles()

    const { categories, postes, limit, page, onPaginationChange, category, onCategoryChange } = props

    const handleChange = (event, value) => {
        let _category = ''
        if (value > 0) {
            _category = categories.docs[value]._id
        }
        onCategoryChange(_category)
    }

    let _value = categories.docs.map((item) => '' + item._id).indexOf('' + category) || 0

    return (
        <>
            <div
                style={{
                    backgroundColor: '#00004d',
                    marginTop: -5,
                }}
            >
                <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                    <Tabs
                        value={_value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                        indicatorColor="secondary"
                        textColor="secondary"
                    >
                        {categories?.docs?.length > 0 &&
                            categories.docs.map((item, index) => (
                                <Tab
                                    key={item._id}
                                    label={item.name}
                                    {...a11yProps(index)}
                                    className={classes.tabBar}
                                    value={index}
                                />
                            ))}
                    </Tabs>
                </Toolbar>
                <Toolbar component="nav" variant="dense" className={classes.toolbarthird}>
                    <a href="https://www.facebook.com/">
                        <Typography className={classes.toolbarthirdText}>
                            {'>> Tham gia Facebook group "Viblo Community" để cùng nhau học tập và kết nối <<'}
                        </Typography>
                    </a>
                </Toolbar>
            </div>

            <CssBaseline />
            <Container maxWidth="lg">
                <Grid item xs={12}>
                    {categories?.docs?.length > 0 &&
                        categories.docs.map((category, index) => (
                            <TabPanel
                                key={category.name}
                                value={_value}
                                index={index}
                                postes={postes}
                                limit={limit}
                                page={page}
                                onChange={onPaginationChange}
                            >
                                {category.name}
                            </TabPanel>
                        ))}
                </Grid>
            </Container>
        </>
    )
}

export default TabsBar
