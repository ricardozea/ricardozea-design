"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useContext, useEffect, useRef } from "react";
import { ThemeToggle, ThemeContext } from "./ThemeSwitcher";

export default function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHomeLogo, setShowHomeLogo] = useState(false);
  const { theme, mounted } = useContext(ThemeContext);

  const navLinksContainerRef = useRef(null);
  const activeNavLinkRef = useRef(null);
  const [navIndicator, setNavIndicator] = useState({ x: 0, w: 0, visible: false });
  const indicatorSwapTimeoutRef = useRef(null);
  const [allowIndicatorMotion, setAllowIndicatorMotion] = useState(false);
  const indicatorEnableMotionRafRef = useRef(null);
  const indicatorHideTimeoutRef = useRef(null);
  const indicatorVisibleRef = useRef(false);

  const isAutoScrollingRef = useRef(false);
  const scrollEndTimeoutRef = useRef(null);
  const handleScrollRef = useRef(null);

  const logoSrc = (mounted && theme === 'light')
    ? "/images/logo-ricardo-zea-for-light.svg"
    : "/images/logo-ricardo-zea-for-dark.svg";
  // Prevent body scroll when menu is open
  const scrollYRef = useRef(0);

  useEffect(() => {
    indicatorVisibleRef.current = navIndicator.visible;
  }, [navIndicator.visible]);

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

  useEffect(() => {
    if (!isHomePage) {
      setShowHomeLogo(true);
      return;
    }

    const hero = document.getElementById('home') || document.querySelector('.hero');
    if (!hero) {
      setShowHomeLogo(true);
      return;
    }

    const handleScroll = () => {
      if (isAutoScrollingRef.current) return;

      const heroHeading = document.querySelector('h1.heading-hero.hero-title');
      const threshold = heroHeading
        ? heroHeading.getBoundingClientRect().bottom + window.scrollY
        : hero.offsetHeight;
      setShowHomeLogo(window.scrollY >= threshold);
    };

    handleScrollRef.current = handleScroll;

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScrollRef.current = null;
    };
  }, [isHomePage]);

  useEffect(() => {
    const onScroll = () => {
      if (!isAutoScrollingRef.current) return;
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
      }

      scrollEndTimeoutRef.current = setTimeout(() => {
        isAutoScrollingRef.current = false;
        if (handleScrollRef.current) {
          handleScrollRef.current();
        }
      }, 150);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
        scrollEndTimeoutRef.current = null;
      }
    };
  }, []);

  const updateNavIndicator = (el) => {
    if (!navLinksContainerRef.current || !el) return;
    const containerRect = navLinksContainerRef.current.getBoundingClientRect();
    const linkRect = el.getBoundingClientRect();

    if (activeNavLinkRef.current === el) {
      setNavIndicator((prev) => (prev.visible ? prev : { ...prev, visible: true }));
      return;
    }

    const nextX = linkRect.left - containerRect.left;
    const nextW = linkRect.width;

    if (indicatorSwapTimeoutRef.current) {
      clearTimeout(indicatorSwapTimeoutRef.current);
      indicatorSwapTimeoutRef.current = null;
    }

    if (indicatorEnableMotionRafRef.current) {
      cancelAnimationFrame(indicatorEnableMotionRafRef.current);
      indicatorEnableMotionRafRef.current = null;
    }

    if (indicatorHideTimeoutRef.current) {
      clearTimeout(indicatorHideTimeoutRef.current);
      indicatorHideTimeoutRef.current = null;
    }

    activeNavLinkRef.current = el;

    if (!indicatorVisibleRef.current) {
      setAllowIndicatorMotion(false);
      setNavIndicator({ x: nextX, w: nextW, visible: true });
      indicatorEnableMotionRafRef.current = requestAnimationFrame(() => {
        indicatorEnableMotionRafRef.current = null;
        setAllowIndicatorMotion(true);
      });
      return;
    }

    setAllowIndicatorMotion(true);
    setNavIndicator({ x: nextX, w: nextW, visible: true });
  };

  useEffect(() => {
    if (!isMenuOpen) return;
    activeNavLinkRef.current = null;
    setNavIndicator((prev) => ({ ...prev, visible: false }));
    setAllowIndicatorMotion(false);
    if (indicatorSwapTimeoutRef.current) {
      clearTimeout(indicatorSwapTimeoutRef.current);
      indicatorSwapTimeoutRef.current = null;
    }
    if (indicatorEnableMotionRafRef.current) {
      cancelAnimationFrame(indicatorEnableMotionRafRef.current);
      indicatorEnableMotionRafRef.current = null;
    }
    if (indicatorHideTimeoutRef.current) {
      clearTimeout(indicatorHideTimeoutRef.current);
      indicatorHideTimeoutRef.current = null;
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (isMenuOpen) return;
      if (!navIndicator.visible) return;
      if (!activeNavLinkRef.current) return;
      updateNavIndicator(activeNavLinkRef.current);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMenuOpen, navIndicator.visible]);

  const hideNavIndicator = () => {
    if (indicatorSwapTimeoutRef.current) {
      clearTimeout(indicatorSwapTimeoutRef.current);
      indicatorSwapTimeoutRef.current = null;
    }
    if (indicatorEnableMotionRafRef.current) {
      cancelAnimationFrame(indicatorEnableMotionRafRef.current);
      indicatorEnableMotionRafRef.current = null;
    }
    if (indicatorHideTimeoutRef.current) {
      clearTimeout(indicatorHideTimeoutRef.current);
      indicatorHideTimeoutRef.current = null;
    }

    indicatorHideTimeoutRef.current = setTimeout(() => {
      indicatorHideTimeoutRef.current = null;
      setAllowIndicatorMotion(false);
      setNavIndicator((prev) => ({ ...prev, visible: false }));
    }, 60);
  };

  const handleNavLinksMouseMove = (e) => {
    const item = e.target?.closest?.('a, .theme-switcher');
    if (item && navLinksContainerRef.current?.contains(item)) {
      updateNavIndicator(item);
      return;
    }
    hideNavIndicator();
  };

  const handleNavClick = (targetId) => {
    setIsMenuOpen(false);

    if (targetId !== 'home') {
      isAutoScrollingRef.current = true;
      setShowHomeLogo(true);
    }

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
    const heroMain = document.getElementById('hero-main');
    if (heroMain) {
      heroMain.scrollIntoView({ behavior: "smooth", block: "start" });
      heroMain.focus();
      return;
    }

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
        href="#hero-main"
        onClick={handleSkipToContent}
        className="skip-to-content"
      >
        Skip to content
      </a>
      <nav
        className={`main-nav-container ${isHomePage ? "home" : ""} ${
          isHomePage && showHomeLogo ? "show-home-logo" : ""
        } ${isMenuOpen ? "menu-open" : ""}`}
      >
        <div className="nav-inner-container">
          <a
            href="/"
            className="nav-logo"
            onClick={handleHomeClick}
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

          <div
            className="nav-links-container"
            ref={navLinksContainerRef}
            onMouseMove={handleNavLinksMouseMove}
            onMouseLeave={hideNavIndicator}
          >
            <span
              className={`nav-hover-indicator${allowIndicatorMotion ? ' is-motion' : ''}`}
              aria-hidden="true"
              style={{
                '--nav-indicator-x': `${navIndicator.x}px`,
                '--nav-indicator-w': `${navIndicator.w}px`,
                opacity: navIndicator.visible ? 1 : 0,
              }}
            />
            <a
              href="#projects"
              onMouseEnter={(e) => updateNavIndicator(e.currentTarget)}
              onFocus={(e) => updateNavIndicator(e.currentTarget)}
              onBlur={hideNavIndicator}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("projects");
              }}
            >
              Projects
            </a>
            <a
              href="#skills"
              onMouseEnter={(e) => updateNavIndicator(e.currentTarget)}
              onFocus={(e) => updateNavIndicator(e.currentTarget)}
              onBlur={hideNavIndicator}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("skills");
              }}
            >
              Skills
            </a>
            <a
              href="#data"
              onMouseEnter={(e) => updateNavIndicator(e.currentTarget)}
              onFocus={(e) => updateNavIndicator(e.currentTarget)}
              onBlur={hideNavIndicator}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("data");
              }}
            >
              Data
            </a>
            <a
              href="#testimonials"
              onMouseEnter={(e) => updateNavIndicator(e.currentTarget)}
              onFocus={(e) => updateNavIndicator(e.currentTarget)}
              onBlur={hideNavIndicator}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("testimonials");
              }}
            >
              Testimonials
            </a>
            <a
              href="#about"
              onMouseEnter={(e) => updateNavIndicator(e.currentTarget)}
              onFocus={(e) => updateNavIndicator(e.currentTarget)}
              onBlur={hideNavIndicator}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("about");
              }}
            >
              About
            </a>
            <a
              href="#authoring"
              onMouseEnter={(e) => updateNavIndicator(e.currentTarget)}
              onFocus={(e) => updateNavIndicator(e.currentTarget)}
              onBlur={hideNavIndicator}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("authoring");
              }}
            >
              Writing
            </a>
            <a
              href="#contact"
              onMouseEnter={(e) => updateNavIndicator(e.currentTarget)}
              onFocus={(e) => updateNavIndicator(e.currentTarget)}
              onBlur={hideNavIndicator}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("contact");
              }}
            >
              Contact
            </a>
            <ThemeToggle
              onToggle={() => setIsMenuOpen(false)}
              onMouseEnter={(e) => updateNavIndicator(e.currentTarget)}
              onFocus={(e) => updateNavIndicator(e.currentTarget)}
              onBlur={hideNavIndicator}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
