import axios from "axios";

const axiosInstance = axios.create({baseURL: "http://localhost:8000/api/v1"});

axiosInstance.interceptors.request.use((request) =>{
    const stringifyBlogData = window.localStorage.getItem("blogData");

    if(stringifyBlogData){
        const blogData = JSON.parse(stringifyBlogData);
        const token = blogData.token;

        request.headers.Authorization = `Bearer ${token}`
    }

    return request;
})


export default axiosInstance;