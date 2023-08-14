import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
//import { serverApi } from '@api';

export const load: PageServerLoad = async ({ params }) => {
	

	try {
		//const { data: album } = await serverApi.albumApi.getAlbumInfo(albumId);
		const res = await fetch(`http://localhost:4000/api/photo/album/${params.albumId}`, { 
			  method: 'GET',
			  headers: {
				  'content-type': 'application/json',
				  'Accept': 'application/json',
				  'Authorization': `Bearer ${localStorage.token}`
			  }
		  });
		  const data = await res.json();
		  console.log(data)
		  const album = data
		  
		return {
			album,
			data
		};
	} catch (e) {
		//throw redirect(302, '/photos/albums');
	}
};
