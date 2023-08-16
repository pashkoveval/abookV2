<script setup>
	import { computed } from 'vue';
	import { RouterView } from 'vue-router';
	import { useUserStore } from '@/stores/user';

	import Header from '@/components/Moduls/Header/Header.vue';
	import LogOutButton from '@/components/LogOutButton/LogOutButton.vue';

	const user = useUserStore();
	const authorizedUser = computed(() => {
		return user.loginUser;
	});
</script>

<template>
	<Loader v-if="authorizedUser === null" :global="true" />

	<Header />

	<main class="main">
		<RouterView v-slot="{ Component, route }">
			<template v-if="Component">
				<Transition
					:name="route.meta.transitionName || 'fade-scale'"
					mode="out-in"
				>
					<KeepAlive>
						<component :is="Component" />
					</KeepAlive>
				</Transition>
			</template>
		</RouterView>
	</main>

	<LogOutButton :authorizedUser="authorizedUser" />
</template>

<style lang="scss" scoped>
	.view {
		width: 100dvw;
		height: 100dvh;
		display: flex;
	}
	.signOut {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1;
	}
</style>
