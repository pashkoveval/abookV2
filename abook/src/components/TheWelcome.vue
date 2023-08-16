<script setup>
	import WelcomeItem from './WelcomeItem.vue';
	import DocumentationIcon from './icons/IconDocumentation.vue';
	import ToolingIcon from './icons/IconTooling.vue';
	import EcosystemIcon from './icons/IconEcosystem.vue';
	import CommunityIcon from './icons/IconCommunity.vue';
	import SupportIcon from './icons/IconSupport.vue';
</script>

<template>
	<div class="welcom">
		<WelcomeItem>
			<template #icon>
				<DocumentationIcon />
			</template>
			<template #heading> <span class="green">Читать</span> </template>

			<span>когда ни буть я начну</span>
		</WelcomeItem>

		<WelcomeItem>
			<template #icon>
				<ToolingIcon />
			</template>
			<template #heading> <span class="green">Паковать книги</span> </template>

			<span>больше некуда</span>
		</WelcomeItem>

		<WelcomeItem>
			<template #icon>
				<EcosystemIcon />
			</template>
			<template #heading> <span class="green">Обмениваться</span> </template>

			<span>книгами и впечатлениями</span>
		</WelcomeItem>

		<WelcomeItem>
			<template #icon>
				<CommunityIcon />
			</template>
			<template #heading> <span class="green">Общаться</span> </template>

			<span>с друзьями и потенциальными поставщиками интересных книг</span>
		</WelcomeItem>

		<WelcomeItem>
			<template #icon>
				<SupportIcon />
			</template>
			<template #heading> <span class="green">Лайкать</span> </template>

			<span>понравившиеся книги</span>
		</WelcomeItem>
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
