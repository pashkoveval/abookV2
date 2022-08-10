<template>
	<div
		class="loader-spiner"
		:style="{ height: prop.height + 'px', width: prop.width + 'px' }"
	></div>
</template>

<script setup>
	const prop = defineProps({
		width: {
			type: [String],
			default() {
				return '10';
			},
		},
		height: {
			type: [String],
			default() {
				return '10';
			},
		},
	});
</script>

<style lang="scss" scoped></style>
