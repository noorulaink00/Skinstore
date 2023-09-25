import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import Categories from "./components/Home/Category/Category"
import ProductPage from "./components/Products/ProductPage";
import OrderPage from "./components/Order/OrderPage";
import Cat from "./components/CatPage/Cat"
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import AppContext from "./utils/Context";
import firebase from "./Firebase/firebase";
import ErrorBoundary from "./components/ErrorBoundary";
import About from "./components/About/About"
function App() {
  return (
   <ErrorBoundary>
    <BrowserRouter>
      <AppContext>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="/categories" element={<Cat />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/orders" element={<OrderPage/>} />
          <Route path="/category/:Category" element={<Category />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Routes>
        <Newsletter />
        <Footer />
      </AppContext>
    </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
