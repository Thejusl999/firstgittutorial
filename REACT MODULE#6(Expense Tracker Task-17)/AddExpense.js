import React, { useEffect, useRef, useState } from 'react';
import classes from './AddExpense.module.css';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { expensesActions } from '../../redux-store/expenses';
import { themeActions } from '../../redux-store/theme';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import CounterModule from './CounterModule';

const AddExpense = () => {
    const dispatch = useDispatch();
    const themeStatus=useSelector(state=>state.theme.lightTheme);
    const premiumStatus=useSelector(state=>state.theme.premium);
    const [premium,setPremium]=useState(false);
    const expenseRef = useRef();
    const descriptionRef = useRef();
    const [expenses, setExpenses] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [patchID, setPatchID] = useState('');
    const selectHandler = (e) => {
        setSelectedOption(e.target.value);
    }
    useEffect(() => {
        if (expenses.length === 0) {
            fetch('https://expense-tracker-5c73a-default-rtdb.firebaseio.com/expenses.json')
                .then(response => response.json())
                .then(data => {
                    Object.entries(data).forEach(expense => {
                        setExpenses(prevExpenses => [...prevExpenses, expense[1]])
                        dispatch(expensesActions.setExpenses(expense[1]))
                    })

                })
                .catch(err => console.log(err))
        }
    }, [])
    async function submitHandler(e) {
        e.preventDefault();
        const expenseItem = {
            amount: expenseRef.current.value,
            description: descriptionRef.current.value.toLowerCase(),
            category: selectedOption
        }
        if (patchID === '') {
            try {
                const response = await fetch('https://expense-tracker-5c73a-default-rtdb.firebaseio.com/expenses.json', {
                    method: 'POST',
                    body: JSON.stringify(expenseItem),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                }
            } catch (err) {
                console.log(err)
            }
            setExpenses(prevExpenses => [...prevExpenses, expenseItem]);
            dispatch(expensesActions.setExpenses(expenseItem));
        } else {
            try {
                let url = `https://expense-tracker-5c73a-default-rtdb.firebaseio.com/expenses/${patchID}.json`;
                const response = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(expenseItem),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response.ok) {
                    alert('Expense will been updated!');
                    window.location.reload();
                }
            } catch (err) {
                console.log(err)
            }
        }
        expenseRef.current.value = '';
        descriptionRef.current.value = '';
        setSelectedOption('');
    }
    async function editHandler(e) {
        e.preventDefault();
        let expenseItem = e.target.parentElement.parentElement.children[0].textContent;
        const response = await fetch('https://expense-tracker-5c73a-default-rtdb.firebaseio.com/expenses.json');
        try {
            if (response.ok) {
                const data = await response.json();
                Object.entries(data).forEach(expense => {
                    if (expenseItem === expense[1].description) {
                        setPatchID(expense[0]);
                        expenseRef.current.value = expense[1].amount;
                        descriptionRef.current.value = expense[1].description;
                        setSelectedOption(expense[1].category);
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
        alert('Edit your response and add again!');
    }
    async function deleteHandler(e) {
        e.preventDefault();
        e.target.parentElement.parentElement.remove();
        let expenseItem = e.target.parentElement.parentElement.children[0].textContent;
        let reqID = '';
        const response = await fetch('https://expense-tracker-5c73a-default-rtdb.firebaseio.com/expenses.json');
        try {
            if (response.ok) {
                const data = await response.json();
                Object.entries(data).forEach(expense => {
                    if (expenseItem === expense[1].description) {
                        reqID = expense[0];
                    }
                })
            }
            let url = `https://expense-tracker-5c73a-default-rtdb.firebaseio.com/expenses/${reqID}.json`;
            const response1 = await fetch(url, {
                method: 'DELETE',
            })
            if (response1.ok) {
                window.location.reload();
                alert('Expense successfuly deleted');
            }
        } catch (err) {
            console.log(err)
        }
    }
    let totalObj = {
        FOOD: 0,
        FUEL: 0,
        GROCERIES: 0,
        TRAVEL: 0,
        grandTotal: 0
    };
    let categories = ['FOOD', 'FUEL', 'GROCERIES', 'TRAVEL'];
    expenses.map(expense => {
        if (expense.category === 'FOOD')
            totalObj.FOOD += Number(expense.amount);
        if (expense.category === 'FUEL')
            totalObj.FUEL += Number(expense.amount);
        if (expense.category === 'GROCERIES')
            totalObj.GROCERIES += Number(expense.amount);
        if (expense.category === 'TRAVEL')
            totalObj.TRAVEL += Number(expense.amount);
        totalObj.grandTotal += Number(expense.amount);
    })
    let imageUrl='/blank.png';
    const premiumHandler = () => {
        setPremium(true);
        dispatch(themeActions.activateLightMode());
    }    
    const modeActivator=(e)=>{
        e.preventDefault();
        if(e.target.src.substring(22,23)==='d'){
            dispatch(themeActions.activateDarkMode());
        }else{
            dispatch(themeActions.activateLightMode());
        }
    }
    const convertToCsv=(expenses)=>{
        if(expenses.length>0){
            const headers = Object.keys(expenses[0]);
            const csv = [headers.join(',')];
            expenses.forEach(item => {
                const row = headers.map(header => item[header]);
                csv.push(row.join(','));
            });
            return csv.join('\n');
        }
    }
    const csvData=convertToCsv(expenses);
    const blob=new Blob([csvData])
    const downloadUrl=URL.createObjectURL(blob);
    return (
        <div style={{display:'flex',flexDirection:'column',height:'100%'}}>
            {totalObj.grandTotal>=10000&&<div style={{textAlign:'center'}}><Button style={{marginTop:'-65px'}} variant="primary" onClick={premiumHandler}>{!premiumStatus?'ACTIVATE PREMIUM':'PREMIUM ACTIVATED'}</Button></div>}
                <div style={{textAlign:'center',marginTop:'-109px',pointerEvents:'none'}}>
                    <button style={{border: 'none',backgroundColor:'inherit',pointerEvents:'all'}}>
                        {(themeStatus&&premiumStatus)&&<img style={{ width: '60px',height: '40px' }} onClick={modeActivator} src='/darkTheme.png'/>}
                        {(!themeStatus&&premiumStatus)&&<img style={{ width: '60px',height: '40px' }} onClick={modeActivator} src='/lightTheme.png'/>}
                        {(themeStatus===null&&!premium)&&<img style={{ width: '60px', height: '40px' }} src={imageUrl}/>}
                    </button>
                </div>
                <Container style={{pointerEvents:'none'}}>
                    <form className={classes.form} onSubmit={submitHandler}>
                        <Row>
                            <Col xs={4}>
                                <label htmlFor='expense'>Expense Amount</label>
                                <input id='expense' type='number' ref={expenseRef} required />
                            </Col>
                            <Col xs={4}>
                                <Row>
                                    <label htmlFor='description'>Description</label>
                                    <input id='description' type='text' ref={descriptionRef} required />
                                </Row>
                                <Row style={{ display: 'inline-flex', width: '10rem', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
                                    <Button type='submit' variant='dark'>ADD EXPENSE</Button>
                                </Row>
                            </Col>
                            <Col xs={4}>
                                <label htmlFor='category'>Category</label><br></br>
                                <select id='category' value={selectedOption} onChange={selectHandler}>
                                    <option value="">Select</option>
                                    <option value="FOOD">FOOD</option>
                                    <option value="FUEL">FUEL</option>
                                    <option value="GROCERIES">GROCERIES</option>
                                    <option value="TRAVEL">TRAVEL</option>
                                </select>
                            </Col>
                        </Row>
                    </form>
                </Container>
                <Container key={Math.random()} className={classes.form1}>
                    <div><h3>EXPENSES</h3><a href={downloadUrl} download="expenses.csv"><img style={{ width: '30px',height: '30px',float:'right',marginTop:'-2.5rem' }} src='./download icon.png' alt='download icon'/></a></div>
                    {categories.map(category => (
                        <>{totalObj[category] > 0 &&
                            <div key={Math.random()}>
                                <header style={{ display: 'inline-block', float: 'left' }}>=> {category}</header>
                                <h6 style={{ textAlign: 'right' }}>TOTAL=₹{totalObj[category]}</h6>
                                {expenses.map(item => (
                                    <Container key={Math.random()}>
                                        {item.category === (category) &&
                                            <Row className='text-start pt-1 pe-4 ml-0'>
                                                <Col xs={5} className='text-start'>{item.description}</Col>
                                                <Col xs={3}>₹{item.amount}</Col>
                                                <Col xs={2}>
                                                    <Button variant="primary" onClick={editHandler}>EDIT</Button>{' '}
                                                </Col>
                                                <Col xs={2}>
                                                    <Button variant="danger" onClick={deleteHandler}>DELETE</Button>{' '}
                                                </Col>
                                            </Row>
                                        }
                                    </Container>
                                ))}
                                <hr></hr></div>}
                        </>
                    ))}
                    <h4>TOTAL EXPENSES = ₹{totalObj.grandTotal}</h4>
                </Container>
                {/* <Container className={classes.form}><CounterModule/></Container> */}
            </div>
    )
}
            export default AddExpense;