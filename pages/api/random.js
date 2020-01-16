import { Flashcard } from './config';

export default function randomTerm(req, res) {
	const { successfulAttemptsLimit, englishToSpanish } = req.query;
	const isToSpanish = englishToSpanish === 'true';
	const streakKey = isToSpanish ? 'spanishStreak' : 'englishStreak';
	const query = {
		[streakKey]: {
			$lte: successfulAttemptsLimit,
		},
	};
	return Flashcard.find(query)
		.then((results) => results[Math.floor(Math.random() * results.length)])
		.then(res.send);
}
