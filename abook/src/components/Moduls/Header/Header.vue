<template>
	<header class="header">
		<Icon class="header-logo" icon="logo" size="150" />

		<div class="header-wrapper">
			<Transition name="fade-scale" mode="out-in">
				<HelloWorld v-if="!route.meta.requiresAuth" />
			</Transition>
		</div>

		<nav v-if="user.loginUser" class="nav">
			<RouterLink to="/home">Home</RouterLink>
			<RouterLink to="/about">About</RouterLink>
		</nav>
	</header>
</template>

<script setup>
	import HelloWorld from '@/components/HelloWorld.vue';
	import { RouterLink, useRoute } from 'vue-router';
	import { useUserStore } from '@/stores/user';
	const user = useUserStore();
	const route = useRoute();
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		&-logo {
			margin-right: 20px;
		}
	}

	.nav {
		display: block;
		width: fit-content;
	}
	.logo {
		display: block;
		@media (min-width: 1024px) {
			width: 150px;
		}
	}

	// nav {
	// 	text-align: center;
	// 	margin-top: 2rem;
	// }

	nav a.router-link-exact-active {
		color: var(--color-text);
	}

	nav a.router-link-exact-active:hover {
		background-color: transparent;
	}

	nav a {
		display: inline-block;
		padding: 0 1rem;
		border-left: 1px solid var(--color-border);
	}

	nav a:first-of-type {
		border: 0;
	}

	@media (min-width: 1024px) {
		// header {
		// 	width: 50%;
		// 	height: 100%;
		// display: flex;
		// place-items: center;
		// padding-right: calc(var(--section-gap) / 2);
		// }

		.logo {
			margin: 0 2rem 0 0;
		}

		header .wrapper {
			width: 100%;
			display: flex;
			place-items: flex-start;
			flex-wrap: wrap;
		}

		// nav {
		// width: 100%;
		// text-align: left;
		// margin-left: -1rem;
		// font-size: 1rem;

		// padding: 1rem 0;
		// margin-top: 1rem;
		// }
	}
	// .sign-out {
	// 	position: absolute;
	// 	top: 0;
	// 	right: 0;
	// 	z-index: 9;
	// }
</style>
