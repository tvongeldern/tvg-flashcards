import { Flashcard } from '../config';

export default async function updateFlashcard(req, res) {
	const term = await Flashcard.findById(req.query.id);
	Object.entries(req.body).forEach(([key, value]) => {
		term[key] = value;
	});
	const updatedTerm = await term.save();
	res.send(updatedTerm);
}
