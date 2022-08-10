<script setup>
	import { useUserStore } from '@/stores/user';
	import { useErrorsStore } from '@/stores/errors';
	import { firebaseState } from '@/fb';
	import { ref, computed } from 'vue';
	import { isObjext } from '@/helpers/index';
	import InputField from '@/components/InputField/InputField.vue';
	import Button from '@/components/Button/Button.vue';
	import SelectAvatars from '../components/SelectAvatars/SelectAvatars.vue';

	const errorsStore = useErrorsStore();
	const user = useUserStore();
	const loading = ref(false);

	const errorValidateion = computed(() => {
		const errors = errorsStore.errors.validation;
		const values = Object.values(errors);
		return values.some((el) => isObjext(el)) ? false : true;
	});
	const dataValidateion = computed(() => {
		const { email, password, passwordConfirm } = user.userData;
		return email && password && passwordConfirm ? true : false;
	});

	const loginInPopup = async () => {
		const loginIn = await firebaseState.btnLogin();
		console.log('loginIn', loginIn);
	};
	const loginIn = async () => {
		loading.value = true;
		const userJustCreated = await firebaseState.login(
			user.userData.email,
			user.userData.password,
			true
		);
		if (userJustCreated) {
			user.userData.accessToken = userJustCreated.accessToken;
			user.userData.emailVerified = userJustCreated.emailVerified;
			user.userData.metadata = userJustCreated.metadata;
			user.userData.uid = userJustCreated.uid;
			const userCreates = await firebaseState.addElement(
				'users',
				user.userData
			);
			console.log('userCreates', userCreates);
			loading.value = false;
		} else {
			loading.value = false;
			user.$reset();
		}
	};

	firebaseState.getStore('users');
</script>

<template>
	<div class="login-view">
		<SelectAvatars />

		<InputField
			v-model="user.userData.email"
			type="email"
			placeholder="Email"
			:required="true"
			:clear="true"
			:error="errorsStore.errors.validation['email']"
			:validation="errorsStore.emailErrorCheck"
		/>

		<InputField
			v-model="user.userData.phoneNumber"
			placeholder="Телефон"
			type="tel"
			:required="true"
			:clear="true"
			:insertValueInFocus="8"
			:error="errorsStore.errors.validation['tel']"
			:validation="errorsStore.phoneErrorCheck"
		/>

		<InputField
			v-model="user.userData.firstName"
			placeholder="Имя"
			:clear="true"
			@input="user.setFio"
		/>

		<InputField
			v-model="user.userData.lastName"
			placeholder="Фамилия"
			:clear="true"
			@input="user.setFio"
		/>

		<InputField
			v-model="user.userData.password"
			placeholder="Пароль"
			type="password"
			:required="true"
			:clear="true"
			:error="errorsStore.errors.validation['password']"
			:validation="errorsStore.passwordErrorCheck"
		/>

		<InputField
			v-model="user.userData.passwordConfirm"
			placeholder="Подтвердить пароль"
			type="password"
			:required="true"
			:clear="true"
			:error="errorsStore.errors.validation['passwordConfirm']"
			@blur="
				errorsStore.passwordConfirmErrorCheck(
					user.userData.password,
					user.userData.passwordConfirm
				)
			"
		/>

		<Button
			v-if="errorValidateion && dataValidateion"
			class="button_custom"
			:loading="loading.value"
			@click="loginIn"
		>
			Создать
		</Button>
		<Button
			class="button_custom login-bgt"
			:loading="loading.value"
			icon="close"
			@click="loginInPopup"
		>
			<span>Войти через</span>
		</Button>
	</div>
</template>

<style lang="scss" scoped>
	.login-view {
		transition: all var(--transition);
		padding: 8px;
		text-align: right;
	}
	.login-bgt {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
