// ADVANCE REACT - TASK-9 DELIVERABLE

// PlaceHolder - Adding a filter which doesnt work on the expense tracker
// 1) ExpenseFilter.js code:
import React from 'react';
const ExpenseFilter=(props)=>{
    const dropdownChangeHandler=(event)=>{
        props.onChangeFilter(event.target.value);
    }
    return (
        <div className='expense-filter'>
            <label>Filter by year</label>
            <select value={props.selected} onChange={dropdownChangeHandler}>
                <option value='2022'>2022</option>
                <option value='2021'>2021</option>
                <option value='2020'>2020</option>
                <option value='2019'>2019</option>
            </select>
        </div>
    )
}
export default ExpenseFilter;

// 2) Updated Expenses.js code: (ExpenseFilter component imported)
import React,{useState} from 'react';
import ExpenseFilter from './ExpenseFilter';
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import './Expenses.css';
const Expenses=(props)=>{
    const [filteredYear, setFilteredYear]=useState('2020');
    const filterChangeHandler=selectedYear=>{
        setFilteredYear(selectedYear);
    }
    return (
        <Card className="expenses">
            <ExpenseFilter selected={filteredYear} onChangeFilter={filterChangeHandler}/>
            {props.items.map((num,index)=>(
                <ExpenseItem
                    title={props.items[index].title}
                    amount={props.items[index].amount}
                    date={props.items[index].date}
                    location={props.items[index].location}
                />
            ))}
        </Card>
    );
}
export default Expenses;