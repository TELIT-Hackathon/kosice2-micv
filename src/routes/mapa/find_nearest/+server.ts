import { type RequestHandler, json} from '@sveltejs/kit';
import { readFileSync } from "fs";
export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    const file_string = `static/data/${data.data}.geojson`
    const file = readFileSync(file_string).toString()
    let json_data = JSON.parse(file);
    const earth_rad = 6378100;
    json_data.features.sort(function pythaghoras(a, b){
        let ax = (a.properties.y-data.center.lat)*(Math.PI/180)*earth_rad;
        let ay = Math.cos((a.properties.y-data.center.lat)*(Math.PI/180))*(a.properties.x-data.center.lng)*(Math.PI/180)*earth_rad;
        let adistance = Math.sqrt(ax**2+ay**2);

        let bx = Math.abs(b.properties.y-data.center.lat)*(Math.PI/180)*earth_rad;
        let by = Math.cos((b.properties.y-data.center.lat)*(Math.PI/180))*(b.properties.x-data.center.lng)*(Math.PI/180)*earth_rad;
        let bdistance = Math.sqrt(bx**2+by**2);

        let distance_dif = adistance - bdistance
        
        return(distance_dif);
    });
    console.log(json_data.features.slice(0, Math.min(json_data.features.length, data.n)))
    return json(json_data.features.slice(0, Math.min(json_data.features.length, data.n)));
};
