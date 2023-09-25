
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.scss";

const Product = ({ data, id }) => {
  const navigate = useNavigate();

  // Ensure that the data object from Firestore matches your expected structure
  // Update the property names as needed
  const imageUrl = data.Image; // Update to match your Firestore structure
  const title = data.Name; // Update to match your Firestore structure
  const price = data.Price; // Update to match your Firestore structure

  return (
    <div
      className="product-card"
      onClick={() => navigate("/product/" + id)}
    >
      <div className="thumbnail">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="prod-details">
        <span className="name">{title}</span>
        <span className="price">&#8360; {price}</span>
      </div>
    </div>
  );
};

export default Product;













{/*import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.scss";


const Product = ({ data, id }) => {
    const navigate = useNavigate();
    return (
        <div
            className="product-card"
            onClick={() => navigate("/product/" + id)}
        >
            <div className="thumbnail">
                <img
                    src={
                        process.env.REACT_APP_DEV_URL +
                        data.Image.data[0].attributes.url
                    }
                />
            </div>
            <div className="prod-details">
                <span className="name">{data.Title}</span>
                <span className="price">&#8360; {data.Price}</span>
            </div>
        </div>
    );
};

export default Product;*/}