<template>
	<div :class="{ 'loader-global': global }">
		<i
			class="loader-spiner"
			:style="{ height: prop.height + 'px', width: prop.width + 'px' }"
		>
			<span v-if="global">Загрузка</span>
		</i>
	</div>
</template>

<script setup>
	const prop = defineProps({
		width: {
			type: [String],
			default() {
				return '20';
			},
		},
		height: {
			type: [String],
			default() {
				return '20';
			},
		},
		global: {
			type: [Boolean],
			default() {
				return false;
			},
		},
	});
</script>

<style lang="scss" scoped></style>
