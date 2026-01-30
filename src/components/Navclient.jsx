import { useState, useRef, useEffect } from "react";

export default function NavClient({ links }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.scrollHeight);
    }
  }, [menuRef, links]);

  return (
    <nav className="bg-emerald-700 shadow sticky top-0 z-50">
      <div className="relative w-full px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex flex-row items-center space-x-2 z-50">
          <img
            src="/logo-mostlywhite.webp"
            alt="Emerald Logo"
            className="w-16 md:w-20"
            loading="lazy"
          />
          <div className="flex flex-col text-left">
            <span className="text-sm md:text-lg font-semibold text-emerald-400">
              Emerald
            </span>
            <span className="text-sm md:text-sm lg:text-base text-white font-medium leading-tight">
              Screen Printing &amp; Embroidery
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex space-x-10 absolute inset-0 justify-center items-center">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg font-semibold text-white hover:text-[rgb(208,177,65)] transition"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 text-2xl text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        style={{
          maxHeight: isOpen ? `${menuHeight}px` : "0px",
        }}
        className="overflow-hidden flex flex-col items-center px-4 transition-all duration-300 lg:hidden bg-emerald-700 text-white space-y-4"
      >
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="w-full text-center py-2 px-4 rounded hover:text-[rgb(208,177,65)] transition"
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
