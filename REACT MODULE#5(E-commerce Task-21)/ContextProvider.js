import React,{useState} from 'react';
import AuthContext from './auth-context';
const ContextProvider=props=>{
    const [token,setToken]=useState(null);
    const loggedInHandler=!!token;
    const loginHandler=(token)=>{
        setToken(token);
        if(localStorage.length>0){
            setTimeout(()=>{
                setToken('');
                localStorage.clear();
            },300000);
        }
    }
    const logoutHandler=()=>{
        setToken('');
    }
    const authContext={
        token:token,
        isLoggedIn:loggedInHandler,
        login:loginHandler,
        logout:logoutHandler
    }
    return <AuthContext.Provider value={authContext}>
        {props.children}
    </AuthContext.Provider>
}
export default ContextProvider;