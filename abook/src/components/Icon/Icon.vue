<template>
	<!-- <img :src="path" :alt="prop.icon" /> -->
	<!-- <span v-html="path" :style="{ width: prop.size + 'px' }"></span> -->
	<span
		v-for="i in allIcons"
		v-html="i"
		:style="{ width: prop.size + 'px' }"
	></span>
</template>

<script setup>
	import { icons } from '@/helpers/icons';
	import { ref } from 'vue';

	const prop = defineProps({
		icon: {
			type: String,
			required: true,
		},
		size: {
			type: Number,
			default() {
				return 16;
			},
		},
	});
	const allIcons = ref(Object.values(icons));
</script>

<style lang="scss" scoped></style>
