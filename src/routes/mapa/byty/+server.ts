import { type RequestHandler, json } from '@sveltejs/kit';
import { readFileSync } from 'fs';

export const GET: RequestHandler =async ({ request }) => {
    const file = readFileSync('static/data/lacne_byty.json').toString();
    return json({
        byty: JSON.parse(file)
    });
};

/*
export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();

    return json({ 
        byty: getSortedData(data.count, { lat: data.center.lat, lng: data.center.lng })
     });
};

const earthRad = 6378100;
const degToRad = (Math.PI / 180);

function getDistanceOnSphereSquared(latA: number, lngA: number, latB: number, lngB: number): number {
    const dx = (latA - latB) * degToRad * earthRad;
    const dy = (Math.cos(latA - latB) * (lngA - lngB) * degToRad * earthRad);
    return (dx * dx + dy * dy);
}

function getSortedData(count: number, coords: { lat: number, lng: number }): any[] {
    const file = readFileSync('static/data/lacne_byty.json').toString();
    const featureData = JSON.parse(file);

    const sortedDistances = new Array<{ distance: number, index: number }>(featureData.length);

    count = Math.min(count, featureData.length);

    for (let i = 0; i < featureData.length; i++) {
        sortedDistances[i] = {
            distance:
                featureData[i].lat && featureData[i].lng ?
                    getDistanceOnSphereSquared(featureData[i].lat, featureData[i].lng, coords.lat, coords.lng)
                    : Number.POSITIVE_INFINITY,
            index: i
        };
    }

    sortedDistances.sort((a, b) => { if (a.distance < b.distance) return -1; return 1; });

    const result = new Array(count);
    for (let i = 0; i < count; i++) {
        result[i] = featureData[sortedDistances[i].index];
    }

    return result;
}

*/