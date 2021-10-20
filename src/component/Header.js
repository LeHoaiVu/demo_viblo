import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    logoHeader: {
        width: '60px',
        height: '20px',
    },
    btnHeader: {
        width: '70px',
        height: '25px',
        padding: '5px',
        margin: '5px',
        [theme.breakpoints.up('lg')]: {
            width: '100px',
            height: '40px',
            padding: '5px',
        },
    },
    root: {
        display: 'flex',
    },
    btnHeaderText: {
        fontSize: '10px',
        [theme.breakpoints.up('lg')]: {
            fontSize: '13px',
        },
    },
    appBar: {
        backgroundColor: '#66ccff',
    },
}))

const Header = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <CssBaseline />
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
                                <Typography className={classes.btnHeaderText}>SIGN IN</Typography>
                            </Button>
                        </Link>
                        <Link to="./register" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary" className={classes.btnHeader}>
                                <Typography className={classes.btnHeaderText}>SIGN UP</Typography>
                            </Button>
                        </Link>
                    </>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
