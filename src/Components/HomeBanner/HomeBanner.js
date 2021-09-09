import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./HomeBanner.css";

function HomeBanner() {
  return (
    <Carousel indicators={false} variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-100 banner-img"
          src="https://m.media-amazon.com/images/I/610o4Ny9RFL._SX3000_.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 banner-img"
          src="https://m.media-amazon.com/images/I/61C7pgpVG3L._SX3000_.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 banner-img"
          src="https://m.media-amazon.com/images/I/61HOZ5xfxnL._SX3000_.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 banner-img"
          src="https://m.media-amazon.com/images/I/71VDHZNQfML._SX3000_.jpg"
          alt="Fourth slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeBanner;
