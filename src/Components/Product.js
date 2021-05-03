import React from 'react'
import './Product.css'
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useStateValue } from './StateProvider';
function Product({ id, title, image, rating, price }) {
    const [{ basket }, dispatch] = useStateValue();

    const addToBasket = () => {
        //dispatch the item into the datalayer
        console.log(basket);
        dispatch({
            "type": "ADD_TO_BASKET",
            "payload": {
                title: title,
                image: image,
                rating: rating,
                price: price,
                id: id
            }
        })
    }

    return (
        <div className="product">
            <div className="product__info">
                <p> {title}
                </p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>

                </p>
                <div className="product__rating">

                    {Array(rating).fill().map((_, i) => (
                        <p key={i}>  ⭐</p>
                    ))}
                </div>
            </div>
            <img alt="Ganesh Little Master Chopper (300 ML), Set of 2 PCS"
                src={image}></img>
            <button onClick={addToBasket}>Add to cart</button>
        </div>
    )
}

export default Product
