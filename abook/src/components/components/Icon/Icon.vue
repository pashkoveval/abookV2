<template>
	<div>
		<i
			class="_icon_"
			v-html="foundIcon"
			:style="{
				'max-width': prop.size + 'px',
				'max-height': prop.size + 'px',
				color: `var(${prop.color})`,
			}"
		></i>
	</div>
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
	}

	.icon_fill {
		path,
		line,
		circle,
		rect,
		polyline,
		svg {
			stroke: var(--vt-c-green-soft) !important;
		}
	}
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
