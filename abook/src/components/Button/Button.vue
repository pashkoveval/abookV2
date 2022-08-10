<template>
	<button class="button_custom" :disabled="prop.disabled">
		<span>
			<slot>{{ prop.title }}</slot>
		</span>
		<Icon class="button_custom-icon" :icon="prop.icon" />
		<Loader class="button_custom-loader" />
	</button>
</template>

<script setup>
	import Loader from '@/components/Loader/Loader.vue';
	import Icon from '@/components/Icon/Icon.vue';

	const prop = defineProps(['title', 'loading', 'disabled', 'icon']);
</script>

<style lang="scss" scoped>
	.button_custom {
		background-color: transparent;
		border: none;
		width: auto;
		max-width: 100%;
		text-align: center;
		min-height: 30px;
		transition: var(--transition);
		border: 1px solid var(--color-border-input);
		background-color: var(--color-background-green);
		border-radius: var(--border-radius);
		margin: 6px;
		color: var(--color-text);
		cursor: pointer;

		&-loader {
			margin-left: 10px;
		}
	}

	// .button_custom-icon {
	// 	border-radius: 50%;
	// 	padding: 0;
	// 	background-color: transparent;
	// 	border-color: var(--color-border-input-focus);
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: center;
	// 	cursor: pointer;
	// }
	.button_custom:hover {
		border-color: var(--color-border-input-focus);
		background-color: var(--color-background-green);
	}

	.button_custom:active {
		border-color: var(--color-border-input);
		background-color: var(--color-background-green);
	}

	.button_custom:disabled {
		border-color: var(--btn-desabled);
	}

	.button_custom:disabled:hover {
		border-color: var(--btn-desabled);
		background-color: var(--btn-desabled);
	}
</style>
