import mongoose, { Schema } from 'mongoose';

export const config = {
	config: 'known',
	mongo: {
		url: process.env.MONGODB_URI,
	},
};

export default function configEndpoint(req, res) {
	res.status(200).send({ config: 'secret' });
}

mongoose.connect(config.mongo.url, { useNewUrlParser: true });

export const Flashcard = mongoose.models.Flashcard || mongoose.model('Flashcard', new Schema({
	englishWord: String,
	spanishWord: String,
	englishSentence: String,
	spanishSentence: String,
	totalAttempts: {
		type: Number,
		default: 0,
	},
	successfulAttemps: {
		type: Number,
		default: 0,
	},
}));