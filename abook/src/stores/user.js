import { defineStore } from 'pinia';
import avatar1 from '@/assets/avatar/man.png';
import avatar2 from '@/assets/avatar/woman.png';

export const useUserStore = defineStore({
	id: 'user',
	state: () => ({
		avatars: [
			{
				select: false,
				src: avatar1,
			},
			{
				select: true,
				src: avatar2,
			},
		],
		userData: {
			fio: null,
			email: null,
			lastName: null,
			firstName: null,
			password: null,
			passwordConfirm: null,
			accessToken: null,
			emailVerified: null,
			metadata: null,
			phoneNumber: null,
			photoURL: avatar2,
			uid: null,
			avatarsArr: [],
			newUser: true,
		},
	}),
	actions: {
		setFio() {
			const fio = `${this.userData.firstName || ''} ${
				this.userData.lastName || ''
			}`;
			this.userData.avatarsArr.forEach((el) => {
				el.alt = fio;
			});
			this.userData.fio = fio;
		},
		dropsSelect() {
			this.avatars.forEach((el) => {
				el.select = false;
			});
		},
		pushNewAvatars(avatar) {
			if (avatar) {
				this.dropsSelect();
				this.avatars.push(avatar);
				this.userData.avatarsArr.push(avatar);
				this.userData.photoURL = avatar.src;
			} else {
				this.setDifolteAvatar();
			}
		},
		setActiveAvatar(idx) {
			if (idx !== -1 && !this.avatars[idx].select) {
				this.dropsSelect();
				this.avatars[idx].select = true;
				this.userData.photoURL = this.avatars[idx].src;
			}
		},
		setDifolteAvatar() {
			this.avatars[1].select = true;
			this.userData.photoURL = this.avatars[1].src;
		},
	},
});
