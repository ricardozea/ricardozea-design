"use client";

import { usePathname } from "next/navigation";
import { useState, useContext, useEffect, useRef } from "react";
import { ThemeToggle, ThemeContext } from "./ThemeSwitcher";

export default function Navigation() {
	const pathname = usePathname();
	const isHomePage = pathname === "/";
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showHomeLogo, setShowHomeLogo] = useState(false);
	const [hasMountedNav, setHasMountedNav] = useState(false);
	const { theme, mounted } = useContext(ThemeContext);

	const navLinksContainerRef = useRef(null);
	const activeNavLinkRef = useRef(null);
	const [navIndicator, setNavIndicator] = useState({ x: 0, w: 0, visible: false });
	const [allowIndicatorMotion, setAllowIndicatorMotion] = useState(false);

	const isAutoScrollingRef = useRef(false);
	const scrollEndTimeoutRef = useRef(null);
	const handleScrollRef = useRef(null);
	const scrollYRef = useRef(0);

	const logoSrc = (mounted && theme === 'light')
		? "/images/logo-ricardo-zea-for-light.svg"
		: "/images/logo-ricardo-zea-for-dark.svg";

	const navItems = [
		{ href: '#projects', label: 'Projects', targetId: 'projects' },
		{ href: '#skills', label: 'Skills', targetId: 'skills' },
		{ href: '#data', label: 'Data', targetId: 'data' },
		{ href: '#testimonials', label: 'Testimonials', targetId: 'testimonials' },
		{ href: '#about', label: 'About', targetId: 'about' },
		{ href: '#authoring', label: 'Writing', targetId: 'authoring' },
		{ href: '#contact', label: 'Contact', targetId: 'contact' },
	];

	useEffect(() => {
		const animationFrame = window.requestAnimationFrame(() => {
			setHasMountedNav(true);
		});

		return () => {
			window.cancelAnimationFrame(animationFrame);
		};
	}, []);

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

		let cachedThreshold = 0;
		let lastShowLogo = false;
		const updateThreshold = () => {
			const heroHeading = document.querySelector('h1.heading-hero.hero-title');
			cachedThreshold = heroHeading
				? heroHeading.getBoundingClientRect().bottom + window.scrollY
				: hero.offsetHeight;
		};

		const handleScroll = () => {
			if (isAutoScrollingRef.current) return;
			const shouldShow = window.scrollY >= cachedThreshold;
			if (shouldShow !== lastShowLogo) {
				lastShowLogo = shouldShow;
				setShowHomeLogo(shouldShow);
			}
		};

		handleScrollRef.current = handleScroll;

		updateThreshold();
		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', updateThreshold, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', updateThreshold);
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

	useEffect(() => {
		if (!isHomePage || isMenuOpen) return;

		let sectionCache = [];
		const updateSectionCache = () => {
			sectionCache = navItems.map((item) => {
				const section = document.getElementById(item.targetId);
				if (!section) return null;
				return {
					targetId: item.targetId,
					top: section.offsetTop,
					bottom: section.offsetTop + section.offsetHeight,
				};
			}).filter(Boolean);
		};

		const updateIndicatorOnScroll = () => {
			if (isAutoScrollingRef.current) return;
			if (window.__scrollingToTop) {
				activeNavLinkRef.current = null;
				setNavIndicator((prev) => ({ ...prev, visible: false }));
				return;
			}

			if (window.scrollY < 100) {
				activeNavLinkRef.current = null;
				setNavIndicator((prev) => ({ ...prev, visible: false }));
				return;
			}

			const scrollPos = window.scrollY + 150;

			for (const cached of sectionCache) {
				if (scrollPos >= cached.top && scrollPos < cached.bottom) {
					const navLink = navLinksContainerRef.current?.querySelector(`a[href="#${cached.targetId}"]`);
					if (navLink && activeNavLinkRef.current !== navLink) {
						activeNavLinkRef.current = navLink;
						updateNavIndicator(navLink);
					}
					return;
				}
			}
		};

		updateSectionCache();
		window.addEventListener('scroll', updateIndicatorOnScroll, { passive: true });
		window.addEventListener('resize', updateSectionCache, { passive: true });
		return () => {
			window.removeEventListener('scroll', updateIndicatorOnScroll);
			window.removeEventListener('resize', updateSectionCache);
		};
	}, [isHomePage, isMenuOpen]);

	const updateNavIndicator = (el) => {
		if (!navLinksContainerRef.current || !el) return;
		activeNavLinkRef.current = el;
		const containerRect = navLinksContainerRef.current.getBoundingClientRect();
		const linkRect = el.getBoundingClientRect();
		setNavIndicator({
			x: linkRect.left - containerRect.left,
			w: linkRect.width,
			visible: true,
		});
		setAllowIndicatorMotion(true);
	};

	useEffect(() => {
		if (!isMenuOpen) return;
		activeNavLinkRef.current = null;
		setNavIndicator((prev) => ({ ...prev, visible: false }));
		setAllowIndicatorMotion(false);
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


	const handleNavClick = (targetId) => {
		if (targetId !== 'home') {
			isAutoScrollingRef.current = true;
			setShowHomeLogo(true);
		}

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
		activeNavLinkRef.current = null;
		setNavIndicator({ x: 0, w: 0, visible: false });
		setAllowIndicatorMotion(false);
		isAutoScrollingRef.current = true;
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
			<nav
				className={`main-nav-container ${isHomePage ? "home" : ""} ${isHomePage && showHomeLogo ? "show-home-logo" : ""} ${isMenuOpen ? "menu-open" : ""}`}
			>
				<div className="nav-inner-container">
					<a
						href="/"
						className="nav-logo"
						onClick={handleHomeClick}
						tabIndex={-1}
					>
						<img
							src={logoSrc}
							alt="Ricardo Zea Logo"
							className="object-contain drop-shadow-lg"
							fetchPriority="high"
						/>
					</a>

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
						className={`nav-links-container${hasMountedNav ? ' nav-mounted' : ''}`}
						ref={navLinksContainerRef}
					>
						<span
							className={`nav-hover-indicator${allowIndicatorMotion ? ' is-motion' : ''}`}
							aria-hidden="true"
							style={{
								'--nav-indicator-x': `${navIndicator.x}px`,
								'--nav-indicator-w': `${navIndicator.w}px`,
								'--nav-indicator-scale-x': 1,
								'--nav-indicator-scale-y': 1,
								opacity: navIndicator.visible ? 1 : 0,
								pointerEvents: navIndicator.visible ? 'auto' : 'none',
								display: navIndicator.visible ? 'block' : 'none',
							}}
						/>
						{navItems.map((item, index) => (
							<a
								key={item.targetId}
								href={item.href}
								data-nav-item
								style={{ '--nav-item-index': index }}
								onMouseEnter={(e) => updateNavIndicator(e.currentTarget)}
								onFocus={(e) => updateNavIndicator(e.currentTarget)}
								onClick={(e) => {
									e.preventDefault();
									handleNavClick(item.targetId);
								}}
							>
								{item.label}
							</a>
						))}
						<ThemeToggle
							data-nav-item
							style={{ '--nav-item-index': navItems.length }}
							onToggle={() => setIsMenuOpen(false)}
							onMouseEnter={(e) => updateNavIndicator(e.currentTarget)}
							onFocus={(e) => updateNavIndicator(e.currentTarget)}
						/>
					</div>
				</div>
			</nav>
		</div>
	);
}
