import React from "react";
import { useContext } from "react";
import { SliderContext } from "../sliderContext";

const Slide = ({ children }) => {
  const { width, height } = useContext(SliderContext);
  return (
    <div className='slide'>
      <img
        src={children}
        alt=''
        style={{ minWidth: width, height: height, maxWidth: width }}
      />
    </div>
  );
};

export default Slide;
