import server from "$lib/stores/server"
import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
    const { server_id } = params;
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:4000/api/server/${server_id}`, { 
      method: 'GET',
      headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
    });


    const serverd = await res.json();
    const serverdata = serverd
    server.set(serverdata)
    return serverdata;



  })






