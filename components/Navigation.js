"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useContext, useEffect, useRef } from "react";
import { ThemeToggle, ThemeContext } from "./ThemeSwitcher";

export default function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, mounted } = useContext(ThemeContext);

  const logoSrc = (mounted && theme === 'light')
    ? "/images/logo-ricardo-zea-for-light.svg"
    : "/images/logo-ricardo-zea-for-dark.svg";
  // Prevent body scroll when menu is open
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (isMenuOpen) {
      // Save current scroll position
      scrollYRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      const savedScrollY = scrollYRef.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      // Force instant scrolling to prevent visual jump
      window.scrollTo({
        top: savedScrollY,
        behavior: 'instant'
      });
    }
    // Cleanup to ensure styles are removed if component unmounts
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = (targetId) => {
    setIsMenuOpen(false);

    // If not on homepage, navigate to homepage with hash
    if (!isHomePage) {
      window.location.href = `/#${targetId}`;
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      // Update URL with hash
      window.history.pushState(null, '', `/#${targetId}`);

      // Use setTimeout to allow the menu close effect to run first (unlocking body)
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  const handleSkipToContent = (e) => {
    e.preventDefault();
    const mainHeading = document.querySelector('h1');
    if (mainHeading) {
      mainHeading.scrollIntoView({ behavior: "smooth", block: "start" });
      mainHeading.focus();
    }
  };

  const handleHomeClick = (e) => {
    if (!isHomePage) return;
    e.preventDefault();
    scrollYRef.current = 0;
    setIsMenuOpen(false);
    window.history.pushState(null, '', '/');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar-wrapper">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        onClick={handleSkipToContent}
        className="skip-to-content"
      >
        Skip to content
      </a>
      <nav
        className={`main-nav-container ${isHomePage ? "home" : ""} ${
          isMenuOpen ? "menu-open" : ""
        }`}
      >
        <div className="nav-inner-container">
          <a
            href="/"
            className={`nav-logo ${isHomePage ? "home-hidden" : ""}`}
          >
            <div className="relative w-full h-full">
              <Image
                src={logoSrc}
                alt="Ricardo Zea Logo"
                fill
                sizes="(max-width: 768px) 40px, 50px"
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </a>

          {/* Hamburger Menu Button */}
          <button
            className="hamburger-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="nav-links-container">
            <a
              href="/"
              onClick={handleHomeClick}
            >
              Home
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("projects");
              }}
            >
              Projects
            </a>
            <a
              href="#skills"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("skills");
              }}
            >
              Skills
            </a>
            <a
              href="#data"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("data");
              }}
            >
              Data
            </a>
            <a
              href="#testimonials"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("testimonials");
              }}
            >
              Testimonials
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("about");
              }}
            >
              About
            </a>
            <a
              href="#authoring"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("authoring");
              }}
            >
              Writing
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("contact");
              }}
            >
              Contact
            </a>
            <ThemeToggle onToggle={() => setIsMenuOpen(false)} />
          </div>
        </div>
      </nav>
    </div>
  );
}
