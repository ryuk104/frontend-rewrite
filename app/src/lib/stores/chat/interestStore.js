import { writable } from 'svelte/store';

const InterestDetails = writable({
	stayingIn: '',
	sport: '',
	movie: '',
	music: ''
});

export default InterestDetails;
