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
	useEffect(() => {
		getAllTerms().then(({ data }) => setTerms(data));
	}, []);
	return (
		<div>
			<Nav />
			{terms.map((term) => (
				<div key={term._id}>
					<div>
						<div>English word</div>
						<div>{term.englishWord}</div>
					</div>

					<div>
						<div>English sentence</div>
						<div>{term.englishSentence}</div>
					</div>

					<div>
						<div>Spansish word</div>
						<div>{term.spanishWord}</div>
					</div>

					<div>
						<div>Spansish sentence</div>
						<div>{term.spanishSentence}</div>
					</div>

					<div>
						<div>Flashcard attempts</div>
						<div>{term.totalAttempts}</div>
					</div>

					<div>
						<div>Successful attempts</div>
						<div>{term.successfulAttempts}</div>
					</div>

					<button onClick={() => deleteTerm(term._id)}>Delete</button>
				</div>
			))}
		</div>
	);
}
