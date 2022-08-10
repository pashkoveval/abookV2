<template>
	<button class="button_custom btn" :disabled="prop.disabled">
		<div class="button_custom-text">
			<slot>{{ prop.text }}</slot>
		</div>
		<Icon
			v-if="prop.icon"
			class="button_custom-icon"
			:icon="prop.icon"
			:size="size"
		/>
		<Loader v-if="prop.loading" class="button_custom-loader" />
	</button>
</template>

<script setup>
	import Loader from '@/components/Loader/Loader.vue';
	import Icon from '@/components/Icon/Icon.vue';

	const prop = defineProps(['text', 'loading', 'disabled', 'icon', 'size']);
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
		display: flex;
		align-items: center;
		cursor: pointer;

		&-loader,
		&-icon {
			margin-left: 10px;
		}
		&-text {
			padding: 0 8px;
		}
	}

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
