
import { BASE_URL } from "$lib/config";

export async function load({ fetch }) {
  const posts = await fetch(`${BASE_URL}/api/post?page=0&limit=3`);
  const users = await fetch(`${BASE_URL}/api/user?page=0&limit=5`);
  const res = await Promise.all([posts, users]);

  return {
  posts: await res[0].json(),
  users: await res[1].json(),
};
}
