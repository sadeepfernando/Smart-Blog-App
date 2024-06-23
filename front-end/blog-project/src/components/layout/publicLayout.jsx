import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import PublicNavbar from '../publicNavbarLinks';
import { useAuth } from '../../context/authContext';

export default function privateLayout() {
    const auth = useAuth();

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
