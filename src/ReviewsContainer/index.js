import React, { useContext, useState, useEffect } from 'react';
import LoadingContext from '../Contexts/LoadingContext';
import CompanyContext from '../Contexts/CompanyContext';
import CompanyRatings from '../Contexts/CompanyRatings';
import CompanyCard from './CompanyCard';
import './custom.css';

export default function ReviewsContainer(props) {
	// Loading
	const loading = useContext(LoadingContext);
	// Company data
	const company = useContext(CompanyContext);
	// Company ratings
	const ratings = useContext(CompanyRatings);

	const [ companyCards, setCompanyCards ] = useState([]);

	useEffect(
		() => {
			if (loading.isLoading === false) {
				setCompanyCards(company.companyData);
			}
		},
		[ loading ]
	);

	let handleSearch = (e) => {
		let searchArray = company.companyData.filter((company) =>
			company.name.toLowerCase().includes(e.target.value.toLowerCase())
		);
		console.log(searchArray);
		setCompanyCards(searchArray);
		console.log('after setting', companyCards);
	};

	return (
		<div className="wrapper">
			<div className="content-container">
				<div className="input-group input-group-sm mb-3" id="search-container">
					<div className="input-group-prepend">
						<span className="input-group-text" id="inputGroup-sizing-sm">
							Search
						</span>
					</div>
					<input
						type="text"
						className="form-control"
						aria-label="Small"
						aria-describedby="inputGroup-sizing-sm"
						onChange={handleSearch}
					/>
				</div>
				<p>
					<button
						className="btn btn-info btn-sm"
						type="button"
						data-toggle="collapse"
						data-target="#collapseExample"
						aria-expanded="false"
						aria-controls="collapseExample"
						id="disclaimer-button"
					>
						DISCLAIMER
					</button>
				</p>
				<div className="collapse" id="collapseExample">
					<div className="card card-body" id="disclaimer-note">
						<ul>
							<li>
								The <span style={{ color: 'gold' }}>gold stars</span> represent an average rating of
								aggregated data collected from popular online sources such as Indeed and Glassdoor
								through web scraping.
							</li>
							<li>
								The <span style={{ color: 'red' }}>red stars</span> represent the average rating of
								RepuTech users.{' '}
							</li>
							<li>Note: Current reviews and ratings left by RepuTech users were made for testing.</li>
						</ul>
					</div>
				</div>
				<div className="company-card-container">
					{loading.isLoading === false ? (
						companyCards.map((companyInfo, i) => {
							return (
								<CompanyCard
									key={i}
									websiteLogo={companyInfo.website_logo}
									companyId={companyInfo.id}
									companyWebsite={companyInfo.website}
									companyName={companyInfo.name}
									averageCompanyRatings={ratings.companyAverageRatings.averageRatings[i]}
									averageCompanyUserRatings={ratings.companyAverageUserRatings.companyUserRatings[i]}
									addToFavorites={() => props.companyToAdd(companyInfo.id)}
									removeFromFavorites={() => props.companyToRemove(companyInfo.id)}
								/>
							);
						})
					) : null}
				</div>
			</div>
		</div>
	);
}
