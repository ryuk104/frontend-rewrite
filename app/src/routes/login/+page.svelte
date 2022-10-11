<script>    

import axios from 'axios'
import { emailRules, passwordRules } from "$lib/utils/validation";
import { mdiEmail, mdiEye, mdiEyeOff, mdiLock } from "@mdi/js";
import { onMount } from "svelte";

  
import {
  Button,
  Card,
  Col,
  Divider,
  Icon,
  ProgressCircular,
  Row,
  TextField,
} from "svelte-materialify";

import { goto } from "$app/navigation";
import { auth } from "$lib/stores/auth";

onMount(async () => {
    if($auth.isAuthenticated){
      goto("/")
    }
    api = await import("$lib/utils/axiosApi");
});



  let api;

  let show = false;
  let email = "";
  let password = "";

  let error = {};
  let loading = false;

  async function handleLogin() {
    try {
      loading = true;
      const res = await api.loginUser({ email, password });

      loading = false;
      

      if (res.type === "success") {
        localStorage.setItem("token", res.data.token);
        auth.setUser(res.data);
        return goto("/home");
      }

      if (res.type === "error") {
        error = res.data;
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
</script>

<div class="content">
	<form on:submit|preventDefault={handleLogin} class="login-form" id="reg-form" method="POST" >
        <h1>Login</h1>
        
        <div class="txtb">
            <input type="email" id="email" name="email" placeholder="email" bind:value={email} autocomplete="on">
            </div>

            <div class="txtb">
                <input type="password" id="password" name="password" placeholder="password" bind:value={password}>
            </div>

            <input type="submit" class="logbtn" value="login" id="loginbutton" >



            <div class="bottom-text">
                Don't have account? <a href="/signup"> Sign up</a>
            
            </div>
            <div class="bottom-text">
            
            </div>
            
    </form>
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
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

.bottom-text{
    margin-top: 60px;
    text-align: center;
    font-size: 13px;
}


</style>
