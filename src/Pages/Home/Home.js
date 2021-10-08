import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeaderHome from '../../component/HeaderHome';
import TabsBar from './TabsBar';
import axios from 'axios';
import Footer from '../../component/Footer';
import ScrollTop from '../../component/ScrollTop';
import { Fab, Toolbar } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import qs from 'query-string'


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


const getPostes = async ({page, limit, category}) => {
	let _page = page ? page : 1
	let _limit = limit ? limit : 10
	let _category = category ? `&category=${category}` : ''

	let url = `https://haloha-backend.herokuapp.com/api/posts?page=${_page}&limit=${_limit}${_category}`

	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then (res => resolve(res.data))
			.catch (err => console.log(`getPostes err`, err))
	})
}

const generalUrlParams = ({page, category}) => {
	let url = '/home'
	if (page || category) {
		url += '?'
	}
	if (page) {
		url += `&page=${page}`
	}
	if (category) {
		url += `&category=${category}`
	}
	return url
}

function Home(props) {

	const classes = useStyles();

	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)
	const [category, setCategory] = useState('')
	const [postes, setPostes] = useState(null)

	const _getPostes = async ({page, limit, category}) => {
		let res = await getPostes({page, limit, category})
		if (res.success) {
			setPostes(res.payload)
		} else {
			console.log(`_getPostes error`, res.error)
		}
	}

	useEffect(() => {
		const queryParams = qs.parse(props.location.search);
		const {page, category} = queryParams

		if (page) {
			let _page = parseInt(page)
			setPage(_page)
		}
		if (category) {
			setCategory(category)
		}

		_getPostes({page, limit: 10, category})
	}, [])

	const onCategoryChange = (category) => {
		props.history.push(generalUrlParams({page: 1, category}))
		setPage(1)
		setCategory(category)
		_getPostes({page: 1, limit: 10, category})
	}

	const onPaginationChange = (event, page) => {
		props.history.push(generalUrlParams({page, category}))
		setPage(page)
		_getPostes({page, limit: 10, category})
	}


	return (
		<div className={classes.root}>
			<HeaderHome props={props}/>
			<img 
				alt='banner'
				className={classes.logoHeader}
				src="images/banner.png"
				id="back-to-top-anchor"
				>
			</img>
			<TabsBar {...props} onChange={(category) => onCategoryChange(category)} postes={postes} limit={limit} page={page} onPaginationChange={onPaginationChange}/>
			<ScrollTop {...props}>
				<Fab color="secondary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUpIcon/>
				</Fab>
			</ScrollTop>
			<Footer/>
		</div>
	)
}

export default Home
