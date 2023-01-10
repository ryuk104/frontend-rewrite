import { writable } from "svelte/store";

import { browser } from "$app/environment"


//用户信息
export const userInfoStore = writable(
  JSON.parse(browser && localStorage.getItem("isLogin"))
    ? JSON.parse( browser &&localStorage.getItem("userInfo"))
    : {}
);

//用户喜欢的音乐IDs
export const userLikeSongIdsStore = writable(
  JSON.parse(browser && localStorage.getItem("useLoveSongIds"))
    ? JSON.parse(browser && localStorage.getItem("useLoveSongIds"))
    : []
);
//我喜欢的音乐歌单ID
export const userLikeListIdStore = writable(
  JSON.parse(browser && localStorage.getItem("userLikeListId"))
    ? JSON.parse(browser && localStorage.getItem("userLikeListId"))
    : ''
);
