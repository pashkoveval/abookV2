<script setup>
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
			loading.value = true;
			const res = await firebaseState.uploadFyles(e.target.files[0]);
			user.pushNewAvatars({
				select: true,
				src: res,
				alt: user.userData.fio,
			});
			loading.value = false;
		}
	};

	const modal = ref(false);
	const loading = ref(false);
	const toggleMenu = (open) => {
		modal.value = open;
	};
</script>

<template>
	<div class="select-avatar">
		<DropDownMenuVue
			:title="props.title"
			:img="{ src: user.userData.photoURL, alt: user.userData.fio }"
			:loading="loading"
			@open="toggleMenu"
			@close="toggleMenu"
		>
			<div class="avatars" :class="{ open: modal }">
				<div class="avatars-list">
					<div v-for="(item, idx) in user.avatars" class="avatars-item">
						<img
							v-if="item.src"
							:src="item.src"
							:alt="item.alt || 'Аватар'"
							class="avatar"
							:class="{ select: item.select }"
							loading="lazy"
							@click="user.setActiveAvatar(idx)"
						/>
					</div>
				</div>

				<label class="btn">
					<Tooltip text="Загрузить свой аватар" position="left">
						<Icon icon="user" class="add-avatar" size="30" />
					</Tooltip>
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
		align-items: center;
		&-list {
			display: flex;
			max-width: 100%;
			height: 100%;
			padding-top: 5px;
			padding-right: 5px;
			overflow-x: scroll;
			overflow-y: hidden;
		}
		&.open {
			width: 100%;
			max-width: 45vw;
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
		transition: var(--transition);
		width: 40px;
		height: 40px;
		opacity: 0.5;
		cursor: pointer;
		margin: 3px;
		border-radius: 50%;
		display: block;
		&:hover {
			opacity: 0.7;
			transform: scale(1.1);
		}
		&.select {
			opacity: 1;
		}
	}
	.addAvatar {
		transition: var(--transition);
		width: 30px;
		height: 30px;
		margin-top: 7px;
		cursor: pointer;
		&:active {
			transform: scale(1.1);
		}
		&:hover {
			transform: scale(1.1);
		}
	}
	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		height: auto;
		margin-left: 10px;
		.add-avatar {
			transition: var(--transition);
			color: var(--color-border-input-mute);
			cursor: pointer;
			&:hover {
				color: var(--color-border-input-focus);
			}
		}
	}
</style>
