<template>
	<!-- <div> -->
	<div
		class="_icon_"
		v-html="foundIcon"
		:style="{
			width: prop.size + 'px !important',
			'max-width': prop.size + 'px !important',
			'min-width': prop.size + 'px !important',
			height: prop.size + 'px !important',
			'max-height': prop.size + 'px !important',
			'min-height': prop.size + 'px !important',
			color: `var(${prop.color})`,
		}"
	/>
	<!-- </div> -->
</template>

<script setup>
	import { icons } from '@/helpers/icons';
	import { computed } from 'vue';

	const prop = defineProps({
		icon: {
			type: String,
			required: true,
		},
		size: {
			type: String,
			default() {
				return '16';
			},
		},
		color: {
			type: String,
			default() {
				return '';
			},
		},
	});

	const foundIcon = computed(() => {
		const found = icons[prop.icon];
		return found || null;
	});
</script>

<style lang="scss">
	._icon_ {
		display: flex;
		align-items: center;
		justify-content: center;
		transition: var(--transition);
		width: 100%;
		height: 100%;
		text-align: center;
	}

	// .icon_fill {
	// 	path,
	// 	line,
	// 	circle,
	// 	rect,
	// 	polyline,
	// 	svg {
	// display: block !important;
	// width: 100% !important;
	// height: 100% !important;
	// min-width: 100% !important;
	// min-height: 100% !important;
	// stroke: var(--vt-c-green-soft) !important;
	// 	}
	// }

	.error ._icon_ {
		color: var(--vt-c-error-soft) !important;
	}
	.warn ._icon_ {
		color: var(--vt-c-warn-soft) !important;
	}

	.btn:hover ._icon_ {
		transform: scale(1.1);
	}
</style>
