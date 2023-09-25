
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../Firebase/firebase"; // Import your Firebase db instance
import { collection, getDocs } from "firebase/firestore"; // Import Firestore methods

export const Context = createContext();

const AppContext = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    // Function to fetch categories from Firebase Firestore
    const fetchCategories = async () => {
      try {
        const categoriesCollection = collection(db, "categories");
        const categoriesSnapshot = await getDocs(categoriesCollection);
        const categoriesData = categoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Function to fetch products from Firebase Firestore
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Fetch both categories and products
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    let count = 0;
    cartItems?.map((item) => (count += item.quantity));
    setCartCount(count);

    let subTotal = 0;
    cartItems.map(
      (item) =>
        (subTotal += item.Price * item.quantity)
    );
    setCartSubTotal(subTotal);
  }, [cartItems]);

  const handleAddToCart = (product, quantity) => {
    let items = [...cartItems];
    let index = items?.findIndex((p) => p.id === product?.id); // Assuming product id is used for comparison
    if (index !== -1) {
      // If the product is already in the cart, update its quantity
      items[index].quantity += quantity;
    } else {
      // If the product is not in the cart, add it with the quantity
      product.quantity = quantity;
      items = [...items, product];
    }
    setCartItems(items);
  };

  const handleRemoveFromCart = (product) => {
    let items = [...cartItems];
    items = items?.filter((p) => p.id !== product?.id);
    setCartItems(items);
  };

  const handleCartProductQuantity = (type, product) => {
    let items = [...cartItems];
    let index = items?.findIndex((p) => p.id === product?.id);
    if (type === "inc") {
      items[index].quantity += 1;
    } else if (type === "dec") {
      if (items[index].quantity === 1) return;
      items[index].quantity -= 1;
    }
    setCartItems(items);
  };

  return (
    <Context.Provider
      value={{
        products,
        setProducts,
        categories,
        setCategories,
        cartItems,
        setCartItems,
        handleAddToCart,
        cartCount,
        handleRemoveFromCart,
        showCart,
        setShowCart,
        handleCartProductQuantity,
        cartSubTotal,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;







{/*import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../Firebase/firebase"; // Import your Firebase db instance

export const Context = createContext();

const AppContext = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

 useEffect(() => {
  // Fetch categories from Firebase Firestore
  const fetchCategories = async () => {
    try {
      const categoriesSnapshot = await db.collection("categories").get();
      const categoriesData = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name, // Assuming 'name' is the field in the Firestore document for category name
        image: doc.data().image, // Assuming 'image' is the field in the Firestore document for category image
      }));
      setCategories(categoriesData);
      console.log(categories, "caT  ")
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


    // Fetch products from Firebase Firestore
    const fetchProducts = async () => {
      try {
        const productsSnapshot = await db.collection("products").get();
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
      let count = 0;
      cartItems?.map((item) => (count += item.attributes.quantity));
      setCartCount(count);

      let subTotal = 0;
      cartItems.map(
          (item) =>
              (subTotal += item.attributes.Price * item.attributes.quantity)
      );
      setCartSubTotal(subTotal);
  }, [cartItems]);

  const handleAddToCart = (product, quantity) => {
      let items = [...cartItems];
      let index = items?.findIndex((p) => p.id === product?.id);
      if (index !== -1) {
          items[index].attributes.quantity += quantity;
      } else {
          product.attributes.quantity = quantity;
          items = [...items, product];
      }
      setCartItems(items);
  };

  const handleRemoveFromCart = (product) => {
      let items = [...cartItems];
      items = items?.filter((p) => p.id !== product?.id);
      setCartItems(items);
  };

  const handleCartProductQuantity = (type, product) => {
      let items = [...cartItems];
      let index = items?.findIndex((p) => p.id === product?.id);
      if (type === "inc") {
          items[index].attributes.quantity += 1;
      } else if (type === "dec") {
          if (items[index].attributes.quantity === 1) return;
          items[index].attributes.quantity -= 1;
      }
      setCartItems(items);
  };

  return (
      <Context.Provider
          value={{
              products,
              setProducts,
              categories,
              setCategories,
              cartItems,
              setCartItems,
              handleAddToCart,
              cartCount,
        
              handleRemoveFromCart,
              showCart,
              setShowCart,
              handleCartProductQuantity,
              cartSubTotal,
          }}
      >
          {children}
      </Context.Provider>
  );
};
export default AppContext;*/}
