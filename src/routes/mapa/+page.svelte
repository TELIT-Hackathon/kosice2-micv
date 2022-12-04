<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { create_map, node_distance, features } from './map';
    import InfoPane from '$/components/InfoPane.svelte';

    let mapElement;
    let map;
    let placeData = null;

    onMount(async () => {
        if (!browser) return;
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

        var bussin = L.icon({
            iconUrl: '/bussin.svg',

            iconSize: [40, 40], // size of the icon
            iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
        });
        var skola = L.icon({
            iconUrl: '/skola.svg',

            iconSize: [40, 40], // size of the icon
            iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
        });
        var skolka = L.icon({
            iconUrl: '/skolka.svg',

            iconSize: [40, 40], // size of the icon
            iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
        });

        let markers = [];

        let izoch;
        async function update_isoch(lat, lon) {
            const response = await fetch('/mapa/isochrone', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lat: lat,
                    lon: lon,
                    time: 600,
                    transportation: 'driving',
                }),
            });
            const data = await response.json();
            if (izoch) {
                izoch.remove();
            }
            console.log(data);
            izoch = L.polygon(data.outline).addTo(map);
        }

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

            let veci = await features(lat, lon);
            console.log(veci);

            for (let i in markers) {
                markers[i].remove();
            }

            veci.zakladne_skoly.forEach(i => {
                markers.push(L.marker([i.geometry.coordinates[1], i.geometry.coordinates[0]], {icon: skola}).addTo(map));
            });
            veci.stredne_skoly.forEach(i => {
                markers.push(L.marker([i.geometry.coordinates[1], i.geometry.coordinates[0]], {icon: skola}).addTo(map));
            });
            veci.materske_skoly.forEach(i => {
                markers.push(L.marker([i.geometry.coordinates[1], i.geometry.coordinates[0]], {icon: skolka}).addTo(map));
            });
            veci.zastavky.forEach(i => {
                markers.push(L.marker([i.geometry.coordinates[1], i.geometry.coordinates[0]], {icon: bussin}).addTo(map));
            });

            let d_zs = node_distance(lat, lon, veci.zakladne_skoly[0]);
            let d_ss = node_distance(lat, lon, veci.stredne_skoly[0]);
            let d_ms = node_distance(lat, lon, veci.materske_skoly[0]);
            let d_z = node_distance(lat, lon, veci.zastavky[0]);
            

            placeData = {
                name1: first,
                name2: second,
                rating: 10,
                properties: [
                    (async () => {
                        return {
                            key: "Najbližšia základná škola",
                            value: `${d_zs}m - ${veci.zakladne_skoly[0].properties.organizacia_nazov}`,
                            color: (d_zs < 700 ? 'green' : d_zs < 1000 ? 'yellow' : 'red')
                        };
                    })(),
                    (async () => {
                        return {
                            key: "Najbližšia stredná škola",
                            value: `${d_ss}m - ${veci.stredne_skoly[0].properties.organizacia_nazov}`,
                            color: (d_ss < 700 ? 'green' : d_ss < 1000 ? 'yellow' : 'red')
                        };
                    })(),
                    (async () => {
                        return {
                            key: "Najbližšia materkská škola",
                            value: `${d_ms}m - ${veci.materske_skoly[0].properties.organizacia_nazov}`,
                            color: (d_ms < 700 ? 'green' : d_ms < 1000 ? 'yellow' : 'red')
                        };
                    })(),
                    (async () => {
                        return {
                            key: "Najbližšia zastávka MHD",
                            value: `${d_z}m - ${veci.zastavky[0].properties.zastavka_nazov}`,
                            color: (d_z < 200 ? 'green' : d_z < 500 ? 'yellow' : 'red')
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
    <script src="/heatmap.js"></script>
    <script src="/leaflet-heatmap.js"></script>
</svelte:head>

<style lang="scss">
    @import '../../Settings.scss';
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
