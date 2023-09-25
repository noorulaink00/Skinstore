import "./Banner.scss";

import p1 from "../../../assets/products/b1.png";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="hero-banner">
      <div className="content">
        <div className="text-content">
          <h1>Unlock Your Skin's Radiance</h1>
          {/*  <h1>SALES</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque,
            tenetur! Repudiandae reiciendis voluptatibus quis? Qui excepturi
            reprehenderit animi obcaecati, quo id quidem suscipit aliquam hic
            quis praesentium, aut maxime laudantium?
          </p>*/}
          <p>
            At SKINSTORE we believe that healthy, radiant skin is a
            reflection of self-care and confidence. Our carefully crafted
            skincare products are designed to nurture your skin's natural
            beauty, providing you with the tools to feel your best every day.
            Join us on a journey to skincare excellence and discover the
            transformative power of nature's finest ingredients
          </p>
          <div className="ctas">
            <div className="banner-cta" onClick={() => navigate("/about")}>About Us</div>
            <div className="banner-cta v2" onClick={() => navigate("/products")}>Shop Now</div>
          </div>
        </div>
        <img className="banner-img" src={p1} alt="" />
      </div>
    </div>
  );
};

export default Banner;
