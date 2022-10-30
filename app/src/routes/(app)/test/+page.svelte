<script>

    export let data
    console.log(data)
    
    import Stories from "$lib/components/stories/stories.svelte";
    import Instagram from "$lib/components/posts/instagram.svelte";

</script>



<main class="app">
    <ul class="maincontainer"> 
        <l1> 
            <div class="userprofilecard">
                <img  class="avatar" src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x2.jpg" >
                <div class="username">plceholder#6575</div>
                <div class="bio">Add custom </div>
                <div class="status">Online</div>

            </div> 
        </l1>

        <l1> <div class="notifications"></div> </l1>
        <l1> <div class="muisc"></div> </l1>
        <l1> <div class="dsdsa"></div> </l1>
    </ul>
    <div class="mediaacontainer">
        <Stories/>
        <Instagram/>
    </div>
</main>



<style>
    .app {
        margin: 0;
        padding: 0;
        display: flex;
        position: fixed;
        top:4%;
        left: 300px;
        height: 96%;
        width: 100%;    
    }

    .maincontainer{
        background-color:grey;
        width: 40%;
        margin: 0;
        padding: 0;
        display: flex;
        
    }

    .mediaacontainer{
        width:48%;
        background-color:rgb(21, 7, 7);
        margin: 0;
        padding: 0;
        display: flex;
    }

    .userprofilecard {
        margin: 0;
        padding: 0;
        display: flex;
        position: relative;
        background-color: red;
        width: 400px;
        height: 500px;
        top: 2%;
        left: 5%;
        border-radius:10px;
    }

    .muisc {
        margin: 0;
        padding: 0;
        display: flex;
        position: relative;
        background-color: red;
        width: 400px;
        height: 500px;
        top: 2%;
        left: -80%;
        border-radius:10px;
    }

    .notifications {
        margin: 0;
        padding: 0;
        display: flex;
        position: relative;
        background-color: red;
        width: 400px;
        height: 500px;
        top: 50%;
        left: -95%;
        border-radius:10px;
    }

    .dsdsa {
        margin: 0;
        padding: 0;
        display: flex;
        position: relative;
        background-color: red;
        width: 400px;
        height: 500px;
        top: 50%;
        left: -180%;
        border-radius:10px;
    }


    .avatar {
        width: 150px;
        height: 150px;
        border-radius:80px;
        top: 10%;
        left: 10%;
    }
</style>