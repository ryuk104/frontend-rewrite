<script>
    async function addfreind(event) {
		try {
			const res = await fetch('http://localhost:4000/api/auth/register', {
				method: 'POST',
				body: JSON.stringify([{
                    username,
                    email,
                    password,
                    confirmpassword,
                    phonenumber
                }]),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			if (!res.ok) {
				if (res.status == 401)
					// user already existed and passwords didn't match (otherwise, we login the user)
					throw new Error('Sorry, that username is already in use.')
				throw new Error(res.statusText) // should only occur if there's a database error
			}
		} catch (err) {
			console.error('Register error', err)
			if (err instanceof Error) {
				throw new Error(err.message)
			}
		}
	}
</script>







<div class="main">

    <div>
        <input class="inputbox" autocomplete="off" name="add-friend" data-lpignore="true" placeholder="Enter a Username#0000"   type="text">    
        <button on:submit|preventDefault={addfreind}  type="submit">Send Friend Request</button>
    </div>
    
</div>


  <style>
    .main{
    background-color: grey;
    margin: 0;
    padding: 0;
    display: flex;
    position: fixed;
    top:8%;
    left: 300px;
    height: 90%;
    width: 90%;    
    }

    .inputbox{
        background-color:rgb(53, 53, 53);
        width: 1000px;
        height: 50px;
    }



    
  </style>