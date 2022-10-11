<script>
    let username;
    let email;
    let password;
    let confirmpassword;
    let phonenumber;


    const submitsignup = async () => {
        const login = await fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            mode: 'cors',
            cache: "default",
            credentials: "same-origin",
            referrerPolicy: 'no-referrer', 
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*"
            },
            redirect: "follow",
            body: ({
                username,
                email,
                password,
                confirmpassword,
                phonenumber
            }),
        }).then(console.log(email, password,"working"))
    }
</script>

<form on:submit|preventDefault={submitsignup} action="/api/signup" class="login-form" id="reg-form" method="POST" >    <h1>Signup</h1>
    
    <div class="txtb">
        <input type="name" name="username" placeholder="username" id="username" bind:value={username}>
        </div>
    <div class="txtb">
        <input type="email" name="email" placeholder="email" id="email" bind:value={email}>
        </div>

        <div class="txtb">
            <input type="password" name="password" placeholder="password" id="password" bind:value={password}>
        </div>

        <div class="txtb">
            <input type="password" name="confirmpassword" placeholder="confirmpassword" id="passwordconfirm" bind:value={confirmpassword}>
        </div>

        <div class="txtb">
            <input type="number" name="phonenumber" placeholder="phonenumber" id="phonenumber" bind:value={phonenumber}>
        </div>
        
        <div>
            <label class="inline-flex items-center cursor-pointer">
              <input
                id="customCheckLogin"
                type="checkbox"
                class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
              />
              <span class="ml-2 text-sm font-semibold text-blueGray-600">
                I agree with the
                <a href="#pablo" on:click={(e) => e.preventDefault()} class="text-red-500">
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>


        <input type="submit" name="createacount"  placeholder="create acount" class="logbtn" value="signup">
        
</form>

<style>
    *{
    margin: 200;
    padding: 200;
    text-decoration:none;
    font-family: montserrat;
    box-sizing: border-box;
}


.login-form{
    width:360px;
    background:#f1f1f1;
    height: 580px;
    padding: 80px 40px;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}

.login-form h1{
    text-align:center;
    margin-bottom: 60px;
}

.txtb{
    border-bottom:2px solid #adadad;
    position: relative;
    margin: 30px 0;
}

.txtb input{
    font-size: 15px;
    color:#333;
    border: none;
    width:100%;
    outline:none;
    background: none;
    padding: 0 5px;
    height:40px;
}

.logbtn{
    display: block;
    width:100%;
    height: 50px;
    border: none;
    background: linear-gradient(120deg,#3498db,#8e44ad,#3498db);    
    background-size:200%;
    color:#fff;
    outline: none; 
    cursor:pointer;
    transition:.5s;
}

.logbtn:hover{
    background-position: right;
}


</style>