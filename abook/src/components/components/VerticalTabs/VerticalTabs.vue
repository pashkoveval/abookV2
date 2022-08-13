<template>
	<div class="item" :class="{ link: prop.link, button: prop.btn }">
		<i>
			<slot name="icon">
				<Icon v-if="prop.icon" :icon="prop.icon" :size="prop.size" />
			</slot>
		</i>
		<div class="details">
			<h3>
				<slot name="heading">{{ prop.heading }}</slot>
			</h3>
			<span class="text">
				<slot>{{ prop.text }}</slot>
			</span>
		</div>
		<RouterLink v-if="prop.link" :to="prop.link" class="details-link" />
	</div>
</template>

<script setup>
	const prop = defineProps(['link', 'icon', 'heading', 'text', 'size', 'btn']);
	import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped>
	i {
		display: flex;
		place-items: center;
		place-content: center;
		width: 32px;
		height: 32px;
		color: var(--color-heading);
		transition: var(--transition);
	}
	.item {
		width: 100%;
		margin-top: 2rem;
		display: flex;
		position: relative;
		&.button {
			cursor: pointer;
		}

		&:hover {
			.details {
				.text {
					opacity: 0;
				}
				h3 {
					transform: translateY(50%);
				}
			}
			&.link,
			&.button {
				i {
					color: var(--vt-c-green-mute);
				}
				.details {
					color: var(--vt-c-green-mute);
					h3 {
						color: var(--vt-c-green-soft);
					}
				}
			}
		}
	}

	.details {
		transition: var(--transition);
		flex: 1;
		margin-left: 1rem;

		&-link {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: transparent;
		}
		.text {
			transition: var(--transition);
			opacity: 1;
		}
		h3 {
			transition: var(--transition);
			font-size: 1.2rem;
			font-weight: 500;
			margin-bottom: 0.4rem;
			color: var(--color-heading);
		}
	}

	.item:before {
		content: ' ';
		border-left: 1px solid var(--color-border);
		position: absolute;
		left: 26px;
		bottom: calc(50% + 25px);
		height: calc(50% - 25px);
	}

	.item:after {
		content: ' ';
		border-left: 1px solid var(--color-border);
		position: absolute;
		left: 26px;
		top: calc(50% + 25px);
		height: calc(50% - 25px);
	}

	.item:first-of-type:before {
		display: none;
	}

	.item:last-of-type:after {
		display: none;
	}
	.item {
		margin-top: 0;
		padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
	}

	i {
		top: calc(50% - 25px);
		left: 0px;
		position: absolute;
		border: 1px solid var(--color-border);
		background: var(--color-background);
		border-radius: 8px;
		width: 50px;
		height: 50px;
	}
</style>
