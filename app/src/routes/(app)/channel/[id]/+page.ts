
import type { PageLoad } from '@sveltejs/kit';


/** @type {import('./$types').PageLoad} */
export async function load ({ url, fetch, params, stuff }) {
  try {
    const serverId = params.id;
    const res = await fetch(`http://localhost:4000/api/channel/${channelId}`);

    const Data = await res.json();

    console.log(Data)

    return {
      avatar: Data.data.avatar,
      name: Data.data.name,
      default_channel_id: Data.data.default_channel_id,
      server_id: Data.data.server_id
    };

    let server_id;


  } catch (error) {
    console.log(error);
  }
}

