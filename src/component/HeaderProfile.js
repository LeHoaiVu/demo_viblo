import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import { Box, IconButton, Menu, Fade, Popper, Paper } from '@material-ui/core'
import { makeStyles, withStyles, alpha, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import ListItem from '@material-ui/core/ListItem'
import HomeIcon from '@material-ui/icons/Home'
import RecentActorsIcon from '@material-ui/icons/RecentActors'
import SecurityIcon from '@material-ui/icons/Security'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { USER_TOKEN } from '../utils/localStorage'
import AppsIcon from '@material-ui/icons/Apps'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import SportsHandballIcon from '@material-ui/icons/SportsHandball'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { Link, useHistory } from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery'

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

const useStyles = makeStyles((theme) => ({
    logoHeader: {
        width: '60px',
        height: '20px',
    },
    btnHeader: {
        width: '100px',
        height: '40px',
        padding: '5px',
        margin: '10px',
    },
    root: {
        display: 'flex',
    },
    appBar: {
        backgroundColor: '#66ccff',
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: 300,
        flexShrink: 0,
        [theme.breakpoints.down('md')]: {
            width: 100,
        },
    },
    drawerPaper: {
        width: 300,
        [theme.breakpoints.down('md')]: {
            width: 50,
        },
    },
    drawerContainer: {
        overflow: 'auto',
        marginTop: 70,
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
        height: '30px',
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
    avtLogoMenu: {
        width: 35,
        height: 35,
    },
    tabMenuItemMobile: {
        marginLeft: -15,
    },
    itemTabMobile: {
        textDecoration: 'none',
        fontSize: 11,
    },
    menuTabMobile: {
        height: 60,
    },
}))

const HeaderProfile = ({ props }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorElAccount, setAnchorElAccount] = useState(null)

    const [anchorMenuPI, setAnchorMenuPI] = useState(null)
    const [placementPI, setPlacementPI] = useState()
    const [openMenuPI, setOpenMenuPI] = useState(false)

    const [anchorMenuS, setAnchorMenuS] = useState(null)
    const [placementS, setPlacementS] = useState()
    const [openMenuS, setOpenMenuS] = useState(false)

    const [anchorMenuA, setAnchorMenuA] = useState(null)
    const [placementA, setPlacementA] = useState()
    const [openMenuA, setOpenMenuA] = useState(false)

    const theme = useTheme()
    const mobileMatch = useMediaQuery(theme.breakpoints.up('sm'))
    console.log(`mobilematch`, mobileMatch)

    const { auth } = props
    const checkLogged = !auth.logged

    const handleOpenMenu = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleOpenMenuAccount = (e) => {
        setAnchorElAccount(e.currentTarget)
    }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }
    const handleCloseMenuAccount = () => {
        setAnchorElAccount(null)
    }
    const handleClickMenuPersonalInfor = (newPlacement) => (event) => {
        setAnchorMenuPI(event.currentTarget)
        setOpenMenuPI((prev) => placementPI !== newPlacement || !prev)
        setOpenMenuA(false)
        setOpenMenuS(false)
        setPlacementPI(newPlacement)
    }
    const handleClickMenuSecurityTab = (newPlacement) => (event) => {
        setAnchorMenuS(event.currentTarget)
        setOpenMenuS((prev) => placementS !== newPlacement || !prev)
        setOpenMenuPI(false)
        setOpenMenuA(false)
        setPlacementS(newPlacement)
    }
    const handleClickMenuAppTab = (newPlacement) => (event) => {
        setAnchorMenuA(event.currentTarget)
        setOpenMenuPI(false)
        setOpenMenuS(false)
        setOpenMenuA((prev) => placementA !== newPlacement || !prev)
        setPlacementA(newPlacement)
    }
    const history = useHistory()

    const handleLogout = () => {
        USER_TOKEN.delete()
        let payload = {
            user: null,
            token: null,
            logged: false,
        }
        props.setAuth(payload)
        props.history.push('/')
    }

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <CssBaseline />
            {checkLogged ? (
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Box display="flex" flexGrow={1}>
                            <Link to="/">
                                <img alt="logoheader-img" className={classes.logoHeader} src="images/logo.png"></img>
                            </Link>
                        </Box>
                        <>
                            <Link to="./login" style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="primary" className={classes.btnHeader}>
                                    SIGN IN
                                </Button>
                            </Link>
                            <Link to="./register" style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="primary" className={classes.btnHeader}>
                                    SIGN UP
                                </Button>
                            </Link>
                        </>
                    </Toolbar>
                </AppBar>
            ) : (
                <>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <Box display="flex" flexGrow={1}>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <img alt="logoHeader" className={classes.logoHeader} src="images/logo.png"></img>
                                </Link>
                            </Box>
                            <>
                                <IconButton
                                    aria-label="more"
                                    aria-controls="customized-menu"
                                    aria-haspopup="true"
                                    variant="contained"
                                    onClick={handleOpenMenu}
                                >
                                    <AppsIcon />
                                </IconButton>
                                <StyledMenu
                                    id="customized-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseMenu}
                                >
                                    <Box className={classes.menuBoxes}>
                                        <Box className={classes.menuBox}>
                                            <Link
                                                className={classes.menuLink}
                                                to="/profile-infor"
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <Avatar src={auth.user.avatar} className={classes.avtLogoMenu} />
                                                <Typography
                                                    style={{
                                                        color: 'black',
                                                    }}
                                                    variant="subtitle2"
                                                >
                                                    Account
                                                </Typography>
                                            </Link>
                                        </Box>
                                        <Box className={classes.menuBox}>
                                            <Link
                                                className={classes.menuLink}
                                                to="/"
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <img
                                                    alt="password-logoMenu"
                                                    src="images/viblo-ico_menu_logopng.png"
                                                    className={classes.logoMenu}
                                                ></img>
                                                <Typography
                                                    style={{
                                                        color: 'black',
                                                    }}
                                                    variant="subtitle2"
                                                >
                                                    Viblo
                                                </Typography>
                                            </Link>
                                        </Box>
                                        <Box className={classes.menuBox}>
                                            <Link
                                                className={classes.menuLink}
                                                to="/profile-infor"
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <img
                                                    alt="password-logoMenu"
                                                    src="images/viblo-code-ico_MENULOGO.png"
                                                    className={classes.logoMenu}
                                                ></img>
                                                <Typography
                                                    style={{
                                                        color: 'black',
                                                    }}
                                                    variant="subtitle2"
                                                >
                                                    Viblo Code
                                                </Typography>
                                            </Link>
                                        </Box>
                                    </Box>
                                    <Box className={classes.menuBoxes}>
                                        <Box className={classes.menuBox}>
                                            <Link
                                                className={classes.menuLink}
                                                to="/profile-infor"
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <img
                                                    alt="password-logoMenu"
                                                    src="images/viblo-cv-ico_menulogo.png"
                                                    className={classes.logoMenu}
                                                ></img>
                                                <Typography
                                                    style={{
                                                        color: 'black',
                                                    }}
                                                    variant="subtitle2"
                                                >
                                                    Viblo CV
                                                </Typography>
                                            </Link>
                                        </Box>
                                        <Box className={classes.menuBox}>
                                            <Link
                                                className={classes.menuLink}
                                                to="/profile-infor"
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <img
                                                    alt="password-logoMenu"
                                                    src="images/viblo-ctf-icomenulogo.png"
                                                    className={classes.logoMenu}
                                                ></img>
                                                <Typography
                                                    style={{
                                                        color: 'black',
                                                    }}
                                                    variant="subtitle2"
                                                >
                                                    Viblo CTF
                                                </Typography>
                                            </Link>
                                        </Box>
                                        <Box className={classes.menuBox}>
                                            <Link
                                                className={classes.menuLink}
                                                to="/profile-infor"
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <img
                                                    alt="password-logoMenu"
                                                    src="images/viblo-learn-icomenulogo.png"
                                                    className={classes.logoMenu}
                                                ></img>
                                                <Typography
                                                    style={{
                                                        color: 'black',
                                                    }}
                                                    variant="subtitle2"
                                                >
                                                    Viblo Learning
                                                </Typography>
                                            </Link>
                                        </Box>
                                    </Box>
                                </StyledMenu>
                                <IconButton
                                    aria-label="more"
                                    aria-controls="customized-menu"
                                    aria-haspopup="true"
                                    variant="contained"
                                    onClick={handleOpenMenuAccount}
                                >
                                    <Avatar src={auth.user.avatar} />
                                </IconButton>
                                <StyledMenu
                                    id="customized-menu"
                                    anchorEl={anchorElAccount}
                                    keepMounted
                                    open={Boolean(anchorElAccount)}
                                    onClose={handleCloseMenuAccount}
                                >
                                    <Box className={classes.menuBoxes}>
                                        <Box className={classes.menuBox}>
                                            <Link
                                                className={classes.menuLink}
                                                style={{ textDecoration: 'none' }}
                                                to="/profile-infor"
                                            >
                                                <Avatar src={auth.user.avatar} className={classes.logoMenu} />
                                                <Typography
                                                    style={{
                                                        color: 'black',
                                                    }}
                                                    variant="subtitle2"
                                                >
                                                    {auth.user.fullName}
                                                </Typography>
                                            </Link>
                                        </Box>
                                    </Box>
                                    <Box className={classes.menuBoxes}>
                                        <Box className={classes.menuBox}>
                                            <Link
                                                className={classes.menuLink}
                                                to="/"
                                                style={{ textDecoration: 'none' }}
                                                onClick={() => handleLogout()}
                                            >
                                                <ExitToAppIcon />
                                                <Typography
                                                    style={{
                                                        color: 'black',
                                                    }}
                                                    variant="subtitle2"
                                                >
                                                    Sign Out
                                                </Typography>
                                            </Link>
                                        </Box>
                                    </Box>
                                </StyledMenu>
                            </>
                        </Toolbar>
                    </AppBar>
                    {mobileMatch ? (
                        <Drawer
                            className={classes.drawer}
                            variant="permanent"
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            <div className={classes.drawerContainer}>
                                <Accordion>
                                    <AccordionSummary>
                                        <HomeIcon style={{ marginRight: 10 }} />
                                        <Box>
                                            <Link
                                                to="/profile"
                                                className={classes.accordionLink}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                Home
                                            </Link>
                                        </Box>
                                    </AccordionSummary>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <AccountBoxIcon style={{ marginRight: 10 }} />
                                        <Typography className={classes.heading}>My Profile</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List component="div" disablePadding>
                                            <ListItem button className={classes.nested}>
                                                <AccountBoxIcon style={{ marginRight: 10 }} />
                                                <Box>
                                                    <Link to="/profile-infor" style={{ textDecoration: 'none' }}>
                                                        Personal Infor
                                                    </Link>
                                                </Box>
                                            </ListItem>
                                            <ListItem button className={classes.nested}>
                                                <RecentActorsIcon style={{ marginRight: 10 }} />
                                                <Box>
                                                    <Link to="/profile-contact" style={{ textDecoration: 'none' }}>
                                                        Contact Infor
                                                    </Link>
                                                </Box>
                                            </ListItem>
                                            <ListItem button className={classes.nested}>
                                                <MailOutlineIcon style={{ marginRight: 10 }} />
                                                <Box>
                                                    <Link to="/profile-email" style={{ textDecoration: 'none' }}>
                                                        Emails
                                                    </Link>
                                                </Box>
                                            </ListItem>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <SecurityIcon style={{ marginRight: 10 }} />
                                        <Typography className={classes.heading}>Security</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List component="div" disablePadding>
                                            <ListItem button className={classes.nested}>
                                                <VpnKeyIcon style={{ marginRight: 10 }} />
                                                <Box>
                                                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                                                        Password
                                                    </Link>
                                                </Box>
                                            </ListItem>
                                            <ListItem button className={classes.nested}>
                                                <AccountTreeIcon style={{ marginRight: 10 }} />
                                                <Box>
                                                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                                                        Connected Account
                                                    </Link>
                                                </Box>
                                            </ListItem>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <SportsHandballIcon style={{ marginRight: 10 }} />
                                        <Typography className={classes.heading}>Developer Setting</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List component="div" disablePadding>
                                            <ListItem button className={classes.nested}>
                                                <AppsIcon style={{ marginRight: 10 }} />
                                                <Box>
                                                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                                                        OAuth Apps
                                                    </Link>
                                                </Box>
                                            </ListItem>
                                            <ListItem button className={classes.nested}>
                                                <SportsHandballIcon style={{ marginRight: 10 }} />
                                                <Box>
                                                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                                                        Personal Access Tokens
                                                    </Link>
                                                </Box>
                                            </ListItem>
                                            <ListItem button className={classes.nested}>
                                                <Brightness7Icon style={{ marginRight: 10 }} />
                                                <Box>
                                                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                                                        Authorized OAuth Apps
                                                    </Link>
                                                </Box>
                                            </ListItem>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </Drawer>
                    ) : (
                        <Drawer
                            className={classes.drawer}
                            variant="permanent"
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            <div className={classes.drawerContainer}>
                                <Accordion className={classes.menuTabMobile}>
                                    <AccordionSummary>
                                        <IconButton
                                            onClick={() => history.push('/profile')}
                                            style={{ marginTop: '-8px' }}
                                        >
                                            <HomeIcon />
                                        </IconButton>
                                    </AccordionSummary>
                                </Accordion>
                                <Accordion className={classes.menuTabMobile}>
                                    <AccordionSummary
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        onClick={handleClickMenuPersonalInfor('right-start')}
                                        onBlur={() => setOpenMenuPI(false)}
                                    >
                                        <Popper
                                            open={openMenuPI}
                                            anchorEl={anchorMenuPI}
                                            placement={placementPI}
                                            transition
                                        >
                                            {({ TransitionProps }) => (
                                                <Fade {...TransitionProps} timeout={350}>
                                                    <Paper className={classes.tabMenuMobile}>
                                                        <List
                                                            component="div"
                                                            disablePadding
                                                            className={classes.tabMenuItemMobile}
                                                        >
                                                            <ListItem button className={classes.nested}>
                                                                <AccountBoxIcon />
                                                                <Box>
                                                                    <Link
                                                                        to="/profile-infor"
                                                                        className={classes.itemTabMobile}
                                                                    >
                                                                        Personal Info
                                                                    </Link>
                                                                </Box>
                                                            </ListItem>
                                                            <ListItem button className={classes.nested}>
                                                                <RecentActorsIcon />
                                                                <Box>
                                                                    <Link
                                                                        to="/profile-contact"
                                                                        className={classes.itemTabMobile}
                                                                    >
                                                                        Contact Info
                                                                    </Link>
                                                                </Box>
                                                            </ListItem>
                                                            <ListItem button className={classes.nested}>
                                                                <MailOutlineIcon />
                                                                <Box>
                                                                    <Link
                                                                        to="/profile-email"
                                                                        className={classes.itemTabMobile}
                                                                    >
                                                                        Emails
                                                                    </Link>
                                                                </Box>
                                                            </ListItem>
                                                        </List>
                                                    </Paper>
                                                </Fade>
                                            )}
                                        </Popper>
                                        <IconButton style={{ marginTop: '-8px 0px 0px 2px' }}>
                                            <AccountBoxIcon />
                                        </IconButton>
                                    </AccordionSummary>
                                </Accordion>
                                <Accordion className={classes.menuTabMobile}>
                                    <AccordionSummary
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        onClick={handleClickMenuSecurityTab('right-start')}
                                        onBlur={() => setOpenMenuS(false)}
                                    >
                                        <Popper
                                            open={openMenuS}
                                            anchorEl={anchorMenuS}
                                            placement={placementS}
                                            transition
                                        >
                                            {({ TransitionProps }) => (
                                                <Fade {...TransitionProps} timeout={350}>
                                                    <Paper className={classes.tabMenuMobile}>
                                                        <List
                                                            component="div"
                                                            disablePadding
                                                            className={classes.tabMenuItemMobile}
                                                        >
                                                            <ListItem button className={classes.nested}>
                                                                <VpnKeyIcon />
                                                                <Box>
                                                                    <Link
                                                                        to="/profile"
                                                                        className={classes.itemTabMobile}
                                                                    >
                                                                        Password
                                                                    </Link>
                                                                </Box>
                                                            </ListItem>
                                                            <ListItem button className={classes.nested}>
                                                                <AccountTreeIcon />
                                                                <Box>
                                                                    <Link
                                                                        to="/profile"
                                                                        className={classes.itemTabMobile}
                                                                    >
                                                                        Connected Accounts
                                                                    </Link>
                                                                </Box>
                                                            </ListItem>
                                                        </List>
                                                    </Paper>
                                                </Fade>
                                            )}
                                        </Popper>
                                        <IconButton style={{ marginTop: '-8px' }}>
                                            <SecurityIcon />
                                        </IconButton>
                                    </AccordionSummary>
                                </Accordion>
                                <Accordion className={classes.menuTabMobile}>
                                    <AccordionSummary
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        onClick={handleClickMenuAppTab('right-start')}
                                        onBlur={() => setOpenMenuA(false)}
                                    >
                                        <Popper
                                            open={openMenuA}
                                            anchorEl={anchorMenuA}
                                            placement={placementA}
                                            transition
                                        >
                                            {({ TransitionProps }) => (
                                                <Fade {...TransitionProps} timeout={350}>
                                                    <Paper className={classes.tabMenuMobile}>
                                                        <List
                                                            component="div"
                                                            disablePadding
                                                            className={classes.tabMenuItemMobile}
                                                        >
                                                            <ListItem button className={classes.nested}>
                                                                <AppsIcon />
                                                                <Box>
                                                                    <Link
                                                                        to="/profile"
                                                                        className={classes.itemTabMobile}
                                                                    >
                                                                        OAuth Applications
                                                                    </Link>
                                                                </Box>
                                                            </ListItem>
                                                            <ListItem button className={classes.nested}>
                                                                <SportsHandballIcon />
                                                                <Box>
                                                                    <Link
                                                                        to="/profile"
                                                                        className={classes.itemTabMobile}
                                                                    >
                                                                        Personal Access Tokens
                                                                    </Link>
                                                                </Box>
                                                            </ListItem>
                                                            <ListItem button className={classes.nested}>
                                                                <Brightness7Icon />
                                                                <Box>
                                                                    <Link
                                                                        to="/profile"
                                                                        className={classes.itemTabMobile}
                                                                    >
                                                                        Authorized OAuth Apps
                                                                    </Link>
                                                                </Box>
                                                            </ListItem>
                                                        </List>
                                                    </Paper>
                                                </Fade>
                                            )}
                                        </Popper>
                                        <IconButton style={{ marginTop: '-8px' }}>
                                            <SportsHandballIcon />
                                        </IconButton>
                                    </AccordionSummary>
                                </Accordion>
                            </div>
                        </Drawer>
                    )}
                </>
            )}
        </div>
    )
}

export default HeaderProfile
