import React, { Component } from 'react'
import { CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './../Pages/Home/Home'
import Login from './../Pages/Login/Login'
import Profile from '../Pages/Profile/Profile'
import Register from './../Pages/Register/Register'
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword'
import { USER_TOKEN } from '../utils/localStorage'
import { setAuth } from '../redux/auth'
import { setPost } from '../redux/post'
import { setCategories } from '../redux/categories'
import axios from 'axios'
import ProfileInfor from '../Pages/Profile/ProfileInfor'
import ProfileContact from '../Pages/Profile/ProfileContact'
import ProfileEmail from '../Pages/Profile/ProfileEmail'
import SecurityPassword from '../Pages/Security/SecurityPassword'
import DetailedPost from '../Pages/Post/DetailedPost'
import DetailedUser from '../Pages/User/DetailedUser'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

function mapStateToProps(state) {
    return {
        auth: state.auth,
        post: state.post,
        categories: state.categories,
    }
}

const mapActionsToProps = { setAuth, setPost, setCategories }

class MainContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isReady: false,
            tokenChecked: false,
            isResizedPage: false,
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { categories } = props
        const { tokenChecked } = state

        if (tokenChecked && categories.docs.length > 0) {
            return { isReady: true }
        }

        return null
    }

    checkUserToken = async () => {
        let token = USER_TOKEN.get()
        if (token) {
            // get user by token
            const res = await axios({
                url: 'https://haloha-backend.herokuapp.com/api/users/me',
                method: 'POST',
                headers: {
                    Authorization: token,
                },
            })
            if (res.data.success) {
                let payload = {
                    user: res.data.payload,
                    token,
                    logged: true,
                }
                this.props.setAuth(payload)
            } else {
                // delete token from localstorage
                USER_TOKEN.delete()
            }
        }

        this.setState({ tokenChecked: true })
    }

    getCategories = async () => {
        const res = await axios('https://haloha-backend.herokuapp.com/api/categories')
        if (res.data.success) {
            let payload = {
                docs: res.data.payload.docs,
            }
            // create "Tất cả" category
            payload.docs.unshift({ name: 'Tất cả', _id: '', slug: '' })
            this.props.setCategories(payload)
        } else {
            console.log(`getCategories error`, res.error)
        }
    }

    componentDidMount() {
        this.checkUserToken()
        this.getCategories()
    }

    render() {
        const { auth } = this.props
        const { isReady } = this.state

        console.log('redux store', this.props)

        return (
            <div>
                {isReady ? (
                    <div>
                        <Switch>
                            <Route path="/" exact render={(props) => <Home {...props} {...this.props} />} />
                            <Route path="/forgot-password" exact render={ForgotPassword} />
                            {/* <Route path='/home' exact render={(props) => auth?.logged ?  <Home {...props} {...this.props} /> : <Redirect to="/login" />} /> */}
                            <Route path="/login" exact render={(props) => <Login {...props} {...this.props} />} />
                            <Route path="/register" exact render={(props) => <Register {...props} {...this.props} />} />
                            <Route
                                path="/profile"
                                exact
                                render={(props) =>
                                    auth?.logged ? <Profile {...props} {...this.props} /> : <Redirect to="/login" />
                                }
                            />
                            <Route
                                path="/profile-infor"
                                exact
                                render={(props) =>
                                    auth?.logged ? (
                                        <ProfileInfor {...props} {...this.props} />
                                    ) : (
                                        <Redirect to="/login" />
                                    )
                                }
                            />
                            <Route
                                path="/profile-contact"
                                exact
                                render={(props) =>
                                    auth?.logged ? (
                                        <ProfileContact {...props} {...this.props} />
                                    ) : (
                                        <Redirect to="/login" />
                                    )
                                }
                            />
                            <Route
                                path="/profile-email"
                                exact
                                render={(props) =>
                                    auth?.logged ? (
                                        <ProfileEmail {...props} {...this.props} />
                                    ) : (
                                        <Redirect to="/login" />
                                    )
                                }
                            />
                            <Route
                                path="/security-password"
                                exact
                                render={(props) =>
                                    auth?.logged ? (
                                        <SecurityPassword {...props} {...this.props} />
                                    ) : (
                                        <Redirect to="/login" />
                                    )
                                }
                            />
                            <Route path="/p/:slug" render={(props) => <DetailedPost {...props} {...this.props} />} />
                            <Route path="/u/:_id" render={(props) => <DetailedUser {...props} {...this.props} />} />
                        </Switch>
                    </div>
                ) : (
                    <div style={{ position: 'relative', marginBottom: '25%' }}>
                        <CircularProgress
                            color="secondary"
                            style={{
                                position: 'absolute',
                                left: '50%',
                            }}
                        />
                    </div>
                )}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapActionsToProps)(MainContainer)
