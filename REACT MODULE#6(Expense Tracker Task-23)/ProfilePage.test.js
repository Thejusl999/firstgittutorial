import { render,screen } from "@testing-library/react";
import ProfilePage from './ProfilePage';

describe('Profile page test suite',()=>{
    test('check header text',()=>{
        render(<ProfilePage/>);
        const text=screen.getByText('Winners never quit',{exact:false});
        expect(text).toBeInTheDocument();
    });
    test('check complete profile block',()=>{
        render(<ProfilePage/>);
        const text=screen.getByText('A complete profile',{exact:false});
        expect(text).toBeInTheDocument();
    });
})
