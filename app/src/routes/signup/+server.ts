import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";
import type { ICarousel } from "$lib/types";
import { json } from '@sveltejs/kit';

import { redirect } from '@sveltejs/kit';

export async function load({ session }) {
	if (session.user) {
		throw redirect(302, '/');
	}
	return {};
}

/*
export const POST: RequestHandler = async (event) => {
    const body = await event.request.formData();
   
    // log all fields
    console.log([...body]);
   
    return json({
      // get a specific field's value
      name: body.get('name') ?? 'world'
    });
  }
  

export const load: PageLoad = async ({ fetch }): Promise<{ carouselItems: ICarousel[] }> => {
	const response = await fetch("");
	const data: { carouselItems: ICarousel[] } = await response.json();
	if (!response.ok) {
		throw error(response.status, response.statusText);
	}
	const { carouselItems } = data;

	return {
		carouselItems,
	};
};
*/