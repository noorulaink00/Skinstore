
import React, { useEffect, useState } from "react";

import Products from "../../Products/Products";
import { collection, query, where, getDocs, limit } from 'firebase/firestore'; // Import Firestore methods

import { db } from '../../../Firebase/firebase'; // Import the Firebase db instance

const RelatedProducts = ({ categoryId, productId }) => {


  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const productsCollectionRef = collection(db, 'products');
        const q = query(
          productsCollectionRef,
          where('Category', '==', categoryId),
          where('Name', '!=', productId),
          limit(4) // Limit the results to 4 related products
        );
        console.log(q)
        const productsSnapshot = await getDocs(q);
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRelatedProducts(productsData);
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };
    console.log("rel", relatedProducts)
    fetchRelatedProducts();
  }, [categoryId, productId]);

  return (
    <div className="related-products">
      <Products headingText="Related Products" products={relatedProducts} />
    </div>
  );
};

export default RelatedProducts;



{/*import Products from "../../Products/Products";
import React from "react";
import useFetch from "../../../hooks/useFetch";


const RelatedProducts = ({ categoryId, productId }) => {
    const { data } = useFetch(
        `/api/products?populate=*&filters[id][$ne]=${productId}&filters[categories][id]=${categoryId}&pagination[start]=0&pagination[limit]=4`
    );
    return (
        <div className="related-products">
            <Products headingText="Related Products" products={data}/>
        </div>
    );
};

export default RelatedProducts;
*/}