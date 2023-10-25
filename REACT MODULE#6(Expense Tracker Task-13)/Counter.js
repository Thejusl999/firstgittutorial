import react from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
const Counter=()=>{
    const counter=useSelector(state=>state.counter);
    const dispatch=useDispatch();
    
    const incrementHandler=()=>{
        dispatch({type:'increment'});
    }
    const decrementHandler=()=>{
        dispatch({type:'decrement'});
    }

    const increment5Handler=()=>{
        dispatch({type:'increment5'});
    }
    const decrement5Handler=()=>{
        dispatch({type:'decrement5'});
    }
    return (
        <>
            <div style={{textAlign:'center'}}>
                {counter}<br></br>
                <Button variant='dark' className='me-3' onClick={incrementHandler}>INCREMENT</Button>
                <Button variant='dark' onClick={decrementHandler}>DECREMENT</Button>
            </div><br></br>
            <div style={{textAlign:'center'}}>
                <Button variant='dark' className='me-3' onClick={increment5Handler}>INCREMENT BY 5</Button>
                <Button variant='dark' onClick={decrement5Handler}>DECREMENT BY 5</Button>
            </div>
        </>
    );
}
export default Counter;