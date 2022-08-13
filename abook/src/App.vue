<script setup>
	import { onMounted } from 'vue';
	import { RouterView } from 'vue-router';
	import Header from '@/components/Moduls/Header/Header.vue';
	import { useUserStore } from '@/stores/user';
	// import { firebaseState } from '@/fb/index.js';

	const user = useUserStore();
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

<template>
	<Header />
	<Tooltip v-if="user.loginUser" text="Выйти ?" position="left" class="signOut">
		<Button icon="signOut" size="20" @click="logOut" />
	</Tooltip>
	<RouterView v-slot="{ Component }">
		<template v-if="Component">
			<Transition name="fade">
				<KeepAlive>
					<Suspense>
						<!-- main content -->
						<component :is="Component"></component>

						<!-- loading state -->
						<template #fallback> Loading... </template>
					</Suspense>
				</KeepAlive>
			</Transition>
		</template>
	</RouterView>
</template>

<style lang="scss" scoped>
	.view {
		height: auto;
		min-height: 100%;
		max-height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.signOut {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1;
	}
</style>
