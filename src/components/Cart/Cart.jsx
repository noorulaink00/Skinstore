import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import { Context } from "../../utils/Context";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods
import { db } from '../../Firebase/firebase'; // Import the Firebase db instance
import "./Cart.scss"
const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, setShowCart, cartSubTotal } = useContext(Context);

  const handleCheckout = async () => {
    try {
      // Create a new order document in Firebase Firestore
     // const ordersCollectionRef = collection(db, 'orders');
      //const newOrderRef = await addDoc(ordersCollectionRef, {
       // products: cartItems,
      //  subtotal: cartSubTotal,
        // Add more order-related data here
      //});

      // Clear the cart and navigate to the "orders" page
      setShowCart(false);
      navigate(`/orders`);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="cart-panel">
      <div className="opac-layer" onClick={() => setShowCart(false)}></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose className="close-btn" />
            <span className="text">close</span>
          </span>
        </div>

        {!cartItems.length && (
          <div className="empty-cart">
            <BsCartX />
            <span>No products in the cart.</span>
            <button className="return-cta" onClick={() => { navigate(`/products`); setShowCart(false)}}>
              RETURN TO SHOP
            </button>
          </div>
        )}

        {!!cartItems.length && (
          <>
            <CartItem />
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal:</span>
                <span className="text total">&#8360; {cartSubTotal}</span>
              </div>
              <div className="button">
                <button className="checkout-cta" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;



{/*import "./Cart.scss";

import { useContext } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import { Context } from "../../utils/Context";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "../../utils/api";
import { useNavigate } from "react-router-dom";
const Cart = () => {
const navigate = useNavigate();
    const { cartItems, setShowCart, cartSubTotal } = useContext(Context);

  const stripePromise = loadStripe(
      process.env.STRIPE_KEY
  );


  const handlePayment = async () => {
    console.log("Stripe API Key:", process.env.STRIPE_KEY);

      try {
          const stripe = await stripePromise;
          const res = await makePaymentRequest.post("/api/orders", {
              products: cartItems,
          });
          await stripe.redirectToCheckout({
              sessionId: res.data.stripeSession.id,
          });
      } catch (err) {
          console.log("error", err);
      }
  };

  const handleCheckout = () => {
    // First, navigate to "/order" route
    navigate('/orders');
    setShowCart(false);
};


  return (
    <div className="cart-panel">
    <div
        className="opac-layer"
        onClick={() => setShowCart(false)}
    ></div>
    <div className="cart-content">
        <div className="cart-header">
            <span className="heading">Shopping Cart</span>
            <span
                className="close-btn"
                onClick={() => setShowCart(false)}
            >
                <MdClose className="close-btn" />
                <span className="text">close</span>
            </span>
        </div>

        {!cartItems.length && (
            <div className="empty-cart">
                <BsCartX />
                <span>No products in the cart.</span>
                <button className="return-cta" onClick={() => {}}>
                    RETURN TO SHOP
                </button>
            </div>
        )}

        {!!cartItems.length && (
            <>
                <CartItem />
                <div className="cart-footer">
                    <div className="subtotal">
                        <span className="text">Subtotal:</span>
                        <span className="text total">
                        &#8360; {cartSubTotal}
                        </span>
                    </div>
                    <div className="button">
                        <button
                            className="checkout-cta"
                            //onClick={handlePayment}
                            onClick={handleCheckout}
                        >
                          Proceed to Checkout
                        </button>
                    </div>
                </div>
            </>
        )}
  

         {/* <div className="empty-cart">
          <BsCartX />
          <span>No Products in the Cart</span>
          <button className="return-cta"> Return to Shop</button>
  </div>/// 
    </div>
</div>

      
  
  );
};

export default Cart;*/}
