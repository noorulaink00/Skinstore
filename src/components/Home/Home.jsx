import React, { useEffect, useContext } from "react";
import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { Context } from "../../utils/Context";
import { db } from '../../Firebase/firebase'; // Import the Firebase db instance
import { collection, getDocs, query, where } from 'firebase/firestore'; // Import Firestore methods


const Home = () => {
  const {
    categories,
    products,
    setProducts,
    setCategories,
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
  const getCategories = async () => {
    try {
      const categoriesCollection = collection(db, 'categories');
      const categoriesSnapshot = await getDocs(categoriesCollection);
      const categoriesData = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
        <div className="sec-heading">categories</div>
          <Category categories={categories} />
          <Products headingText="Best Sellers" products={products} referrer="home" />
        </div>
      </div>
      
    </div>
  );
};

export default Home;
