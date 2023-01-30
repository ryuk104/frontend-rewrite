import {
	notificationController,
	NotificationType
} from '$lib/components/photo/shared-components/notification/notification';
//import { AlbumResponseDto, api } from '@api';
import { OnShowContextMenuDetail } from '$lib/components/photo/album-page/album-card.svelte';
import { writable, derived, get } from 'svelte/store';


	const albums = writable([]);
	const contextMenuPosition = writable<OnShowContextMenuDetail>({ x: 0, y: 0 });
	const contextMenuTargetAlbum = writable();
	const isShowContextMenu = derived(contextMenuTargetAlbum, ($selectedAlbum) => !!$selectedAlbum);

	async function loadAlbums(): Promise<void> {
		try {
		const token = localStorage.getItem("token");
      
        const { data } = await fetch(`http://localhost:4000/api/photo/album/getAllAlbums`, { 
          method: 'GET',
          headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${localStorage.token}`
          }
		
        });

			//=const { data } = await api.albumApi.getAllAlbums();
			albums.set(data);

			// Delete album that has no photos and is named 'Untitled'
			for (const album of data) {
				if (album.albumName === 'Untitled' && album.assetCount === 0) {
					setTimeout(async () => {
						await deleteAlbum(album);
						const _albums = get(albums);
						albums.set(_albums.filter((a) => a.id !== album.id));
					}, 500);
				}
			}
		} catch {
			notificationController.show({
				message: 'Error loading albums',
				type: NotificationType.Error
			});
		}
	}

	export const createAlbum() {
		try {
			const { data: newAlbum } = await api.albumApi.createAlbum({
				albumName: 'Untitled'
			});

			return newAlbum;
		} catch {
			notificationController.show({
				message: 'Error creating album',
				type: NotificationType.Error
			});
		}
	}

	async function deleteAlbum(album: AlbumResponseDto): Promise<void> {
		try {
			await api.albumApi.deleteAlbum(album.id);
		} catch {
			// Do nothing?
		}
	}

	async function showAlbumContextMenu(
		contextMenuDetail: OnShowContextMenuDetail,
		album: AlbumResponseDto
	): Promise<void> {
		contextMenuTargetAlbum.set(album);

		contextMenuPosition.set({
			x: contextMenuDetail.x,
			y: contextMenuDetail.y
		});
	}

	function closeAlbumContextMenu() {
		contextMenuTargetAlbum.set(undefined);
	}

	async function deleteSelectedContextAlbum(): Promise<void> {
		const albumToDelete = get(contextMenuTargetAlbum);
		if (!albumToDelete) {
			return;
		}
		if (
			window.confirm(
				`Are you sure you want to delete album ${albumToDelete.albumName}? If the album is shared, other users will not be able to access it.`
			)
		) {
			try {
				await api.albumApi.deleteAlbum(albumToDelete.id);
				const _albums = get(albums);
				albums.set(_albums.filter((a) => a.id !== albumToDelete.id));
			} catch {
				notificationController.show({
					message: 'Error deleting album',
					type: NotificationType.Error
				});
			}
		}

		closeAlbumContextMenu();
	}

	return {
		albums,
		isShowContextMenu,
		contextMenuPosition,
		loadAlbums,
		createAlbum,
		showAlbumContextMenu,
		closeAlbumContextMenu,
		deleteSelectedContextAlbum
	};
};
