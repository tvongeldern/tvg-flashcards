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

mongoose.connect(config.mongo.url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

export const Flashcard = mongoose.models.Flashcard || mongoose.model('Flashcard', new Schema({
	englishWord: String,
	spanishWord: String,
	englishSentence: String,
	spanishSentence: String,
	englishTotalAttempts: {
		type: Number,
		default: 0,
	},
	englishSuccessfulAttempts: {
		type: Number,
		default: 0,
	},
	englishStreak: {
		type: Number,
		default: 0,
	},
	spanishTotalAttempts: {
		type: Number,
		default: 0,
	},
	spanishSuccessfulAttempts: {
		type: Number,
		default: 0,
	},
	spanishStreak: {
		type: Number,
		default: 0,
	},
}));