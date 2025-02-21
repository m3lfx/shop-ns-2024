import React, { useState, useEffect } from 'react'

import '../../App.css'
import Search from './Search'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../../actions/userActions'

// import { getUser, logout } from '../../utils/helpers'
const Header = () => {
    const dispatch = useDispatch();
	const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)
    // const [user, setUser] = useState({})
    const navigate = useNavigate()

    // const logoutUser = async () => {

    //     try {
    //         await axios.get(`http://localhost:4001/api/v1/logout`)
    //         setUser('')
    //         logout(() => navigate('/'))
    //     } catch (error) {
    //         toast.error(error.response.data.message)

    //     }
    // }

    const logoutHandler = () => {
        // logout(navigate('/'));
        dispatch(logout())
        toast.success('log out', {
            position: 'bottom-right'
        });
    }

    // useEffect(() => {
    //     setUser(getUser())
    // }, []);
    return (
        <>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img src="./images/shopit_logo.png" />
                        </Link>

                    </div>
                </div>
                <Search />

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    {/* <button className="btn" id="login_btn">Login</button> */}
                    {user ? (<div className="ml-4 dropdown d-inline">
                        <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <figure className="avatar avatar-nav">
                                <img
                                    src={user.avatar && user.avatar.url}
                                    alt={user && user.name}
                                    className="rounded-circle"
                                />
                            </figure>
                            <span>{user && user.name}</span>
                        </Link>

                        <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                            {user && user.role === 'admin' && (
                                <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                            )}
                            <Link className="dropdown-item" to="/orders/me">Orders</Link>
                            <Link className="dropdown-item" to="/me">Profile</Link>

                            <Link
                                className="dropdown-item text-danger" to="/" onClick={logoutHandler}
                            >
                                Logout
                            </Link>
                        </div>
                    </div>) : <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}

                    <Link to="/cart" style={{ textDecoration: 'none' }} >
                        <span id="cart" className="ml-3">Cart</span>

                        {/*<span className="ml-1" id="cart_count">2</span>*/}
                    </Link>
                     <span className="ml-1" id="cart_count">{cartItems ? cartItems.length : null}</span> 
                </div>
            </nav>
        </>
    )
}

export default Header