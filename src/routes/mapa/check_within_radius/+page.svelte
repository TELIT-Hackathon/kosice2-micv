<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    onMount(async () => {
        const settings: RequestInit = {
            method: 'POST',
            headers: {
                Accept: 'aplication/json',
                'Content-Type': 'aplication/json',
            },
            // body: JSON.stringify({ lat: 0, lng: 0 }),
        };
        const response = await fetch('/mapa/check_within_radius', {
            method: 'POST',
            headers: {
                Accept: 'aplication/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                radius: 1000,
                center: {lat: 48.17, lng: 21.17}, 
                data: [{"name": "aa", "coords": {lat: 48.17, lng: 21.17}},{"name": "bb", "coords": {lat: 48.18, lng: 21.18}}]
            })
        });
        const data = await response.json();
        console.log(data);
    });
</script>
