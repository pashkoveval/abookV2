<template>
	<div
		class="slider"
		:style="{ width: `${prop.width}px`, height: `${prop.height}px` }"
	>
		<div class="slider-body">
			<div
				v-for="(slide, idx) in data"
				:key="idx"
				class="slider-body-slide"
				:class="{ active: slide.active }"
			>
				<img
					v-if="slide.src && slide.active"
					class="slider-body-slide-img"
					:src="slide.src"
					:alt="slide.alt"
				/>
				<div
					class="slider-body-slide-svg"
					v-if="slide.svg"
					v-html="slide.svg"
				/>
				<span
					v-if="slide.text && slide.active"
					class="slider-body-slide-text"
					:class="{ 'img-text': slide.src || slide.svg }"
				>
					{{ slide.text }}
				</span>
				<div
					v-if="slide.action && slide.active"
					class="slider-body-slide-action"
				>
					<Button v-bind="slide.action" @click="emit('slideAction')" />
				</div>
			</div>
		</div>
		<div v-if="prop.buttons" class="slider-actions">
			<Icon class="green slider-nav" icon="expand_l" @click="prev" size="20" />
			<Icon class="green slider-nav" icon="expand_r" @click="next" size="20" />
		</div>
	</div>
</template>

<script setup>
	import Button from '../Button/Button.vue';
	import { reactive, computed, ref } from 'vue';
	import { foundItemInArrByValue } from '@/helpers';

	const emit = defineEmits([
		'nextSlide',
		'beforeNextSlide',
		'prevSlide',
		'beforePrevSlide',
		'slideAction',
	]);
	const prop = defineProps({
		slides: {
			type: Array,
			required: true,
			default() {
				return [];
			},
		},
		buttons: {
			type: Boolean,
			default() {
				return true;
			},
		},
		autoPlay: {
			type: Boolean,
			default() {
				return false;
			},
		},
		interval: {
			type: String,
			default() {
				return '5';
			},
		},
		width: {
			type: String,
			default() {
				return '150';
			},
		},
		height: {
			type: String,
			default() {
				return '150';
			},
		},
	});

	const timer = ref(null);
	if (prop.autoPlay) {
		timer.value = setInterval(() => {
			next();
		}, Number(prop.interval) * 1000);
	}

	const preparedData = prop.slides.map((e, idx) => {
		if (idx === 0) {
			return { ...e, active: true, idx };
		}
		return { ...e, active: false, idx };
	});
	const data = reactive(preparedData);

	const activeSlide = computed(() => {
		return foundItemInArrByValue(data, 'active', true);
	});

	const next = () => {
		const active = activeSlide.value.idx;
		emit('beforeNextSlide');
		data[active].active = false;
		if (active + 1 >= data.length) {
			data[0].active = true;
		} else {
			data[active + 1].active = true;
		}
		emit('nextSlide');
	};

	const prev = () => {
		const active = activeSlide.value.idx;
		emit('beforePrevSlide');
		data[active].active = false;
		if (active === 0) {
			data[data.length - 1].active = true;
		} else {
			data[active - 1].active = true;
		}
		emit('prevSlide');
	};

	console.log('data', data);
	console.log('activeSlide', activeSlide.value);
	console.log('activeSlide', activeSlide.value.idx);
</script>

<style lang="scss" scoped>
	.slider {
		width: 100%;
		height: 100%;
		&-body {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			overflow: hidden;
			&-slide {
				display: flex;
				align-items: center;
				justify-content: center;
				opacity: 0;
				min-width: 100%;
				min-height: 100%;
				visibility: hidden;
				transition: opacity var(--transition3x);
				&.active {
					max-width: initial;
					max-height: initial;
					visibility: visible;
					opacity: 1;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
				&-text {
					&.img-text {
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
					}
				}
			}
		}
		&-actions {
			display: flex;
			justify-content: space-between;
		}
		&-nav {
			cursor: pointer;
			max-width: 100%;
			max-height: 100%;
			border: 1px solid var(--color-border-input);
			border-radius: var(--circle);
			padding: 10px;
			&:hover {
				transform: scale(1.2);
			}
		}
	}
</style>
