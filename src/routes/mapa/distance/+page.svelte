<script>
import { onMount, onDestroy } from 'svelte';
  onMount(async() => {
    const settings = {
      method: "POST",
      headers: {
          Accept: "aplication/json",
          "Content-Type": "aplication/json"
      },
      body: JSON.stringify({lat: 0, lng: 0})
      }
    const response = await fetch('/mapa/distance', settings);
    const data = await response.json();
    console.log(data)
  }
  )
  </script>
