
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

export const Carousel = ({ children, sliderClassName = "" }) => {
  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
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
export default Carousel;