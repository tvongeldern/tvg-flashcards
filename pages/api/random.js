import { Flashcard } from './config';

export default function randomTerm(req, res) {
	const { successfulAttemptsLimit } = req.query;
	const query = {};
	if (successfulAttemptsLimit) {
		query.successfulAttempts = {
			$lte: successfulAttemptsLimit,
		};
	}
	return Flashcard.find(query)
		.then((results) => results[Math.floor(Math.random() * results.length)])
		.then(res.send);
}
