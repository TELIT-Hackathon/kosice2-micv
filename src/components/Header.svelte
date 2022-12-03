<script lang="ts">
    import NavLink from './NavLink.svelte';
    export let links: { name: string; href: string }[];
</script>

<header>
    <img src="/kosice_logo.png" alt="logo" />
    <div class="header-title"><b>Košické bývanie</b></div>
    <div class="header-links">
        {#each links as link}
            <NavLink href={link.href}>{link.name}</NavLink>
        {/each}
    </div>
</header>

<style lang="scss">
    @import '../Settings.scss';

    header {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $clr-accent1;
        color: $clr-light;
        gap: 1em;
        height: min(6vh, 60px);
        padding: min(1.8vh, 12px);
    }

    @media (max-width: $mobile-width) {
        .header-links {
            display: none;
        }
    }

    :global {
        .header-links a {
            padding: 0.03em 0.25em;
            border-radius: 2px;
            margin: 0.2em;
            color: $clr-light;

            &.active {
                color: $clr-accent1;
                background-color: $clr-light;
            }
        }
    }
</style>
