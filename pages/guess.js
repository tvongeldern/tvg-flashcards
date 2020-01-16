import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/nav'

const DEFAULT_LIMIT = 3;

function getRandomTerm({ successfulAttemptsLimit, englishToSpanish }) {
	return axios(`/api/random`, {
		params: {
			successfulAttemptsLimit,
			englishToSpanish,
		},
	});
}

function updateTerm(id, updates) {
	return axios.put(`/api/update/${id}`, updates);
}

export default function GuessPage(props) {
	const [state, setState] = useState({
		term: {},
		reveal: false,
		englishToSpanish: true,
		successfulAttemptsLimit: DEFAULT_LIMIT,
	});
	const totalAttemptsKey = state.englishToSpanish ? 'spanishTotalAttempts' : 'englishTotalAttempts';
	const successfulAttemptsKey = state.englishToSpanish ? 'spanishSuccessfulAttempts' : 'englishSuccessfulAttempts';
	const streakKey = state.englishToSpanish ? 'spanishStreak' : 'englishStreak';
	const fetchTerm = () => getRandomTerm(state)
		.then(({ data }) => setState({ ...state, term: data || {}, reveal: false }));
	const recordGuess = (gotItRight = false) => updateTerm(state.term._id, {
		[totalAttemptsKey]: state.term[totalAttemptsKey] + 1,
		[successfulAttemptsKey]: state.term[totalAttemptsKey] + +gotItRight,
		[streakKey]: gotItRight ? state.term[streakKey] + 1 : 0,
	}).then(fetchTerm);
	const showingLanguage = {
		name: state.englishToSpanish ? 'English' : 'Spanish',
		word: state.englishToSpanish ? state.term.englishWord : state.term.spanishWord,
		sentence: state.englishToSpanish ? state.term.englishSentence : state.term.spanishSentence,
	};
	const hiddenLanguage = {
		name: !state.englishToSpanish ? 'English' : 'Spanish',
		word: !state.englishToSpanish ? state.term.englishWord : state.term.spanishWord,
		sentence: !state.englishToSpanish ? state.term.englishSentence : state.term.spanishSentence,
	};
	useEffect(() => {
		fetchTerm();
	}, []);
	return (
		<div>
			<Nav />
			<div className="guess-page">
				<div className="group text">
					<div>{`${showingLanguage.name} word`}</div>
					<div>{showingLanguage.word}</div>
				</div>

				{showingLanguage.sentence && (
					<div className="group text">
						<div>{`${showingLanguage.name} sentence`}</div>
						<div>{showingLanguage.sentence}</div>
					</div>
				)}

				{!state.reveal && (
					<div className="group buttons">
						<button className="reveal" onClick={() => setState({ ...state, reveal: true })}>Reveal</button>
					</div>
				)}

				{state.reveal && (
					<>
						<div className="divider" />
						<div className="group text">
							<div>{`${hiddenLanguage.name} word`}</div>
							<div>{hiddenLanguage.word}</div>
						</div>

						{hiddenLanguage.sentence && (
							<div className="group text">
								<div>{`${hiddenLanguage.name} sentence`}</div>
								<div>{hiddenLanguage.sentence}</div>
							</div>
						)}

						<div className="group buttons">
							<button className="got-it-right" onClick={() => recordGuess(true)}>Got it right</button>
							<button className="got-it-wrong" onClick={() => recordGuess(false)}>Did not get it right</button>
						</div>
						
					</>
				)}

				<div className="group buttons">
					<button
						className="toggle"
						onClick={() => setState({
							...state,
							englishToSpanish: !state.englishToSpanish,
							reveal: false,
						})}
					>Toggle translation direction</button>
				</div>
			</div>
			<style jsx>{`
      .guess-page {
				touch-action: manipulation;
        display: flex;
				flex-direction: column;
				padding: 8px 16px;
			}
			.group {
				display: flex;
				flex-direction: column;
			}
			.group.buttons button {
				margin-bottom: 0;
			}
			button {
				padding: 12px;
				margin: 24px;
				cursor: pointer;
				color: white;
				border-radius: 4px;
			}
			button:active {
				background-color: gray;
			}
			button:focus {
				outline: none;
			}
			.reveal {
				background-color: blue;
			}
			.got-it-right {
				background-color: green;
			}
			.got-it-wrong {
				background-color: red;
			}
			.toggle {
				background-color: purple;
			}
			.group div {
				padding: 4px;
			}
			.group div:first-child {
				font-weight: bold;
			}
			.divider {
				background-color: purple;
				padding: 1px;
				margin: 8px;
			}
    `}</style>
		</div>
	);
}
