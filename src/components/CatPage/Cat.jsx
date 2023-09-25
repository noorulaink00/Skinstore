import React, { useEffect, useContext, useState } from 'react';
import Category from "../Home/Category/Category";
import { Context } from "../../utils/Context";
import { collection, getDocs, query, where } from 'firebase/firestore'; // Import Firestore methods
import { db } from '../../Firebase/firebase'; // Import the Firebase db instance
import "./Cat.scss";

const Cat = () => {
    const { setCategories } = useContext(Context);
    const [categories, setLocalCategories] = useState([]);

    const getCategories = async () => {
        try {
            // Create a reference to the "categories" collection
            const categoriesCollectionRef = collection(db, 'categories');

            // Create a query to get all categories
            const q = query(categoriesCollectionRef);

            // Get the documents that match the query
            const categoriesSnapshot = await getDocs(q);

            // Map the document data and set it in the local state
            const categoriesData = categoriesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setLocalCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    // When the local state is updated, set it in the context state
    useEffect(() => {
        setCategories(categories);
    }, [categories, setCategories]);

    return (
        <div className="cat">
            <div className="sec-heading">Categories</div>
            <Category categories={categories} />
        </div>
    );
}

export default Cat;
