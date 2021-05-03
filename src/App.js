
import './App.css';
import Header from './Components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Payment from './Components/Payment';
import Home from './Components/Home';
import Checkout from './Components/Checkout';
import { useStateValue } from './Components/StateProvider';
import Login from './Components/Login';
import { auth } from './firebase';
import { useEffect } from 'react'
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import Orders from './Components/Orders';


function App() {
  const [{ }, dispatch] = useStateValue();
  const promise = loadStripe('pk_test_51Ikuh4SCnrsQyNklGAUPDxoeHf94dpsFlit5dwgVfffHFksmOR4JrHV5yvA1KOXvOrSLYRmt75ly3BMGEf6VcDGy00jqUytlrj');
  useEffect(() => {

    auth.onAuthStateChanged(authUser => {
      console.log("this is authuser =>>", authUser);

      if (authUser) {
        dispatch({
          type: "SET_USER",
          payload: authUser
        })
      }
      else {
        dispatch({
          type: "SET_USER",
          payload: null
        })
      }
    }
    )

  }, [])


  return (
    <Router>

      <div className="App">

        <Switch >
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>

          </Route>


          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>

        </Switch>
      </div>

    </Router >
  );
}

export default App;
