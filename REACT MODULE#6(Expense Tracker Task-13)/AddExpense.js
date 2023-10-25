import React,{useEffect, useRef, useState} from 'react';
import classes from './AddExpense.module.css';
import {Row,Col,Container,Button} from 'react-bootstrap';
import Counter from './Counter';

const AddExpense=()=>{
    const expenseRef=useRef();
    const descriptionRef=useRef();
    const [expenses,setExpenses]=useState([]);
    const [selectedOption,setSelectedOption]=useState('');
    const [patchID,setPatchID]=useState('');
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
        if(patchID===''){
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
        }else{
            try{
                let url=`https://expense-tracker-5c73a-default-rtdb.firebaseio.com/expenses/${patchID}.json`;
                const response=await fetch(url,{
                    method:'PUT',
                    body:JSON.stringify(expenseItem),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                if(response.ok){
                    alert('Expense will been updated!');
                    window.location.reload();
                }
            }catch(err){
                console.log(err)
            }
        }
        expenseRef.current.value='';
        descriptionRef.current.value='';
        setSelectedOption('');
    }
    async function editHandler(e){
        e.preventDefault();
        let expenseItem=e.target.parentElement.parentElement.children[1].textContent;
        const response=await fetch('https://expense-tracker-5c73a-default-rtdb.firebaseio.com/expenses.json');
        try{if(response.ok){
            const data=await response.json();
            Object.entries(data).forEach(expense=>{
                if(expenseItem===expense[1].description){
                    setPatchID(expense[0]);
                    expenseRef.current.value=expense[1].amount;
                    descriptionRef.current.value=expense[1].description;
                    setSelectedOption(expense[1].category);
                }
            })
        }}catch(err){
            console.log(err)
        }
        alert('Edit your response and add again!');
    }
    async function deleteHandler(e){
        e.preventDefault();
        e.target.parentElement.parentElement.remove();
        let expenseItem=e.target.parentElement.parentElement.children[1].textContent;
        let reqID='';
        const response=await fetch('https://expense-tracker-5c73a-default-rtdb.firebaseio.com/expenses.json');
        try{if(response.ok){
            const data=await response.json();
            Object.entries(data).forEach(expense=>{
                if(expenseItem===expense[1].description){
                    reqID=expense[0];
                }
            })
        }
        let url=`https://expense-tracker-5c73a-default-rtdb.firebaseio.com/expenses/${reqID}.json`;
        const response1=await fetch(url,{
            method:'DELETE',
        })
        if(response1.ok){
            console.log('Expense successfuly deleted');
        }}catch(err){
            console.log(err)
        }
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
                <Container  key={Math.random()}>
                    <Row className='text-start pt-1 pe-4 ml-0'>
                        <Col xs={1}>{index+1})</Col>
                        <Col xs={2} className='text-start'>{item.description}</Col>
                        <Col xs={3} className='text-start'>({item.category})</Col>
                        <Col xs={2}>₹{item.amount}</Col>
                        <Col xs={2}>
                            <Button variant="primary" onClick={editHandler}>EDIT</Button>{' '}
                        </Col>
                        <Col xs={2}>
                            <Button variant="danger" onClick={deleteHandler}>DELETE</Button>{' '}
                        </Col>
                    </Row>
                </Container>
            ))}          
        </Container>
        <Counter/>
        </>
    )
}
export default AddExpense;