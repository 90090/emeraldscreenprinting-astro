import MarqueeLib from "react-fast-marquee";
import { useEffect, useRef, useState } from "react";

export default function ClientMarquee({ clientLogos }) {
  const containerRef = useRef(null);
  const [marqueeActive, setMarqueeActive] = useState(false);

  // Only activate the marquee on the client
  useEffect(() => {
    if (containerRef.current) {
      setMarqueeActive(true);
    }
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden">
      {!marqueeActive && (
        // Server-rendered HTML for SEO
        <ul className="flex flex-wrap gap-6 justify-center">
          {clientLogos.map((c) => (
            <li key={c.name}>
              <img
                src={c.src}
                alt={c.name}
                width="160"
                height="80"
                className="object-contain"
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      )}

      {marqueeActive && (
        // Client-enhanced animation
        <MarqueeLib gradient={false} speed={40} className="mt-6 h-30">
          {clientLogos.map((c) => (
            <div
              key={c.name}
              className="flex items-center justify-center w-36 h-20 md:w-44 md:h-24 mx-6 bg-white rounded-xl shadow transition-transform duration-300 hover:scale-110"
              title={c.name}
            >
              <img
                src={c.src}
                alt={c.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </MarqueeLib>
      )}
    </div>
  );
}
