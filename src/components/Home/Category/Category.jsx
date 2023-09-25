import React, { useEffect, useContext } from "react";
import "./Category.scss";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../utils/Context";

const Category = ({ categories }) => {
  console.log(categories);
  const navigate = useNavigate();


  return (
    <div className="shop-by-category">
        
      <div className="categories">
    
        {categories.map((item) => (
          <div
            key={item.id}
            className="category"
            onClick={() => navigate(`/category/${item.id}`)}
          >
            <img
              src={item.Image}
              alt=""
            />
            <h2>
              {item.Name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
