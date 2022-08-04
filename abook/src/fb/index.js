import { reactive } from 'vue';

import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	getDoc,
	doc,
} from 'firebase/firestore';

import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyD-kNe61YF4Nn-Z8UUz2vzraM_fQkYJzok',
	authDomain: 'abook-4b16d.firebaseapp.com',
	projectId: 'abook-4b16d',
	storageBucket: 'abook-4b16d.appspot.com',
	messagingSenderId: '952811576008',
	appId: '1:952811576008:web:d85dd35a526115cc9ce3fd',
	measurementId: 'G-LSDXEBTYHN',
};

const fb = initializeApp(firebaseConfig);
const db = getFirestore(fb);
const auth = getAuth();

const login = (email, password) => {
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			// ...
			console.log('user', user);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log('errorCode', errorCode);
			console.log('errorMessage', errorMessage);
			// ..
		});
};

const addEl = async (store, item) => {
	try {
		const docRef = await addDoc(collection(db, store), item);
		console.log('Document written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};

const getStore = async (s) => {
	try {
		const items = [];
		const querySnapshot = await getDocs(collection(db, s));
		querySnapshot.forEach((doc) => {
			items.push({ id: doc.id, ...doc.data() });
		});
		console.log('Document get: ', items);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};

export const firebaseState = reactive({
	db,
	auth,
	login,
	addEl,
	getStore,
});
