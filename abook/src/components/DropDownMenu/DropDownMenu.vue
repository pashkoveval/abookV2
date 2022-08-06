<script setup>
	import { ref } from 'vue';
	import { onClickOutside } from '@vueuse/core';

	const props = defineProps({
		title: {
			type: String,
			default() {
				return null;
			},
		},
		img: {
			type: Object,
			default() {
				return {};
			},
		},
	});

	const modal = ref(false);
	const modalRef = ref(null);

	onClickOutside(modalRef, () => {
		modal.value = false;
	});
</script>

<template>
	<div class="menu">
		<div
			class="menu-header"
			@click="modal = true"
			:class="{
				center:
					(props.title && !props.img.src) || (!props.title && props.img.src),
			}"
		>
			<div v-if="props.title" class="menu-header-title">{{ props.title }}</div>
			<img
				v-if="props.img.src"
				class="avatar"
				:src="props.img.src"
				:alt="props.img.alt || 'image'"
			/>
		</div>
		<Transition name="fade">
			<div v-if="modal" ref="modalRef" class="menu-drop_down">
				<slot></slot>
			</div>
		</Transition>
	</div>
</template>

<style lang="scss" scoped>
	.menu {
		border: 1px solid var(--color-border-input);
		padding: 8px;
		height: auto;
		border-radius: var(--border-radius);
		transition: var(--transition);
		background-color: var(--color-background-green);
		&-header {
			cursor: pointer;
			display: flex;
			justify-content: space-between;
			align-content: center;
			&.center {
				justify-content: center;
			}
			&-title {
				flex: 1;
			}
			&-img {
				flex: 1;
			}
		}
		transition: 1s ease;
		&-drop_down {
			border-top: 1px solid var(--color-border-input);
			padding-top: 8px;
		}
	}
	.avatar {
		width: 60px;
		height: 60px;
		padding: 5px;
		border-radius: 50%;
		object-fit: contain;
		display: block;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
		width: 100%;
	}
</style>
