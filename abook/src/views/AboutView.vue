<script setup>
	import axios from 'axios';
	import { computed, ref } from 'vue';

	const searchString = ref(null);
	const searchReslult = ref();
	const computedSearchReslult = computed(() => searchReslult);

	const getBooks = async (searchString) => {
		const str = searchString.replaceAll(' ', '+');
		axios
			.get(`https://www.googleapis.com/books/v1/volumes?q=${str}`)
			.then((rest) => {
				console.log('rest', rest);
				searchReslult.value = rest;
			});
	};

	// getBooks();
</script>

<template>
	<div class="about">
		<div v-if="computedSearchReslult" class="results">
			{{ computedSearchReslult }}
		</div>
		<div class="search">
			<input v-model="searchString" />
			<button @click="getBooks(searchString)">search</button>
		</div>
	</div>
</template>

<style>
	.about {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.results {
		max-height: 50dvh;
		overflow: auto;
	}
	.search {
		width: 100%;
	}
</style>
