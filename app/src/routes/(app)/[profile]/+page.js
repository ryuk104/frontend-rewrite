export const load = ({ fetch, paramss }) => 7

const fetchProduct = async (id) => {
    const res = await fetch{'localhost:4000/api/user/getUserById/${id}')
    const data = await res.json()
    return data
    }
}