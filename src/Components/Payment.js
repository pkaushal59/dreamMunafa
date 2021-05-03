import React, { useState, useEffect } from 'react'
import { useStateValue } from './StateProvider'
import { Link } from 'react-router-dom'
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBasketTotal } from './reducer';
import instance from './axios'
import { db } from '../firebase';
import { useHistory } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [succeded, setSucceded] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        debugger
        const getClientSecret = async () => {
            const response = await instance({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [basket])

    const handleChange = e => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        debugger;
        setError(e.error ? e.error.message : null);
        setDisabled(e.empty);
    }
    const submitPayment = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {

            setSucceded(true);
            setProcessing(false);
            setError(null);
            console.log("payload==>", paymentIntent)
            db.
                collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })
            dispatch({ type: 'EMPTY_BASKET' })

            history.replace('/orders')
        })




    }

    console.log("clientsecret==>", clientSecret)
    return (
        <div className="payment">

            <div className="payment__container">
                <h1> Checkout (<Link to="/checkout">{basket?.length} items</Link>)</h1>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment_items">
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

                <div className="payment_section">
                    <div className="payment_title">
                        <h3> Payment Method</h3>
                    </div>
                    <div className="payment_checkout">
                        <form onSubmit={submitPayment}>
                            <CardElement onChange={handleChange} />
                            <div className="payment_total">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <p>
                                                <strong>Total: {value}
                                                </strong>
                                            </p>

                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={disabled || processing || error}>
                                    <span>
                                        {processing ? "processing" : "Buy Now"}
                                    </span>
                                </button>
                            </div>


                            {error & <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Payment
