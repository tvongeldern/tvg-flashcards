import { Flashcard } from './config';

export default function add(req, res) {
	return new Flashcard(req.body).save().then(res.send);
}