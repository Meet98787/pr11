// src/api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('Signup failed:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/logout`);
    return response.data;
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

export const addToCart = async (cartItem) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/cart`, cartItem);
    return response.data;
  } catch (error) {
    console.error('Add to cart failed:', error);
    throw error;
  }
};

export const removeFromCart = async (cartItemId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/cart/${cartItemId}`);
    return response.data;
  } catch (error) {
    console.error('Remove from cart failed:', error);
    throw error;
  }
};

export const updateCartItem = async (cartItemId, updatedCartItem) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/cart/${cartItemId}`, updatedCartItem);
    return response.data;
  } catch (error) {
    console.error('Update cart item failed:', error);
    throw error;
  }
};
