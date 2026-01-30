import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

export default function ApparelShowcase({ images }) {
  const [sliderActive, setSliderActive] = useState(false);

  // Only activate Swiper on the client
  useEffect(() => {
    setSliderActive(true);
  }, []);

  return (
      <div className="container mx-auto px-4">
        {/* Server-rendered static grid for SEO */}
        {!sliderActive && (
          <section>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto pb-20">
            {images.map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl overflow-hidden shadow-md"
              >
                <img
                  src={item.img}
                  alt={item.caption}
                  loading="lazy"
                  className="w-full h-72 object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full text-white py-4 text-sm text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
                  <p>{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
          </section>
        )}

        {/* Client-side Swiper slider */}
        {sliderActive && (
          <motion.section
          className="py-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={true}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 }, // tablets
              1024: { slidesPerView: 3 }, // desktops
            }}
            className="max-w-5xl mx-auto pb-20"
          >
            {images.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative rounded-2xl overflow-hidden shadow-md hover:scale-101 transition-transform duration-300">
                  <img
                    src={item.img}
                    alt={item.caption}
                    loading="lazy"
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full text-white py-4 text-sm text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
                    <p>{item.caption}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          </motion.section>
        )}
        
      </div>
    
  );
}
