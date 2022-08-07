<script setup>
	import { useUserStore } from '@/stores/user';
	import InputField from '@/components/InputField/InputField.vue';
	import SelectAvatars from '../components/SelectAvatars/SelectAvatars.vue';
	import { firebaseState } from '@/fb';
	import { watch } from 'vue';

	const user = useUserStore();

	watch(
		() => user.userData,
		(value) => {
			console.log('value', value);

			// validate(value);
		},
		{ deep: true }
	);

	const loginIn = async () => {
		console.log('user', user.userData);
		// const user = await firebaseState.login(form.email, form.password, true);
		// user.userData.accessToken = user.accessToken;
		// user.userData.emailVerified = user.emailVerified;
		// user.userData.metadata = user.metadata;
		// user.userData.phoneNumber = user.phoneNumber;
		// user.userData.photoURL = user.photoURL;
		// user.userData.uid = user.uid;
		// const userCreates = await firebaseState.addElement('users', userForm);
		// console.log('liginIn userCreates', userCreates);
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
			:clear="true"
		/>

		<InputField
			v-model="user.userData.phoneNumber"
			placeholder="Телефон"
			type="tel"
			:clear="true"
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
			:clear="true"
		/>

		<InputField
			v-model="user.userData.passwordConfirm"
			placeholder="Подтвердить пароль"
			type="password"
			:clear="true"
		/>

		<button class="button_custom" @click="loginIn">
			<slot>кнопка</slot>
		</button>

		<!-- <form @submit.prevent="loginIn">
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
		</form> -->
	</div>
</template>

<style lang="scss" scoped>
	.login-view {
		// position: relative;
		// overflow: hidden;
		padding: 8px;
		text-align: right;
	}
</style>
