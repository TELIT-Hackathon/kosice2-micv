export function distance(lat1, lon1, lat2, lon2) {
    const R = 6378000;
    return Math.sqrt((lon1*R*Math.cos(lat1/180*Math.PI) - lon2*R*Math.cos(lat2/180*Math.PI))**2 + (lat1*R - lat2*R)**2);
}