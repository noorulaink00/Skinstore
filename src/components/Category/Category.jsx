import React, { useEffect, useState } from "react";
import "./Category.scss";
import { useParams } from "react-router-dom";
import Products from "../Products/Products";
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore'; // Import Firestore methods
import { db } from '../../Firebase/firebase'; // Import the Firebase db instance

const Category = () => {

  const { Category } = useParams();
  const [products, setProducts] = useState([]);
console.log("cat", Category);
console.log("products", products)
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const productsCollectionRef = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollectionRef);
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Filter products by matching category name
        const filteredProducts = productsData.filter((product) =>
          product.Category === Category
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchAllProducts();
  }, [Category]);
  return (
    <div className="category-main-content">
      <div className="layout">
        <div className="category-title">
          {Category } {/* Display the selected category name */}
        </div>
        <Products innerPage={true} products={products} />
      </div>
    </div>

    
  );
};

export default Category;
 
  
  
  {/*import "./Category.scss";

import { useParams } from "react-router-dom";
import Products from "../Products/Products";
import useFetch from "../../hooks/useFetch";

const Category = () => {
  const { id } = useParams();
  const { data } = useFetch(
    `/api/products?populate=*&[filters][categories][id]=${id}`
  );
  return (
    <div className="category-main-content">
      <div className="layout">
        <div className="category-title">
          {
            data?.data?.[0]?.attributes?.categories?.data?.[0]?.attributes
              ?.title
          }
        </div>
        <Products innerPage={true} products={data} />

        
        //  <div className="category-title">Title cat</div>
         // <Products innerPage={true}/>
      </div>
    </div>
  );
};

export default Category;*/}
