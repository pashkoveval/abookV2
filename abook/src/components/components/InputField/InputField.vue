<script setup>
	import { ref, computed } from 'vue';
	import Tooltip from '@/components/components/Tooltip/Tooltip.vue';
	import Icon from '@/components/components/Icon/Icon.vue';
	import {
		tryToConvertStringToNumber,
		getFilteredValue,
	} from '@/helpers/index.js';
	const prop = defineProps([
		'max',
		'min',
		'type',
		'clear',
		'error',
		'search',
		'readonly',
		'required',
		'modelValue',
		'validation',
		'cleanOnBlur',
		'placeholder',
		'insertValueInFocus',
	]);
	const emit = defineEmits(['update:modelValue', 'focus', 'blur']);
	const field = ref(null);
	const scipValid = ref(false);
	const readonly = ref(false);

	const updateInput = (v) => {
		const value = v === '' ? null : v;
		emit('update:modelValue', value);
	};

	const inputFunction = (event) => {
		let value;
		if (
			String(event.target.value).includes('+7') &&
			String(event.target.value).length === 12
		) {
			scipValid.value = true;
			value = String(event.target.value).replaceAll('+7', 8);
		} else {
			value = event.target.value;
		}
		const regex = new RegExp(/[^a-zA-Zа-яЯ-Я]/gi);
		if (prop.type === 'tel' && regex.test(value)) {
			const filtered = getFilteredValue(value);
			const converted = tryToConvertStringToNumber(filtered);
			if (prop.max === value.length) {
				readonly.value = true;
				setTimeout(() => {
					readonly.value = false;
				});
				return;
			} else {
				readonly.value = true;
				setTimeout(() => {
					updateInput(converted);
					readonly.value = false;
				});
			}
		} else {
			updateInput(value);
		}
	};
	const focusFunction = () => {
		if (prop.insertValueInFocus && !prop.modelValue) {
			updateInput(prop.insertValueInFocus);
		}
		emit('focus');
	};
	const blurFunction = () => {
		if (prop.insertValueInFocus === prop.modelValue || prop.cleanOnBlur) {
			updateInput(null);
		}
		if (prop.validation && !scipValid.value && prop.modelValue) {
			prop.validation({ type: prop.type, value: prop.modelValue });
		}
		emit('blur');
	};
	const setFocus = () => {
		field.value.focus();
	};
	const errorProp = computed(() => {
		return prop.error;
	});
</script>

<template>
	<div
		class="field-wrapper"
		:class="{ required: required, valid: !errorProp }"
		@click.stop="setFocus"
	>
		<Icon v-if="search" icon="search1" class="field-search" />

		<input
			:value="prop.modelValue"
			:type="prop.type"
			:placeholder="prop.placeholder"
			class="field-input"
			:max="max"
			:min="min"
			:class="{
				clear: prop.clear,
				search: prop.search,
				valid: !errorProp,
			}"
			onCopy="return false"
			onDrag="return false"
			onDrop="return false"
			onPaste="return false"
			ref="field"
			:readonly="readonly"
			@input="inputFunction"
			@focus="focusFunction"
			@blur="blurFunction"
		/>

		<Tooltip
			v-if="errorProp?.typeError"
			:text="errorProp?.massage"
			position="left"
			class="field-alarm"
			:class="{ [errorProp?.typeError]: errorProp?.typeError }"
			:error="true"
		>
			<Icon
				:icon="errorProp?.typeError === 'warn' ? 'smile7' : 'smile'"
				size="20"
			/>
		</Tooltip>

		<Icon
			icon="clear"
			class="field-clear btn"
			size="20"
			@click="emit('update:modelValue', null)"
		/>
	</div>
</template>

<style lang="scss" scoped>
	.field {
		&-wrapper {
			position: relative;
			margin: 4px;
			&.valid.required {
				&::before {
					content: '';
					display: block;
					width: 5px;
					height: 5px;
					background-color: var(--color-border-input);
					border-radius: var(--border-radius);
					position: absolute;
					left: -7px;
					top: 50%;
					transform: translateY(-50%);
				}
			}
			&.required {
				&::before {
					content: '';
					display: block;
					width: 5px;
					height: 5px;
					background-color: var(--color-border-input-error);
					border-radius: var(--border-radius);
					position: absolute;
					left: -7px;
					top: 50%;
					transform: translateY(-50%);
				}
			}
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
				background-color: var(--color-background-error);
			}
			&.valid {
				border-color: var(--color-border-input);
				background-color: var(--color-background);
				&:focus {
					border-color: var(--color-border-input-focus);
					background-color: var(--color-background-green);
				}
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
			z-index: 0;
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
		&-alarm {
			position: absolute;
			top: 50%;
			right: 35px;
			transform: translateY(-50%);
			z-index: 1;
			min-width: 10px;
			max-width: 20px;
			min-height: 10px;
			max-height: 20px;
			cursor: pointer;
		}
		&-search {
			position: absolute;
			top: 50%;
			left: 10px;
			transform: translateY(-50%);
			z-index: 1;
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
