import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { useState, forwardRef } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// image import
import Image1 from "../assets/images/image1.jpg";
import Image2 from "../assets/images/image2.jpg";
import Image3 from "../assets/images/image3.jpg";
import Image4 from "../assets/images/image4.jpg";
import Image5 from "../assets/images/image5.jpg";
import Image6 from "../assets/images/image6.jpg";
import Image7 from "../assets/images/image7.jpg";
import Image8 from "../assets/images/image8.jpg";

const ImgSlider = (props) => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(sw) => props.handlerClick(sw)}
        
      >
        <SwiperSlide>
          <img
            src={Image1}
            alt={"image1"}
            loading="lazy"
            className="img-thumbnail"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={Image2}
            alt={"image2"}
            loading="lazy"
            className="img-thumbnail"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={Image3}
            alt={"image3"}
            loading="lazy"
            className="img-thumbnail"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={Image4}
            alt={"image4"}
            loading="lazy"
            className="img-thumbnail"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={Image5}
            alt={"image5"}
            loading="lazy"
            className="img-thumbnail"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={Image6}
            alt={"image6"}
            loading="lazy"
            className="img-thumbnail"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={Image7}
            alt={"image7"}
            loading="lazy"
            className="img-thumbnail"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={Image8}
            alt={"image8"}
            loading="lazy"
            className="img-thumbnail"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default ImgSlider;