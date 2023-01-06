import { writable, derived } from "svelte/store";

const { subscribe, set, update } = writable({
  username: null,
  tag: null,
  avatar: null,
  banner: null,
  type: null,
  id: null,
  status: 0,



});

const userss = writable([

  
]);

/*
const { set, subscribe, update } = writable({
  userss: [],
});
*/

export default userss;