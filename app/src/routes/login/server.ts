

export const loginUser = async (data) => {
    try {
      localStorage.removeItem("token");
      const res = await axios.post("/api/auth/login", data);
  
      return res.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  };