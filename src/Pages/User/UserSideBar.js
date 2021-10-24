import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100,
        [theme.breakpoints.down('sm')]: {
            margin: '0px auto',
        },
    },
    sidebarAboutBox: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[200],
        width: 220,
        borderStyle: 'outset',
    },
    sidebarSection: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        fontFamily: 'sans-serif',
        fontSize: 12,
    },
}))

function UserSideBar(props) {
    const { postOfUser } = props
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Grid item>
                <Box className={classes.sidebarAboutBox}>
                    <Typography variant="subtitle1" gutterBottom className={classes.sidebarSection}>
                        {`Number of the post: ${postOfUser.totalDocs}`}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.sidebarSection}>
                        {`Views: ${postOfUser.docs.reduce((total, currValue) => {
                            return total + currValue.views_count
                        }, 0)}`}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.sidebarSection}>
                        {`Likes: ${postOfUser.docs.reduce((total, currValue) => {
                            return total + currValue.likes_count
                        }, 0)}`}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.sidebarSection}>
                        {`Comments: ${postOfUser.docs.reduce((total, currValue) => {
                            return total + currValue.comments_count
                        }, 0)}`}
                    </Typography>
                </Box>
            </Grid>
        </div>
    )
}

export default UserSideBar
