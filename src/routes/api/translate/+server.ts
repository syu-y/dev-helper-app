import { translate } from '@/lib/server/translation/index';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { orderText } = await request.json();
	if (orderText) {
		const result = await translate(orderText);
		return Response.json({ result: result });
	}
	return Response.json({ result: '' });
}
