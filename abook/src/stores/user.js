import { defineStore } from 'pinia';
import { CONSTANTS } from '@/Constants/Constants';

export const useUserStore = defineStore({
	id: 'user',
	state: () => ({
		avatars: [
			{
				select: false,
				src: CONSTANTS.DEFAULT_AVATARS.WOMAN1,
			},
			{
				select: true,
				src: CONSTANTS.DEFAULT_AVATARS.WOMAN2,
			},
			{
				select: false,
				src: CONSTANTS.DEFAULT_AVATARS.MAN1,
			},
			{
				select: false,
				src: CONSTANTS.DEFAULT_AVATARS.MAN2,
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
			photoURL: CONSTANTS.DEFAULT_AVATARS.WOMAN1,
			uid: null,
			avatarsArr: [],
			newUser: true,
		},
		loginUser: null,
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
		setAutorizedUser(user) {
			this.loginUser = user;
		},
	},
});
