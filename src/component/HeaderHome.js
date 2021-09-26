import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { Box, IconButton, Link, Divider, Menu, ListItemIcon, ListItemText, MenuItem, InputBase } from '@material-ui/core';
import { makeStyles, withStyles, alpha } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { USER_TOKEN } from '../utils/localStorage';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import PersonIcon from '@material-ui/icons/Person';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import HistoryIcon from '@material-ui/icons/History';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import SettingsIcon from '@material-ui/icons/Settings';

const drawerWidth = 300;

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
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({

    logoHeader: {
        width: '60px',
        height: '20px',
        
    },
    btnHeader: {
        width: '100px',
        height: '40px',
        padding: '5px',
        margin:'10px',
    },
    root: {
        display: 'flex',
      },
    appBar: {
        backgroundColor: '#66ccff',
        zIndex: theme.zIndex.drawer + 1,
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
    menuBox :{
        marginLeft: '15px',
        marginRight: '15px',
        width: 80,
        height: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        '&:hover':{
            border: '1px solid',
            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .2)',
            outlineColor: 'rgba(255, 255, 255, 0)',
            outlineOffset: '15px',
            textShadow: '1px 1px 2px #427388',
        }
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
        '&:hover':{
            border: '1px solid',
            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .2)',
            outlineColor: 'rgba(255, 255, 255, 0)',
            outlineOffset: '15px',
            textShadow: '1px 1px 2px #427388',
        }
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
		marginBottom: '5px'
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
        color: 'black'
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

}));

const HeaderHome = ({props}) => {

    const history = useHistory();
 
    const [anchorElHome, setAnchorElHome] = useState(null);

    const { auth } = props;
    const checkLogged = !auth.logged;

    
    const handleLogout = () => {
        USER_TOKEN.delete();
        window.location.replace('/');
    }
    
    const handleOpenMenuHome = (e) => {
        setAnchorElHome(e.currentTarget);
        
    }

    const handleCloseMenuHome = () => {
        setAnchorElHome(null);
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            {checkLogged ? (
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Box display='flex' flexGrow={1}>
                        <Link href='/home'>
                            <img 
                                alt='logoheader-img'
                                className={classes.logoHeader}
                                src="images/logo.png"
                                >
                            </img>
                        </Link>
                    </Box>
                    <>
                        <Button 
                            variant='contained'
                            color='primary'
                            className={classes.btnHeader}
                            href='./login'
                        >
                            SIGN IN
                        </Button>
                        <Button 
                            variant='contained'
                            color='primary'
                            className={classes.btnHeader}
                            href='./register'
                        >
                            SIGN UP
                        </Button>
                    </>
                </Toolbar>
            </AppBar>
            ):(
                <>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <Box display='flex' flexGrow={1}>
                                <Link href='/home'>
                                    <img 
                                        alt='logoheader-img'
                                        className={classes.logoHeader}
                                        src="../images/logo.png"
                                        >
                                    </img>
                                </Link>
                            </Box>
                            <>
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
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                                <IconButton color="inherit">
                                    <Badge badgeContent={4} color="secondary">
                                        <InfoIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton color="inherit">
                                    <Badge badgeContent={17} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton color="inherit">
                                    <BorderColorIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="more"
                                    aria-controls="customized-menu"
                                    aria-haspopup="true"
                                    variant="contained"
                                    onClick={handleOpenMenuHome}
                                >
                                    <Avatar src={auth.user.avatar}/>
                                </IconButton>
                                <StyledMenu
                                    id="customized-menu"
                                    anchorEl={anchorElHome}
                                    keepMounted
                                    open={Boolean(anchorElHome)}
                                    onClose={handleCloseMenuHome}
                                >
                                    <StyledMenuItem
                                        onClick={()=>{
                                            history.push('/profile')}}
                                    >
                                        <ListItemIcon>
                                            <Avatar 
                                                src={auth.user.avatar} 
                                                className={classes.logoMenu} 
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary={auth.user.fullName} />
                                    </StyledMenuItem>
                                    <StyledMenuItem
                                        onClick={()=>{
                                            history.push('/profile')}}
                                    >
                                        <ListItemIcon>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <ListItemText primary='Trang cá nhân' />
                                    </StyledMenuItem>
                                    <StyledMenuItem
                                        onClick={()=>{
                                            history.push('/profile')}}
                                    >
                                        <ListItemIcon>
                                            <InsertDriveFileIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary='Quản lý nội dung' />
                                    </StyledMenuItem>
                                    <StyledMenuItem
                                        onClick={()=>{
                                            history.push('/profile')}}
                                    >
                                        <ListItemIcon>
                                            <HistoryIcon />
                                        </ListItemIcon>
                                        <ListItemText primary='Lịch sử hoạt động' />
                                    </StyledMenuItem>
                                    <StyledMenuItem
                                        onClick={()=>{
                                            history.push('/profile')}}
                                    >
                                        <ListItemIcon>
                                            <LocationCityIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary='Tổ chức' />
                                    </StyledMenuItem>
                                    <StyledMenuItem
                                        onClick={()=>{
                                            history.push('/profile')}}
                                    >
                                        <ListItemIcon>
                                            <SettingsIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary='Tùy chỉnh' />
                                    </StyledMenuItem>
                                    <Divider style={{borderStyle: '2px solid black'}}/>
                                    <StyledMenuItem onClick={()=>handleLogout()}>
                                        <ListItemIcon>
                                            <ExitToAppIcon />
                                        </ListItemIcon>
                                        <ListItemText primary='Đăng xuất' />
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

export default HeaderHome;


