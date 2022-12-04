<script lang="ts">
    import { goto } from '$app/navigation';

    let request = fetch('/mapa/byty');
</script>

<div class="byty">
    {#await request then data}
        {#await data.json() then jsonData}
            {#each jsonData.byty as byt}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="byt" on:click={() => goto('/mapa?id=' + byt.id)}>
                    <img src="/byty/{(byt.id % 5) + 1}.jpg" alt="byt" />
                    <div class="info">
                        <div>{byt.ulica} - {byt.druh}</div>
                        <div>{byt.cena} za {byt.plocha}</div>
                    </div>
                </div>
            {/each}
        {/await}
    {/await}
</div>

<style lang="scss">
    @import '../../Settings.scss';

    .byty {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;

        width: 100%;
        height: 100%;

        padding: 4vh 2vw;

        .byt {
            max-width: 700px;
            width: 100%;
            height: 5em;
            border-radius: 4px;
            box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.08);

            display: flex;
            flex-direction: row;
            justify-content: left;

            transition: 0.2s;

            overflow: none;

            &:hover {
                scale: 1.04;
                cursor: pointer;
                box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.1);
                max-width: 720px;
            }

            img {
                border-radius: 4px 0 0 4px;
            }

            .info {
                padding: 0.8em;
            }
        }
    }
</style>
