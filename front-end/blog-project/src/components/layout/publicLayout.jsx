import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import PublicNavbar from '../publicNavbarLinks';

export default function privateLayout() {
    const auth = true;

    if(auth){
        return <Navigate to='/'/>
    }

    return(
        <>
            <PublicNavbar/>
            <Outlet/>
        </>
    )
}
