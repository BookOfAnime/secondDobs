import React, { useState, useEffect } from 'react';
import './Merchandise.css';

const Merchandise = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const shirts = [
    { id: 1, name: "Classic Logo Tee", image: "/shirtOne.png", price: "$24.99" },
    { id: 2, name: "Crypto Enthusiast", image: "/shirtTwo.png", price: "$29.99" },
    { id: 3, name: "To The Moon", image: "/shirtThree.png", price: "$27.99" },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shirts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + shirts.length) % shirts.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="merchandise-section">
      <h2 className="merchandise-title">Merchandise</h2>
      <div className="slider-container">
        <button className="slider-button prev" onClick={prevSlide}>&#10094;</button>
        <div className="slider">
          {shirts.map((shirt, index) => {
            let position = index - currentIndex;
            if (position < 0) position += shirts.length;
            return (
              <div
                key={shirt.id}
                className={`slide ${position === 1 ? 'active' : ''}`}
                style={{
                  transform: `translateX(${(position - 1) * 100}%)`,
                  opacity: position === 1 ? 1 : 0.7,
                  scale: position === 1 ? 1.1 : 1
                }}
              >
                <img src={shirt.image} alt={shirt.name} />
                <div className="shirt-info">
                  <h3>{shirt.name}</h3>
                  <p>{shirt.price}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button className="slider-button next" onClick={nextSlide}>&#10095;</button>
      </div>
    </section>
  );
};

export default Merchandise;