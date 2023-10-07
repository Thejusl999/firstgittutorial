import React,{useState} from 'react';
import AuthContext from './auth-context';
const AuthProvider=(props)=>{
    const [token,setToken]=useState('');
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const loginHandler=(token)=>{
        setToken(token);
        setIsLoggedIn(true);
    }
    const logoutHandler=()=>{
        setToken('');
        setIsLoggedIn(false);
    }
    const authContext={
        token:token,
        isLoggedIn:isLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }
    return(
        <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>
    )
}
export default AuthProvider;