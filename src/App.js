import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// CSS
import { FaUserCircle } from 'react-icons/fa';
import reputech_logo from './Images/reputech_logo.png';
import './App.css';
// Components
import Home from './Home';
import ReviewsContainer from './ReviewsContainer';
import FavoritesContainer from './FavoritesContainer';
// Contexts
import UserContext from './Contexts/UserContext';
import LoadingContext from './Contexts/LoadingContext';
import CompanyContext from './Contexts/CompanyContext';
import CompanyRatings from './Contexts/CompanyRatings';
import CompanyUserReviewsContext from './Contexts/CompanyUserReviewsContext';
import LoginRegisterModal from './LoginRegisterModal';

export default function App() {
	// Logged in user
	const [ user, setUser ] = useState(null);
	const userValue = useMemo(() => ({ user, setUser }), [ user, setUser ]);
	// Loading
	const [ isLoading, setIsLoading ] = useState(true);
	const loading = useMemo(() => ({ isLoading, setIsLoading }), [ isLoading, setIsLoading ]);
	// Company Data
	const [ companyData, setCompanyData ] = useState([]);
	const companyValues = useMemo(() => ({ companyData, setCompanyData }), [ companyData, setCompanyData ]);
	// User Reviews
	const [ userReviews, setUserReviews ] = useState([]);
	// unorganizedUserReviews will be used to update userReviews array
	const unorganizedUserReviews = useMemo(() => ({ userReviews, setUserReviews }), [ userReviews, setUserReviews ]);
	// Organized Reviews
	const [ organizedReviews, setOrganizedReviews ] = useState([]);
	const companyUserReviews = useMemo(() => ({ organizedReviews, setOrganizedReviews }), [
		organizedReviews,
		setOrganizedReviews
	]);
	// User Ratings
	const [ companyUserRatings, setCompanyUserRatings ] = useState([]);
	const companyAverageUserRatings = useMemo(() => ({ companyUserRatings, setCompanyUserRatings }), [
		companyUserRatings,
		setCompanyUserRatings
	]);
	// Company Ratings
	const [ averageRatings, setAverageRatings ] = useState([]);
	const companyAverageRatings = useMemo(() => ({ averageRatings, setAverageRatings }), [
		averageRatings,
		setAverageRatings
	]);
	// User Favorites
	const [ favorites, setFavorites ] = useState([]);
	const userFavorites = useMemo(() => ({ favorites, setFavorites }), [ favorites, setFavorites ]);
	// Set Favorites Icon
	const [ favoritesIcon, setFavoritesIcon ] = useState([]);
	const favoritesIconValue = useMemo(() => ({ favoritesIcon, setFavoritesIcon }), [
		favoritesIcon,
		setFavoritesIcon
	]);

	// =============== FETCH CALLS ===============

	useEffect(() => {
		async function getCompanyData() {
			try {
				const companyDataRes = await fetch('https://reputech-python.herokuapp.com/api/v1/companies');
				const companyDataJson = await companyDataRes.json();
				setCompanyData(companyDataJson.data);
			} catch (err) {
				console.log(err);
			}
		}

		async function getCompanyReviews() {
			try {
				const reviewsRes = await fetch('https://reputech-python.herokuapp.com/api/v1/reviews');
				const reviewsJson = await reviewsRes.json();
				setUserReviews(reviewsJson.data);
			} catch (err) {
				console.log(err);
			}
		}

		async function getRatings() {
			try {
				const ratingRes = await fetch('https://reputech-python.herokuapp.com/api/v1/collected_reviews');
				const ratingJson = await ratingRes.json();
				let companyRatings = [];
				ratingJson.data.map((ratings) => {
					return companyRatings.push(Math.round(ratings[1] * 2 / 2));
				});
				setAverageRatings(companyRatings);
			} catch (err) {
				console.log(err);
			}
		}

		getCompanyData();
		getCompanyReviews();
		getRatings();
		// checkLoginStatus();
	}, []);

	useEffect(
		() => {
			if (userReviews) {
				async function organizeReviews() {
					let companyReviews = [];
					for (let i = 0; i < companyData.length; i++) {
						let reviewsForThisCo = [];
						// loop through userReviews array
						for (let j = 0; j < userReviews.length; j++) {
							// if the user review id matches the company id
							if (userReviews[j].company.id === companyData[i].id) {
								reviewsForThisCo.push(userReviews[j]);
							}
						}
						companyReviews.push(reviewsForThisCo);
					}
					setOrganizedReviews(companyReviews);
				}
				organizeReviews();
			} // if(companyData)
		},
		[ userReviews, companyData ]
	);

	useEffect(
		() => {
			async function findUserAverageRatings() {
				// Grab ratings from organizedReviews
				let userRatings = [];
				let companyUserAverages = [];
				// Find averages of organized ratings
				let averageUserRatings = [];

				for (let i = 0; i < organizedReviews.length; i++) {
					let ratingsForCo = [];
					for (let j = 0; j < organizedReviews[i].length; j++) {
						ratingsForCo.push(organizedReviews[i][j].stars);
					}
					userRatings.push(ratingsForCo);
				}

				for (let k = 0; k < userRatings.length; k++) {
					// Grabbing each array of ratings and using reduce() to sum the totals from left to right. If there are no user ratings we set it to 0 with 'or' condition
					const sum = userRatings[k].reduce((a, b) => a + b, 0);
					const avg = sum / userRatings[k].length || 0;
					companyUserAverages.push(avg);
				}
				companyUserAverages.map((userRatings) => {
					return averageUserRatings.push(Math.round(userRatings * 2 / 2));
				});
				setCompanyUserRatings(averageUserRatings);
			}
			findUserAverageRatings();
		},
		[ organizedReviews ]
	);

	// =============== FAVORITES ===============
	// Get Favorites
	useEffect(() => {
		async function getFavorites() {
			try {
				const favoritesRes = await fetch('https://reputech-python.herokuapp.com/api/v1/favorites');
				const favoritesJson = await favoritesRes.json();
				console.log('we are in getfavorites, favoritesJson.data', favoritesJson.data);
				setFavorites(favoritesJson.data);
				setIsLoading(false);
			} catch (err) {
				console.log(err);
			}
		}
		getFavorites();
	}, []);

	//Add Favorite
	const addFavorite = async (id) => {
		const companyId = id.toString();
		try {
			const addFavoriteRes = await fetch('https://reputech-python.herokuapp.com/api/v1/favorites' + companyId, {
				credentials: 'include',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const addFavoriteJson = await addFavoriteRes.json();
			if (addFavoriteRes.status === 201) {
				console.log('Successfully add to favorites', addFavoriteJson.data);
				setFavorites([ ...favorites, addFavoriteJson.data ]);
			}
		} catch (err) {
			console.log(err);
		}
	};

	// Remove Favorite
	const removeFavorite = async (id) => {
		const companyId = id.toString();
		try {
			const removeFavoriteRes = await fetch('https://reputech-python.herokuapp.com/api/v1/favorites' + companyId, {
				credentials: 'include',
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const removeFavoriteJson = await removeFavoriteRes.json();
			if (removeFavoriteRes.status === 200) {
				console.log('Successfully removed from favorites', removeFavoriteJson);
				const newFavoritesArr = favorites.filter((favorite) => favorite.id !== id);
				setFavorites(newFavoritesArr);
			}
		} catch (err) {
			console.log(err);
		}
	};

	// =============== AUTH ===============
	const checkLoginStatus = async () => {
		try {
			const checkLoginRes = await fetch('https://reputech-python.herokuapp.com/api/v1/users/logged_in', {
				credentials: 'include'
			});
			const checkLoginJson = await checkLoginRes.json();
			console.log(checkLoginJson);
			if (checkLoginRes.status === 200) {
				// Set user here to check logged in user with server
				setUser(checkLoginJson.data.username);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const logout = async () => {
		try {
			const logoutRes = await fetch('https://reputech-python.herokuapp.com/api/v1/users/logout', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const logoutJson = await logoutRes.json();
			console.log(logoutJson);
			if (logoutRes.status === 200) {
				setUser(null);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="App">
			<Router>
				<nav className="navbar navbar-expand-sm navbar-dark fixed-top">
					<ul className="navbar-nav mr-auto px-3">
						<li className="nav-item">
							<img id="logo" src={reputech_logo} alt="logo" />
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/reviews">
								Reviews
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/favorites">
								Favorites
							</Link>
						</li>
					</ul>
					<button onClick={() => checkLoginStatus()}>CHECK USER</button>
					<ul className="navbar-nav ml-auto px-3">
						{user === null ? (
							<li className="nav-item nav-link" data-toggle="modal" data-target="#loginModal">
								<span className="login">
									<FaUserCircle className="mx-2" id="login_icon" />
									Login
								</span>
							</li>
						) : (
							<li id="user-menu" className="nav-item">
								<div className="dropdown">
									<button
										type="button"
										className="dropdown-toggle fake-button"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
										id="dropdownMenuButton"
									/>
									<div
										className="dropdown-menu dropdown-menu-center"
										aria-labelledby="dropdownMenuButton"
									>
										<button className="dropdown-item">Edit Profile</button>
										<button className="dropdown-item" onClick={() => logout()}>
											Logout
										</button>
									</div>
								</div>
								<i className="username">{user}</i>
							</li>
						)}
					</ul>
				</nav>
				{/* LOGIN MODAL */}
				<div
					className="modal fade needs-validation"
					id="loginModal"
					tabIndex="-1"
					role="dialog"
					aria-labelledby="exampleModalLabel"
					aria-hidden="true"
					maxLength="15"
					minLength="4"
					pattern="^[a-zA-Z0-9_.-]*$"
				>
					<LoginRegisterModal
						updateUser={(loginJson) => setUser(loginJson.data.username)}
						closeModal={() => window.$('#loginModal').modal('toggle')}
					/>
				</div>
				{/* modal fade - login modal */}
				<Switch>
					{/* Encapsulate everything you want to have access to Providers' values */}
					<UserContext.Provider value={userValue}>
						<LoadingContext.Provider value={loading}>
							{/* { Components that need company information, ratings, and reviews } */}
							<CompanyContext.Provider value={companyValues}>
								<CompanyRatings.Provider value={{ companyAverageRatings, companyAverageUserRatings }}>
									<CompanyUserReviewsContext.Provider
										value={{
											companyUserReviews,
											unorganizedUserReviews,
											userFavorites,
											favoritesIconValue
										}}
									>
										<Route exact path="/reviews">
											{/* <ReviewsContainer companyToAdd={(data) => setFavorites([...favorites, data])}/> */}
											<ReviewsContainer
												companyToAdd={(id) => addFavorite(id)}
												companyToRemove={(id) => removeFavorite(id)}
											/>
										</Route>
										<Route exact path="/favorites">
											<FavoritesContainer companyToRemove={(id) => removeFavorite(id)} />
										</Route>
									</CompanyUserReviewsContext.Provider>
								</CompanyRatings.Provider>
							</CompanyContext.Provider>
							{/* { /Components needing company information, ratings, and reviews } */}
						</LoadingContext.Provider>
						<Route exact path="/">
							<Home />
						</Route>
					</UserContext.Provider>
				</Switch>
			</Router>
		</div>
	);
}
