import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";


export default function HomeBanner({ images }) {
  return (
    <section className="relative">
        <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 6500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            className="h-[500px]"
        >
            {images.map((img, idx) => {
            // all slogans in order, same length as bannerImages
            const slogans = [
                "Elevate Your Brand with Emerald",
                "Wear Your Vision with Emerald",
                "Screenprinting that Sparks",
                "Stand Out with Emerald Screenprinting",
                "Screen Printing That Colors Your Imagination",
            ];

            return (
                <SwiperSlide key={idx}>
                <div className="relative h-[500px] flex">
                    {/* Second slide shows 2 images on mobile, 3 on md+ */}
                    {idx === 1 ? (
                    <div className="absolute inset-0 flex flex-row w-full h-full">
                        {img.group.map((g, gIdx) => (
                        <img
                            key={gIdx}
                            src={g.src}
                            alt={g.alt}
                            loading="eager"
                            className={`
                            h-full object-cover 
                            ${gIdx > 1 ? "hidden md:block w-1/3" : "w-1/2 md:w-1/3"}
                            `}
                        />
                        ))}
                    </div>
                    ) : (
                    <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    )}
                    {/* Overlay text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                    <motion.h1
                        className="text-4xl md:text-5xl font-extrabold text-[rgb(208,177,65)] text-shadow-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.9 }}
                    >
                        {slogans[idx % slogans.length]}
                    </motion.h1>
                    <motion.p
                        className="mt-4 text-lg md:text-xl max-w-xl text-shadow-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.9 }}
                    >
                        Bold designs. Impeccable detail. Personal touch. Always printed like it's our own.
                    </motion.p>
                    </div>
                </div>
                </SwiperSlide>
            );
            })}
        </Swiper>
    </section>
  );
}
