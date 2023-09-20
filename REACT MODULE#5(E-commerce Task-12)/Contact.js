import React,{useRef} from 'react';
import {Container,Button} from 'react-bootstrap';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import classes from './Contact.module.css';
const Contact=(props)=>{
    const nameRef=useRef();
    const emailRef=useRef();
    const phoneRef=useRef();
    const addUserHandler=(e)=>{
        e.preventDefault();
        const NewUser={
            name:nameRef.current.value,
            email:emailRef.current.value,
            phone:phoneRef.current.value,
        }
        props.onAddUser(NewUser);
        nameRef.current.value='';
        emailRef.current.value='';
        phoneRef.current.value='';
    }
    return(
       <>
        <Header/>
        <h2 className={classes.divTitle}>CONTACT US</h2>
        <Container className={classes.form}>
            <form onSubmit={addUserHandler}>
                <label className={classes.labels}>Name</label>
                <input className={classes.inputField} type='text' ref={nameRef}/>
                <label className={classes.labels}>Email ID</label>
                <input className={classes.inputField} type='email' ref={emailRef}/>
                <label className={classes.labels}>Phone Number</label>
                <input className={classes.inputField} type='number' ref={phoneRef}/>
                <Button variant="light" className={classes.submitbtn} type='submit'>SUBMIT</Button>{' '}
            </form>
        </Container>
        <Footer/>
       </>
    )
}
export default Contact;