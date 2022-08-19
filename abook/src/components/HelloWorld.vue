<script setup>
	const slides = [
		{ text: 'Следи за тем что ты прочел' },
		{
			text: 'Добовляй любимые книги в библиотеку',
		},
		{ text: 'Подбери что то новое' },
		{ text: 'Узнай что то новое' },
		{ text: 'Коментируй не только книги, но и главы, рассказы, повести' },
		{ text: 'Войди или создай аккаунт' },
	];
</script>

<template>
	<div class="greetings">
		<h1 class="green">Добро пожаловать в ABooK</h1>
		<h3>Приложение помогающее следить за любимыми книгами.</h3>
		<Slider
			:slides="slides"
			:navigation="false"
			:pagination="false"
			autoplay="3"
		/>
	</div>
</template>

<style scoped>
	h1 {
		font-weight: 500;
		font-size: 2.6rem;
		top: -10px;
	}

	h3 {
		font-size: 1.2rem;
	}

	.greetings h1,
	.greetings h3 {
		text-align: center;
	}

	@media (min-width: 1024px) {
		.greetings h1,
		.greetings h3 {
			text-align: left;
		}
	}
</style>
