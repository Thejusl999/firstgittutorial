import React from 'react';
import {Row,Col} from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const StartingPage=()=>{
    const history=useHistory();
    const profileHandler=(e)=>{
        e.preventDefault();
        history.push('/profile')
    }
    return (
            <Row>
                <Col xs={6} className="text-start mt-2">
                    <h6><i>Welcome to Expense Tracker!!!</i></h6>
                </Col>
                <Col xs={6} className="text-end mt-1">
                    <div>
                        <div style={{backgroundColor:'tan',color:'black',borderRadius:'10px',width:'fit-content',float:'right'}}><h6><i>
                            Your profile is incomplete.
                            <button style={{background:'none',border:'none',color:'blue'}} onClick={profileHandler}><i>Complete now</i></button>
                        </i></h6></div>
                    </div>
                </Col>
                <div style={{border:'none',backgroundColor:'black',height:'1px',marginTop:'3px'}}></div>
            </Row>
    );
}
export default StartingPage;