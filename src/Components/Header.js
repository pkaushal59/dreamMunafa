
import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import './Header.css'
import { Link } from 'react-router-dom'
import { useStateValue } from './StateProvider';
import { auth } from '../firebase';

function Header() {

    const [{ basket, user }, dispatch] = useStateValue();
    const signOut = () => {
        debugger
        if (user) {
            auth.signOut();
        }
    }

    return (

        <div className="header">
            <Link to="/" >
                <img src="/images/logo.png" className="header_logo" alt="dreammunafa-logo"></img>

            </Link>
            <div className="header_search">

            </div>
            <div className="header_right" >
                <Link to={!user && '/login'} className="header_link">
                    <div className="header_details" onClick={signOut}>
                        <span className="header_optionTwo">Hello {!user ? 'Guest' : user.email}</span>
                        <span className="header_optionOne">{user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>
                <Link to="/orders" className="header_link">
                    <div className="header_details">
                        <span className="header_optionTwo">Returns</span>
                        <span className="header_optionOne">& Orders</span>
                    </div>
                </Link>
                {/* <Link to="/" className="header_link">
                    <div className="header_details">
                        <span className="header_optionTwo">Your</span>
                        <span className="header_optionOne">Prime</span>
                    </div>
                </Link> */}
                <Link to="/checkout" className="header_link">
                    <div className="header_details">
                        <ShoppingBasketIcon className="basket_icon" />
                        <span className="header_optionTwo">{basket.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
