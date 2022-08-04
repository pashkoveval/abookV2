<script setup>
	import { firebaseState } from '@/fb';
	import { reactive } from 'vue';
	const form = reactive({
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
	firebaseState.getStore('users');
</script>

<template>
	<div class="login">
		<form @submit.prevent="loginIn">
			<img v-if="form.avatar" src="form.avatar" alt="Аватар" />
			<input v-model="form.firstName" type="string" placeholder="Имя" />
			<input v-model="form.lastName" type="string" placeholder="Фамилия" />
			<input v-model="form.email" type="string" placeholder="Email" />
			<input v-model="form.password" type="password" placeholder="Пароль" />
			<input
				v-model="form.passwordConfirm"
				type="password"
				placeholder="Подтвердить пароль"
			/>
			<label>
				<span>Выбрать аватар</span>
				<input type="file" class="avatar" @input="sendAvatar" />
			</label>
			<button color="warning">LogIn</button>
		</form>
	</div>
</template>

<style lang="scss" scoped>
	.login {
		position: relative;
	}
	.avatar {
		position: absolute;
		left: -200%;
		visibility: hidden;
	}
</style>
