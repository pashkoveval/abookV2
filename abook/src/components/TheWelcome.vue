<script setup>
	import VerticalTabs from '@/components/components/VerticalTabs/VerticalTabs.vue';

	const text = [
		{
			icon: 'docs',
			heading: 'Читать',
			text: 'когда ни буть я начну',
		},
		{
			icon: 'book_check',
			heading: 'Паковать книги',
			text: 'больше некуда',
		},
		{
			icon: 'chield',
			heading: 'Обмениваться',
			text: 'книгами и впечатлениями',
		},
		{
			icon: 'smile2',
			heading: 'Общаться',
			text: 'с друзьями',
		},
		{
			icon: 'hart',
			heading: 'Лайкать',
			text: 'понравившиеся книги',
		},
	];
</script>

<template>
	<div class="welcom">
		<VerticalTabs
			v-for="item in text"
			:key="item.heading"
			size="30"
			:icon="item.icon"
			:heading="item.heading"
			:text="item.text"
		/>
	</div>
</template>

<style lang="scss" scoped>
	.welcom {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
</style>
