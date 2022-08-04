import { initializeApp, getApp } from 'firebase/app';
import { reactive } from 'vue';
import { errorMessage } from '@/helpers';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	getDoc,
	setDoc,
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
const firebaseApp = getApp();
const storage = getStorage(firebaseApp, 'gs://abook-4b16d.appspot.com/');
const imagesRef = ref(storage, 'img');

const login = async (email, password, flag) => {
	if (flag) {
		return await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log('create user', user);
				return user;
			})
			.catch((error) => {
				errorMessage(error);
			});
	} else {
		return await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log('login user', user);
				return user;
			})
			.catch((error) => {
				errorMessage(error);
			});
	}
};

const addElement = async (collectionMame, item) => {
	try {
		const docRef = await addDoc(collection(db, collectionMame), item);
		console.log('Document written with ID: ', docRef.id);
		console.log('docRef', docRef);
		return docRef;
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};

const setElement = async (element, item) => {
	await setDoc(doc(db, element), item);
};

const uploadFyles = async (file) => {
	return await uploadBytes(storage, file).then((snapshot) => {
		console.log('Uploaded a blob or file!', snapshot);
		return snapshot;
	});
};

const getStore = async (name) => {
	try {
		const items = [];
		const querySnapshot = await getDocs(collection(db, name));
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
	storage,
	getStore,
	imagesRef,
	setElement,
	addElement,
	uploadFyles,
});
