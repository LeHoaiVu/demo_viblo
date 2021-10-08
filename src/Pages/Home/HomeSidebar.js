import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    sidebarAboutBox: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.grey[200],
    },
    sidebarSection: {
      marginTop: theme.spacing(3),
    },
  }));

function HomeSidebar() {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={4}>
            <Link to='/' style={{textDecoration: 'none'}}>
                <Typography variant="subtitle1" gutterBottom className={classes.sidebarSection}>
                    CÂU HỎI MỚI NHẤT
                </Typography>
                
            </Link>
            <Link to='/' style={{textDecoration: 'none'}}>
                <Typography variant="subtitle1" gutterBottom className={classes.sidebarSection}>
                    CÁC TỔ CHỨC HÀNG ĐẦU
                </Typography>
            </Link>
            <Link to='/' style={{textDecoration: 'none'}}>
                <Typography variant="subtitle1" gutterBottom className={classes.sidebarSection}>
                    CÁC TÁC GIẢ HÀNG ĐẦU
                </Typography>  
            </Link>
        </Grid>
    )
}

export default HomeSidebar
