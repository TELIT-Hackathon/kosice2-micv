export function create_map(leaflet, mapElement, center) {
        let map = leaflet.map(mapElement).setView(center, 13);

        leaflet
            .tileLayer(
                'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
                {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                    subdomains: 'abcd',
                    maxZoom: 20,
                }
            )
            .addTo(map);

        return map;
        
}