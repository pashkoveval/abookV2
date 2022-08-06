import { initializeApp, getApp } from 'firebase/app';
import { reactive } from 'vue';
import { v4 as genId } from 'uuid';
import {
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
	getMetadata,
	uploadBytesResumable,
} from 'firebase/storage';
import { errorMessage } from '@/helpers';

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
	updateProfile,
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyByTrKd_jicAqmzaQSSBKikrFCE0zwcNLo',
	authDomain: 'abook-5131e.firebaseapp.com',
	projectId: 'abook-5131e',
	storageBucket: 'abook-5131e.appspot.com',
	messagingSenderId: '951286490820',
	appId: '1:951286490820:web:de5975f6017c59db228b91',
	measurementId: 'G-4DQQMLSLV8',
};

const fb = initializeApp(firebaseConfig);
const db = getFirestore(fb);
const auth = getAuth();
const firebaseApp = getApp();
const storage = getStorage(firebaseApp);

const getURL = async (pathImg) => {
	return await getDownloadURL(ref(storage, pathImg))
		.then((url) => {
			console.log('url', url);
			return url;
		})
		.catch((error) => {
			errorMessage(error);
		});
};

const getRefFunc = (pathImg = 'img') => {
	return ref(storage, pathImg);
};

const login = async (email, password, createUser) => {
	if (createUser) {
		if (email && password) {
			return await createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					console.log('create user', user);
					return user;
				})
				.catch((error) => {
					errorMessage(error);
				});
		}
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

const updateUserProfile = async (auth, user) => {
	const displayName = user.displayName;
	const email = user.email;
	const photoURL = user.photoURL;
	return await updateProfile(auth.currentUser, {
		displayName,
		email,
		photoURL,
	})
		.then((userProfile) => {
			const userProfileUpdate = userProfile.user;
			console.log('updateUserProfile login user', userProfileUpdate);
			return userProfileUpdate;
		})
		.catch((error) => {
			console.error('Error update user profile: ', error);
		});
};

const addElement = async (collectionMame, item) => {
	try {
		const docRef = await addDoc(collection(db, collectionMame), item);
		console.log('Document written with ID: ', docRef.id);
		console.log('docRef', docRef);
		return docRef;
	} catch (error) {
		console.error('Error adding document: ', error);
	}
};

const setElement = async (element, item) => {
	await setDoc(doc(db, element), item);
};

const uploadFyles = async (file) => {
	if (file) {
		const metadata = {
			contentType: file.type,
		};
		const storageRef = ref(storage, 'images/' + genId());
		const uploadTask = await uploadBytesResumable(storageRef, file, metadata);
		if (uploadTask) {
			const url = await getDownloadURL(storageRef).then((downloadURL) => {
				return downloadURL;
			});
			return url;
		}
	}
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
	getURL,
	storage,
	getStore,
	getRefFunc,
	setElement,
	addElement,
	uploadFyles,
	updateUserProfile,
});
