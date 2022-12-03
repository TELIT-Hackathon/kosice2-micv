import { type RequestHandler, json } from '@sveltejs/kit';

const apiId = '1c360a82';
const apiKey = 'c2535c00cd0c97a49f2a843faeaa0664';

export const POST: RequestHandler = async ({ request }) => {
    const reqData = await request.json();

    const d = [
        { lat: 48.71685, lng: 21.230955 },
        { lat: 48.71595, lng: 21.229597 },
        { lat: 48.71595, lng: 21.226881 },
        { lat: 48.71505, lng: 21.225523 },
        { lat: 48.713253, lng: 21.225523 },
        { lat: 48.709656, lng: 21.230955 },
        { lat: 48.707855, lng: 21.230955 },
        { lat: 48.70606, lng: 21.233673 },
        { lat: 48.700665, lng: 21.233673 },
        { lat: 48.698864, lng: 21.23639 },
        { lat: 48.697067, lng: 21.233673 },
        { lat: 48.696167, lng: 21.235031 },
        { lat: 48.696167, lng: 21.237747 },
        { lat: 48.698864, lng: 21.241823 },
        { lat: 48.700665, lng: 21.241823 },
        { lat: 48.70156, lng: 21.243181 },
        { lat: 48.70156, lng: 21.245897 },
        { lat: 48.700665, lng: 21.247255 },
        { lat: 48.698864, lng: 21.247255 },
        { lat: 48.697964, lng: 21.248615 },
        { lat: 48.699764, lng: 21.251331 },
        { lat: 48.699764, lng: 21.254047 },
        { lat: 48.70156, lng: 21.256765 },
        { lat: 48.70156, lng: 21.259481 },
        { lat: 48.700665, lng: 21.26084 },
        { lat: 48.698864, lng: 21.26084 },
        { lat: 48.697964, lng: 21.262197 },
        { lat: 48.698864, lng: 21.263556 },
        { lat: 48.700665, lng: 21.263556 },
        { lat: 48.70246, lng: 21.266273 },
        { lat: 48.70426, lng: 21.266273 },
        { lat: 48.707855, lng: 21.271706 },
        { lat: 48.71685, lng: 21.271706 },
        { lat: 48.71775, lng: 21.273066 },
        { lat: 48.71775, lng: 21.275782 },
        { lat: 48.718647, lng: 21.27714 },
        { lat: 48.720448, lng: 21.27714 },
        { lat: 48.721344, lng: 21.275782 },
        { lat: 48.719547, lng: 21.273066 },
        { lat: 48.719547, lng: 21.270348 },
        { lat: 48.720448, lng: 21.26899 },
        { lat: 48.72584, lng: 21.26899 },
        { lat: 48.727642, lng: 21.266273 },
        { lat: 48.72944, lng: 21.266273 },
        { lat: 48.73124, lng: 21.263556 },
        { lat: 48.733036, lng: 21.263556 },
        { lat: 48.733936, lng: 21.264915 },
        { lat: 48.733936, lng: 21.267632 },
        { lat: 48.734833, lng: 21.26899 },
        { lat: 48.735733, lng: 21.267632 },
        { lat: 48.735733, lng: 21.264915 },
        { lat: 48.733936, lng: 21.262197 },
        { lat: 48.734833, lng: 21.26084 },
        { lat: 48.736633, lng: 21.26084 },
        { lat: 48.73933, lng: 21.256765 },
        { lat: 48.73933, lng: 21.245897 },
        { lat: 48.73843, lng: 21.24454 },
        { lat: 48.736633, lng: 21.24454 },
        { lat: 48.735733, lng: 21.243181 },
        { lat: 48.735733, lng: 21.240465 },
        { lat: 48.734833, lng: 21.239105 },
        { lat: 48.733036, lng: 21.239105 },
        { lat: 48.732136, lng: 21.237747 },
        { lat: 48.733936, lng: 21.235031 },
        { lat: 48.732136, lng: 21.232315 },
        { lat: 48.732136, lng: 21.229597 },
        { lat: 48.73124, lng: 21.22824 },
        { lat: 48.73034, lng: 21.229597 },
        { lat: 48.73034, lng: 21.232315 },
        { lat: 48.72944, lng: 21.233673 },
        { lat: 48.72854, lng: 21.232315 },
        { lat: 48.72854, lng: 21.229597 },
        { lat: 48.727642, lng: 21.22824 },
        { lat: 48.72584, lng: 21.22824 },
        { lat: 48.723145, lng: 21.224165 },
        { lat: 48.723145, lng: 21.221447 },
        { lat: 48.722244, lng: 21.220089 },
        { lat: 48.721344, lng: 21.221447 },
        { lat: 48.721344, lng: 21.224165 },
        { lat: 48.71685, lng: 21.230955 }
    ];

    return json({
        outline: d.map((value) => {
            return [value.lat, value.lng];
        })
    });

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
                    travel_time: reqData.time
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
