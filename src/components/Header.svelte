<script lang="ts">
    import Burger from './Burger.svelte';
    import NavLink from './NavLink.svelte';

    export let links: { name: string; href: string }[];
</script>

<header>
    <div class="header-container">
        <img src="/kosice_logo.png" alt="logo" />
        <div class="header-links">
            {#each links as link}
                <NavLink href={link.href}>{link.name}</NavLink>
            {/each}
        </div>
        <div class="burger-container">
            <Burger {links} />
        </div>
    </div>
</header>

<style lang="scss">
    @import '../Settings.scss';

    header {
        background-color: $clr-accent1;
        color: $clr-light;
        height: $header-height;
        padding: min(1.0vh, 10px);

        display: flex;
        justify-content: center;
        z-index: 20000;
    }

    .header-container {
        display: flex;
        justify-content: space-between;

        @media (min-width: $mobile-width) {
            justify-content: center;
        }

        align-items: center;
        gap: 1em;

        height: 100%;
        width: 100%;
    }

    .burger-container {
        display: none;
    }

    @media (max-width: $mobile-width) {
        .header-links {
            display: none;
        }

        .burger-container {
            display: block;
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
