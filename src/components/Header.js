import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './authContext'

const Header = () => {
    const { authenticate, setIsAuthenticate } = useContext(AuthContext)
    // const [user, setUser] = useState()
    // const [products, setProducts] = useState([])
    // useEffect(() => {
    //     if (authenticate) {
    //         axios.get(`http://localhost:5500/users?${authenticate.id}`)
    //             .then(res => {
    //                 if (res.data[0].cart) {
    //                     setProducts(res.data[0].cart)
    //                     setUser(res.data[0])
    //                 }
    //             })
    //     }
    // }, [])
    const handleLogout = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:5500/current-user`, {})
            .then(res => setIsAuthenticate(null))
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Navbar</Link>
                
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link to="/" className='nav-link'>Home</Link>
                        </li>
                        <li class="nav-item">
                        <Link to="/product" className="nav-link">Products</Link></li>
                        {!authenticate ? <> <li class="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                        <li class="nav-item"><Link to="/signup" className="nav-link">SignUp</Link></li> </> :
                        <li class="nav-item"><a href='#' className="nav-link" onClick={handleLogout} to="/logout">Logout</a></li>}
                        
                        <li class="nav-item">
                        <Link to="/cart" className="nav-link">Cart</Link>
                        </li>

                    </ul>
                </div>
                </div>


            </nav>
        </header>
    )
}

export default Header