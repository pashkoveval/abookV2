<template>
	<RouterLink v-if="prop.to" :to="prop.to" class="button_custom">
		<Icon
			v-if="prop.icon_start"
			class="button_custom-icon"
			:icon="prop.icon_start"
			:size="size"
		/>
		<div v-if="prop.text" class="button_custom-text">
			<slot>{{ prop.text }}</slot>
		</div>
		<Icon
			v-if="prop.icon_end || prop.icon"
			class="button_custom-icon"
			:icon="prop.icon_end || prop.icon"
			:size="size"
		/>
		<Loader v-if="prop.loading" class="button_custom-loader" />
	</RouterLink>

	<button v-else class="button_custom btn" :disabled="prop.disabled">
		<Icon
			v-if="prop.icon_start"
			class="button_custom-icon"
			:icon="prop.icon_start"
			:size="size"
		/>
		<div v-if="prop.text" class="button_custom-text">
			<slot>{{ prop.text }}</slot>
		</div>
		<slot v-else>{{ prop.text }}</slot>
		<Icon
			v-if="prop.icon_end || prop.icon"
			class="button_custom-icon"
			:class="{ margine: prop.text }"
			:icon="prop.icon_end || prop.icon"
			:size="size"
		/>
		<Loader v-if="prop.loading" class="button_custom-loader" />
	</button>
</template>

<script setup>
	import { RouterLink } from 'vue-router';

	const prop = defineProps([
		'text',
		'loading',
		'disabled',
		'icon_start',
		'icon_end',
		'icon',
		'size',
		'to',
	]);
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

		&-loader {
			margin-left: 10px;
		}
		&-icon {
			transition: var(--transition);
			color: var(--color-border-input-mute);
			&.margine {
				margin-left: 10px;
			}
		}
		&-text {
			padding: 0 8px;
		}
	}

	.button_custom:hover {
		border-color: var(--color-border-input-focus);
		background-color: var(--color-background-green);
		.button_custom-icon {
			color: var(--color-border-input-focus);
		}
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
