"use client";

import { useState, useEffect } from "react";
import { Download, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <a href="#" className="text-xl font-light text-zinc-900">
                SP
              </a>
            </div>

            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                {[
                  "about",
                  "skills",
                  "experience",
                  "certifications",
                  "contact",
                ].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item)}
                      className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                  </li>
                ))}
                <li>
                  <a
                    href="/gallery"
                    className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="/admin"
                    className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
                  >
                    Admin
                  </a>
                </li>
              </ul>
            </nav>

            <div className="hidden md:block">
              <a
                href="/SimonPhilipResume.pdf"
                download
                className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm transition-all duration-300 hover:border-zinc-300 hover:shadow-md"
              >
                <Download className="h-4 w-4 text-zinc-500 transition-all duration-300 group-hover:text-zinc-900" />
                <span>Resume</span>
              </a>
            </div>

            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-zinc-600 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex h-full flex-col overflow-y-auto pt-20">
              <nav className="flex-1 px-4 pt-8">
                <ul className="flex flex-col space-y-8">
                  {[
                    "about",
                    "skills",
                    "experience",
                    "certifications",
                    "contact",
                  ].map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => scrollToSection(item)}
                        className="text-lg font-medium text-zinc-900"
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </button>
                    </li>
                  ))}
                  <li>
                    <a
                      href="/gallery"
                      className="text-lg font-medium text-zinc-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Gallery
                    </a>
                  </li>
                  <li>
                    <a
                      href="/admin"
                      className="text-lg font-medium text-zinc-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin
                    </a>
                  </li>
                </ul>
              </nav>

              <div className="border-t border-zinc-200 p-4">
                <a
                  href="/SimonPhilipResume.pdf"
                  download
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 shadow-sm"
                >
                  <Download className="h-4 w-4 text-zinc-500" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
