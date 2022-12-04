import { type RequestHandler, json } from '@sveltejs/kit';
import { readFileSync } from 'fs';

const earthRad = 6378100;
const degToRad = (Math.PI / 180);

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();

    const file = readFileSync(`static/data/${data.data}.geojson`).toString();
    const jsonData = JSON.parse(file);

    const filtered = [];
    const radius = data.radius;

    for (let i = 0; i < jsonData.features.length; i++) {
        const dx = (jsonData.features[i].properties.y - data.center.lat) * degToRad * earthRad;
        const dy = (Math.cos(jsonData.features[i].properties.y - data.center.lat) * (jsonData.features[i].properties.x - data.center.lng) * degToRad * earthRad);
        if (dx * dx + dy * dy < radius * radius) {
            filtered.push(jsonData.features[i]);
        }
    };
    return json(filtered);
};
