import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/nav'

function getAllTerms() {
	return axios('/api/terms');
}

function deleteTerm(id) {
	return axios(`/api/delete/${id}`);
}

export default function TermsPage(props) {
	const [terms, setTerms] = useState([]);
	const fetchTerms = () => getAllTerms()
		.then(({ data }) => setTerms(data));
	useEffect(() => {
		fetchTerms();
	}, []);
	return (
		<div>
			<Nav />
			<div className="terms-page">
				{terms.map((term) => (
					<div key={term._id} className="term">
						<div className="group">
							<div>English word</div>
							<div>{term.englishWord}</div>
						</div>

						<div className="group">
							<div>English sentence</div>
							<div>{term.englishSentence}</div>
						</div>

						<div className="group">
							<div>Spansish word</div>
							<div>{term.spanishWord}</div>
						</div>

						<div className="group">
							<div>Spansish sentence</div>
							<div>{term.spanishSentence}</div>
						</div>

						<div className="group">
							<div>Spanish attempts</div>
							<div>{term.spanishTotalAttempts}</div>
						</div>

						<div className="group">
							<div>Successful Spanish attempts</div>
							<div>{term.spanishSuccessfulAttempts}</div>
						</div>

						<div className="group">
							<div>Spanish streak</div>
							<div>{term.spanishStreak}</div>
						</div>

						<div className="group">
							<div>English attempts</div>
							<div>{term.englishTotalAttempts}</div>
						</div>

						<div className="group">
							<div>Successful English attempts</div>
							<div>{term.englishSuccessfulAttempts}</div>
						</div>

						<div className="group">
							<div>English streak</div>
							<div>{term.englishStreak}</div>
						</div>

						<button onClick={() => deleteTerm(term._id).then(fetchTerms)}>Delete</button>
					</div>
				))}
			</div>
			<style jsx>{`
      .terms-page {
				touch-action: manipulation;
        display: flex;
				flex-direction: column;
				padding: 8px 16px;
			}
			.term {
				display: flex;
				flex-direction: column;
				padding: 16px;
				border: 1px solid gray;
				border-radius: 8px;
				margin: 8px 0;
			}
			.group {
				display: flex;
				padding: 2px;
				justify-content: space-between;
			}
			.group div:first-child {
				font-weight: bold;
			}
			button {
				padding: 12px;
				margin: 24px 60px 0px 24px;
				cursor: pointer;
				color: white;
				border-radius: 4px;
				background-color: red;
			}
			button:active {
				background-color: gray;
			}
			button:focus {
				outline: none;
			}
    `}</style>
		</div>
	);
}
