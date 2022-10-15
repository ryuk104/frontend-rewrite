import { writable } from 'svelte/store';

export const postsData = writable([
  {
    uid: "dsadhaudhuaish",
    username: "server",
    profilepicture: " https://m.media-amazon.com/images/I/51ufsmqJmyL._AC_UL320_.jpg",
    image: "https://m.media-amazon.com/images/I/51ufsmqJmyL._AC_UL320_.jpg",
    profilepicuture: "https://m.media-amazon.com/images/I/51ufsmqJmyL._AC_UL320_.jpg",
    desc: "Biggest nerd",
    comments: [],
    likes: "1",
  }, 
  {
    uid: "dsadhaudhuaish",
    username: "server",
    profilepicture: " https://m.media-amazon.com/images/I/51ufsmqJmyL._AC_UL320_.jpg",
    image: "https://m.media-amazon.com/images/I/51ufsmqJmyL._AC_UL320_.jpg",
    profilepicuture: "https://m.media-amazon.com/images/I/51ufsmqJmyL._AC_UL320_.jpg",
    desc: "Biggest nerd",
    comments: [],
    likes: "1",
  }, 
  {
    uid: "dsadhaudhuaish",
    username: "server",
    profilepicture: " https://m.media-amazon.com/images/I/51ufsmqJmyL._AC_UL320_.jpg",
    image: "https://m.media-amazon.com/images/I/51ufsmqJmyL._AC_UL320_.jpg",
    profilepicuture: "https://m.media-amazon.com/images/I/51ufsmqJmyL._AC_UL320_.jpg",
    desc: "Biggest nerd",
    comments: [],
    likes: "1",
  }, 
]);

export const username = writable("Anonymous");