<script setup>
	import { useUserStore } from '@/stores/user';
	import InputField from '@/components/InputField/InputField.vue';
	import SelectAvatars from '../components/SelectAvatars/SelectAvatars.vue';
	import { firebaseState } from '@/fb';
	import { reactive } from 'vue';

	const user = useUserStore();
	const form = reactive({
		test: null,
		email: null,
		avatar: null,
		lastName: null,
		firstName: null,
		password: null,
		passwordConfirm: null,
	});

	const loginIn = async () => {
		console.log('imagesRef', firebaseState.imagesRef);
		const user = await firebaseState.login(form.email, form.password, true);
		const userForm = form;
		console.log('liginIn userForm', userForm);
		console.log('liginIn user', user);
		userForm.accessToken = user.accessToken;
		userForm.emailVerified = user.emailVerified;
		userForm.metadata = user.metadata;
		userForm.phoneNumber = user.phoneNumber;
		userForm.photoURL = user.photoURL;
		userForm.uid = user.uid;
		const userCreates = await firebaseState.addElement('users', userForm);
		console.log('liginIn userCreates', userCreates);
	};

	const sendAvatar = async (e) => {
		if (e.target.files[0]) {
			const res = await firebaseState.uploadFyles(e.target.files[0]);
			form.avatar = res;
			user.pushNewAvatars({
				select: true,
				src: res,
				alt: user.userData.fio || 'userAvatar',
			});
		}
	};

	firebaseState.getStore('users');
</script>

<template>
	<div class="login-view">
		<InputField v-model="form.test" :search="true" :clear="true" />
		<SelectAvatars />

		<form @submit.prevent="loginIn">
			<label>
				<span>Выбрать аватар</span>
				<input type="file" class="avatar" @input="sendAvatar" />
			</label>
			<input v-model="form.firstName" type="string" placeholder="Имя" />
			<input v-model="form.lastName" type="string" placeholder="Фамилия" />
			<input v-model="form.email" type="string" placeholder="Email" />
			<input v-model="form.password" type="password" placeholder="Пароль" />
			<input
				v-model="form.passwordConfirm"
				type="password"
				placeholder="Подтвердить пароль"
			/>
			<input
				v-model="form.phoneNumber"
				type="tel"
				placeholder="Ваш номер телефона"
			/>
			<button>LogIn</button>
		</form>
	</div>
</template>

<style lang="scss" scoped>
	.login-view {
		// position: relative;
		// overflow: hidden;
		padding: 8px;
	}
</style>
