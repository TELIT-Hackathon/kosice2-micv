<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { create_map } from '$/components/map';
    import InfoPane from '$/components/InfoPane.svelte';

    let mapElement;
    let map;
    let placeData = null;

    onMount(async () => {
        if (!browser) return;
        // const leaflet = await import('leaflet');
        // const hm = await import('leaflet-heatmap');
        // const response = await fetch('/mapa/nehody');
        // const data = await response.json();
        // console.log(data);

        let center = [48.72, 21.26];
        let map = create_map(L, mapElement, center);
        // const cfg = {
        //     radius: 10,
        //     maxOpacity: 0.8,
        //     scaleRadius: false,
        //     useLocalExtrema: true,
        //     latField: 'lat',
        //     lngField: 'lng',
        //     valueField: 'count',
        // };

        // var hl = new HeatmapOverlay(cfg);
        // hl.addTo(map);
        // hl.setData(data);

        async function update_features() {
            const response = await fetch('/mapa/veci');
            const features = await response.json();
        }

        let izoch;
        async function update_isoch(lat, lon) {
            const response = await fetch('/mapa/isochrone', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lat: lat, lon: lon, time: 600 }),
            });
            const data = await response.json();
            if (izoch) {
                izoch.remove();
            }
            console.log(data);
            izoch = L.polygon(data.outline).addTo(map);
        }

        async function get_school_info(lat, lon) {
            const response = await fetch('/mapa/find_nearest', {
                method: 'POST',
                headers: {
                    Accept: 'aplication/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    n: 5,
                    center: {lat: lat, lng: lon}, 
                    data: 'zakladne_skoly'
                })
            });
            const data = await response.json();
            console.log(data);
            return data[0].properties.organizacia_nazov;
        }

        function closestSchool() {}

        var point;
        map.on('click', async e => {
            let data = await (
                await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.latlng.lat}&lon=${e.latlng.lng}&accept-language=sk`
                )
            ).json();

            let name = data.display_name;
            let [first, ...second] = name.split('-');
            second = second.join('-');
            if (point) {
                point.remove();
            }
            point = L.marker(e.latlng).addTo(map);

            let lat = e.latlng.lat;
            let lon = e.latlng.lng;

            placeData = {
                name1: first,
                name2: second,
                rating: 10,
                properties: [
                    (async () => {
                        return {
                            key: 'Najbližšia škola',
                            value: await get_school_info(lat, lon),
                        };
                    })(),
                    (async () => {
                        return {
                            key: 'Umiestnenie',
                            value: 'Výborné',
                            color: 'green',
                        };
                    })(),
                    (async () => {
                        return {
                            key: 'Cena',
                            value: 'Vpohode',
                            color: 'yellow',
                        };
                    })(),
                    (async () => {
                        return {
                            key: 'Detské ihriská',
                            value: 'Žiadne',
                            color: 'red',
                        };
                    })(),
                ],
            };
            update_isoch(e.latlng.lat, e.latlng.lng);
        });
    });

    onDestroy(async () => {
        if (map) {
            console.log('Unloading Leaflet map.');
            map.remove();
        }
    });
</script>

<div class="map">
    <div class="sidebar">
        <InfoPane data={placeData} />
    </div>
    <div bind:this={mapElement} />
</div>

<svelte:head>
    <script
        src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
        integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
        crossorigin=""
    ></script>
    <script src="/heatmap.js">
    </script>
    <script src="/leaflet-heatmap.js">
    </script>
</svelte:head>

<style lang="scss">
    @import '../Settings.scss';
    @import 'leaflet/dist/leaflet.css';

    .map div:not(.sidebar, .sidebar *),
    .map {
        height: 100%;
    }

    .sidebar {
        position: absolute;
        width: min(100vw, 20em);
        height: calc(100% - $header-height);
        top: $header-height;
        right: 0;
        background-color: white;
        z-index: 10000;
        box-shadow: 0 0 3em rgba(0, 0, 0, 0.2);
        padding: 0;
    }

    @media screen and (max-width: 600px) {
        .sidebar {
            top: calc($header-height + 100vh - 12em);
            left: 0;
            width: 100%;
            border-radius: 1em;
        }
    }
</style>
