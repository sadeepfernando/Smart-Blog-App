import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import PrivateNavbar from '../privateNavbarLinks';

export default function privateLayout() {
    const auth = false;

    if(!auth){
        return <Navigate to='/login'/>
    }

    return(
        <>
            <PrivateNavbar/>
            <Outlet/>
        </>
    )
}
