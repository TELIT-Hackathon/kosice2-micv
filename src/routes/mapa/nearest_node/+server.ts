import { type RequestHandler, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    const url = `http://router.project-osrm.org/nearest/v1/driving/${data.lat},${data.lng}`
    console.log(url)
    const response = await fetch(url);
    const nearest_node = await response.json();
    console.log(nearest_node)
    return json(nearest_node);
};
