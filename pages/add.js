import React, { useEffect } from 'react';
import axios from 'axios';
import { Form, Field } from 'react-final-form';

function getAllTerms(formData) {
	return axios.post('/api/add', formData);
}

export default function TermsPage(props) {
	return (
		<div>
			<Form
				onSubmit={getAllTerms}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<div>
							<label>English word</label>
							<Field name="englishWord" component="input" />
						</div>

						<div>
							<label>English sentence</label>
							<Field name="englishSentence" component="textarea" />
						</div>

						<div>
							<label>Spansish word</label>
							<Field name="spanishWord" component="input" />
						</div>

						<div>
							<label>Spansish sentence</label>
							<Field name="spanishSentence" component="textarea" />
						</div>

						<div>
							<button type="submit">Submit</button>
						</div>
					</form>
				)}
			/>
		</div>
	);
}
