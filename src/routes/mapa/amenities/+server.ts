import { type RequestHandler, json } from '@sveltejs/kit';
import { readFileSync } from 'fs';

const earthRad = 6378100;
const degToRad = (Math.PI / 180);

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();

    const file = readFileSync(`static/data/${data.data}.geojson`).toString();
    const jsonData = JSON.parse(file);

    return json({});
};
