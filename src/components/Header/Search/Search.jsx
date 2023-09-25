import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { collection, where, query as firestoreQuery, getDocs, startAt, endAt, orderBy } from 'firebase/firestore'; // Firebase Firestore imports
import { db } from '../../../Firebase/firebase'; // Import the Firebase db instance
import "./Search.scss"
const Search = ({ setSearchModal }) => {
  const [queryText, setQueryText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollectionRef = collection(db, 'products');
        const lowercaseQueryText = queryText.toLowerCase();
    
        // Fetch all documents from the "products" collection
        const allProductsSnapshot = await getDocs(productsCollectionRef);
        const allProductsData = allProductsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
    console.log(allProductsData)
        // Perform a case-insensitive search manually
        const matchingProducts = allProductsData.filter((product) =>
          product.Name.toLowerCase().includes(lowercaseQueryText)
        );
    
        setSearchResults(matchingProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    
    

    if (queryText.length >= 1) { // Adjust the minimum query length as needed
      fetchProducts();

    } else {
      setSearchResults([]);
    }
  }, [queryText]);
    return (
      <div className="search-modal">
        <div className="form-field">
          <input
            autoFocus
            type="text"
            placeholder="Search for products"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)} // Use inline function here
          />
          <MdClose
            className="close-btn"
            onClick={() => setSearchModal(false)}
          />
        </div>
        <div className="search-result-content">
          {!searchResults.length && (
            <div className="start-msg">
              Start typing to see products you are looking for.
            </div>
          )}
          <div className="search-results">
            {searchResults.map((item) => (
              <div
                className="search-result-item"
                key={item.id}
                onClick={() => {
                  navigate("/product/" + item.Name);
                  setSearchModal(false);
                }}
              >
                <div className="image-container">
                  <img src={item.Image} alt={item.Name} />
                </div>
                <div className="prod-details">
                  <span className="name">{item.Name}</span>
                  <span className="desc">&#8360; {item.Price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default Search;

