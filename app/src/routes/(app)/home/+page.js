
   /** @type {import('./$types').PageLoad} */


   export async function load ({ url, fetch, params }) {
    let username;
    try {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch(`http://localhost:4000/api/post?page=0&limit=3`, { 
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            }
        });
    const data = await res.json();
    const postdata = data.data.posts
    console.log(postdata)

      if (res.status === 200) {
      return postdata;
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

import { redirect } from "@sveltejs/kit";
import { BASE_URL } from "$lib/config";
import type { PageLoad } from "./$types";


export const load: PageLoad = async ({ url, params, fetch, data }) => {  
  const posts = await fetch(`${BASE_URL}/post?page=0&limit=3`);
  const users = await fetch(`${BASE_URL}/user?page=0&limit=5`);
  const res = await Promise.all([posts, users]);

  return {
  posts: await res[0].json(),
  users: await res[1].json(),
};
}
*/

