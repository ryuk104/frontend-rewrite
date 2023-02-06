
//import type { PageLoad } from '@sveltejs/kit';


   /** @type {import('./$types').PageLoad} */
   import { user } from "$lib/stores/user.js";


export async function load ({ url, fetch, params }) {
  let username;


try {
    const token = localStorage.getItem("token");
    
    const getuser = async () => {
      const res = await fetch(`http://localhost:4000/api/user`, { 
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        }
      });
      const data = await res.json();
      const userdata = data
      //user.set(userdata)
      console.log(data)

  }   














/*
  try {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(`http://localhost:4000/api/auth/me`, { 
          method: 'GET',
          headers: {
              'content-type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
          }
      });
  const data = await res.json();
  const userdata = data.data.user
   
    if (res.status === 200) {
    return userdata;
    }
      } catch (error) {
        console.log(error);
      }
    }

    */

  } catch (error) {
    console.log(error);
  }


  /*
  const posts = await fetch(`http://localhost:4000/api/post?page=0&limit=3`);
  const users = await fetch(`http://localhost:4000/api/user?page=0&limit=5`);
  const data = await res.json();

    return {
      props: {
        posts: await res[0].json(),
        users: await res[1].json(),
      },
    };

*/

  
}





/*
export function load({ session }) {
	if (!session.user) {
		throw redirect(302, `/login`);
	}

	return {};
}
*/



/*
export async function laod ({ data, fetch }) { 
    const getallposts = await fetch('localhost:4000/api/posts/getallposts', {
        method: 'GET'
    })
    const posts = await response.json()
}
*/