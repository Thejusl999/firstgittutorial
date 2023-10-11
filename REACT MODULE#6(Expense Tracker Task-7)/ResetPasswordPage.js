import React,{useState,useRef} from 'react';
import classes from '../components/Auth/AuthForm.module.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';


const ResetPasswordPage=()=>{
    const emailRef=useRef();
    const history=useHistory();
    const [isLoading,setIsLoading]=useState(false);
    async function forgotPasswordHandler(e){
        e.preventDefault();
        const email=emailRef.current.value;
        setIsLoading(true);
        const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBwiX430xFHd5MB3oS6n1PL12D4U7NBMnk',{
            method:'POST',
            body:JSON.stringify({
                requestType:"PASSWORD_RESET",
                email:email
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        setIsLoading(false);
        if(response.ok){
            emailRef.current.value='';
            alert("Password reset link sent successfully!")
            history.push('/');
        }else{
            const data=await response.json();
            let errorMsg='Authentication failed';
            if(data&&data.error&&data.error.message){
                errorMsg=data.error.message;
            }
            alert(errorMsg);
        }
    }
    const signInPageLoader=()=>{
        history.push('/');
    }
    return(
        <>
        <section className={classes.auth}>
            <h3 style={{textAlign:'center',marginBottom:'1rem'}}>Reset Password</h3>
            <form onSubmit={forgotPasswordHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Email</label>
                    <input id='email' type='email' ref={emailRef} required/>
                </div>
                {!isLoading?<div className={classes.actions}>
                    <button>Send Link</button>
                </div>:<p>Sending Link...</p>}
            </form>
            <div className={classes.loginActions}>
                <button onClick={signInPageLoader}>Don't have an account? Sign up</button>
            </div>
        </section>
        </>
    );
}
export default ResetPasswordPage;