<script setup>
	import DropDownMenuVue from '../components/DropDownMenu/DropDownMenu.vue';
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

	const sendAvatar = async (e) => {
		const res = await firebaseState.uploadFyles(e.target.files[0]);
		form.avatar = res;
	};
	import dfa from '@/assets/avatar/icons8-avatar-64.png';
	const avatarPreset = reactive({
		src: dfa,
		width: 100,
		height: 100,
		alt: null,
	});

	firebaseState.getStore('users');
</script>

<template>
	<div class="login">
		<DropDownMenuVue title="Выбрать ваватар" :img="avatarPreset" />

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
	.login {
		position: relative;
	}
	.avatar {
		// position: absolute;
		// left: -9000px;
		// top: -9000px;
		// visibility: hidden;
	}
</style>
