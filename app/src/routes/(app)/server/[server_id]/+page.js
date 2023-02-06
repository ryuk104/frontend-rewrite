

import server from "$lib/stores/server"


/** @type {import('./$types').PageLoad} */

export async function load ({ fetch, params }) {
  try {
    const { server_id } = params;
    const token = localStorage.getItem("token");

    const getserver = async () => {
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
    return {serverdata}


  }
  getserver()

  

  } catch (error) {
    console.log(error);
  }

}






