import  'react';
import { createContext } from 'react';
import {createUserWithEmailAndPassword,  onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import auth from '../firebase/firebase.config';
import Loading from '../Pages/Shared/Loading';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        // setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) =>{
        // setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () =>{
        // localStorage.removeItem('genius-token');
        return signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
            console.error(error)
          });  
        
    }

    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
                    
            setUser(currentUser);
            setLoading(false);
            console.log("from context")
        });
        return () =>{
            return unsubscribe();
        }
    }, [])

    if (loading==true) {
        return <Loading></Loading>
    }


    const authInfo = {
        user, 
        loading,
        createUser, 
        setLoading,
        login, 
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;