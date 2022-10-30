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

