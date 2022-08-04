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
	const loginIn = () => firebaseState.login(email.value, password.value);
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
