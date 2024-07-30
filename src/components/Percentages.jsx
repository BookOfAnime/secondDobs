import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Percentages.css';

const Percentages = () => {
  const componentRef = useRef(null);
  const percentageRefs = useRef([]);

  const percentageData = [
    { label: 'Gummy Stakers', value: 10 },
    { label: 'Future Airdrops', value: 10 },
    { label: 'Exchanges', value: 10 },
    { label: 'Market Makers', value: 10 },
    { label: 'Liquidity Pool', value: 60 },
  ];

  useEffect(() => {
    const component = componentRef.current;
    const percentageElements = percentageRefs.current;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(component, 
      { opacity: 0, scale: 0.95 }, 
      { opacity: 1, scale: 1, duration: 1 }
    );

    percentageElements.forEach((element, index) => {
      const bar = element.querySelector('.percentage-bar');
      const text = element.querySelector('.percentage-value');
      const value = percentageData[index].value;

      tl.fromTo(bar, 
        { width: 0 }, 
        { width: `${value}%`, duration: 1 },
        '-=0.7'
      );

      tl.fromTo(text, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.5, onStart: () => {
          let start = 0;
          const end = value;
          const counter = setInterval(() => {
            start += 1;
            text.textContent = `${start}%`;
            if (start === end) clearInterval(counter);
          }, 20);
        }},
        '-=0.5'
      );
    });

  }, []);

  return (
    <section ref={componentRef} className="percentages-section">
      <div className="percentages-chart">
        <h2 className="chart-title">Tokenomics</h2>
        <div className="chart-content">
          {percentageData.map((item, index) => (
            <div key={index} className="percentage-row" ref={el => percentageRefs.current[index] = el}>
              <span className="percentage-label">{item.label}</span>
              <div className="percentage-bar-container">
                <div className="percentage-bar" style={{width: 0}} />
              </div>
              <span className="percentage-value">0%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Percentages;