import { Box, Container, CssBaseline, Divider, Grid, Link, List, ListItem, ListItemIcon, ListItemText, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import ExtensionIcon from '@material-ui/icons/Extension';
import PublicIcon from '@material-ui/icons/Public';
import React, {useState} from 'react';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#001a4d",
        height: 400

    },
    logoFooter: {
        width: '25px',
        height: '25px',
        marginRight: '8px'
    },
 	paperItems: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1),
			width: theme.spacing(8),
			height: theme.spacing(8),
		},
		marginBottom: 15,
        color: 'white'
  	},
  	paperItem: {
		marginLeft: '15px',
	  	marginRight: '15px',
		width: 365,
		height: 275,
		display: 'flex',
		flexDirection: 'column',        
  	},
    linkItemFooters: {
        height: 20,
        width: 150
    },
    linkItemFooter: {
        color: "white",
        height: 20,
        width: 150
    },
    logoFooterGoogleStore:{
        width: 120,
        height: 50
    },
    logoFooterAppleStore: {
        width: 105,
        height: 35,
        marginLeft: 7
    },
    QR_code: {
        width: 110,
        height: 95
    },
    logoSocial: {
        margin: "0px 10px"
    },
    editedlogoSocial: {
        width: 24,
        height: 24

    },
    listItemFooterBottom: {
        color: "white",
        height: 20,
        margin: "15px 10px",
        padding: 10

    },
    linkItemFooterBottom: {
        height: 20,
        whiteSpace: "nowrap",
        overflow: "hidden",
        color: "white"
    }
}));

function Footer() {

    const [language, setLanguage] = useState(true);
    const [openChangeLanguage, setOpenChangeLanguage] = useState(false);

    const handleChangeLanguage = (event) => {
        setLanguage(event.target.value)
        console.log(`event.target.value`, event.target.value)
    }

    const handleOpenSelectLanguage = () => {
        setOpenChangeLanguage(true)
    }
    const handleCloseSelectLanguage = () => {
        setOpenChangeLanguage(false)
    }

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
			<Container maxWidth="lg">
                <Box className={classes.paperItems} style={{marginTop: 30}}>
                    <Box className={classes.paperItem}>
                        <Typography variant="subtitle1" style={{fontWeight: "bold", fontSize: 17, marginBottom: 10}}>
                            TÀI NGUYÊN
                        </Typography>
                        <Grid container direction="row">
                            <Grid item>
                                <List dense={false}>
                                    <ListItem button className={classes.listItemFooter}>
                                        <Link className={classes.linkItemFooter} underline="none">
                                            <Typography variant="subtitle2">
                                                Bài viết
                                            </Typography>
                                        </Link>
                                    </ListItem>
                                    <ListItem button>
                                        <Link className={classes.linkItemFooter} underline="none">
                                            <Typography variant="subtitle2">
                                                Câu hỏi
                                            </Typography>
                                        </Link>
                                    </ListItem>
                                    <ListItem button>
                                        <Link className={classes.linkItemFooter} underline="none">
                                            <Typography variant="subtitle2">
                                                Videos
                                            </Typography>
                                        </Link>
                                    </ListItem>
                                    <ListItem button>
                                        <Link className={classes.linkItemFooter} underline="none">
                                            <Typography variant="subtitle2">
                                                Thảo luận
                                            </Typography>
                                        </Link>
                                    </ListItem>
                                    <ListItem button>
                                        <Link className={classes.linkItemFooter} underline="none">
                                            <Typography variant="subtitle2">
                                                Công cụ
                                            </Typography>
                                        </Link>
                                    </ListItem>
                                    <ListItem button>
                                        <Link className={classes.linkItemFooter} underline="none">
                                            <Typography variant="subtitle2">
                                                Trạng thái hệ thống
                                            </Typography>
                                        </Link>
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item>
                                <List dense={false}>
                                    <ListItem button>
                                        <Link className={classes.linkItemFooter} underline="none">
                                            <Typography variant="subtitle2">
                                                Tổ chức
                                            </Typography>
                                        </Link>
                                    </ListItem>
                                    <ListItem button>
                                        <Link className={classes.linkItemFooter} underline="none">
                                            <Typography variant="subtitle2">
                                                Tags
                                            </Typography>
                                        </Link>
                                    </ListItem>
                                    <ListItem button>
                                        <Link className={classes.linkItemFooter} underline="none">
                                            <Typography variant="subtitle2">
                                                Tác giả
                                            </Typography>
                                        </Link>
                                    </ListItem>
                                    <ListItem button>
                                        <Link className={classes.linkItemFooter} underline="none">
                                            <Typography variant="subtitle2">
                                                Đề xuất hệ thống
                                            </Typography>
                                        </Link>
                                    </ListItem>
                                    <ListItem button>
                                        <Link className={classes.linkItemFooter} underline="none">
                                            <Typography variant="subtitle2">
                                                Machine Learning
                                            </Typography>
                                        </Link>
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box className={classes.paperItem}>
                        <Typography variant="subtitle1" style={{fontWeight: "bold", fontSize: 17, marginBottom: 10}} >
                            DỊCH VỤ
                        </Typography>
                        <List dense={false}>
                            <ListItem button>
                                <Link className={classes.linkItemFooter} underline="none">
                                    <Box display="flex">
                                            <img 
                                                src="../images/viblo-code_logoFooter.png"
                                                className={classes.logoFooter}
                                            >
                                            </img>
                                        <ListItemText primary="Viblo Code" />
                                    </Box>
                                    <Box display="flex">
                                            <img 
                                                src="../images/viblo-cv_logoFooter.png"
                                                className={classes.logoFooter}
                                            >
                                            </img>
                                        <ListItemText primary="Viblo CV" />
                                    </Box>
                                    <Box display="flex">
                                            <img 
                                                src="../images/viblo-ctf_logoFooter.png"
                                                className={classes.logoFooter}
                                            >
                                            </img>
                                        <ListItemText primary="Viblo CTF" />
                                    </Box>
                                    <Box display="flex">
                                            <img 
                                                src="../images/viblo-learn_logoFooter.png"
                                                className={classes.logoFooter}
                                            >
                                            </img>
                                        <ListItemText primary="Viblo Learning" />
                                    </Box>
                                </Link>
                            </ListItem>
                        </List>
                    </Box>
                    <Box className={classes.paperItem}>
                        <Typography variant="subtitle1" style={{fontWeight: "bold", fontSize: 17, marginBottom: 10}} >
                            ỨNG DỤNG DI ĐỘNG
                        </Typography>
                        <Box display="flex">
                            <Grid container direction="column" style={{width: 130}}>
                                <Grid item>
                                    <Link href="https://play.google.com/store/apps/details?id=com.framgia.viblo.android.prod">
                                        <img 
                                            alt='footerLogo-img'
                                            className={classes.logoFooterGoogleStore}
                                            src="../images/googlePlay_logo.png"
                                        >
                                        </img>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="https://apps.apple.com/us/app/viblo/id1365286437">
                                        <img 
                                            alt='footerLogo-img'
                                            className={classes.logoFooterAppleStore}
                                            src="../images/appStore.png"
                                        >
                                        </img>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box>
                                <img 
                                    alt='footerLogo-img'
                                    className={classes.QR_code}
                                    src="../images/QRCode.png"
                                >
                                </img>
                            </Box>
                        </Box>
                        <Typography variant="subtitle1" style={{fontWeight: "bold", fontSize: 17, marginTop: "20px", marginBottom: 10}} >
                            LIÊN KẾT
                        </Typography>
                        <Box display="flex">
                            <Link className={classes.logoSocial} href="https://www.facebook.com/viblo.asia/">
                                <FacebookIcon/>
                            </Link>
                            <Link className={classes.logoSocial} href="https://github.com/viblo-asia/">
                                <GitHubIcon/>
                            </Link>
                            <Link className={classes.logoSocial} href="https://chrome.google.com/webstore/detail/viblos-news-feed/mliahmjgdpkkicelofhbhgiidgljijmj">
                                <ExtensionIcon/>
                            </Link>
                            <Link className={classes.logoSocial} href="https://atom.io/packages/viblo">
                                <img
                                    src="../images/atom-editor.png"
                                    className={classes.editedlogoSocial}
                                >
                                </img>
                            </Link>
                        </Box>
                        
                    </Box>
                </Box>
                <Divider style={{borderBottom: "1px solid #a4a4c1", marginBottom: 20}}/>
                <Box display="flex">
                    <Box display="flex" flexGrow={1}>
                        <FormControl style={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="control-language" style={{color: "white"}}>Ngôn ngữ</InputLabel>
                            <Select
                                labelId="control-language-select-label"
                                id="control-language-open-select"
                                open={openChangeLanguage}
                                onClose={handleCloseSelectLanguage}
                                onOpen={handleOpenSelectLanguage}
                                value={language}
                                label="Ngôn ngữ"
                                onChange={handleChangeLanguage}
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: "4px",
                                    fontSize: "13px",
                                    padding: "3px",
                                    height: 40,
                                    width: 200
                                }}
                            >
                                <MenuItem value={true}>
                                    <Box display="flex">
                                        <ListItemIcon style={{padding: 2, marginRight: -25}}>
                                            <PublicIcon/>
                                        </ListItemIcon>
                                        <ListItemText>Tiếng Việt</ListItemText>
                                    </Box>
                                </MenuItem>
                                <MenuItem value={false}>
                                    <Box display="flex">
                                        <ListItemIcon style={{ marginRight: -25}}>
                                            <PublicIcon/>
                                        </ListItemIcon>
                                        <ListItemText>English</ListItemText>
                                    </Box>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <>
                        <List dense={false}>
                            <Box display="flex">
                                <ListItem button className={classes.listItemFooterBottom}>
                                    <Link className={classes.linkItemFooterBottom} underline="none">
                                        <Typography variant="subtitle2">
                                            Về chúng tôi
                                        </Typography>
                                    </Link>
                                </ListItem>
                                <ListItem button className={classes.listItemFooterBottom}>
                                    <Link className={classes.linkItemFooterBottom} underline="none">
                                        <Typography variant="subtitle2">
                                            Phản hồi
                                        </Typography>
                                    </Link>
                                </ListItem>
                                <ListItem button className={classes.listItemFooterBottom}>
                                    <Link className={classes.linkItemFooterBottom} underline="none">
                                        <Typography variant="subtitle2">
                                            Giúp đỡ
                                        </Typography>
                                    </Link>
                                </ListItem>
                                <ListItem button className={classes.listItemFooterBottom}>
                                    <Link className={classes.linkItemFooterBottom} underline="none">
                                        <Typography variant="subtitle2">
                                            FAQs
                                        </Typography>
                                    </Link>
                                </ListItem>
                                <ListItem button className={classes.listItemFooterBottom}>
                                    <Link className={classes.linkItemFooterBottom} underline="none">
                                        <Typography variant="subtitle2">
                                            RSS
                                        </Typography>
                                    </Link>
                                </ListItem>
                                <ListItem button className={classes.listItemFooterBottom}>
                                    <Link className={classes.linkItemFooterBottom} underline="none">
                                        <Typography variant="subtitle2">
                                            Điều khoản
                                        </Typography>
                                    </Link>
                                </ListItem>
                                <ListItem button className={classes.listItemFooterBottom}>
                                    <Link className={classes.linkItemFooterBottom} underline="none">
                                        <img
                                            src="../images/dmca-badge-w100-5x1-07.png"
                                        >
                                        </img>
                                    </Link>
                                </ListItem>
                            </Box>
                        </List>
                    </>
                </Box>
			</Container>
        </div>
    )
}

export default Footer
