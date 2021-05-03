import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider';

function CheckoutProduct({ id, image, title, price, rating, hidebtn }) {
    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        debugger;
        dispatch({ "type": "REMOVE_FROM_BASKET", "payload": id })
    }

    return (
        <div className="checkoutProduct">
            <img src={image} alt="image" className="checkoutProduct_Image" />
            <div className="checkoutP_info">
                <p className="checkoutP_title">{title}</p>
                <p>${price}</p>
                <div className="checkoutP_rating">
                    {Array(rating).fill().map((_, i) =>
                        <p key={i}>  ⭐</p>
                    )}
                </div>
                {!hidebtn && <button onClick={removeFromBasket}>Remove from Basket</button>}

            </div>

        </div>
    )
}

export default CheckoutProduct
