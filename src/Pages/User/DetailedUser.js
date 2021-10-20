import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Container, CssBaseline, makeStyles, Typography } from '@material-ui/core'
import HeaderHome from '../../component/HeaderHome'
import AddIcon from '@material-ui/icons/Add'
import axios from 'axios'
import UserTabsBar from './UserTabsBar'
import Footer from '../../component/Footer'
import ScrollTop from '../../component/ScrollTop'
import { Fab } from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'white',
    },
    mainTop: {
        marginTop: 100,
        [theme.breakpoints.down('sm')]: {
            marginTop: 75,
        },
    },
    avtTop: {
        height: 100,
        width: 100,
    },
    followIcon: {
        [theme.breakpoints.down('sm')]: {
            width: 15,
            height: 15,
        },
    },
    followButton: {
        margin: '8px 0px 0px 20px ',
        height: 40,
        [theme.breakpoints.down('sm')]: {
            margin: '8px 0px 0px 20px ',
            height: 35,
            fontSize: 10,
            width: 130,
        },
    },
    userInfor: {
        marginBottom: 20,
    },
}))

const getDetailedUser = async (slug) => {
    let _slug = slug ? slug : ''
    let url = `https://haloha-backend.herokuapp.com/api/users/${_slug}`
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((res) => resolve(res.data))
            .catch((err) => console.log(`get detailed user err`, err))
    })
}

const getDetailedPostOfUser = async (slug) => {
    let _slug = slug ? slug : ''
    let url = `https://haloha-backend.herokuapp.com/api/posts?user=${_slug}`

    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((res) => resolve(res.data))
            .catch((err) => console.log(`get detailed user err`, err))
    })
}

const getUserPost = async ({ page, limit, category, user }) => {
    let _page = page ? page : 1
    let _limit = limit ? limit : 10
    let _category = category ? category : ''
    let _user = user ? user : ''

    let url = `https://haloha-backend.herokuapp.com/api/posts?page=${_page}&limit=${_limit}&category=${_category}&user=${_user}`

    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((res) => resolve(res.data))
            .catch((err) => console.log(`getPostes err`, err))
    })
}

function DetailedUser(props) {
    const [detailedUser, setDetailedUser] = useState(null)
    const [postOfUser, setPostOfUser] = useState(null)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [category, setCategory] = useState('')
    const [postes, setPostes] = useState(null)

    const classes = useStyles()

    const slug_user = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)

    const _getUserPost = async ({ page, limit, category }) => {
        if (detailedUser !== null) {
            let user = detailedUser._id
            let res = await getUserPost({ page, limit, category, user })
            if (res.success) {
                setPostes(res.payload)
            } else {
                console.log(`_getPostes error`, res.error)
            }
        }
    }

    const _getDetailedUser = async () => {
        let res = await getDetailedUser(slug_user)
        if (res.success) {
            setDetailedUser(res.payload)
        } else {
            console.log(` get detailedpost res.error`, res.error)
        }
    }
    const _getDetailedPostOfUser = async () => {
        let res = await getDetailedPostOfUser(slug_user)
        if (res.success) {
            setPostOfUser(res.payload)
        } else {
            console.log(` get detailedpost res.error`, res.error)
        }
    }

    const onCategoryChange = (category) => {
        setPage(1)
        setCategory(category)
        _getUserPost({ page: 1, limit: 10, category })
    }

    const onPaginationChange = (event, page) => {
        setPage(page)
        _getUserPost({ page, limit: 10, category })
    }

    useEffect(() => {
        if (detailedUser === null) {
            _getDetailedUser()
            _getUserPost({ page: 1, limit: 10 })
            _getDetailedPostOfUser()
        }
    }, [slug_user])

    return (
        <div className={classes.root}>
            <HeaderHome props={props} />
            <CssBaseline />
            {detailedUser !== null && (
                <div className={classes.mainTop}>
                    <Container className={classes.userInfor}>
                        <Box display="flex">
                            <Avatar src={detailedUser.avatar} className={classes.avtTop} id="back-to-top-anchor" />
                            <Box>
                                <Typography
                                    variant="h6"
                                    style={{ marginLeft: 20, fontWeight: 'bold', fontFamily: 'serif' }}
                                >
                                    {detailedUser.fullName}
                                </Typography>
                                <Typography
                                    style={{ color: '#9eadb6', fontSize: 14, marginLeft: 20 }}
                                >{`@${detailedUser.email.replace(/@.*$/, '')}`}</Typography>
                            </Box>
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon className={classes.followIcon} />}
                                color="primary"
                                className={classes.followButton}
                            >
                                Theo dõi
                            </Button>
                        </Box>
                    </Container>
                    <UserTabsBar
                        {...props}
                        onChange={(category) => onCategoryChange(category)}
                        postes={postes}
                        limit={limit}
                        page={page}
                        user={detailedUser}
                        postOfUser={postOfUser}
                        onPaginationChange={onPaginationChange}
                    />
                    <ScrollTop {...props}>
                        <Fab color="secondary" size="small" aria-label="scroll back to top">
                            <KeyboardArrowUpIcon />
                        </Fab>
                    </ScrollTop>
                    <Footer />
                </div>
            )}
        </div>
    )
}

export default DetailedUser
