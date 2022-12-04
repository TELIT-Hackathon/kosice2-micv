<script>
    export let data;
</script>

<div class="info_pane">
    {#if data}
        <h1>{data.name1}</h1>
        <h3>{data.name2}</h3>
        {#each data.properties as prop}
            {#await prop}
                <div class="property">Načítavam...</div>
            {:then value}
                <div class="property {value.color}">
                    <div class="prop_key">
                        {value.key}
                    </div>
                    <div class="prop_value">
                        {value.value}
                    </div>
                </div>
            {:catch error}
                Nastala chyba
            {/await}
        {/each}
    {:else}
        <h1>Vyberte miesto</h1>
        <p>
            Kliknutím na mapu vyberiete miesto, o ktorom sa niečo chcete
            dozvedieť.
        </p>
    {/if}
</div>

<style lang="scss">
    @import '../Settings.scss';
    @import 'leaflet/dist/leaflet.css';

    .info_pane {
        padding: 1em;
        margin: 0;
    }

    .info_pane h1 {
        line-height: 1em;
        padding: 0 0 1em 0;
    }
    .info_pane h3 {
        line-height: 1em;
        padding: 0 0 0.5em 0;
    }

    .property {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 1em 0.5em 1em 0.5em;
        border-radius: 1em;
        overflow:hidden;
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
        background-color: #00000010;
        display: flex;
        align-items: center;
    }

    .prop_value {
        width: 50%;
        text-align: center;
        padding: 0.75em 0.5em 0.75em 0.5em;
        display: flex;
        align-items: center;
    }
</style>
