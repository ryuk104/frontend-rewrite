
//import type { PageLoad } from '@sveltejs/kit';


   /** @type {import('./$types').PageLoad} */


export async function load ({ url, fetch, params }) {
  let username;
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
  } catch (error) {
    console.log(error);
  }
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