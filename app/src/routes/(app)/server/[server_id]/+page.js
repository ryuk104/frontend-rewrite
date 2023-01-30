




/** @type {import('./$types').PageLoad} */

export async function load ({ fetch, params }) {
  try {
    const { server_id } = params;
    const token = localStorage.getItem("token");

    const getserver = async () => {
    const res = await fetch(`http://localhost:4000/api/server/${server_id}`, { 
      method: 'GET',
      headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
    });


    const Data = await res.json();

    console.log(Data)

  }
  getserver()

  } catch (error) {
    console.log(error);
  }

}


