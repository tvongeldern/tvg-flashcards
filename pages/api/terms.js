import { Flashcard } from './config';

export default function terms(req, res) {
	return Flashcard.find(req.query).then(res.send);
}