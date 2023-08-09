/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth"
import auth from '../../firebase/firebase.config';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({children}) => {
    const [user] = useAuthState(auth)
    const location = useLocation();
    if(!user){
        return <Navigate to="/login" state={{from: location}} replace></Navigate>
    }
    return children;
};

export default RequireAuth;