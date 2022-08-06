<script setup>
	const props = defineProps({
		title: {
			type: String,
			required: true,
		},
		img: {
			type: Object,
			default() {
				return {};
			},
		},
	});
</script>
<template>
	<div class="menu">
		<div class="manu-header">
			<div class="menu-header-title">{{ props.title }}</div>
			{{ props.img }}
			<img
				v-if="props.img"
				:src="props.img.src"
				:alt="props.img.alt"
				:width="props.img.width"
				:height="props.img.height"
			/>
		</div>
		<div class="menu-drop_down"></div>
	</div>
</template>

<style lang="scss" scoped>
	.menu {
		border: 1px solid var(--color-border-input);
		padding: 8px;
		border-radius: var(--border-radius);
		// background-color: var(--color-background-input-green);
		&-header {
			display: flex;
			justify-content: space-between;
			// &-title {
			// }
			// &-img {
			// }
		}
		// &-drop_down {
		// }
	}
</style>
