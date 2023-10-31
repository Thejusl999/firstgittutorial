import React,{useContext,useEffect,useRef, useState} from 'react';
import {useHistory} from 'react-router-dom/cjs/react-router-dom.min';
import {Row,Col} from 'react-bootstrap';
import { useSelector } from 'react-redux';
// import AuthContext from '../store/auth-context';
const ProfilePage=()=>{
    const loginToken=useSelector(state=>state.auth.token);
    const themeStatus=useSelector(state=>state.theme.lightTheme);
    const [headerText,setHeaderText]=useState(true);
    const nameRef=useRef();
    const urlRef=useRef();
    // const authCtx=useContext(AuthContext);
    const history=useHistory();
    useEffect(()=>{
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBwiX430xFHd5MB3oS6n1PL12D4U7NBMnk',{
            method:'POST',
            body:JSON.stringify({
                // idToken:authCtx.token
                idToken:loginToken
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response=>{
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data=>{
            nameRef.current.value=data.users[0].displayName;
            urlRef.current.value=data.users[0].photoUrl;
            setHeaderText(false);
        })
        .catch(err=>console.log(err))
    },[])
    const profileHandler=(e)=>{
        e.preventDefault();
        history.push('/profile')
    }
    async function submitHandler(e){
        e.preventDefault();
        const name=nameRef.current.value;
        const url=urlRef.current.value;
        const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBwiX430xFHd5MB3oS6n1PL12D4U7NBMnk',{
            method:'POST',
            body:JSON.stringify({
                // idToken: authCtx.token,
                idToken:loginToken,
                displayName:name,
                photoUrl:url,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(response.ok){
            const data=await response.json();
            console.log(data)
            nameRef.current.value='';
            urlRef.current.value='';
            history.push('/startPage');
        }else{
            const data=await response.json();
            let errorMsg='Authentication failed';
            if(data&&data.error&&data.error.message){
                errorMsg=data.error.message;
            }
            alert(errorMsg);
        }
        
    }
    const divstyling={
        backgroundColor:themeStatus?'black':'white',
    }
    const textStyling={
        color:themeStatus?'white':'black'
    }
    return (
        <div style={divstyling}>
            <Row>
                <Col xs={8} className="text-start mt-3">
                    <h6 style={textStyling}><i>Winners never quit, Quitters never win.</i></h6>
                </Col>
                <Col xs={4} className="text-end mt-1">
                    <div>
                        {headerText?
                        <div style={{backgroundColor:'tan',color:'black',borderRadius:'10px',width:'fit-content',textAlign:'justify',float:'right'}}><h6><i>
                            Your profile is 64% completed. A complete profile has higher chances of landing a job.
                            <button style={{background:'none',border:'none',color:'blue'}} onClick={profileHandler}><i>Complete now</i></button>
                        </i></h6></div>:
                        <div style={{backgroundColor:'tan',color:'black',borderRadius:'10px',width:'fit-content',textAlign:'justify',float:'right'}}><h6><i>
                            Congratulations, your profile is 100% completed. A complete profile has higher chances of landing a job.
                        </i></h6></div>}
                    </div>
                </Col>
                {themeStatus&&<div style={{border:'none',backgroundColor:'white',height:'1px',marginTop:'3px'}}></div>}
                {!themeStatus&&<div style={{border:'none',backgroundColor:'black',height:'1px',marginTop:'3px'}}></div>}
            </Row>
            <div style={{display:'flex'}}>
                <form style={{backgroundColor:'white',marginLeft:'10%',padding:'10px',marginTop:'5rem',marginBottom:'27.5rem',width:'80%',border:'1px solid black',borderRadius:'10px',fontWeight:'bold'}} onSubmit={submitHandler}>
                    <header style={{textAlign:'center',marginTop:'5px'}}>Contact Details</header><button style={{color:'red',border:'1px solid red',borderRadius:'10px',float:'right',marginTop:'-25px'}}>Cancel</button>
                    <label style={{alignItems:'left'}} htmlFor='name'>Full Name:</label>
                    <input style={{width:'100%'}} id='name' type='text' ref={nameRef}/>
                    <label style={{textAlign:'left'}} htmlFor='url'>Profile Photo URL:</label>
                    <input style={{width:'100%'}} id='url' type='url' ref={urlRef}/>
                    <button style={{display:'block',margin:'10px auto',backgroundColor:'brown',color:'white',border:'1px solid brown',padding:'5px 10px',borderRadius:'5px'}} type='submit'>Update</button>
                </form>
            </div>
        </div>
    );
}
export default ProfilePage;