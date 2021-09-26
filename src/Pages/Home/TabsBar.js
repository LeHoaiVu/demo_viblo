import { Grid, Tab, Tabs, Toolbar, Link, CssBaseline, Container, Box, Typography, Divider, CardActionArea, Card, CardContent,  Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeSidebar from './HomeSidebar';
import ArtTrackOutlinedIcon from '@material-ui/icons/ArtTrackOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect } from 'react';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CommentIcon from '@material-ui/icons/Comment';
import dateFormat from "dateformat";


function TabPanel({ children, value, index, postes, limit, page, onChange, ...other }) {

	const classes = useStyles();

	return (
		<div
			style={{
				backgroundColor: 'white'
			}}
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && (

				<Grid container spacing={5} className={classes.mainGrid}>
					<Grid item xs={12} md={8}>
						<Box p={3} style={{ display: "flex"}}>
							<Box style={{ flexGrow: 1}}>
								<Typography variant='h6' style={{textTransform: 'uppercase', fontWeight: 'bold', fontFamily:'sans-serif'}}>
									{children}
								</Typography>

							</Box>
							<Box style={{ display: "flex", gap: '1rem'}}>
								<ListAltOutlinedIcon/>
								<ArtTrackOutlinedIcon/>
							</Box>
						</Box>
						<Divider style={{marginBottom: "10px"}}/>
                        <Grid container spacing={4} style={{marginBottom: "10px"}}>
                            {postes === null && <Typography>Không có bài đăng nào</Typography>}
                            {postes?.docs?.length > 0 && postes.docs.map((post, index) => (
                                <Grid key={index} item >
                                    <CardActionArea component="a" href={`/p/${post.slug}`}>
                                        <Card style={{display: 'flex'}}>
                                            <CardContent display='flex'>
                                                <Typography component="h5" variant="h5">
                                                    {post.title}
                                                </Typography>
                                                <Grid container direction="row" style={{margin: "10px 0px"}}>
                                                    <Grid item>
                                                        <Avatar 
                                                            src={post.user.avatar}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography 
                                                            variant='subtitle1'
                                                            style={{
                                                                padding: 5
                                                            }}
                                                        >
                                                            {post.user.lastName}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Typography variant="caption">
                                                    {dateFormat(post.createdAt)}
                                                </Typography>
                                                <div style={{ width: 375, whiteSpace: 'nowrap' }}>
                                                    <Box 
                                                        component="div"
                                                        sx={{
                                                            textOverflow: 'ellipsis',
                                                            my: 2,
                                                            overflow: 'hidden',
                                                            bgcolor: 'background.paper',
                                                        }}
                                                    >
                                                        {post.content.replace(/(<([^>]+)>)/gi, "")}
                                                    </Box>
                                                </div>
                                                <Box display="flex">
                                                    <Box display="flex">
                                                        <ThumbUpAltIcon color="disabled"/>
                                                        <Typography variant="caption" style={{padding: 5, color: "#668c99"}}>{post.likes_count}</Typography>
                                                    </Box>
                                                    <Box display="flex" style={{margin: "0px 10px"}}>
                                                        <VisibilityIcon color="disabled"/>
                                                        <Typography variant="caption" style={{padding: 5, color: "#668c99"}}>{post.views_count}</Typography>
                                                    </Box>
                                                    <Box display="flex" style={{margin: "0px 10px"}}>
                                                        <CommentIcon color="disabled"/>
                                                        <Typography variant="caption" style={{padding: 5, color: "#668c99"}}>{post.comments_count}</Typography>
                                                    </Box>
                                                    
                                                </Box>
                                            </CardContent>
                                            <>
                                                <img                                                 
                                                    src={post.thumbnail}
                                                    alt={post.title}
                                                />
                                            </>
                                            
                                        </Card>
                                    </CardActionArea>
                                </Grid>

                            ))}
                        </Grid>
                        <Grid container justifyContent="center" alignItems="center" >
                            {postes?.docs?.length > 0 && <Pagination count={postes.totalPages} variant="outlined" shape="rounded" page={page} onChange={onChange} />}
                        </Grid>
                    </Grid>
					<HomeSidebar/>
			  	</Grid>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

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

function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

function TabsBar(props) {

    const classes = useStyles();
    const {categories, onChange , postes, limit, page, onPaginationChange} = props
    console.log(`postes`, postes)

    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
        let categoryId = categories?.docs?.length > 0 ? categories.docs[value]._id : ''
        onChange(categoryId)
    }, [value])

    return (
        <>
            <div
                style={{
                    backgroundColor: '#00004d',
                    marginTop: -5,
                }}
            >
                <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                    <Tabs
                        value={value}
                        onChange={handleChange}					
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                        indicatorColor='secondary'
                        textColor= 'secondary'
                    >
                        {categories?.docs?.length > 0 && categories.docs.map((item, index) => (
                            <Tab 
                                key={item._id} 
                                label={item.name} 
                                {...a11yProps(index)}  
                                className={classes.tabBar} 
                                value={index}
                            />
                        ))}
                    </Tabs>
                </Toolbar>
                <Toolbar component="nav" variant="dense" className={classes.toolbarthird}>
                    <Link
                        href='https://www.facebook.com/'
                    >
                        {'>> Tham gia Facebook group "Viblo Community" để cùng nhau học tập và kết nối <<'}
                    </Link>
                </Toolbar>
            </div>

			<CssBaseline />
			<Container maxWidth="lg">
                {
					categories?.docs?.length > 0 && categories.docs.map((category, index) => (
						<TabPanel key={category.name} value={value} index={index} postes={postes} limit={limit} page={page} onChange={onPaginationChange}>
                            {category.name}
                        </TabPanel>
					))
				}
			</Container>
        </>
    );
}

export default TabsBar;