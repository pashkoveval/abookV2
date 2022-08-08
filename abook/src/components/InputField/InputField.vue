<script setup>
	import { ref } from 'vue';

	const prop = defineProps([
		'type',
		'clear',
		'search',
		'required',
		'modelValue',
		'placeholder',
		'validpadionFunction',
	]);
	const emit = defineEmits(['update:modelValue']);
	const valid = ref(true);
	const inputFunction = (value) => {
		emit('update:modelValue', value);
	};
	const validation = () => {
		if (prop.required) {
			console.log('required');
			valid.value = validpadionFunction(prop.modelValue);
		}
	};
</script>

<template>
	<div class="field-wrapper">
		<img
			v-if="search"
			src="@/assets/icons/icon-search.png"
			alt="Очистить поле"
			class="field-search"
			loading="lazy"
		/>
		<input
			:value="prop.modelValue"
			:type="prop.type"
			:placeholder="prop.placeholder"
			class="field-input"
			:class="{ clear: prop.clear, search: prop.search, valid: valid }"
			@input="(event) => inputFunction(event.target.value)"
			@blur="validation"
		/>
		<img
			v-if="prop.clear"
			src="@/assets/icons/icon-close.png"
			alt="Очистить поле"
			class="field-clear"
			loading="lazy"
			@click="emit('update:modelValue', null)"
		/>
	</div>
</template>

<style lang="scss" scoped>
	.field {
		&-wrapper {
			position: relative;
			margin: 4px;
		}
		&-input {
			transition: var(--transition);
			border: 1px solid var(--color-border-input-error);
			background-color: var(--color-background-error);
			border-radius: var(--border-radius);
			color: var(--color-white);
			padding: 0 15px;
			width: 100%;
			min-height: 30px;
			&:focus {
				border-color: var(--color-border-input-focus);
				background-color: var(--color-background-green);
			}
			&.valid {
				border-color: var(--color-border-input);
				background-color: var(--color-background);
			}
			&.clear {
				padding-right: 35px;
			}
			&.search {
				padding-left: 40px;
			}
		}
		&-clear {
			position: absolute;
			top: 50%;
			right: 10px;
			transform: translateY(-50%);
			z-index: 2;
			min-width: 10px;
			max-width: 20px;
			min-height: 10px;
			max-height: 20px;
			cursor: pointer;
			&:active {
				border-color: var(--color-border-input-focus);
				background-color: var(--color-background-green);
				border-radius: 50%;
			}
		}
		&-search {
			position: absolute;
			top: 50%;
			left: 10px;
			transform: translateY(-50%);
			z-index: 2;
			min-width: 10px;
			max-width: 20px;
			min-height: 10px;
			max-height: 20px;
		}
	}

	@media (max-width: 600px) {
		.field {
			&-wrapper {
				margin: 6px 4px;
			}
			&-input {
				&.clear {
					padding-right: 25px;
				}
				&.search {
					padding-left: 30px;
				}
			}
			&-clear {
				width: 15px;
				height: 15px;
			}
			&-search {
				width: 15px;
				height: 15px;
			}
		}
	}
</style>
