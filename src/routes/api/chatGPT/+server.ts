import { chatCompletion, type Message } from '@/lib/server/chatGPT';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { orderText } = await request.json();
	if (orderText) {
		const messages: Message[] = [
			{
				role: 'user',
				content: orderText
			}
		];
		const response = await chatCompletion(messages);
		return Response.json({ result: response?.content });
	}
	return Response.json({ result: '' });
}
