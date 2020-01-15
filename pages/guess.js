import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DEFAULT_LIMIT = 5;

function getRandomTerm(successfulAttemptsLimit) {
	return axios(`/api/random`, {
		params: { successfulAttemptsLimit }
	});
}

function updateTerm(id, updates) {
	return axios.put(`/api/update/${id}`, updates);
}

export default function GuessPage(props) {
	const [state, setState] = useState({
		term: {},
		reveal: false,
		englishToSpanish: false,
		successfulAttemptsLimit: DEFAULT_LIMIT,
	});
	const fetchTerm = () => getRandomTerm(state.successfulAttemptsLimit)
		.then(({ data }) => setState({ ...state, term: data, reveal: false }));
	const recordGuess = (gotItRight = false) => updateTerm(state.term._id, {
		totalAttempts: state.term.totalAttempts + 1,
		successfulAttempts: state.term.totalAttempts + +gotItRight,
	}).then(fetchTerm);
	const showingLanguage = {
		name: state.englishToSpanish ? 'English' : 'Spanish',
		word: state.term.englishWord,
		sentence: state.term.englishSentence,
	};
	const hiddenLanguage = {
		name: state.englishToSpanish ? 'Spanish' : 'English',
		word: state.term.spanishWord,
		sentence: state.term.spanishSentence,
	};
	useEffect(() => {
		fetchTerm();
	}, []);
	return (
		<div>
			<div>
				<div>{`${showingLanguage.name} word`}</div>
				<div>{showingLanguage.word}</div>
			</div>

			{showingLanguage.sentence && (
				<div>
					<div>{`${showingLanguage.name} sentence`}</div>
					<div>{showingLanguage.sentence}</div>
				</div>
			)}

			{!state.reveal && (
				<div>
					<button onClick={() => setState({ ...state, reveal: true })}>Reveal</button>
				</div>
			)}

			{state.reveal && (
				<>
					<div>
						<div>{`${hiddenLanguage.name} word`}</div>
						<div>{hiddenLanguage.word}</div>
					</div>

					{hiddenLanguage.sentence && (
						<div>
							<div>{`${hiddenLanguage.name} sentence`}</div>
							<div>{hiddenLanguage.sentence}</div>
						</div>
					)}

					<div>
						<button onClick={() => recordGuess(true)}>Got it right</button>
						<button onClick={() => recordGuess(false)}>Did not get it right</button>
					</div>
				</>
			)}
		</div>
	);
}
