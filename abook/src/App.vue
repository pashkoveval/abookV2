<script setup>
	import { onMounted, computed } from 'vue';
	import { RouterView } from 'vue-router';
	import Header from '@/components/Moduls/Header/Header.vue';
	import { useUserStore } from '@/stores/user';

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
	const authorizedUser = computed(() => {
		return user.loginUser;
	});
</script>

<template>
	<Transition name="fade" mode="out-in">
		<Loader v-if="authorizedUser === null" :global="true" />
	</Transition>
	<Header />
	<Tooltip v-if="authorizedUser" text="Выйти ?" position="left" class="signOut">
		<Button icon="signOut" size="20" @click="logOut" />
	</Tooltip>
	<main>
		<RouterView v-slot="{ Component, route }">
			<template v-if="Component">
				<Transition
					:name="route.meta.transitionName || 'fade-scale'"
					mode="out-in"
				>
					<KeepAlive>
						<Suspense>
							<component :is="Component" />
							<template #fallback> <Loader :global="true" /></template>
						</Suspense>
					</KeepAlive>
				</Transition>
			</template>
		</RouterView>
	</main>
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
