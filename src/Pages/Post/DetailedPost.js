import { Fab, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import HeaderHome from '../../component/HeaderHome';
import axios from 'axios';
import DetailedPostMain from './DetailedPostMain';
import ScrollTop from '../../component/ScrollTop';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Footer from '../../component/Footer';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: 'white',
	},
    logoHeader: {
		marginTop: 65,
		width: '100%',
	},
}));

const getDetailedPost = async (slug) => {
    let _slug = slug ? slug : ''
    let url = `https://haloha-backend.herokuapp.com/api/posts/${_slug}`
    return new Promise((resolve, reject) => {
        axios
            .get (url)
            .then (res => resolve(res.data))
            .catch (err => console.log(`get detailed post error`, err))
    })
}

function DetailedPost(props) {

    const [detailedPost, setDetailedPost] = useState(null);

    const classes = useStyles();
    const slug_post = window.location.href.substring(
        window.location.href.lastIndexOf("/") + 1
    );


    const _getDetailedPost = async () => {
        let res = await getDetailedPost(slug_post)
        if(res.success) {
            console.log(`res`, res)
            setDetailedPost(res.payload)
        } else {
            console.log(` get detailedpost res.error`, res.error)
        }
    }

    useEffect(() => {
        if (detailedPost === null){
            _getDetailedPost()
        }
    }, [slug_post])

    console.log(`detailedPost`, detailedPost)

    return (
		<div className={classes.root}>
			<HeaderHome props={props}/>
            <img 
				alt='banner'
				className={classes.logoHeader}
				src="../images/banner.png"
				id="back-to-top-anchor"
            />
            {detailedPost !== null &&
                <DetailedPostMain post={detailedPost}/>
            }
            <ScrollTop {...props}>
				<Fab color="secondary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUpIcon/>
				</Fab>
			</ScrollTop>
			<Footer/>
        </div>
    )
}

export default DetailedPost
