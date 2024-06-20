import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import PrivateNavbar from '../privateNavbarLinks';

export default function privateLayout() {
    const auth = true;

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
