import { Avatar, Box, Container, CssBaseline, Grid, makeStyles, Typography, Button, Tooltip, Toolbar, IconButton, Divider } from '@material-ui/core'
import React from 'react';
import PropTypes from 'prop-types';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import dateFormat from "dateformat";
import { Link } from 'react-router-dom';


const timeCalculate = (past, now) =>{
	now = new Date();

	let nowDate = Date.parse(now)
	let pastDate = Date.parse(past)

	let diffTime = (nowDate - pastDate) / 1000; // convert miliseconds to seconds
	let diff = Math.round(diffTime/(3600 * 24)); //day

	if (diff < 1) {
		diff = diff * 24; //hours
		if (diff < 1){
			diff = diff * 60; // minutes
			if (diff < 1){
				diff = diff * 60; // seconds
				return (`${diff} giây trước`);
			}
			else {
				return (`${diff} phút trước`);
			}
		}
		else{
			return (`${diff} giờ trước`);
		}
	}
	else {
		return (`${diff} ngày trước`);
	}
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
		overflowX: 'auto',
		marginLeft: 100,
		marginRight: 100,	
		color: 'white',
	},
	toolbarthird: {
		backgroundColor: '#99c2ff',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	toolbarLink: {
		padding: theme.spacing(1),
		flexShrink: 0,
		margin: 12,
		color: 'white',
		fontFamily: 'cursive',
		fontSize: '12px',
		'&:hover':  {
			borderBottom: 'solid 1px white',
		}
	},
	boxLink:{
		flexWrap: 'wrap',
	},
	btnWrite: {
		backgroundColor: '#0066ff',
		color: 'white',
		fontFamily: 'sans-serif',
		
		'&:hover':  {
			backgroundColor: '#99c2ff',
		}
	},
	tabBar: {
		color: 'white',
	},
}));

DetailedPostMain.propTypes = {
	post: PropTypes.any.isRequired,
};

function DetailedPostMain(props) {
    const { post } = props
    console.log(`post`, post)

    const classes = useStyles();

    return (
        <div
            style={{
                marginTop: 70,
            }}

        >
            <CssBaseline/>
            <Container maxWidth="lg">
                <Grid container spacing={5} className={classes.mainGrid}>
                    <Grid item xs={12} md={8}>
                        <Box p={3} style={{ display: "flex"}}>
                            <Box display="flex" style={{ flexGrow: 1}}>
								<Link to={`/u/${post.user._id}`} style={{textDecoration: 'none'}}>
                                	<Avatar src={post.user.fullName} style={{height: 50, width: 50}}/>  
								</Link>                               
                                <Box style={{marginLeft: 5}}>
                                    <Box display="flex">
                                        <Link to={`/u/${post.user._id}`} style={{textDecoration: 'none'}}>
                                            {post.user.fullName}
                                        </Link>
                                        <Typography style={{color: "#9eadb6", fontSize: 14, margin: "0px 5px"}}>{`@${post.user.email.replace(/@.*$/,"")}`}</Typography>
										
									</Box>
									<Button variant="outlined" style={{height: 20, textTransform: "none", fontSize: 12}}>Theo dõi</Button>
                                </Box>
                            </Box>
                            <Box>
								<Typography style={{color: "#9eadb6", fontSize: 14}}>
									{`Đã đăng vào ${dateFormat(post.createdAt)} - ${timeCalculate(post.createdAt)}`}
								</Typography>
								<Grid container direction="row" justifyContent="flex-end" alignItems="flex-end">
									<Grid item>
										<Tooltip title={`Lượt xem: ${post.views_count}`} style={{height: 15, }}>
											<IconButton display="flex">
												<VisibilityIcon color="disabled" style={{height: 20 }}/>
												<Typography style={{fontSize: 11, padding: 2, color: "#9eadb6"}}>{post.views_count}</Typography>
											</IconButton>
										</Tooltip>
									</Grid>
									<Grid item>
										<Tooltip title={`Lượt bình luận: ${post.comments_count}`} style={{height: 15, }}>
											<IconButton display="flex">
												<CommentIcon color="disabled" style={{height: 17 }}/>
												<Typography style={{fontSize: 11, padding: 2, color: "#9eadb6"}}>{post.comments_count}</Typography>
											</IconButton>
										</Tooltip>
									</Grid>
									<Grid item>
										<Tooltip title={`Lượt like: ${post.likes_count}`} style={{height: 15, }}>
											<IconButton display="flex">
												<ThumbUpAltIcon color="disabled" style={{height: 20 }}/>
												<Typography style={{fontSize: 11, padding: 2, color: "#9eadb6"}}>{post.likes_count}</Typography>
											</IconButton>
										</Tooltip>
									</Grid>
								</Grid>
                            </Box>
                        </Box>
						<Typography variant="h4" gutterBottom style={{padding: 25, fontWeight: "bold" }}>
							{post.title}
						</Typography>
						<Divider style={{marginLeft: 25}}/>
						<Typography variant="body2" gutterBottom style={{padding: 25}}>
							{post.content.replace(/(<([^>]+)>)/gi, "")}
						</Typography>
						<img
							style={{padding: 25}}                                                 
							src={post.thumbnail}
							alt={post.title}
						/>
                    </Grid>

                </Grid>

            </Container>

        </div>

    )
}




export default DetailedPostMain
