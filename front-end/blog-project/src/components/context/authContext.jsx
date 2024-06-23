import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const[auth, setAuth] = useState(null);

    useEffect(()=>{
        const stringifyBlogData = window.localStorage.getItem("blogData");

        if(stringifyBlogData){
            const blogData = JSON.parse(stringifyBlogData);
            const user = blogData.user;
            setAuth(user);

        }else{
            setAuth(null);
        }
    }, [])
}