import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import {
    Box,
    IconButton,
    Divider,
    Menu,
    ListItemIcon,
    ListItemText,
    MenuItem,
    InputBase,
    Typography,
} from '@material-ui/core'
import { makeStyles, withStyles, alpha, useTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { USER_TOKEN } from '../utils/localStorage'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router-dom'
import InfoIcon from '@material-ui/icons/Info'
import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import PersonIcon from '@material-ui/icons/Person'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import HistoryIcon from '@material-ui/icons/History'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import SettingsIcon from '@material-ui/icons/Settings'
import { Link } from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const drawerWidth = 300

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
))

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem)

const useStyles = makeStyles((theme) => ({
    logoHeader: {
        width: '60px',
        height: '20px',
    },
    btnHeader: {
        width: '70px',
        height: '25px',
        padding: '5px',
        margin: '-5px 0px 5px 5px',
        [theme.breakpoints.up('lg')]: {
            width: '100px',
            height: '40px',
            padding: '5px',
        },
    },
    btnHeaderText: {
        fontSize: '10px',
        [theme.breakpoints.up('lg')]: {
            fontSize: '13px',
        },
    },
    root: {
        display: 'flex',
    },
    appBar: {
        backgroundColor: '#66ccff',
        zIndex: theme.zIndex.drawer + 1,
        height: 55,
        width: '100%',
        [theme.breakpoints.down('md')]: {
            height: 50,
            width: '100%',
            position: 'absolute',
            float: 'none',
        },
        [theme.breakpoints.up('lg')]: {
            height: 50,
            width: '100%',
            position: 'absolute',
            float: 'none',
        },
        [theme.breakpoints.up('sm')]: {
            height: 50,
            width: '100%',
            position: 'absolute',
            float: 'none',
        },
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },

    menuBoxes: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
        marginBottom: 15,
    },
    menuBox: {
        marginLeft: '15px',
        marginRight: '15px',
        width: 80,
        height: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        '&:hover': {
            border: '1px solid',
            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .2)',
            outlineColor: 'rgba(255, 255, 255, 0)',
            outlineOffset: '15px',
            textShadow: '1px 1px 2px #427388',
        },
    },
    menuBoxHome: {
        marginLeft: '15px',
        marginRight: '15px',
        width: 150,
        height: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        '&:hover': {
            border: '1px solid',
            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .2)',
            outlineColor: 'rgba(255, 255, 255, 0)',
            outlineOffset: '15px',
            textShadow: '1px 1px 2px #427388',
        },
    },
    menuLink: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 70,
    },
    logoMenu: {
        width: '40px',
        height: '40px',
        marginBottom: '5px',
    },
    search: {
        position: 'relative',
        borderStyle: 'solid 10px',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        width: '250px',
        marginBottom: 10,
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',

        [theme.breakpoints.down('sm')]: {
            margin: '0px 10px 0px 115px',
            
            color: 'white',
        },
    },
    inputRoot: {
        color: 'black',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '25ch',
            },
        },
    },
    avtHome: {
        marginBottom: 10,
        [theme.breakpoints.down('sm')]: {
            width: 20,
            height: 20,
            margin: '0px 0px 5px 10px',
        },
    },
    textSearch: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
        },
    },
}))

const HeaderHome = ({ props }) => {
    const history = useHistory()

    const [anchorElHome, setAnchorElHome] = useState(null)

    const { auth } = props
    let checkLogged = !auth.logged

    const handleLogout = () => {
        USER_TOKEN.delete()
        let payload = {
            user: null,
            token: null,
            logged: false,
        }
        props.setAuth(payload)
        history.push('/')
    }

    const handleOpenMenuHome = (e) => {
        setAnchorElHome(e.currentTarget)
    }

    const handleCloseMenuHome = () => {
        setAnchorElHome(null)
    }

    const classes = useStyles()
    const theme = useTheme()
    const mobileMatch = useMediaQuery(theme.breakpoints.up('sm'))

    return (
        <div className={classes.root}>
            <CssBaseline />
            {checkLogged ? (
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Box display="flex" flexGrow={1}>
                            <Link to="/">
                                <img alt="logoheader-img" className={classes.logoHeader} src="../images/logo.png"></img>
                            </Link>
                        </Box>
                        <>
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="primary" className={classes.btnHeader}>
                                    <Typography className={classes.btnHeaderText}>SIGN IN</Typography>
                                </Button>
                            </Link>
                            <Link to="/register" style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="primary" className={classes.btnHeader}>
                                    <Typography className={classes.btnHeaderText}>SIGN UP</Typography>
                                </Button>
                            </Link>
                        </>
                    </Toolbar>
                </AppBar>
            ) : (
                <>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <Box display="flex" flexGrow={1}>
                                <Link to="/">
                                    <img
                                        alt="logoheader-img"
                                        className={classes.logoHeader}
                                        src="../images/logo.png"
                                    ></img>
                                </Link>
                            </Box>
                            <>
                                {mobileMatch ? (
                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <SearchIcon />
                                        </div>
                                        <InputBase
                                            placeholder="Tìm kiếm trên Viblo …"
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            className={classes.textSearch}
                                            inputProps={{ 'aria-label': 'search' }}
                                        />
                                    </div>
                                ) : (
                                    <div className={classes.searchIcon}>
                                        <IconButton color="inherit">
                                            <SearchIcon />
                                        </IconButton>
                                    </div>
                                )}
                                <IconButton color="inherit">
                                    <Badge badgeContent={4} color="secondary">
                                        <InfoIcon className={classes.badgeIcon} />
                                    </Badge>
                                </IconButton>
                                <IconButton color="inherit">
                                    <Badge badgeContent={17} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton color="inherit" onClick={()=>history.push('/publish/post')}>
                                    <BorderColorIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="more"
                                    aria-controls="customized-menu"
                                    aria-haspopup="true"
                                    variant="contained"
                                    onClick={handleOpenMenuHome}
                                    className={classes.avtHome}
                                >
                                    <Avatar src={auth.user.avatar} />
                                </IconButton>
                                <StyledMenu
                                    id="customized-menu"
                                    anchorEl={anchorElHome}
                                    keepMounted
                                    open={Boolean(anchorElHome)}
                                    onClose={handleCloseMenuHome}
                                >
                                    <StyledMenuItem
                                        onClick={() => {
                                            history.push('/profile')
                                        }}
                                    >
                                        <ListItemIcon>
                                            <Avatar src={auth.user.avatar} className={classes.logoMenu} />
                                        </ListItemIcon>
                                        <ListItemText primary={auth.user.fullName} />
                                    </StyledMenuItem>
                                    <StyledMenuItem
                                        onClick={() => {
                                            history.push(`/u/${auth.user._id}`)
                                        }}
                                    >
                                        <ListItemIcon style={{ padding: 8 }}>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Trang cá nhân" />
                                    </StyledMenuItem>
                                    <StyledMenuItem
                                        onClick={() => {
                                            history.push('/profile')
                                        }}
                                    >
                                        <ListItemIcon style={{ padding: 8 }}>
                                            <InsertDriveFileIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Quản lý nội dung" />
                                    </StyledMenuItem>
                                    <StyledMenuItem
                                        onClick={() => {
                                            history.push('/profile')
                                        }}
                                    >
                                        <ListItemIcon style={{ padding: 8 }}>
                                            <HistoryIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Lịch sử hoạt động" />
                                    </StyledMenuItem>
                                    <StyledMenuItem
                                        onClick={() => {
                                            history.push('/profile')
                                        }}
                                    >
                                        <ListItemIcon style={{ padding: 8 }}>
                                            <LocationCityIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Tổ chức" />
                                    </StyledMenuItem>
                                    <StyledMenuItem
                                        onClick={() => {
                                            history.push('/profile')
                                        }}
                                    >
                                        <ListItemIcon style={{ padding: 8 }}>
                                            <SettingsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Tùy chỉnh" />
                                    </StyledMenuItem>
                                    <Divider style={{ borderStyle: '2px solid black' }} />
                                    <StyledMenuItem onClick={() => handleLogout()}>
                                        <ListItemIcon style={{ padding: 8 }}>
                                            <ExitToAppIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Đăng xuất" />
                                    </StyledMenuItem>
                                </StyledMenu>
                            </>
                        </Toolbar>
                    </AppBar>
                </>
            )}
        </div>
    )
}

export default HeaderHome
