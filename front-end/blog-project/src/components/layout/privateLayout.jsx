import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import PrivateNavbar from '../privateNavbarLinks';
import { useAuth } from '../context/authContext';

export default function privateLayout() {
    const auth = useAuth();

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
