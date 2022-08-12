<template>
	<div class="welcome">
		<div class="custom-login">
			<Button to="/login" text="Войти" />
			<Button to="/create" text="Зарегестрироваться" />
		</div>
		<Button
			text="Войти или Зарегестрироваться через Google"
			icon="google"
			size="50"
			@click="loginInPopup"
		/>
	</div>
</template>

<script setup>
	import Button from '@/components/components/Button/Button.vue';
	import { firebaseState } from '@/fb';

	const loginInPopup = async () => {
		const loginIn = await firebaseState.btnLogin();
		console.log('loginIn', loginIn);
	};
</script>

<style lang="scss" scoped>
	.welcome {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.custom-login {
		display: flex;
	}
</style>
