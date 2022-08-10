<template>
	<div>
		<div
			class="_icon_"
			v-html="foundIcon"
			:style="{ width: prop.size + 'px', height: prop.size + 'px' }"
		></div>
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
	});

	const foundIcon = computed(() => {
		const found = icons[prop.icon];
		return found || null;
	});
</script>

<style lang="scss">
	.icon_fill {
		transition: var(--transition);
		path,
		line,
		circle,
		rect,
		polyline,
		svg {
			stroke: var(--vt-c-green-soft) !important;
		}
	}
	.error .icon_fill {
		path,
		line,
		circle,
		rect,
		polyline,
		svg {
			stroke: var(--vt-c-error-soft) !important;
		}
	}
	.warn .icon_fill {
		path,
		line,
		circle,
		rect,
		polyline,
		svg {
			stroke: var(--vt-c-warn-soft) !important;
		}
	}
	.dontFile .icon_fill {
		path,
		line,
		circle,
		rect,
		polyline,
		svg {
			transition: var(--transition);
		}
	}
	.btn:hover .icon_fill {
		transform: scale(1.1);
	}
</style>
