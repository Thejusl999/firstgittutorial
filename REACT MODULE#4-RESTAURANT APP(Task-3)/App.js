import React ,{Fragment} from 'react';
import AvailableMeals from './components/Meals/AvailableMeals';
import RestaurantSummary from './components/Layout/RestaurantSummary';
import Header from './components/Layout/Header'; 
function App() {
  const dummyMeals=[
    {name:'Sushi',category:'Finest fish and veggies',price:'22.99'},
    {name:'Schnitzel',category:'A german speciality!',price:'16.50'},
    {name:'Barbecue Burger',category:'American ,raw, meaty',price:'12.99'},
    {name:'Green Bowl',category:'Healthy...and green...',price:'13.99'}
  ];
  return (
    <Fragment>
      <Header/>
      <RestaurantSummary/>
      <AvailableMeals meals={dummyMeals}/>
    </Fragment>
  );
}
export default App;