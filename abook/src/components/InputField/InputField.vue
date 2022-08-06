<script setup>
	defineProps(['modelValue', 'type', 'search', 'placeholder', 'clear']);
	defineEmits(['update:modelValue']);
</script>

<template>
	<div class="field-wrapper">
		<img
			v-if="search"
			src="@/assets/icons/icon-search.png"
			alt="Очистить поле"
			class="field-search"
		/>
		<input
			:value="modelValue"
			:type="type"
			:placeholder="placeholder"
			class="field-input"
			:class="{ clear: clear, search: search }"
			@input="$emit('update:modelValue', $event.target.value)"
		/>
		<img
			v-if="clear"
			src="@/assets/icons/icon-close.png"
			alt="Очистить поле"
			class="field-clear"
			@click="$emit('update:modelValue', null)"
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
			border: 1px solid var(--color-border-input);
			background-color: var(--color-background);
			border-radius: var(--border-radius);
			color: var(--color-white);
			padding: 0 15px;
			width: 100%;
			min-height: 30px;
			&:focus {
				border-color: var(--color-border-input-focus);
				background-color: var(--color-background-green);
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

	@media (min-width: 300px) {
		.field {
			&-wrapper {
				margin: 2px;
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
