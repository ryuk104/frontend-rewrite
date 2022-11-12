   /** @type {import('./$types').PageLoad} */


export async function load ({ fetch, params }) {
    try {
      const { userId } = params;
      const res = await fetch(`http://localhost:4000/api/user/${userId}`, { 
        method: 'GET',
      });
  
      const data = await res.json();
      const userdata = data.data.user
      return userdata;
    } catch (error) {
      console.log(error);
    }
  }


  
//import { bookData } from '../../../../testdb/user.js';
  








/*
export const load = ({ fetch, paramss }) => 7

const fetchProduct = async (id) => {
    const res = await fetch{'localhost:4000/api/user/getUserById/${id}')
    const data = await res.json()
    return data
    }
}
*/