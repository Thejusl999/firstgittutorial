import { render,screen } from "@testing-library/react";
import AuthPage from "./AuthPage";

describe('AuthPage test suite',()=>{
    test('check header text',()=>{
        render(<AuthPage/>);
        const text=screen.getByText('User Authentication',{exact:true});
        expect(text).toBeInTheDocument();
    });
    test('check email label',()=>{
        render(<AuthPage/>);
        const text=screen.getByLabelText('Email',{exact:true});
        expect(text).toBeInTheDocument();
    });
    test('check password label',()=>{
        render(<AuthPage/>);
        const text=screen.getByLabelText('Password',{exact:true});
        expect(text).toBeInTheDocument();
    });
    test('check confirm password label',()=>{
        render(<AuthPage/>);
        const text=screen.getByLabelText('Confirm Password',{exact:true});
        expect(text).toBeInTheDocument();
    });
})