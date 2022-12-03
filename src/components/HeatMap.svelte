<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { create_map } from '$/components/map';

    let mapElement;
    let map;

    onMount(async () => {
        if (!browser) return;
        //const leaflet = await import('leaflet');
        // const hm = await import('leaflet-heatmap');

        const response = await fetch('/mapa/nehody');
        const data = await response.json();

        console.log(data);

        let center = [48.72, 21.26];
        let map = create_map(L, mapElement, center);
        const cfg = {
          "radius": 10,
          "maxOpacity": .8,
          "scaleRadius": false,
          "useLocalExtrema": true,
          latField: 'lat',
          lngField: 'lng',
          valueField: 'count'
        };

        var hl = new HeatmapOverlay(cfg);
        hl.addTo(map);
        hl.setData(data);
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

<svelte:head>
    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
     integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
     crossorigin=""></script>
    <script src='/heatmap.js'> </script>
    <script src='/leaflet-heatmap.js'> </script>
</svelte:head>
