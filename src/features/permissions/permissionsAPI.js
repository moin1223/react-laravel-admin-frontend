// import axios from "../../utils/axios";
import axios from "axios";

export const getPermissions = async () => {
    const response = await axios.get("/api/permissions");

    return response.data;
};