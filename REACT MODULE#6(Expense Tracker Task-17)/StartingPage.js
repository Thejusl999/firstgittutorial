// import React, { useContext } from "react";
import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Row, Col,Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import AuthContext from "../store/auth-context";
import AddExpense from "../components/Layout/AddExpense";
import { useDispatch } from "react-redux";
import { authActions } from "../redux-store/auth";
 
const StartingPage = () => {
  const dispatch=useDispatch();
  const loginToken=useSelector(state=>state.auth.token);
  const themeStatus=useSelector(state=>state.theme.lightTheme);
  // const authCtx = useContext(AuthContext);
  const history = useHistory();
  const profileHandler = (e) => {
    e.preventDefault();
    history.push("/profile");
  };
  async function verifyHandler() {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBwiX430xFHd5MB3oS6n1PL12D4U7NBMnk",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          // idToken: authCtx.token,
          idToken: loginToken
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("Link to verify your Email-ID has been sent successfully!");
    } else {
      const data = await response.json();
      let errorMsg = "Authentication failed";
      if (data && data.error && data.error.message) {
        errorMsg = data.error.message;
      }
      alert(errorMsg);
    }
  }
  const logoutHandler=()=>{
    // authCtx.logout();
    dispatch(authActions.logout());
    localStorage.clear();
    history.push('/');
  }
  const divStyling={
    backgroundColor:themeStatus?'black':'white'
  }
  const textStyling={
    color:themeStatus?'white':'black'
  }
  return (
    <div style={divStyling}>
      <Row>
        <Col xs={6} className="text-start mt-2">
          <h6 style={textStyling}>
            <i>Welcome to Expense Tracker!!!</i>
          </h6>
        </Col>
        <Col xs={6} className="text-end mt-1">
          <div>
            <div
              style={{
                backgroundColor: "tan",
                color: "black",
                borderRadius: "10px",
                width: "fit-content",
                float: "right",
              }}
            >
              <h6>
                <i>
                  Your profile is incomplete.
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      color: "blue",
                    }}
                    onClick={profileHandler}
                  >
                    <i>Complete now</i>
                  </button>
                </i>
              </h6>
            </div>
          </div>
        </Col>
        {!themeStatus&&<div
          style={{
            border: "none",
            backgroundColor: "black",
            height: "1px",
            marginTop: "3px",
          }}
        ></div>}
        {themeStatus&&<div
          style={{
            border: "none",
            backgroundColor: "white",
            height: "1px",
            marginTop: "3px",
          }}
        ></div>}
      </Row>
      <div style={{display: "flex",justifyContent:'space-between',marginTop: "0.25rem" }}>
        <Button
          variant="success"
          onClick={verifyHandler}
        >
          Verify Email-ID
        </Button>{" "}
        <Button
          variant="danger"
          onClick={logoutHandler}
        >
          Logout
        </Button>{" "}
      </div>
      <AddExpense/>
    </div>
  );
};
export default StartingPage;
