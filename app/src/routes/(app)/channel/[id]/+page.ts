
import type { PageLoad } from '@sveltejs/kit';


/** @type {import('./$types').PageLoad} */

export async function load ({ url, fetch, params, stuff }) {
  try {
    const channelId = params.id;
    const res = await fetch(`http://localhost:4000/api/channels/${channelId}`);

    const Data = await res.json();

    console.log(Data)

    return {
      avatar: Data.data.avatar,
      name: Data.data.name,
      default_channel_id: Data.data.default_channel_id,
      channelId: Data.data.channelId
    };



  } catch (error) {
    console.log(error);
  }
}


