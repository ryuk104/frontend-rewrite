import channel from "$lib/stores/channel"


/** @type {import('./$types').PageLoad} */

export async function load ({ params, fetch  }) {
  try {
    const { channelId } = params;
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:4000/api/channels/${channelId}`,
    { 
      method: 'GET',
      headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
    });;

    const Data = await res.json();

    channel.set(Data)

    console.log(Data)


  } catch (error) {
    console.log(error);
  }
}


