<template>
	<div class="tooltip" ref="tooltip">
		<div
			class="tooltip-slot"
			@mouseover="openTooltip"
			@mouseleave="closeTooltip"
		>
			<slot></slot>
		</div>
		<div
			class="tooltip-text"
			ref="tooltipText"
			:style="positionStyle"
			:class="{
				[prop.position]: prop.position,
				error: error,
				varn: varn,
				open: open,
			}"
		>
			<slot name="text"></slot>
			{{ prop.text }}
		</div>
	</div>
</template>

<script setup>
	import { ref, computed } from 'vue';
	import { windowSize, tooltopSize, tooltopTextSize } from '@/helpers/index.js';

	const prop = defineProps(['position', 'text', 'error', 'varn']);
	const tooltip = ref(null);
	const tooltipText = ref(null);
	const open = ref(false);

	const { windowWidth } = windowSize();
	const { tooltipRight, tooltipWidth, tooltipLeft } = tooltopSize(tooltip);
	const { tooltipTextWidth, tooltipTextHeight } = tooltopTextSize(tooltipText);

	const openTooltip = () => {
		open.value = true;
	};
	const closeTooltip = () => {
		open.value = false;
	};

	const positionStyle = computed(() => {
		switch (prop.position) {
			case 'left':
				if (open.value) {
					if (tooltipLeft.value <= 0) {
						return {
							right: `-${tooltipTextWidth.value + 10}px`,
							top: '50%',
							transform: 'translateY(-50%)',
						};
					} else {
						return {
							left: `-${tooltipTextWidth.value + 10}px`,
							top: '50%',
							transform: 'translateY(-50%)',
						};
					}
				} else {
					return {
						right: `${windowWidth.value + 99999}px`,
					};
				}
			case 'top':
				if (open.value) {
					if (windowWidth.value < tooltipRight.value + tooltipTextWidth.value) {
						return {
							left: `-${tooltipTextWidth.value - tooltipWidth.value}px`,
							top: `-${tooltipTextHeight.value + 10}px`,
						};
					} else {
						return {
							left: `-${tooltipTextWidth.value / 2}px`,
							top: `-${tooltipTextHeight.value + 10}px`,
						};
					}
				} else {
					return {
						right: `${windowWidth.value + 99999}px`,
					};
				}
			case 'botome':
				if (open.value) {
					if (windowWidth.value < tooltipRight.value + tooltipTextWidth.value) {
						return {
							left: `-${tooltipTextWidth.value - tooltipWidth.value}px`,
							botome: `-${tooltipTextHeight.value + 10}px`,
						};
					} else {
						return {
							left: `-${tooltipTextWidth.value / 2}px`,
							botome: `-${tooltipTextHeight.value + 10}px`,
						};
					}
				} else {
					return {
						right: `${windowWidth.value + 99999}px`,
					};
				}
			case 'right':
				if (open.value) {
					if (windowWidth.value < tooltipRight.value + tooltipTextWidth.value) {
						return {
							left: `-${tooltipTextWidth.value - tooltipWidth.value}px`,
							botome: `-${tooltipTextHeight.value + 10}px`,
						};
					} else {
						return {
							right: `-${tooltipTextWidth.value + 10}px`,
							top: '50%',
							transform: 'translateY(-50%)',
						};
					}
				} else {
					return {
						right: `${windowWidth.value + 99999}px`,
					};
				}
			default:
				break;
		}
		return {};
	});
</script>

<style lang="scss" scoped>
	.tooltip {
		position: relative;
		width: auto;
		height: auto;
		&-slot * {
			height: 100%;
			z-index: 2;
		}
	}
	.tooltip-text {
		position: absolute;
		width: max-content;
		max-width: 350px;
		word-wrap: break-word;
		z-index: -1;
		opacity: 0;
		padding: 4px;
		right: 99999px;
		color: #fff;
		transition: all var(--transition);
		background-color: var(--color-background);
		border: 1px solid var(--color-border-input);
		text-align: center;
		border-radius: var(--border-radius);

		&.open {
			z-index: 3;
			opacity: 1;
			&:hover {
				opacity: 1;
				z-index: 1;
			}
		}
		&.error {
			border-color: var(--color-border-input-error);
		}
	}
</style>
