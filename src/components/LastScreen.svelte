<div class="container">
    <div class="row">
        <div class="card">
            <h1>About us</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint optio asperiores temporibus facilis animi reiciendis est ab quis aperiam quasi? Fugit animi provident voluptatem voluptatibus vero tenetur omnis? Nam, tempora!
            </p>
        </div>
        <div class="card">

        </div>
    </div>


    <div class="card">

    </div>
</div>

<style>
    h1 {
        color: white;
    }
    p {
        color: white;
        opacity: .7;
    }
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
        /* padding: 20px; */
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
