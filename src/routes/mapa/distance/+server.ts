import { type RequestHandler, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    console.log(data);
    return json({ data: data });
};
