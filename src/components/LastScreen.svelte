<div class="container">
    <div class="row">
        <div class="card">

        </div>
        <div class="card">

        </div>
    </div>


    <div class="card">

    </div>
</div>

<style>
    .container {
        width: 100vw;
        height: 100vh;
        background: url("../assets/bg.jpg") no-repeat center center fixed;
        background-size: cover;

        display: grid;
        /*grid-template-columns: 1fr 1fr;*/
        grid-template-rows: 1fr 1fr;
    }
    .row {
        display: flex;
    }
    .card {
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        background: rgba(0,0,0,0.5);
        border-radius: 20px;
        margin: 10px;
    }

    @media screen and (max-width: 700px) {
        .row {
            flex-direction: column;
        }
        .container {
            grid-template-columns: 1fr;
            grid-template-rows: 2fr 1fr;
        }
    }

</style>
