<template>
	<header :class="{ enter: route.meta.requiresAuth }">
		<Icon class="logo" icon="logo" size="150" />
		<div class="wrapper">
			<Transition name="fade-scale" mode="out-in">
				<HelloWorld v-if="!route.meta.requiresAuth" />
			</Transition>
			<nav>
				<RouterLink v-if="user.loginUser" to="/home">Home</RouterLink>
				<RouterLink v-if="user.loginUser" to="/about">About</RouterLink>
			</nav>
		</div>
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
	header {
		width: 100%;
		line-height: 1.5;
		max-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: space-between;
		place-items: center;
	}
	nav {
		display: inline-block;
		width: 100%;
		height: 3rem;
	}
	.logo {
		display: block;
		// margin: 0 auto 2rem;
		@media (min-width: 1024px) {
			width: 150px;
		}
	}

	nav {
		width: 100%;
		font-size: 12px;
		text-align: center;
		margin-top: 2rem;
	}

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
		header {
			display: flex;
			place-items: center;
			padding-right: calc(var(--section-gap) / 2);
		}

		.logo {
			margin: 0 2rem 0 0;
		}

		header .wrapper {
			display: flex;
			place-items: flex-start;
			flex-wrap: wrap;
		}

		nav {
			// width: 100%;
			text-align: left;
			// margin-left: -1rem;
			font-size: 1rem;

			padding: 1rem 0;
			margin-top: 1rem;
		}
	}
	.sign-out {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 9;
	}
</style>
