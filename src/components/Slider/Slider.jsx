/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import Slide from "./Slide/Slide";
import { SliderContext } from "./sliderContext";
import "./_slider.scss";
const Slider = ({ children, width, height, gap }) => {
  const [offset, setOffset] = useState(0);

  const slideShow = useCallback(() => {
    setOffset((current) => {
      const newOffset = current - (width + gap);
      const maxOffset = -((width + gap) * (children.length - 1));
      if (current === maxOffset) {
        return 0;
      } else {
        return Math.max(newOffset, maxOffset);
      }
    });

    setTimeout(slideShow, 2000);
  });
  useEffect(() => {
    slideShow();
  }, []);
  return (
    <SliderContext.Provider value={{ height: height, width: width }}>
      <div
        className='slider-container'
        style={{ height: `${height}px`, width: `${width}px` }}
      >
        <div className='slider-container__window'>
          <div
            className='all-slides-container'
            style={{
              gap: `${gap}px`,
              transform: `translateX(${offset}px) `,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </SliderContext.Provider>
  );
};
Slider.Slide = Slide;
export default Slider;
