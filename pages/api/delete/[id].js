import { Flashcard } from '../config';

export default async function deleteFlashcard(req, res) {
	await Flashcard.findByIdAndRemove(req.query.id, { useFindAndModify: false });
	res.send({});
}
