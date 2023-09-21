import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import { Container,Row,Col,Button} from 'react-bootstrap';
import Footer from '../Layout/Footer';
import classes from './ProductsList.module.css';
import CartContext from '../../store/cart-context';
const ProductsList=(props)=>{
    const cartCtx=useContext(CartContext);
    const addCartHandler=(e)=>{
        let item=[{
            title: e.target.parentElement.parentElement.firstChild.textContent,
            price: Number(e.target.parentElement.firstChild.textContent.substring(1)),
            imageUrl: e.target.parentElement.parentElement.children[1].firstChild.src,
            quantity: 1,
        }]
        cartCtx.addItem(item);
    }
    return(
        <>
            <div className={classes.imageContainer}>
                <h2 className={classes.divTitle}>MUSIC</h2>
                <Container>
                    <Row>
                        {props.products.map((image)=>(
                            <Col lg={6} md={12} key={image.id}>
                                <h2 className={classes.imgTitle}>{image.title}</h2>
                                <Container className={classes.imageTransition}>
                                    <Link to={`/products/${image.title}`}>
                                        <img src={image.imageUrl} alt={image.title}/>
                                    </Link>
                                </Container>
                                <div className={classes.priceAndButton}>
                                    <h5>${image.price}</h5>
                                    <button className={classes.addbtn} onClick={addCartHandler}>ADD TO CART</button>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <Button className={classes.viewcartbtn} variant="secondary" onClick={props.onShowCart}>See the cart</Button>{' '}
            </div>
            <Footer/>
        </>
    )    
}
export default ProductsList;