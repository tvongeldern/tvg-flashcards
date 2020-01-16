import React, { useEffect } from 'react';
import axios from 'axios';
import { Form, Field } from 'react-final-form';
import Nav from '../components/nav';

function addNewTerm(formData) {
	return axios.post('/api/add', formData);
}

export default function TermsPage(props) {
	return (
		<div>
			<Nav />
			<div className="add-page">
				<Form
					onSubmit={addNewTerm}
					render={({ form, handleSubmit }) => (
						<form onSubmit={(ev) => handleSubmit(ev).then(form.reset)}>
							<div className="group">
								<label>English word</label>
								<Field name="englishWord" component="input" className="input" />
							</div>

							<div className="group">
								<label>English sentence</label>
								<Field name="englishSentence" component="textarea" className="input" />
							</div>

							<div className="group">
								<label>Spansish word</label>
								<Field name="spanishWord" component="input" className="input" />
							</div>

							<div className="group">
								<label>Spansish sentence</label>
								<Field name="spanishSentence" component="textarea" className="input" />
							</div>

							<div className="group">
								<button type="submit" className="submit-add">Submit</button>
							</div>
						</form>
					)}
				/>
			</div>
			<style>{`
      .add-page {
				touch-action: manipulation;
				display: flex;
				flex-direction: column;
			}
			.group {
				display: flex;
				flex-direction: column;
				padding: 12px;
			}
			.group label {
				font-weight: bold;
				margin: 8px 0;
			}
			.group input,textarea {
				border-radius: 4px;
				border: 1px solid gray;
				font-size: 16px;
				line-height: 16px;
				padding: 8px;
			}
			.group textarea {
				min-height: 40px;
			}
			button {
				padding: 12px;
				margin: 24px;
				cursor: pointer;
				color: white;
				border-radius: 4px;
			}
			button:active {
				background-color: gray;
			}
			button:focus {
				outline: none;
			}
			.submit-add {
				background-color: blue;
			}
    `}</style>
		</div>
	);
}
