import React,{useEffect, useRef, useState} from 'react';
import classes from './AddExpense.module.css';
import {Row,Col,Container,Button} from 'react-bootstrap';

const AddExpense=()=>{
    const expenseRef=useRef();
    const descriptionRef=useRef();
    const [expenses,setExpenses]=useState([]);
    const [selectedOption,setSelectedOption]=useState('');
    
    const selectHandler=(e)=>{
        setSelectedOption(e.target.value);
    }
    useEffect(()=>{
        fetch('https://expense-tracker-5c73a-default-rtdb.firebaseio.com/expenses.json')
        .then(response=>response.json())
        .then(data=>{
            Object.entries(data).forEach(expense=>{
                setExpenses(prevExpenses=>[...prevExpenses,expense[1]])
            })
            
        })
        .catch(err=>console.log(err))        
    },[])
    async function submitHandler(e){
        e.preventDefault();
        const expenseItem={
            amount:expenseRef.current.value,
            description:descriptionRef.current.value,
            category:selectedOption
        }
        try{
            const response=await fetch('https://expense-tracker-5c73a-default-rtdb.firebaseio.com/expenses.json',{
                method:'POST',
                body:JSON.stringify(expenseItem),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            if(response.ok){
                const data=await response.json();
                console.log(data)
            }
        }catch(err){
            console.log(err)
        }
        setExpenses(prevExpenses=>[...prevExpenses,expenseItem]);
        expenseRef.current.value='';
        descriptionRef.current.value='';
        setSelectedOption('');
    }
    return(
        <>
        <Container>
            <form className={classes.form} onSubmit={submitHandler}>
                <Row>
                    <Col xs={4}>
                        <label htmlFor='expense'>Expense Amount</label>
                        <input id='expense' type='number' ref={expenseRef} required/>
                    </Col>
                    <Col xs={4}>
                        <Row>
                            <label htmlFor='description'>Description</label>
                            <input id='description' type='text' ref={descriptionRef} required/>
                        </Row>
                        <Row style={{display:'inline-flex',width:'10rem',justifyContent:'center',alignItems:'center',marginTop:'1rem'}}>
                        <Button type='submit' variant='dark'>ADD EXPENSE</Button>
                        </Row>
                    </Col>
                    <Col xs={4}>
                        <label htmlFor='category'>Category</label><br></br>
                        <select value={selectedOption} onChange={selectHandler}>
                            <option value="">Select</option>
                            <option value="food">Food</option>
                            <option value="fuel">Fuel</option>
                            <option value="groceries">Groceries</option>
                            <option value="travel">Travel</option>
                        </select>
                    </Col>
                </Row>
            </form>
        </Container>
        <Container className={classes.form}>
            <h3>Expenses</h3>
            {expenses.map((item,index)=>(
                <div  key={Math.random()}><Row>
                    <Col xs={1}>{index+1})</Col>
                    <Col xs={8} className='text-start'>{item.description} ({item.category})</Col>
                    <Col xs={2}>₹{item.amount}</Col>
                </Row></div>
            ))}          
        </Container>
        </>
    )
}
export default AddExpense;