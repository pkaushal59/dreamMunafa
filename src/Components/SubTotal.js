import React from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import { useStateValue } from "./StateProvider";
import "./SubTotal.css";
import { useHistory } from 'react-router-dom'

function SubTotal() {
  const [{ basket }, dispatch] = useStateValue();
  const history = useHistory();
  return (

    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} items):<strong>{value}
              </strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" /> This order contains gift!
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button onClick={e => history.push('/payment')}>Proceed to checkout</button>
    </div>
  );
}

export default SubTotal;
