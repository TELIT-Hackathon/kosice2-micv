import { type RequestHandler, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const d = request.body;
    return json({ data: d });
};
