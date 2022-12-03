<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    onMount(async () => {
        const response = await fetch('/mapa/find_nearest', {
            method: 'POST',
            headers: {
                Accept: 'aplication/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                n: 5,
                center: {lat: 48.70595, lng: 21.26183}, 
                data: 'zakladne_skoly'
            })
        });
        const data = await response.json();
        console.log(data);
    });
</script>
