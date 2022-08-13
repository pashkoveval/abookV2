<template>
	<div>
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
			:clear="true"
			:insertValueInFocus="8"
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
	</div>
</template>

<script setup>
	import SelectAvatars from '@/components/components/SelectAvatars/SelectAvatars.vue';
	import { isObjext } from '@/helpers/index';
	import { useUserStore } from '@/stores/user';
	import { useErrorsStore } from '@/stores/errors';
	import { ref, computed } from 'vue';
	import { firebaseState } from '@/fb';

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
</script>

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
