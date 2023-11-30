
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

export const SimilarCarousel = ({ children, sliderClassName = "" }) => {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={20}
      navigation={true}
      modules={[Navigation]}
      className={sliderClassName}
    >
      {children.map((child, index) => (
        <SwiperSlide key={`swiper-slide-${index}`}>
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
export default SimilarCarousel;