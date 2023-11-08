import React from 'react';
import { Row, Col} from "react-bootstrap";
import { useSelector } from 'react-redux';
 
const HomePage = () => {
  return (
    <div> 
      <Row>
        <Col xs={6} className="text-start mt-2">
          <h6>
            <i>Welcome to your Mail Box!!!</i>
          </h6>
        </Col>
      </Row>
      <div
        style={{
          border: "none",
          backgroundColor: "black",
          height: "1px",
          marginTop: "3px",
        }}
      ></div>
    </div>
  );
};
export default HomePage;
