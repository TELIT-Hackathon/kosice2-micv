import { type RequestHandler, json } from '@sveltejs/kit';
import { readFileSync } from 'fs';

const earth_rad = 6378100;

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();

    const file = readFileSync(`static/data/${data.data}.geojson`).toString();
    let jsonData = JSON.parse(file);

    jsonData.features.sort(function pythaghoras(a, b) {
        let ax = (a.properties.y - data.center.lat) * (Math.PI / 180) * earth_rad;
        let ay = Math.cos((a.properties.y - data.center.lat) * (Math.PI / 180)) * (a.properties.x - data.center.lng) * (Math.PI / 180) * earth_rad;
        let adistance = Math.sqrt(ax ** 2 + ay ** 2);

        let bx = Math.abs(b.properties.y - data.center.lat) * (Math.PI / 180) * earth_rad;
        let by = Math.cos((b.properties.y - data.center.lat) * (Math.PI / 180)) * (b.properties.x - data.center.lng) * (Math.PI / 180) * earth_rad;
        let bdistance = Math.sqrt(bx ** 2 + by ** 2);

        let distance_dif = adistance - bdistance

        return (distance_dif);
    });
    console.log(jsonData.features.slice(0, Math.min(jsonData.features.length, data.n)))
    return json(jsonData.features.slice(0, Math.min(jsonData.features.length, data.n)));
};
