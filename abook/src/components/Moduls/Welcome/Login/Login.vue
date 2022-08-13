<template>
	<div>
		<InputField
			v-model="email"
			type="email"
			placeholder="Email"
			:required="true"
			:clear="true"
			:error="errorsStore.errors.validation['email']"
			:validation="errorsStore.emailErrorCheck"
		/>

		<InputField
			v-model="password"
			placeholder="Пароль"
			type="password"
			:required="true"
			:clear="true"
			:error="errorsStore.errors.validation['password']"
			:validation="errorsStore.passwordErrorCheck"
		/>

		<Button class="button_custom" :loading="loading" @click="loginIn">
			Войти
		</Button>
	</div>
</template>

<script setup>
	import { useErrorsStore } from '@/stores/errors';
	import { firebaseState } from '@/fb';
	import { ref } from 'vue';
	const errorsStore = useErrorsStore();

	const loading = ref(null);
	const email = ref(null);
	const password = ref(null);

	const loginIn = async () => {
		loading.value = true;
		const user = await firebaseState.login(email.value, password.value);
		if (!user) {
			loading.value = false;
		}
	};
</script>

<style lang="scss" scoped></style>
