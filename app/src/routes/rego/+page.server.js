
import * as api from '$lib/api';
import { mdiCookie } from '@mdi/js';

export async function POST({ request }) {
	const user = await request.json();

	// TODO individual properties
	const body = await api.post('users', { user });

}


/*
export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData()
        console.log(formData)
        const res = await fetch('http://localhost:4000/api/auth/register', {
            method: 'POST',
            body: JSON.stringify([{
                formData.name,
                formData.email,
                formData.password,
            }]),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}
*/
/*
export const createUser = async () => {
    const res = await fetch{'http://localhost:4000/api/auth/register'){
        method: 'POST',
        body: data

    }
    const data = await res.json()
    return data
    }
}

async function submitsignup(event) {
        const res = await fetch('http://localhost:4000/api/auth/register', {
            method: 'POST',
            body: JSON.stringify([{
                name,
                email,
                password,
            }]),
            headers: {
                'Content-Type': 'application/json'
            }
        })
}
*/