<script setup lang="ts">
import { computed } from 'vue';
import type { Track } from '@/stores/track';
import defaultTrackImg from '@/assets/logo.svg';

const props = defineProps<{ track: Track }>();

const getAlbumName = computed(() => {
	if (!props.track.iTunesTrackUrl) return '';

	const splittedUrl = props.track.iTunesTrackUrl.split('/');
	const index = splittedUrl.findIndex(item => item === 'album');

	return splittedUrl[index + 1].split('-').join(' ').toUpperCase();
});
</script>

<template>
	<div class="track-item">
		<div class="track-item__img">
			<img
				:src="track.imageUrl || defaultTrackImg"
				:alt="track.artist"
			/>
		</div>

		<div class="track-item__description">
			<h2 class="track-item__description--title">{{ track.title }}</h2>
			<h3 class="track-item__description--artist">{{ track.artist }}</h3>

			<a
				v-if="track.iTunesTrackUrl"
				class="track-item__description--album"
				:href="track.iTunesTrackUrl"
			>
				{{ getAlbumName }}
			</a>
		</div>
	</div>
</template>

<style scoped lang="scss">
.track-item {
	display: flex;

	&__img {
		width: 200px;
		height: 200px;

		border-radius: 20px;
		margin-right: 20px;
		flex-shrink: 0;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;

			border-radius: 6px;
			box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
		}
	}

	&__description {
		display: flex;
		justify-content: center;
		flex-direction: column;

		&--title {
			font-size: 24px;
			font-weight: 600;

			display: -webkit-box;
			text-overflow: ellipsis;
			overflow: hidden;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}

		&--artist {
			font-size: 24px;

			color: var(--color-red);
			margin-bottom: 10px;
		}
	}
}
</style>
