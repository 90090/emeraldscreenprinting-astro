import { useState, useRef, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "yet-another-react-lightbox/styles.css";

const screenshots = [
  { src: "/samples/shirt1.webp", alt: ""},
  { src: "/samples/shirt2.webp", alt: ""},
  { src: "/samples/shirt3.webp", alt: ""},
  { src: "/samples/shirt23.webp", alt: ""},
  { src: "/samples/shirt9.webp", alt: ""},
  { src: "/samples/shirt4.webp", alt: ""},
  { src: "/samples/shirt5.webp", alt: ""},
  { src: "/samples/shirt15.webp", alt: ""},
  { src: "/samples/shirt6.webp", alt: ""},
  { src: "/samples/shirt7.webp", alt: ""},
  { src: "/samples/shirt8.webp", alt: ""},
  { src: "/samples/shirt22.webp", alt: ""},
  { src: "/samples/shirt10.webp", alt: ""},
  { src: "/samples/shirt11.webp", alt: ""},
  { src: "/samples/shirt12.webp", alt: ""},
  { src: "/samples/shirt13.webp", alt: ""},
  { src: "/samples/shirt14.webp", alt: ""},
  { src: "/samples/shirt16.webp", alt: ""},
  { src: "/samples/shirt17.webp", alt: ""},
  { src: "/samples/shirt18.webp", alt: ""},
  { src: "/samples/shirt19.webp", alt: ""},
  { src: "/samples/shirt20.webp", alt: ""},
  { src: "/samples/shirt21.webp", alt: ""},
];

export default function ShirtGrid() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const swiperRef = useRef(null);

  // Client-only activation
  useEffect(() => {
    setMounted(true);
  }, []);

  const openLightbox = (i) => {
    if (!mounted) return;
    setIndex(i);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  return (
    <section id="our-work" className="py-10 text-black text-center px-4">
      <h2 className="text-3xl font-bold text-emerald-700 mb-6">
        Our Apparel
      </h2>

      {/* SSR FALLBACK: pure HTML, no JS */}
      {!mounted && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {screenshots.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-[180px] object-contain bg-white rounded-xl shadow-md"
            />
          ))}
        </div>
      )}

      {/* CLIENT ENHANCEMENT */}
      {mounted && (
        <>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            pagination={{ clickable: true }}
            breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1280: { slidesPerView: 5, spaceBetween: 20 },
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
            {screenshots.map((img, i) => (
            <SwiperSlide key={i}>
                <div
                className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => openLightbox(i)}
                >
                <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-[150px] sm:h-[180px] md:h-[200px] object-contain bg-white"
                />
                </div>
            </SwiperSlide>
            ))}
        </Swiper>

          <Lightbox
            open={open}
            close={handleClose}
            index={index}
            on={{ view: ({ index }) => setIndex(index) }}
            slides={screenshots}
          />
        </>
      )}
    </section>
  );
}
