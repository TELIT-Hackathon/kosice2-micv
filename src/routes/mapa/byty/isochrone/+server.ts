import { type RequestHandler, json } from '@sveltejs/kit';
import { readFileSync, existsSync } from 'fs';

export const POST: RequestHandler = async ({ request }) => {
    const reqData = await request.json();

    if (!existsSync(`static/isochrone/${reqData.id}.json`)) {
        throw Error();
    }

    const file = readFileSync(`static/isochrone/${reqData.id}.json`).toString();

    return json({
        isochrone: JSON.parse(file)
    });
};
