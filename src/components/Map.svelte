<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { create_map } from '$/components/map';

    let mapElement;
    let map;
    let placeData = null;

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
            radius: 10,
            maxOpacity: 0.8,
            scaleRadius: false,
            useLocalExtrema: true,
            latField: 'lat',
            lngField: 'lng',
            valueField: 'count',
        };

        var hl = new HeatmapOverlay(cfg);
        hl.addTo(map);
        hl.setData(data);

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
            // point.setContent(first);
            placeData = {
                name1: first,
                name2: second,
                rating: 10,
                properties: [
                    { key: 'Umiestnenie', value: 'Výborné', color: 'green' },
                    { key: 'Cena', value: 'Vpohode', color: 'yellow' },
                    { key: 'Detské ihriská', value: 'Žiadne', color: 'red' },
                ],
            };
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
        {#if placeData}
            <h1>{placeData.name1}</h1>
            <h3>{placeData.name2}</h3>
            <p>Celkové hodnotenie: {placeData.rating} bodov</p>
            {#each placeData.properties as prop}
                <div class="property {prop.color}">
                    <div class="prop_key">
                        {prop.key}
                    </div>
                    <div class="prop_value">
                        {prop.value}
                    </div>
                </div>
            {/each}
        {:else}
            <h1>Vyberte miesto</h1>
            <p>
                Kliknutím na mapu vyberiete miesto, o ktorom sa niečo chcete
                dozvedieť.
            </p>
        {/if}
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
        padding: 1em;
    }

    .sidebar h1 {
        line-height: 1em;
        padding: 0 0 1em 0;
    }
    .sidebar h3 {
        line-height: 1em;
        padding: 0 0 0.5em 0;
    }

    .property {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 1em 0.5em 1em 0.5em;
        border-radius: 1em;
    }

    .red {
        background-color: hsl(0, 80%, 90%);
    }

    .yellow {
        background-color: hsl(60, 80%, 90%);
    }

    .green {
        background-color: hsl(120, 80%, 90%);
    }

    .prop_key {
        width: 50%;
        text-align: center;
        padding: 0.75em 0.5em 0.75em 0.5em;
    }

    .prop_value {
        width: 50%;
        text-align: center;
        padding: 0.75em 0.5em 0.75em 0.5em;
    }
</style>
