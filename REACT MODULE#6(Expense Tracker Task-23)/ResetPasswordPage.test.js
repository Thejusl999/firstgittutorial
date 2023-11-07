import { render,screen } from "@testing-library/react";
import ResetPasswordPage from "./ResetPasswordPage";

describe('ResetPasswordPage test suite',()=>{
    test('check Reset Password',()=>{
        render(<ResetPasswordPage/>);
        const text=screen.getByText('Reset Password',{exact:false});
        expect(text).toBeInTheDocument();
    });
    test('check email label',()=>{
        render(<ResetPasswordPage/>);
        const text=screen.getByLabelText('Email',{exact:false});
        expect(text).toBeInTheDocument();
    });
})