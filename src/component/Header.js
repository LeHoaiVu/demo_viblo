import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { makeStyles, alpha } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';

const drawerWidth = 300;


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
        textDecoration: 'none'
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

const Header = () => {



    

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Box display='flex' flexGrow={1}>
                        <Link to='/'>
                            <img 
                                alt='logoheader-img'
                                className={classes.logoHeader}
                                src="images/logo.png"
                            >
                            </img>
                        </Link>
                    </Box>
                    <>
                        <Link to='./login' style={{textDecoration: 'none'}}>
                            <Button 
                                variant='contained'
                                color='primary'
                                className={classes.btnHeader}                                
                            >
                                SIGN IN
                            </Button>
                        </Link>
                        <Link to='./register' style={{textDecoration: 'none'}}>
                            <Button 
                                variant='contained'
                                color='primary'
                                className={classes.btnHeader}                            
                            >
                                SIGN UP
                            </Button>
                        </Link>
                    </>
                </Toolbar>
            </AppBar>    
      </div>
    )
}

export default Header;


