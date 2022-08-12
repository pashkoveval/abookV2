<script setup>
	import { RouterView } from 'vue-router';
	import Header from '@/components/Moduls/Header/Header.vue';
</script>

<template>
	<Header />
	<RouterView v-slot="{ Component, route }">
		<div class="view">
			<transition :name="route.meta.transition || 'fade'">
				<component :is="Component" />
			</transition>
		</div>
	</RouterView>
</template>

<style lang="scss" scoped>
	.icons {
		display: flex;
		flex-wrap: wrap;
	}
	.view {
		height: 100vh;
	}
</style>
