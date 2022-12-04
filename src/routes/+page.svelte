<script lang="ts">
</script>

<div class="full-page">
    <div class="main-page-top">
        <div class="overlay">
            <div class="top-content">
                <h1>Vybrať správne je kľučové</h1>
            </div>
        </div>
    </div>

    <div class="main-page-bottom">
        <p>
            Pomáhamé vám s výberom <b>lacného a dostupného ubytovania</b> na
            základe
            <b>možností dopravy, vzdialenosti škôl, lekární, ambulancií</b>.
        </p>
        <p>
            Používame voľne dostupné dáta a spracuvávame ich do formy prehľadnej
            mapy.
        </p>
    </div>
</div>

<style lang="scss">
    @import '../Settings.scss';

    .full-page {
        width: 100%;
        min-height: calc(100vh - $header-height);

        display: flex;
        flex-direction: column;
    }

    .main-page-top {
        flex-grow: 1;
        
        background-image: url('/kosice.jpg');
        background-position: center;
        background-size: cover;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .overlay {
            width: 100%;
            height: 100%;
            background-color: #00000004;
            
            flex-grow: 1;

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        .top-content {
            width: 100%;
            height: 100%;

            flex-grow: 1;

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            h1 {
                font-size: 3em;
                padding: 0.2em 0.4em;
                background-color: $clr-light;
                border-radius: 0.05em;
            }
        }
    }

    .main-page-bottom {
        flex-grow: 1;
    }
</style>
