<script>
    //import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import { post } from '$lib/apipost';

    let name = 'test';
    let email = 'test@gmail.com';
    let password = 'test';

async function createUser() {
		fetch(`http://localhost:4000/api/auth/register`, { 
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name, 
                email, 
                password 
            })
        });
	}


    
</script>


<form on:submit|preventDefault={createUser} class="login-form" id="reg-form" method="POST">    <h1>Signup</h1>
    
        <input type="name" name="name" placeholder="username" id="username" bind:value={name}>
        <input type="email" name="email" placeholder="email" id="email" required bind:value={email} >
        <input type="password" name="password" placeholder="password" id="password" required bind:value={password}>



        <input type="submit" name="createacount"  placeholder="create acount" class="logbtn" value="signup">
        
</form>
