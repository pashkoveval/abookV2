<template>
	<div class="welcome" key="w">
		<!-- <div class="allIcons">
			<Icon
				v-for="i in allicons"
				:icon="i"
				size="20"
				color="--vt-c-green-soft"
			/>
		</div> -->
		<VerticalTabs
			icon="signIn"
			size="40"
			heading="Войти"
			text="Войти используя Email и Пароль"
			link="/login"
		/>
		<VerticalTabs
			icon="addUser"
			size="40"
			heading="Зарегистрироваться"
			text="Регистрация нового пользователя"
			link="/create"
		/>
		<VerticalTabs
			icon="google"
			size="50"
			heading="Войти через Google"
			text="Автоматическа регистрация нового пользователя или вход "
			:btn="true"
			@click="loginInPopup"
		/>

		<!-- <Slider :slides="slides" /> -->
	</div>
</template>

<script setup>
	import { icons } from '@/helpers/icons';
	import VerticalTabs from '@/components/components/VerticalTabs/VerticalTabs.vue';
	import { firebaseState } from '@/fb';
	import { ref } from 'vue';

	const allicons = ref(Object.keys(icons));
	const allicons2 = ref(Object.values(icons));
	const loginInPopup = async () => {
		const loginIn = await firebaseState.btnLogin();
		console.log('loginIn', loginIn);
	};

	const slides = allicons2.value.map((e, idx) => {
		return { svg: e, text: `text${idx}` };
	});
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
	.allIcons {
		display: flex;
		flex-wrap: wrap;
		i {
			color: white;
		}
	}
	.custom-login {
		display: flex;
	}
</style>
