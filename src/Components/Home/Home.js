import React, { useEffect } from "react";
import "./Home.css";
import HomeBanner from "../HomeBanner/HomeBanner";
import Product from "../Product/Product";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";

function Home() {
  document.title = "Amazon-Clone-Ecommerce-Website";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="home">
      <div className="home-container">
        <HomeBanner />

        <div className="home-body">
          <div className="home-row col-sm-12">
            <Product
              id={uuidv4()}
              title="Bose SoundLink Around Ear Wireless Headphones II - Black"
              imageUrl="https://m.media-amazon.com/images/I/71jDdUuRi8L._AC_SL1500_.jpg"
              price={229.0}
              rating={5}
            />
            <Product
              id={uuidv4()}
              title="Apple AirPods Max - Space Gray"
              imageUrl="https://m.media-amazon.com/images/I/81S533RgkwL._AC_SL1500_.jpg"
              price={489.99}
              rating={5}
            />
          </div>
          <div className="home-row col-sm-12">
            <Product
              id={uuidv4()}
              title="New Apple iPhone 12 Pro Max (128GB, Pacific Blue)"
              imageUrl="https://m.media-amazon.com/images/I/71MHTD3uL4L._FMwebp__.jpg"
              price={1099.0}
              rating={5}
            />
            <Product
              id={uuidv4()}
              title="SAMSUNG Galaxy Z Fold 3 5G Smartphone Tablet 2-in-1 Foldable Dual Screen Under Display Camera 256GB Storage, Phantom Green"
              imageUrl="https://m.media-amazon.com/images/I/71fZjtFFLsL._AC_SL1500_.jpg"
              price={1750.8}
              rating={4}
            />
            <Product
              id={uuidv4()}
              title="SAMSUNG Galaxy S21+ Plus 5G Factory Unlocked Android Cell Phone 128GB US Version Smartphone Pro-Grade Camera 8K Video 12MP High Res, Phantom Black"
              imageUrl="https://m.media-amazon.com/images/I/61cjeSE+Z-L._AC_SL1000_.jpg"
              price={799.99}
              rating={5}
            />
          </div>
          <div className="home-row">
            <Product
              id={uuidv4()}
              title="SAMSUNG LC49RG90SSNXZA 49-Inch CRG9 Curved Gaming Monitor, Black, QHD, 120Hz"
              imageUrl="https://m.media-amazon.com/images/I/71tZW1aa+PL._AC_SL1500_.jpg"
              price={1200.0}
              rating={4}
            />
          </div>
          {/* <div className="home-row">
            <Product
              id={uuidv4()}
              title="2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Silver"
              imageUrl="https://m.media-amazon.com/images/I/71gD8WdSlaL._AC_SL1500_.jpg"
              price={1149.99}
              rating={5}
            />
            <Product
              id={uuidv4()}
              title='2021 Newest Dell XPS 7590 Laptop, 15.6" 4K UHD Display, Intel Core I7-9750H, GTX 1650, 64GB RAM, 1TB PCIe SSD, Webcam, Backlit Keyboard, FP Reader, Windows 10 Home'
              imageUrl="https://m.media-amazon.com/images/I/81puRpDBzmL._AC_SL1500_.jpg"
              price={2359.0}
              rating={4}
            />
            <Product
              id={uuidv4()}
              title="2021 Newest Lenovo Ideapad 3 Laptop, 15.6 Full HD 1080P Non-Touch Display, AMD Ryzen 3 3250U Processor, 8GB DDR4 RAM, 256GB PCIe NVMe SSD, Webcam, Wi-Fi, HDMI, Windows 10 Home, KKE Mousepad, Grey"
              imageUrl="https://m.media-amazon.com/images/I/71WTF+xiiHL._AC_SL1354_.jpg"
              price={529.0}
              rating={4}
            />
          </div> */}
        </div>

        <div className="back-to-top">
          <Button
            type="button"
            variant="secondary"
            className="backToTopButtonColor"
            onClick={scrollToTop}
          >
            Back to Top
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
