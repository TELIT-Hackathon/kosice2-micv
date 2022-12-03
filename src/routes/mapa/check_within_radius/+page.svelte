<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    onMount(async () => {
        const response = await fetch('/mapa/check_within_radius', {
            method: 'POST',
            headers: {
                Accept: 'aplication/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                radius: 800,
                center: {lat: 48.705878, lng: 21.264437}, 
                data: "zakladne_skoly"
            })
        });
        const data = await response.json();
        console.log(data);
    });
</script>
