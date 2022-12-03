import { type RequestHandler, json } from '@sveltejs/kit';
import { readFileSync } from "fs";

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    const file_string = `static/data/${data.data}.geojson`
    const file = readFileSync(file_string).toString()
    let json_data = JSON.parse(file);

    let filtered = [];
    const r = data.radius;
    const earth_rad = 6378100;

    for (let i = 0; i < json_data.features.length; i++) {
        let x = (json_data.features[i].properties.y-data.center.lat)*(Math.PI/180)*earth_rad
        let y = (Math.cos(json_data.features[i].properties.y-data.center.lat)*(json_data.features[i].properties.x-data.center.lng)*(Math.PI/180)*earth_rad)
        if (Math.sqrt((x**2)+(y**2))<r){
            filtered.push(json_data.features[i])
        }
    };
    return json(filtered);
};
