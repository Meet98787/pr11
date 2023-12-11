import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from './authContext';

const Product = () => {
  const [products, setProducts] = useState([]);
  const { authenticate } = useContext(AuthContext);

  useEffect(() => {
    axios.get('http://localhost:5500/products').then((res) => setProducts(res.data));
  }, []);

  const updateCart = async (user, product) => {
    let cart = [{ ...product, qty: 1 }];

    if (user.cart) {
      const existingProduct = user.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.qty += 1;
        cart = user.cart;
      } else {
        cart = [...user.cart, { ...product, qty: 1 }];
      }
    }

    const updatedUser = { ...user, cart };
    const resCart = await axios.put(`http://localhost:5500/users/${authenticate.id}`, updatedUser);
    console.log(resCart.data);
  };

  const addCart = async (product) => {
    try {
      const res = await axios.get(`http://localhost:5500/users/${authenticate.id}`);
      const user = res.data;
      await updateCart(user, product);
    } catch (error) {
      console.log('Error updating cart:', error);
    }
  };

    return (
        <div className="container">
            <h2 className="text-center">Product List</h2>
            <div className="row">
                {
                    products.map(product => {
                        return <div className="col-4 rounded border " key={product.id}>
                            <div className=' mb-2 '>
                                <img className="p-2" src={product.img} width="100%" height="400px" />
                                <h3 className="">{product.name}</h3>
                                <span className="fw-light line-clamp-2">{product.color} </span> 
                                <span className="fw-light line-clamp-2"> {product.type}</span>
                                <h3 className="mt-2">{product.brand}</h3>

                                <span className="">{product.price}</span><br />
                                <button onClick={() => addCart(product)} className="border py-2 px-4 rounded mt-2">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>

    )
}

export default Product