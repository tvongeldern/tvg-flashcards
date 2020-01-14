import { Flashcard } from './config';

export default function update(req, res) {
	console.log(req.url);
	res.status(200).send({});
}