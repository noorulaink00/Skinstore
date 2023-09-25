
import React, { useEffect, useState } from "react";
import "./Products.scss";
import Product from "./Product/Product";
import { db } from '../../Firebase/firebase'; // Import the Firebase db instance
import { collection, getDocs, query, where } from 'firebase/firestore'; // Import Firestore methods

const Products = ({ referrer, headingText, innerPage, products }) => {
 
  if (!Array.isArray(products)) {
    // If it's not an array, return a message or an empty div
    return <div className="products-container">No products available</div>;
  }

  return (
    <div className="products-container">
      <div className="sec-heading">{headingText}</div>
      <div className={`products ${innerPage ? "innerPage" : ""}`}>
        {referrer === "home"
          ? products
              .filter((item) => item.Popular === true)
              .map((item) => (
                <Product key={item.id} id={item.id} data={item} />
              ))
          : products.map((item) => (
              <Product key={item.id} id={item.id} data={item} />
            ))}
      </div>
    </div>
  );
};

export default Products;



{/*import React, { useEffect, useState } from "react";
import "./Products.scss";
import Product from "./Product/Product";
import { db } from '../../Firebase/firebase'; // Import the Firebase db instance
import { collection, getDocs, query, where, getFirestore } from 'firebase/firestore'; // Import Firestore methods

const Products = ({ referrer, headingText, innerPage }) => {
  const [products, setProducts] = useState([]);

  // Function to fetch products from Firebase Firestore
  const getProducts = async () => {
    try {
      // Create a reference to the "products" collection
      const productsCollectionRef = collection(db, 'products');
  
      // Create a reference to the "moisturizer" subcollection within each product document
      const moisturizerSubcollection = 'moisturizer';
  
      // Create a query to filter products where "bestseller" is true within the "moisturizer" subcollection
      const q = query(
        collection(productsCollectionRef, moisturizerSubcollection),
        where('Popular', '==', true)
      );
  
      // Get the documents that match the query
      const productsSnapshot = await getDocs(q);
  
      // Map the document data and set it in the state (assuming you have a state variable called "setProducts")
      const productsData = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      // Set the filtered products data in your state (e.g., setProducts(productsData))
    } catch (error) {
      console.error('Error fetching moisturizer bestsellers:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="products-container">
      <div className="sec-heading">{headingText}</div>
      <div className={`products ${innerPage ? "innerPage" : ""}`}>
        {referrer === "home"
          ? products
              .filter((item) => item.Popular === true)
              .map((item) => (
                <Product key={item.id} id={item.id} data={item} />
              ))
          : products.map((item) => (
              <Product key={item.id} id={item.id} data={item} />
            ))}
      </div>
    </div>
  );
};

export default Products;*/}













{/*import "./Products.scss";
import Product from "./Product/Product";

const Products = ({ products, referrer, headingText, innerPage }) => {
    return (
        <div className="products-container">
        <div className="sec-heading">{headingText}</div>
        <div className={`products ${innerPage ? "innerPage" : ""}`}>
          {referrer === "home"
            ? products?.data
                ?.filter((item) => item.attributes.popular === true)
                .map((item) => (
                  <Product key={item.id} id={item.id} data={item.attributes} />
                ))
            : products?.data?.map((item) => (
                <Product key={item.id} id={item.id} data={item.attributes} />
              ))}
        </div>
      </div>
      
         
       
    );
  };

export default Products;
 {/*  <div className="products-container">
      {!innerPage && <div className="sec-heading">{headingText}</div>}
      <div className={`products ${innerPage ? "innerPage" : ""}`}>
        {products?.data?.map((item) =>
          item.attributes.popular === true ? (
            <Product key={item.id} id={item.id} data={item.attributes} />
          ) : null
        )}
      </div>
    </div> />
        ))} */}