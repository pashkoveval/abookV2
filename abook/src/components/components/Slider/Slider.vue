<template>
	<div class="slider">
		<Carousel :settings="settings" :breakpoints="prop.breakpoints">
			<Slide v-for="(item, idx) in prop.slides" :key="idx">
				<slot name="slide" :item="item">
					<div class="content">{{ item.text }}</div>
				</slot>
			</Slide>

			<template #addons>
				<div class="controls">
					<Navigation v-if="prop.navigation" />
					<Pagination v-if="prop.pagination" />
				</div>
			</template>
		</Carousel>
	</div>
</template>

<script setup>
	import 'vue3-carousel/dist/carousel.css';
	import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel';

	const prop = defineProps({
		slides: {
			type: Array,
			default() {
				return [];
			},
		},
		breakpoints: {
			type: Object,
			default() {
				return {
					300: {
						itemsToShow: 1,
					},
					700: {
						itemsToShow: 1,
					},
				};
			},
		},
		navigation: {
			type: Boolean,
			default() {
				return true;
			},
		},
		pagination: {
			type: Boolean,
			default() {
				return true;
			},
		},
		autoplay: {
			type: [String || Number],
			default() {
				return 5;
			},
		},
	});

	const settings = {
		itemsToShow: 1,
		wrapAround: false,
		pauseAutoplayOnHover: true,
		snapAlign: 'center',
		autoplay: Number(prop.autoplay) * 1000,
		transition: 1000,
	};
</script>

<style lang="scss" scoped>
	.slider {
		width: initial;
		overflow: hidden;
		max-width: 80vw;
		@media (min-width: 1024px) {
			max-width: 50vw;
		}
	}
	.content {
		width: 100%;
		text-align: left;
	}
	.controls {
		.carousel__pagination {
			display: flex;
			flex-wrap: wrap;
			max-width: 80vw;
			margin: 0 20px;
			padding: 0;
			@media (min-width: 1024px) {
				max-width: 50vw;
			}
		}
		.carousel__slide {
			width: 100%;
			opacity: 0 !important;
			margin: 0 30px;
			&--active {
				opacity: 1;
			}
		}
	}
</style>
