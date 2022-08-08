<script setup>
	import DropDownMenuVue from '@/components/DropDownMenu/DropDownMenu.vue';
	import { useUserStore } from '@/stores/user';
	import { firebaseState } from '@/fb';
	import { ref } from 'vue';

	const props = defineProps({
		title: {
			type: String,
		},
	});
	const user = useUserStore();

	const sendAvatar = async (e) => {
		if (e.target.files[0]) {
			const res = await firebaseState.uploadFyles(e.target.files[0]);
			user.pushNewAvatars({
				select: true,
				src: res,
				alt: user.userData.fio,
			});
		}
	};

	const modal = ref(false);
	const toggleMenu = (open) => {
		modal.value = open;
	};
</script>

<template>
	<div class="select-avatar">
		<DropDownMenuVue
			:title="props.title"
			:img="{ src: user.userData.photoURL, alt: user.userData.fio }"
			@open="toggleMenu"
			@close="toggleMenu"
		>
			<div class="avatars" :class="{ open: modal }">
				<div v-for="(item, idx) in user.avatars" class="avatars-item">
					<img
						class="avatar"
						v-if="item.src"
						:src="item.src"
						:alt="item.alt || 'Аватар'"
						loading="lazy"
						@click="user.setActiveAvatar(idx)"
					/>
					<img
						class="select"
						v-if="item.select"
						src="@/assets/icons/icon-done.png"
						loading="lazy"
						:alt="item.alt || 'Аватар'"
					/>
				</div>

				<label class="btn">
					<img
						class="addAvatar"
						src="@/assets/icons/icon-add-freand.png"
						alt="Добавить аватар"
						loading="lazy"
					/>
					<input type="file" class="input-avatar" @input="sendAvatar" />
				</label>
			</div>
		</DropDownMenuVue>
	</div>
</template>

<style lang="scss" scoped>
	.select-avatar {
		margin: 4px;
		display: flex;
		justify-content: flex-end;
		overflow: hidden;
		flex: 1;
	}
	.avatars {
		display: flex;
		position: relative;
		width: 0;
		height: 0;
		transition: var(--transition);
		&.open {
			width: fit-content;
			height: auto;
		}
		&-item {
			position: relative;
		}
		.input-avatar {
			position: absolute;
			top: -9000px;
			visibility: hidden;
		}
	}
	.avatar {
		width: 40px;
		height: 40px;
		opacity: 0.5;
		cursor: pointer;
		margin: 3px;
		border-radius: 50%;
		display: block;
	}
	.addAvatar {
		border-radius: 50%;
		width: 35px;
		height: 35px;
		border: 2px solid var(--color-border-input-focus);
		padding: 2px;
	}
	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		height: auto;
		margin-left: 10px;
	}
	.select {
		position: absolute;
		top: -5px;
		right: -3px;
		width: 15px;
		height: 15px;
	}
</style>
