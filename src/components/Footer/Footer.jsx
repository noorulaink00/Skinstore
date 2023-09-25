import "./Footer.scss";

import React from "react";
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import Payment from "../../assets/payments.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="col">
          <div className="title">About</div>
          <div className="text">
            At SKINSTORE, our passion for skincare runs deep. Founded on
            the principles of quality, purity, and sustainability, we are
            dedicated to providing you with the finest in skincare solutions.
            With years of expertise and a commitment to harnessing the power of
            nature, we strive to create products that not only enhance your
            skin's health and beauty but also promote a sense of well-being.
            Discover the difference, where skincare meets
            the art of self-care.
          </div>
        </div>
        <div className="col">
          <div className="title">Contact</div>
          <div className="c-item">
            <FaLocationArrow />
            <div className="text">
              Karachi, Pakistan, 688006
            </div>
          </div>
          <div className="c-item">
            <FaMobileAlt />
            <div className="text">Phone: 0471 272 0261</div>
          </div>
          <div className="c-item">
            <FaEnvelope />
            <div className="text">Email: store@skinstore.com</div>
          </div>
        </div>
        <div className="col">
          <div className="title">Categories</div>
          <span className="text">Bundles</span>
          <span className="text">Serums</span>
          <span className="text">Moisturizers</span>
          <span className="text">Lipsticks</span>
          <span className="text">Face Mask</span>

        </div>
        <div className="col">
          <div className="title">Pages</div>
          <span className="text">Home</span>
          <span className="text">About</span>
          <span className="text">Privacy Policy</span>
          <span className="text">Returns</span>
          <span className="text">Terms & Conditions</span>
          <span className="text">Contact Us</span>
        </div>
      </div>
      <div className="bottom-bar">
        <div className="bottom-bar-content">
          <span className="text">
            SKINSTORE 2023 CREATED BY ESMJ. PREMIUM E-COMMERCE SOLUTIONS.
          </span>
          <img src={Payment} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
