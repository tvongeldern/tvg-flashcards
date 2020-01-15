import mongoose, { Schema } from 'mongoose';

export const config = {
	config: 'known',
	mongo: {
		url: process.env.MONGODB_URI || 'mongodb://heroku_7wtltl5h:eakokt6pq23k5va42ojucvuufh@ds257314.mlab.com:57314/heroku_7wtltl5h',
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
	totalAttempts: {
		type: Number,
		default: 0,
	},
	successfulAttempts: {
		type: Number,
		default: 0,
	},
}));