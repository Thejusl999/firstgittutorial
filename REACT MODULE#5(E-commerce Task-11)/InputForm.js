import React, { useRef } from 'react';
import classes from './InputForm.module.css';
const InputForm=(props)=>{
    const titleRef=useRef();
    const textRef=useRef();
    const dateRef=useRef();
    const addMovieHandler=(e)=>{
        e.preventDefault();
        const NewMovieObj={
            title:titleRef.current.value,
            openingText:textRef.current.value,
            date:dateRef.current.value,
        }
        props.onAddMovie(NewMovieObj);
        titleRef.current.value='';
        textRef.current.value='';
        dateRef.current.value='';
    }
    return (
        <form onSubmit={addMovieHandler}>
            <label className={classes.labels}>Title</label>
            <input className={classes.inputField} type='text' ref={titleRef}/>
            <label className={classes.labels}>Opening Text</label>
            <textarea className={classes.inputField} type='text' ref={textRef} rows='5'/>
            <label className={classes.labels}>Release Date</label>
            <input className={classes.inputField} type='text' ref={dateRef}/>
            <button>Add Movie</button>
        </form>
    )
}
export default InputForm;