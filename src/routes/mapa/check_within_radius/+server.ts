import { type RequestHandler, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    let filtered = [];
    const r = data.radius;
    const earth_rad = 6378100;

    for (let i = 0; i < data.data.length; i++) {
        let x = (Math.abs(data.data[i].coords.lat-data.center.lat)*(Math.PI/180)*earth_rad)
        let y = Math.abs((Math.cos(Math.abs(data.data[i].coords.lat-data.center.lat)*(Math.abs(data.data[i].coords.lng-data.center.lng)*(Math.PI/180))*earth_rad)))
        if (Math.sqrt((x**2)+(y**2))<r){
            filtered.push(data.data[i])
        }
    };
    return json(filtered);
};
