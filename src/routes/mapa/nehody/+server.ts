import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({request: Request}) {
    return json({max: 8, data: [{lat: 1.0, lng: 1.0, count: 1}, {lat: 2.0, lng: 2.0, count: 1}]});
}
