import "./CartItem.scss";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../utils/Context";
import { MdClose } from "react-icons/md";
import {
  collection,
  getDoc,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore"; // Import Firestore methods
import { db } from "../../../Firebase/firebase"; // Import the Firebase db instance

const CartItem = () => {
  const { cartItems, handleRemoveFromCart, handleCartProductQuantity } =
    useContext(Context);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    // Function to fetch cart products from Firebase Firestore
    const fetchCartProducts = async () => {
      try {
        const productsCollectionRef = collection(db, "products");
        const cartProductData = [];

        for (const cartItem of cartItems) {
          const q = query(
            productsCollectionRef,
            where("Name", "==", cartItem.id)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const productDoc = querySnapshot.docs[0];
            const productData = productDoc.data();
            cartProductData.push({
              id: productDoc.id,
              ...productData,
              quantity: cartItem.quantity, // Add quantity from cart item
            });
          }
        }

        setCartProducts(cartProductData);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };

    fetchCartProducts();
  }, [cartItems]);

  return (
    <div className="cart-products" style={{}}>
      <div className="cart-product">
        {cartProducts?.map((item) => (
          <div
            className="search-result-item"
            key={item.id}
            onClick={() => {}}
          >
            <div className="image-container">
              <img
                src={
               item.Image
                }
                alt=""
              />
            </div>
            <div className="prod-details">
              <span className="name">{item.Name}</span>
              <MdClose
                className="close-btn"
                onClick={() => handleRemoveFromCart(item)}
              />
              <div className="quantity-buttons">
                <span onClick={() => handleCartProductQuantity("dec", item)}>
                  -
                </span>
                <span>{item.quantity}</span>
                <span onClick={() => handleCartProductQuantity("inc", item)}>
                  +
                </span>
              </div>
              <div className="text">
                <span>{item.quantity}</span>
                <span>x</span>
                <span>{item.Price}</span>
                <span>=</span>
                <span className="highlight">
                  <span>&#8360; </span>
                  {item.Price * item.quantity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItem;




{/*import "./CartItem.scss";
import React, { useContext } from "react";
import { Context } from "../../../utils/Context";
import { MdClose } from "react-icons/md";


const CartItem = () => {
    const { cartItems, handleRemoveFromCart, handleCartProductQuantity } =
        useContext(Context);

    return (
        <div className="cart-products" style={{}}>
            <div className="cart-product">

           
            {cartItems?.map((item) => (
                <div
                    className="search-result-item"
                    key={item.id}
                    onClick={() => {}}
                >
                    <div className="image-container">
                        <img
                            src={
                                process.env.REACT_APP_DEV_URL  +
                                item.attributes.Image.data[0].attributes.url
                            }
                        />
                    </div>
                    <div className="prod-details">
                        <span className="name">{item.attributes.Title}</span>
                        <MdClose
                            className="close-btn"
                            onClick={() => handleRemoveFromCart(item)}
                        />
                        <div className="quantity-buttons">
                            <span
                                onClick={() =>
                                    handleCartProductQuantity("dec", item)
                                }
                            >
                                -
                            </span>
                            <span>{item.attributes.quantity}</span>
                            <span
                                onClick={() =>
                                    handleCartProductQuantity("inc", item)
                                }
                            >
                                +
                            </span>
                        </div>
                        <div className="text">
                            <span>{item.attributes.quantity}</span>
                            <span>x</span>
                            <span>{item.attributes.Price}</span>
                            <span>=</span>
                            <span className="highlight">
                                <span>&#8360; </span>
                                 {item.attributes.Price *
                                    item.attributes.quantity}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
             </div>
        </div>
    );
};
export default CartItem;*/}