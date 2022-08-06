import { defineStore } from 'pinia';

export const useCounterStore = defineStore({
	id: 'users',
	state: () => ({
		userData: {
			email: null,
			lastName: null,
			firstName: null,
			password: null,
			accessToken: null,
			emailVerified: null,
			metadata: null,
			phoneNumber: null,
			photoURL: null,
			uid: null,
		},
	}),
	getters: {
		doubleCount: (state) => state.counter * 2,
	},
	actions: {
		// this.counter++;
	},
});
