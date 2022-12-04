import { type RequestHandler, json } from '@sveltejs/kit';
import { readFileSync } from 'fs';

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();

    const datasets: any = {};
    for (let i = 0; i < data.datasets.length; i++) {
        datasets[data.datasets[i].name] = getSortedData(data.datasets[i].name, data.datasets[i].count, { lat: data.center.lat, lng: data.center.lng });
    }

    return json({ datasets: datasets });
};

const earthRad = 6378100;
const degToRad = (Math.PI / 180);

function getDistanceOnSphereSquared(latA: number, lngA: number, latB: number, lngB: number): number {
    const dx = (latA - latB) * degToRad * earthRad;
    const dy = (Math.cos(latA - latB) * (lngA - lngB) * degToRad * earthRad);
    return (dx * dx + dy * dy);
}

function getSortedData(filePath: string, count: number, coords: { lat: number, lng: number }): any[] {
    const file = readFileSync(`static/data/${filePath}.geojson`).toString();
    const featureData = JSON.parse(file).features;

    const sortedDistances = new Array<{ distance: number, index: number }>(featureData.length);

    count = Math.min(count, featureData.length);

    for (let i = 0; i < featureData.length; i++) {
        if (featureData[i]?.geometry?.coordinates) {
            sortedDistances[i] = {
                // Geodata lat lng is flipped ...
                distance: getDistanceOnSphereSquared(featureData[i].geometry.coordinates[1], featureData[i].geometry.coordinates[0], coords.lat, coords.lng),
                index: i
            };
        } else {
            sortedDistances[i] = {
                distance: Number.POSITIVE_INFINITY,
                index: i
            };
        }
    }

    sortedDistances.sort((a, b) => { if (a.distance < b.distance) return -1; return 1; });

    const result = new Array(count);
    for (let i = 0; i < count; i++) {
        result[i] = featureData[sortedDistances[i].index];
    }

    return result;
}
