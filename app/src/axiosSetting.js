import { message } from "antd";
import axios from "axios";

axios.interceptors.response.use((res) => {
    if (res.data.code === 401) {
        window.location.href = "/login";
        message.error(res.data.msg);
    }
    return res;
})