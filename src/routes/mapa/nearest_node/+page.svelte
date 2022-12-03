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
        const response = await fetch('/mapa/nearest_node', {
            method: 'POST',
            headers: {
                Accept: 'aplication/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lat: 48.1545, lng: 21.1589 
            })
        });
        const data = await response.json();
        console.log(data);
    });
</script>
