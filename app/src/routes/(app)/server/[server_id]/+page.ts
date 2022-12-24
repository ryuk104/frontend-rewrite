
import type { PageLoad } from '@sveltejs/kit';
import { onMount } from "svelte";



/** @type {import('./$types').PageLoad} */
export async function load ({ url, fetch, params, stuff }) {
onMount(async () => {

  try {
    const serverId = params.server_id;
    const token = localStorage.getItem("token");

    const getserver = async () => {
    const res = await fetch(`http://localhost:4000/api/server/${serverId}`, { 
      method: 'GET',
      headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
    });


    const Data = await res.json();

    console.log(Data)

    return {
      avatar: Data.data.avatar,
      name: Data.data.name,
      default_channel_id: Data.data.default_channel_id,
      server_id: Data.data.server_id
    };

    let server_id;
  }
  getserver()

  } catch (error) {
    console.log(error);
  }

})
}

