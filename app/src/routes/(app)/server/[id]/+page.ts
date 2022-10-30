
import type { PageLoad } from '@sveltejs/kit';

throw new Error("@migration task: Migrate the load function input (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
export async function load ({ url, fetch, params, stuff }) {
  try {
    const { serverId } = params;
    const res = await fetch(`http://localhost:4000/api/server/${serverId}`);

    const data = await res.json();

    return {
  user: data.data.user,
  posts: data.data.posts,
};
  } catch (error) {
    console.log(error);
  }
}
