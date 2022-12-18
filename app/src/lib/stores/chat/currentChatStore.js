import { writable } from 'svelte/store';

const CurrentChat = writable({
	conversation_id: -1,
	conversation_name: '',
	private: false,
	receiver_id: '', //Only used for private chat
	receiver_username: '',
	photo: '',
	bot: ''
});

export default CurrentChat;
