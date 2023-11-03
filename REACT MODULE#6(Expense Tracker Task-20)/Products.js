import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        <ProductItem
          title='First Book'
          price={6}
          description='This is a first product - amazing!'
        />
        <ProductItem
          title='Second Book'
          price={10}
          description='This is a second product - wonderful!'
        />
      </ul>
    </section>
  );
};

export default Products;
