import axios from "axios"; 
const GetData = axios.create({
    baseURL: "https://test-server-neyyar.herokuapp.com/api/admin/v1"
});

export default GetData;