<script setup>
	import TheWelcome from '@/components/TheWelcome.vue';
</script>

<template>
	<main class="main">
		<TheWelcome />
	</main>
</template>

<style lang="scss" scoped>
	.main {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
