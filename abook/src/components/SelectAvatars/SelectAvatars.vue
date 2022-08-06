<script setup>
	import DropDownMenuVue from '@/components/DropDownMenu/DropDownMenu.vue';
	import { useUserStore } from '@/stores/user';

	const props = defineProps({
		title: {
			type: String,
		},
	});
	const user = useUserStore();
</script>

<template>
	<div class="select-avatar">
		<DropDownMenuVue
			:img="{ src: user.userData.photoURL, alt: user.userData.fio }"
		>
			<div class="avatars">
				<div v-for="(item, idx) in user.avatars" class="avatars-item">
					<img
						class="avatar"
						v-if="item.src"
						:src="item.src"
						:alt="item.alt || 'Аватар'"
						@click="user.setActiveAvatar(idx)"
					/>
					<img
						class="select"
						v-if="item.select"
						src="@/assets/icon-done.png"
						:alt="item.alt || 'Аватар'"
					/>
				</div>

				<label>
					<img
						class="addAvatar"
						src="@/assets/icon-add-freand.png"
						alt="Добавить аватар"
					/>
					<input type="file" class="input-avatar" @input="sendAvatar" />
				</label>
			</div>
		</DropDownMenuVue>
	</div>
</template>

<style lang="scss" scoped>
	.select-avatar {
		width: fit-content;
	}
	.avatars {
		display: flex;
		&-item {
			position: relative;
		}
	}
	.avatar {
		max-width: 40px;
		max-height: 40px;
		opacity: 0.5;
		cursor: pointer;
		margin: 0 3px;
	}
	.select {
		position: absolute;
		top: -5px;
		right: -3px;
		width: 15px;
		height: 15px;
	}
</style>
