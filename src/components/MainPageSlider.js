import React, { useEffect, useState } from "react";

import slide1 from '../images/main1.svg';
import slide2 from '../images/main2.svg';
import slide3 from '../images/slide2.png';
import slide4 from '../images/slide3.png';
import slide5 from '../images/slide4.png';
import slide6 from '../images/slide5.png';

import dotActive from '../images/dot_active.svg'
import dotUnactive from '../images/dot_unactive.svg'



import slider from '../images/slider.svg'


const MainPageSlider = () => {
    const slides1 = [slide2, slide3, slide4];
    const slides2 = [slide1, slide5, slide6];
    const bounds = [[dotActive, dotUnactive, dotUnactive], [dotUnactive, dotActive, dotUnactive], [dotUnactive, dotUnactive, dotActive]]

    const [currentIndex1, setCurrentIndex1] = useState(0);
    const [currentIndex2, setCurrentIndex2] = useState(0);

    useEffect(() => {
        const interval1 = setInterval(() => {
            setCurrentIndex1((prevIndex) => (prevIndex + 1)%slides1.length); }, 5000);

        const interval2 = setInterval(() => {
                setCurrentIndex2((prevIndex) => (prevIndex + 1)%slides2.length);}, 5000);


        return () => {clearInterval(interval1);
            clearInterval(interval2);
        };
    },[]);
    
    const slider = bounds[currentIndex2].map((item) => <img src={item}/>)

    return (
        <div class="mainpage__slider-container">
           <div class="mainpage__slider-container_sliderpanel">
                <div class="mainpage-slider_container_slide">
                    <img src={slides1[currentIndex1]}/>
                </div>
                <div class="mainpage-slider_container_slide">
                    <img src={slides2[currentIndex2]}/>
                </div>
            </div>
            <div class="mainpage-slider_container_slide_bound">
              {slider}
            </div>

        </div>
    )
}

export default MainPageSlider;