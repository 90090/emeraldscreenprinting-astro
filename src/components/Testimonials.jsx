import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

export default function Testimonials({ testimonials }) {
  const containerRef = useRef(null);
  const [sliderActive, setSliderActive] = useState(false);

  // Only activate Swiper on the client
  useEffect(() => {
    setSliderActive(true);
  }, []);

  return (
    <section>
      <div className="container mx-auto px-4">
        <h3 className="text-xl md:text-2xl font-semibold text-center text-emerald-700 mb-10">
          What Our Amazing Clients Have To Say
        </h3>

        {!sliderActive && (
          // Server-rendered HTML for SEO
          <div className="space-y-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm min-h-[200px] line-clamp-6 flex flex-col justify-between"
              >
                <p className="text-gray-800 text-lg md:text-xl italic leading-relaxed mb-6">
                  “{t.text}”
                </p>
                <div className="text-right">
                  <p className="font-semibold text-emerald-700">— {t.name}</p>
                  {t.company && (
                    <p className="text-gray-600 text-sm">{t.company}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {sliderActive && (
          // Client-side Swiper slider
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet",
              renderBullet: (i, className) =>
                `<span class="${className} bg-emerald-600"></span>`,
            }}
            autoplay={{
              delay: 12000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            className="max-w-4xl mx-auto"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm transition-transform duration-300 hover:scale-[1.02] min-h-[200px] line-clamp-6 flex flex-col justify-between">
                  <p className="text-gray-800 text-lg md:text-xl italic leading-relaxed mb-6">
                    “{t.text}”
                  </p>
                  <div className="text-right">
                    <p className="font-semibold text-emerald-700">— {t.name}</p>
                    {t.company && (
                      <p className="text-gray-600 text-sm">{t.company}</p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
