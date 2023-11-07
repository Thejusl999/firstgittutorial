import { render,screen } from "@testing-library/react";
import AddExpense from "./AddExpense";

test('render AddExpense',()=>{
    render(<AddExpense/>);
    const text=screen.getByText('EXPENSES',{exact:false});
    expect(text).toBeInTheDocument();
});