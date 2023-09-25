import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../utils/Context';
import CartItem from '../Cart/CartItem/CartItem';
import './order.scss';
import { db } from "../../Firebase/firebase"; // Import your Firebase db instance
import { collection, getDocs, addDoc } from "firebase/firestore"; // Import Firestore methods

const OrderPage = () => {
  const { cartItems, setShowCart, cartSubTotal } = useContext(Context);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
  });

  const [isOrderButtonDisabled, setIsOrderButtonDisabled] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateForm = () => {
    setIsOrderButtonDisabled(
      !formData.name || !formData.address || !formData.email || !formData.phoneNumber  ||cartItems.length === 0 || cartSubTotal === 0
    );
  };

  // Call validateForm whenever the formData changes
  useEffect(() => {
    validateForm();
  }, [formData]);


  // Function to generate a random 5-digit ID
  const generateRandomID = () => {
    const min = 10000; // Minimum 5-digit number
    const max = 99999; // Maximum 5-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  // ... (other code)
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitOrder = async () => {
    // Check if the form is already submitting
    if (isSubmitting) {
      return;
    }
  
    // Set the submitting flag to true to prevent multiple submissions
    setIsSubmitting(true);
  
    // Check if any of the fields is empty
    if (!formData.name || !formData.address || !formData.email || !formData.phoneNumber || cartItems.length === 0 || cartSubTotal === 0) {
      setIsSubmitting(false); // Reset the submitting flag
      return;
    }
  
    // Generate a random 5-digit ID
    const orderId = generateRandomID();
  
    // Submit the order with the generated ID
    const orderData = {
      id: orderId, // Use the generated ID as the document ID
      name: formData.name,
      address: formData.address,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      products: cartItems.map((item) => ({
        id: item.id,
        title: item.Name,
        price: item.Price,
        quantity: item.quantity,
      })),
      total: cartSubTotal,
    };
  
    try {
      // Use addDoc to add the order with the generated ID as the document ID
      await addDoc(collection(db, "orders"), orderData);
  
      // Alert the order ID
      alert(`Order placed successfully! Your Order ID is: ${orderId}`);
  
      // Clear the form fields and cart items after submission
      setFormData({
        name: '',
        address: '',
        email: '',
        phoneNumber: '',
        cartItems: "", // Not sure if this is needed
      });
      // Clear the cart
      // ...
  
      // Redirect to a success page or handle further actions
      // ...
    } catch (error) {
      console.error("Error submitting the order:", error);
    } finally {
      // Reset the submitting flag
      setIsSubmitting(false);
    }
  };
  

  // Enable/disable the "Order Now" button based on form validation
  
  return (
    <div className="order-page">
      <div className="cart-section">
        {!!cartItems.length && (
          <>
            <h2>Your Cart</h2>
            <CartItem />
            <div className="subtotal">
              <span className="text">Subtotal: </span>
              <span className="text total">&#8360; {cartSubTotal}</span>
            </div>
          </>
        )}
      </div>
      <div className="form-section">
        <h2>Enter Your Details</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
        </form>
        <div className="button">
          <button
            className={`checkout-cta ${isOrderButtonDisabled ? 'disabled' : ''}`}
            disabled={isOrderButtonDisabled}
            onClick={handleSubmitOrder}
           
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
