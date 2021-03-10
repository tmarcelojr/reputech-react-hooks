import React from 'react';
import './index.css';

export default function Home() {
	return (
		<div className="home-page-container">
			<div id="home-page-content">
				<p id="first-line">CHICAGO. TECH.</p>
				<p id="second-line">REVIEWS</p>
				<div id="third-line">
					<p>Start your happy worklife. Find the right company for you because you <span>DESERVE</span> it.</p>
				</div>
        <div>
          <button id='home-button'>EXPLORE</button>
        </div>
			</div>
		</div> // home-page-container
	);
}
