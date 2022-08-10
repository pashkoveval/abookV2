import { defineStore } from 'pinia';

export const useErrorsStore = defineStore({
	id: 'errors',
	state: () => ({
		errors: {
			validation: {
				email: null,
				tel: null,
				password: null,
				passwordConfirm: null,
			},
		},
	}),
	actions: {
		/**
		 * @param {object} field
		 * @returns boolean
		 * @callback this.setValidationError
		 * @discription Проверяет данные из полученного поля на их наличие и возвращает результат + ставит ошибку на поле
		 */
		_emptyField(field) {
			if (!field?.value) {
				const error = {
					typeError: 'error',
					typeField: field?.type,
					massage: 'Поле должно быть заполнено',
				};
				this.setValidationError(error);
				return false;
			}
			return true;
		},
		/**
		 * @param {object} field
		 * @returns boolean
		 * @callback this.setValidationError
		 * @discription Проверяет данные из полученного поля на их наличие и возвращает результат + ставит ошибку на поле
		 */
		_passwordConfirmField(password, passwordConfirm) {
			if (password !== passwordConfirm) {
				if (!password) {
					this._emptyField({ type: 'password', value: password });
				}
				const error = {
					typeError: 'warn',
					typeField: 'passwordConfirm',
					massage: 'Пароли не совподают',
				};
				this.setValidationError(error);
				return false;
			}
			return true;
		},
		/**
		 * @param {object} field
		 * @param {number} length
		 * @param {string} massage
		 * @returns boolean
		 * @callback this.setValidationError
		 * @discription Проверяет данные из полученного поля на переданную длину и возвращает результат + ставит ошибку на поле
		 */
		_lengthFieldWrong(field, length, massage) {
			if (String(field?.value).length < length) {
				const error = {
					typeError: 'error',
					typeField: field?.type,
					massage,
				};
				this.setValidationError(error);
				return false;
			}
			return true;
		},
		/**
		 * @param {object} field
		 * @param {string} regexp
		 * @param {string} massage
		 * @returns boolean
		 * @callback this.setValidationError
		 * @discription Проверяет данные из полученного поля регулярным выражением и возвращает результат + ставит ошибку на поле
		 */
		_regExpCheckField(field, regexp, massage) {
			if (!regexp.test(field?.value?.toLowerCase())) {
				const error = {
					typeError: 'error',
					typeField: field?.type,
					massage,
				};
				this.setValidationError(error);
				return false;
			}
			return true;
		},
		/**
		 * @param {object} error
		 * @set this.errors.validation[error.typeField] = error;
		 * @discription помечает валидированое поле ошибкой
		 */
		setValidationError(error) {
			this.errors.validation[error.typeField] = error;
		},
		/**
		 * @param {string} field
		 * @set this.errors.validation[field] = null;
		 * @discription помечает валидированое поле готовым
		 */
		cleanValidationError(field) {
			this.errors.validation[field] = null;
		},
		/**
		 * @param {object} field
		 * @discription Запускает валидацию для поля email
		 */
		emailErrorCheck(field) {
			let valid = true;
			const regexp = new RegExp(
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/
			);
			valid = this._emptyField(field);
			if (valid) {
				valid = this._regExpCheckField(field, regexp, 'Неверно введен Email');
			}
			if (valid) {
				this.cleanValidationError(field?.type);
			}
		},
		/**
		 * @param {object} field
		 * @discription Запускает валидацию для поля tel
		 */
		phoneErrorCheck(field) {
			let valid = true;
			valid = this._emptyField(field);
			if (valid) {
				valid = this._lengthFieldWrong(
					field,
					11,
					'Не корректный номер телефона. Телефон Начинаеться с цифры 8. Она подставляеться автоматически'
				);
			}
			if (valid) {
				this.cleanValidationError(field?.type);
			}
		},
		/**
		 * @param {object} field
		 * @discription Запускает валидацию для поля password
		 */
		passwordErrorCheck(field) {
			let valid = true;
			const regexp = new RegExp(
				'^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$'
			);
			valid = this._emptyField(field);
			if (valid) {
				valid = this._lengthFieldWrong(field, 8, 'Короткий пароль');
			}
			if (valid) {
				valid = this._regExpCheckField(
					field,
					regexp,
					'Пароль не соответствует нужным параметрам безопастности'
				);
			}
			if (valid) {
				this.cleanValidationError(field?.type);
			}
		},
		/**
		 * @param {object} field
		 * @discription Запускает валидацию для поля password
		 */
		passwordConfirmErrorCheck(password, passwordConfirm) {
			const valid = this._passwordConfirmField(password, passwordConfirm);
			if (valid) {
				this.cleanValidationError('passwordConfirm');
			}
		},
	},
});
