<template>
	<div class="loader">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</template>

<style lang="scss" scoped>
.loader {
	display: block;
	position: relative;

	width: 80px;
	height: 80px;

	div {
		display: block;
		position: absolute;
		box-sizing: border-box;

		width: 64px;
		height: 64px;
		margin: 8px;

		border: 8px solid var(--color-red);
		border-radius: 50%;
		border-color: var(--color-red) transparent transparent transparent;

		animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

		&:nth-child(1) {
			animation-delay: -0.45s;
		}

		&:nth-child(2) {
			animation-delay: -0.3s;
		}

		&:nth-child(3) {
			animation-delay: -0.15s;
		}
	}
}

@keyframes loader {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>
