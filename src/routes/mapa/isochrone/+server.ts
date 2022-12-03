import { type RequestHandler, json } from '@sveltejs/kit';

const apiId = '1c360a82';
const apiKey = 'c2535c00cd0c97a49f2a843faeaa0664';

export const POST: RequestHandler = async ({ request }) => {
    const reqData = await request.json();

    const coords = {
        lat: reqData.lat,
        lng: reqData.lon
    };

    const result = await fetch('https://api.traveltimeapp.com/v4/time-map', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Application-Id': apiId,
            'X-Api-Key': apiKey,
        },
        body: JSON.stringify({
            departure_searches: [
                {
                    id: 'first_location',
                    coords: coords,
                    transportation: {
                        type: 'driving'
                    },
                    departure_time: '2022-10-01T09:00:00Z',
                    travel_time: 60 * 10
                }
            ]
        })
    });

    const jason = await result.json();
    const data: { lat: number, lng: number }[] = jason.results[0].shapes[0].shell;

    return json({
        outline: data.map((value) => {
            return [value.lat, value.lng];
        })
    });
};
