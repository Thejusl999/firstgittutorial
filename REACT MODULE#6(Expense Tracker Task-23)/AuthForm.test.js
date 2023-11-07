import { render,screen } from "@testing-library/react";
import AuthForm from "./AuthForm";

test('render AuthForm',()=>{
    render(<AuthForm/>);
    const text=screen.getByLabelText('Email',{exact:false});
    expect(text).toBeInTheDocument();
});