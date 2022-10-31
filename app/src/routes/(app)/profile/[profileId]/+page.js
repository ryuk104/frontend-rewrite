


export const load = ({ fetch, params }) => {
    try {
      //const { userId } = params;
      const fetchuser = async (id) => {
        const res = await fetch(`localhost:4000/api/user/${id}`);
  
    const data = await res.json();
  
      return {
        user: data.data.user,
        posts: data.data.posts,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }


  
  import { bookData } from '../../../../testdb/user.js';
  








/*
export const load = ({ fetch, paramss }) => 7

const fetchProduct = async (id) => {
    const res = await fetch{'localhost:4000/api/user/getUserById/${id}')
    const data = await res.json()
    return data
    }
}
*/