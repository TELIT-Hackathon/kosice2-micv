import {json}  from '@sveltejs/kit';
import { type RequestHandler } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({request: Request}) => {
    let d = request.body;
    return json({data: d});
}
