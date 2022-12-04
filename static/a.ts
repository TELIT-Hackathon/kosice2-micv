import { writeFileSync, readFileSync } from 'fs';

const apiId = '1c360a82';
const apiKey = 'c2535c00cd0c97a49f2a843faeaa0664';

const byty = JSON.parse(readFileSync('data/lacne_byty.json').toString());

for (let i = 0; i < byty.length; i++) {
    const coords = {
        lat: byty[i].lat,
        lng: byty[i].lng
    };

    console.log(i, coords, byty[i]);

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
                    id: `id: ${i}`,
                    coords: coords,
                    transportation: {
                        type: 'driving'
                    },
                    departure_time: '2022-10-01T09:00:00Z',
                    travel_time: 500
                }
            ]
        })
    });

    const jason = await result.json();
    const data: { lat: number, lng: number }[] = jason.results[0].shapes[0].shell;
    
    const d = data.map((value) => {
        return [value.lat, value.lng];
    });
    
    console.log(d);

    writeFileSync(`isochrone/${byty[i].id}.json`, JSON.stringify(d));
}
