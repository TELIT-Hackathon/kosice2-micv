<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

    let mapElement;
    let map;

    onMount(async () => {
        if (!browser) return;
        const leaflet = await import('leaflet');

        let center = [48.72, 21.26];

        map = leaflet.map(mapElement).setView(center, 13);

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

        // leaflet.marker(center).addTo(map)
        //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        //     .openPopup();
        

        var point = leaflet.popup().setContent('I am a standalone popup.');
        map.on('click', e => {
            point.setLatLng(e.latlng);
            point.openOn(map);
        });
    });

    onDestroy(async () => {
        if (map) {
            console.log('Unloading Leaflet map.');
            map.remove();
        }
    });
</script>

<main>
    <div bind:this={mapElement} />
</main>

<style>
    @import 'leaflet/dist/leaflet.css';
    main div {
        height: 800px;
    }
</style>
