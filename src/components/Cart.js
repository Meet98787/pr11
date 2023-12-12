import React, { useContext, useEffect, useState } from 'react'
import AuthContext from './authContext'
import axios from 'axios'

const Cart = () => {
    const [products, setProducts] = useState([])
    const [user, setUser] = useState()
    const { authenticate, setIsAuthenticate } = useContext(AuthContext)

    useEffect(() => {
        if (authenticate) {
            axios.get(`http://localhost:3100/users?${authenticate.id}`)
                .then(res => {
                    if (res.data[0].cart) {
                        setProducts(res.data[0].cart)
                        setUser(res.data[0])
                    }
                })
        }
    }, [])

    const handleDelete = (id) => {
        const newUser = { ...user }
        newUser.cart.splice(id, 1)
        setUser(newUser)
        axios.put(`http://localhost:3100/users/${authenticate.id}`, user)
            .then(res => { console.log(res) })
    }

    return (
        <div className="container mx-auto py-16 px-4">






            <div class="container py-5">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="card card-registration card-registration-2">
                        <div class="card-body p-5">
                            {
                                products.length < 1 ? <h1 className='text-xl text-center'>No items in cart!</h1> :
                                    <div>
                                        <div class="d-flex justify-content-between align-items-center mb-5">
                                            <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
                                            <h6 class="mb-0 text-muted">{products.length} items</h6>
                                        </div>
                                        <hr class="my-4" />
                                        {
                                            products.map((product, id) => {
                                                return <div class="row mb-4 d-flex justify-content-between align-items-center" key={product.id}>
                                                    <div class="col-md-2 col-lg-2 col-xl-2">
                                                        <img
                                                            src={product.img}
                                                            class="img-fluid rounded-3" alt="Cotton T-shirt" />
                                                    </div>
                                                    <div class="col-md-3 col-lg-3 col-xl-3">
                                                        {/* <h6 class="text-muted">Shirt</h6> */}
                                                        <h6 class="text-black mb-0">{product.name}</h6>
                                                        <span className="fw-light line-clamp-2">{product.color} </span> 
                                <span className="fw-light line-clamp-2"> {product.type}</span>
                                                    </div>
                                                    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">


                                                        <input type="number" Value={product.qty} min={1}
                                                            class="form-control form-control-sm" />

                                                    </div>
                                                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                        <h6 class="mb-0">{product.price}</h6>
                                                    </div>
                                                    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                                        <button href="#" onClick={() => handleDelete(id)} class="text-muted rounded" >Remove</button>
                                                    </div>
                                                </div>
                                            })
                                        }
                                        <hr class="my-4" />

                                    </div>

                            }
                        </div>
                        {
                            products.length > 1 &&
                            <div className="mb-6 text-center mb-5">
                                <button className="p-2 rounded">Proceed to Checkout</button>
                            </div>
                        }
                    </div>
                </div>
            </div>


        </div>




    )
}

export default Cart