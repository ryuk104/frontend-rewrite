import { writable } from 'svelte/store';

const currentUser = writable({
	id: '',
	username: '',
	token: '',
	photo: 'https://i.ibb.co/f0rM4vQ/person.jpg',
	loggedIn: false,
	newUser: true
});

export default currentUser;
