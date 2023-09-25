import React from 'react'
import "./ProductPage.scss";
import { useContext, useEffect } from 'react';
import Products from "./Products";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/Context";
import { useLocation } from "react-router-dom";
import { db } from '../../Firebase/firebase'; // Import the Firebase db instance
import { collection, getDocs, query, where } from 'firebase/firestore'; // Import Firestore methods



export const ProductPage = ({ }) => {
   
  const {
    
    products,
    setProducts,
 
  } = useContext(Context);

  // Function to fetch products from Firebase Firestore using getDocs
  const getProducts = async () => {
    try {
      // Create a reference to the "products" collection
      const productsCollectionRef = collection(db, 'products');
  
      // Get all documents in the "products" collection
      const productsSnapshot = await getDocs(productsCollectionRef);
  
      // Map the document data and set it in the state (assuming you have a state variable called "setProducts")
      const productsData = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      // Set the products data in your state (e.g., setProducts(productsData))
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  



  // Function to fetch categories from Firebase Firestore using getDocs
 
  useEffect(() => {
    getProducts();
 
  }, []);
    return (
        <div className="product_page">
              
  
        <Products headingText=" Products" products={products} referrer="products"/>
      
     </div>
    );
};

export default ProductPage;