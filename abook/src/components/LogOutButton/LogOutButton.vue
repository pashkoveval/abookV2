<template>
	<Tooltip
		v-if="props.authorizedUser"
		text="Выйти ?"
		position="left"
		class="signOut"
	>
		<Button icon="signOut" size="20" @click="logOut" />
	</Tooltip>
</template>

<script setup>
	import { onMounted } from 'vue';

	const props = defineProps(['authorizedUser']);
	// import { useUserStore } from '@/stores/user';

	// defineProps({ authorizedUser: string });

	// const user = useUserStore();

	// const authorizedUser = computed(() => {
	// 	return user.loginUser;
	// });

	let firebaseState;
	async function importFB() {
		return await import('@/fb/index.js');
	}
	onMounted(async () => {
		firebaseState = await importFB();
	});
	const logOut = () => {
		return firebaseState.firebaseState.signout();
	};
</script>

<style lang="scss" scoped>
	.signOut {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 9;
	}
</style>
