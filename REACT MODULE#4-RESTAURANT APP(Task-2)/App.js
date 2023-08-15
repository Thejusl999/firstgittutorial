import React ,{Fragment} from 'react';
import RestaurantSummary from './components/Layout/RestaurantSummary';
import Header from './components/Layout/Header'; 
function App() {
  return (
    <Fragment>
      <Header/>
      <RestaurantSummary/>
    </Fragment>
  );
}
export default App;