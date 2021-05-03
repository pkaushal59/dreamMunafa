import React from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import SubTotal from "./SubTotal";

function Checkout() {
  debugger;
  const [{ basket, user }, dispatch] = useStateValue();
  const id = basket[0].id;
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          src="/images/drop-3698073_1280.jpg"
          alt="Banner"
          className="checkoutimage"
        />
        <div className="checkout_products">

          <h2 className="checkout__title">Hello {user?.email} Your Shopping Basket</h2>
          {basket?.map((item) => {
            return <CheckoutProduct key={item.id}
              image={item.image}
              price={item.price}
              title={item.title}
              rating={item.rating}
              id={item.id} />
          })}

        </div>
      </div>
      <div className="checkout_right">
        <SubTotal />
      </div>
    </div>
  );
}

export default Checkout;
