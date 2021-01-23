import axios from "axios";

export const GetUserData = axios
  .get("http://localhost:4000/api/user")
  .then((res) =>  {return res.data} )
  .catch((res) => {return res});
