import React from 'react';
import { Container,Row,Col,Button } from 'react-bootstrap';
import classes from './ProductsList.module.css';
const ProductsList=(props)=>{
    return(
        <>
            <div className={classes.imageContainer}>
                <h2 className={classes.divTitle}>MUSIC</h2>
                <Container>
                    <Row>
                        {props.products.map((image)=>(
                            <Col lg={6} md={12} key={image.id}>
                                <h2 className={classes.imgTitle}>{image.title}</h2>
                                <Container className={classes.imageTransition}><img src={image.imageUrl} alt={image.title}/></Container>
                                <div className={classes.priceAndButton}>
                                    <h5>${image.price}</h5>
                                    <button className={classes.addbtn}>ADD TO CART</button>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <Button className={classes.viewcartbtn} variant="secondary">See the cart</Button>{' '}
            </div>
            <Container className={classes.footer}>
                    <Col>The Generics</Col>
            </Container>
        </>
    )    
}
export default ProductsList;