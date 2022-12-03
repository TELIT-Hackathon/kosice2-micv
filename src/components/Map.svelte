<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { create_map } from '$/components/map';

    let mapElement;
    let map;

    onMount(async () => {
        if (!browser) return;
        const leaflet = await import('leaflet');

        let center = [48.72, 21.26];
        let map = create_map(leaflet, mapElement, center);

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
