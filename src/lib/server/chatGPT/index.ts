import { CHATGPT_API_KEY } from '$env/static/private';

export type Message = {
	role: 'user' | 'system' | 'assistant';
	content: string;
};

const CHATGPT_API_URL = 'https://api.openai.com/v1/chat/completions';

export const chatCompletion = async (messages: Message[]): Promise<Message | undefined> => {
	const body = JSON.stringify({
		messages,
		model: 'gpt-3.5-turbo'
	});

	const res = await fetch(CHATGPT_API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${CHATGPT_API_KEY}`
		},
		body
	});
	const data = await res.json();
	const choice = 0;
	return data.choices[choice].message;
};
