import { Box, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import HeaderProfile from '../../component/HeaderProfile';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
		marginLeft: '300px'
	},
  	appBarSpacer: theme.mixins.toolbar,
  	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
  	fixedHeight: {
    	height: 240,
  	},
 	paperItems: {
		display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(1),
			width: theme.spacing(16),
			height: theme.spacing(16),
		},
		marginBottom: 15,
  	},
  	paperItem: {
		marginLeft: '15px',
	  	marginRight: '15px',
		width: 325,
		height: 175,
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: '#b3cccc',
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
	logo: {
		width: '100px',
        height: '90px',
		marginBottom: '5px'
	},
	paperLink: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: 300,
		height: 150,
	}
}));


function Profile(props) {

    const classes = useStyles();

    return (
		<>
			<HeaderProfile props={props}/>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
					<Container maxWidth="lg" className={classes.container}>
						<Grid container direction="column"  justifyContent="center" alignItems="center">
							<Grid item >
								<Avatar 
									src={props.auth.user.avatar}
									style={{
										width: 100,
										height: 100,
										marginBottom: 15,
									}}
								/>
							</Grid>
							<Grid item>
								<Typography variant='h5'>Chào mừng, {props.auth.user.lastName}</Typography>
							</Grid>
							<Grid item>
								<Typography variant='subtitle1'>Quản lý thông tin cá nhân của bạn và bảo mật với Viblo Accounts</Typography>
							</Grid>
						</Grid>
						<Box>
							<Box className={classes.paperItems} style={{marginTop: 30}}>
								<Box className={classes.paperItem}>
									<Link 
										className={classes.paperLink} 
										underline="none"
										to="/profile-infor"
										style={{textDecoration: 'none'}}
									>
										<img 
											alt='man-logo'
											src="images/man.png"
											className={classes.logo}
										>
										</img>
										<Typography 
											style={{
												color: 'black'
											}}
											variant='h6'
										>
											Thông tin của tôi
										</Typography>
									</Link>
								</Box>
								<Box className={classes.paperItem}>
									<Link 
										className={classes.paperLink} 
										underline="none"
										to="/profile"
										style={{textDecoration: 'none'}}
									>
										<img 
											alt='password-logo'
											src="images/password.png"
											className={classes.logo}
										>
										</img>
										<Typography 
											style={{
												color: 'black'
											}}
											variant='h6'
										>
											Mật Khẩu
										</Typography>
									</Link>
								</Box>
								<Box className={classes.paperItem}>
									<Link 
										className={classes.paperLink} 
										underline="none"
										to="/profile"
										style={{textDecoration: 'none'}}
									>
										<img 
											alt='social_network-logo'
											src="images/social_network.png"
											className={classes.logo}
										>
										</img>
										<Typography 
											style={{
												color: 'black'
											}}
											variant='h6'
										>
											Tài khoản được liên kết
										</Typography>
									</Link>
								</Box>
							</Box>
							<Box className={classes.paperItems}>
								<Box className={classes.paperItem}>
									<Link 
										className={classes.paperLink} 
										underline="none"
										to="/profile"
										style={{textDecoration: 'none'}}
									>
										<img 
											alt='key-logo'
											src="images/key.png"
											className={classes.logo}
										>
										</img>
										<Typography 
											style={{
												color: 'black'
											}}
											variant='h6'
										>
											Mã bảo mật truy cập
										</Typography>
									</Link>
								</Box>
								<Box className={classes.paperItem}>
									<Link 
										className={classes.paperLink} 
										underline="none"
										to="/profile"
										style={{textDecoration: 'none'}}
									>
										<img 
											alt='3d-logo'
											src="images/3d.png"
											className={classes.logo}
										>
										</img>
										<Typography 
											style={{
												color: 'black'
											}}
											variant='h6'
										>
											Ứng dụng OAuth
										</Typography>
									</Link>
								</Box>
							</Box>
						</Box>
						<Box style={{marginTop:15}}>
							<Typography variant='h5'>Dịch vụ Viblo</Typography>
						</Box>
						<Box>
							<Box className={classes.paperItems} style={{marginTop: 10}}>
								<Box className={classes.paperItem}>
									<Link 
										className={classes.paperLink} 
										underline="none"
										to="/home"
										style={{textDecoration: 'none'}}
									>
										<img 
											alt='viblo--dark-logo'
											src="images/viblo--dark.png"
											style={{height: '50%'}}
										>
										</img>
									</Link>
								</Box>
								<Box className={classes.paperItem}>
									<Link 
										className={classes.paperLink} 
										underline="none"
										to="/profile"
										style={{textDecoration: 'none'}}
									>
										<img 
											alt='viblo-code-logo'
											src="images/viblo-code.png"
											className={classes.logo}
											style={{height: '30%', width: '100%'}}
										>
										</img>
									</Link>
								</Box>
								<Box className={classes.paperItem}>
									<Link 
										className={classes.paperLink} 
										underline="none"
										to="/profile"
										style={{textDecoration: 'none'}}
									>
										<img 
											alt='viblo-cv-logo'
											src="images/viblo-cv.png"
											className={classes.logo}
											style={{height: '50%', width: '90%'}}
										>
										</img>
									</Link>
								</Box>
							</Box>
							<Box className={classes.paperItems}>
								<Box className={classes.paperItem}>
									<Link 
										className={classes.paperLink} 
										underline="none"
										to="/profile"
										style={{textDecoration: 'none'}}
									>
										<img 
											alt='key--logo'
											src="images/key.png"
											className={classes.logo}
										>
										</img>
										<Typography 
											style={{
												color: 'black'
											}}
											variant='h6'
										>
											Mã bảo mật truy cập
										</Typography>
									</Link>
								</Box>
								<Box className={classes.paperItem}>
									<Link 
										className={classes.paperLink} 
										underline="none"
										to="/profile"
										style={{textDecoration: 'none'}}
									>
										<img 
											alt='3d-logo'
											src="images/3d.png"
											className={classes.logo}
										>
										</img>
										<Typography 
											style={{
												color: 'black'
											}}
											variant='h6'
										>
											Ứng dụng OAuth
										</Typography>
									</Link>
								</Box>
							</Box>
						</Box>
					</Container>
			</main>
		</>
    );
}

  export default Profile;