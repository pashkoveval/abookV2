<script setup>
	import { ref } from 'vue';
	import { onClickOutside } from '@vueuse/core';

	const emit = defineEmits(['open', 'close']);

	const props = defineProps({
		title: {
			type: String,
			default() {
				return null;
			},
		},
		loading: {
			type: Boolean,
			default() {
				return false;
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
		if (modal.value) {
			emit('close', false);
			modal.value = false;
		}
	});
	const openMenu = () => {
		if (!modal.value) {
			emit('open', true);
			modal.value = true;
		}
	};
</script>

<template>
	<div
		class="menu"
		:class="{
			open: modal,
		}"
	>
		<div
			class="menu-header"
			@click="openMenu"
			:class="{
				center:
					(props.title && !props.img.src) || (!props.title && props.img.src),
			}"
		>
			<div v-if="props.title" class="menu-header-title">{{ props.title }}</div>

			<div class="avatar">
				<Loader v-if="props.loading" width="20" height="20" />
				<img
					v-else-if="props.img.src"
					class="avatar"
					:src="props.img.src"
					:alt="props.img.alt || 'image'"
					loading="lazy"
				/>
			</div>
		</div>
		<!-- <Transition name="fade"> -->
		<div v-if="modal" ref="modalRef" class="menu-drop_down">
			<slot></slot>
		</div>
		<!-- </Transition> -->
	</div>
</template>

<style lang="scss" scoped>
	.menu {
		border: 1px solid var(--color-border-input);
		padding: 4px;
		height: auto;
		border-radius: var(--border-radius);
		transition: var(--transition);
		height: fit-content;
		&.open {
			background-color: var(--color-background-green);
			.menu-header {
				cursor: auto;
			}
		}
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
		&-drop_down {
			border-top: 1px solid var(--color-border-input);
			padding-top: 8px;
		}
	}
	.avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		display: block;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
