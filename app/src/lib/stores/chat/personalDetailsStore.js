import { writable } from 'svelte/store';

const PersonalDetails = writable({
	firstName: '',
	lastName: '',
	email: '',
	country: '',
	city: '',
	about: '',
	photo: 'https://i.ibb.co/f0rM4vQ/person.jpg' //default photo
});

export default PersonalDetails;
