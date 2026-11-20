'use client';

import { useEffect, useState } from 'react';

export default function LogoTicker() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		// Check initial theme
		const html = document.documentElement;
		setIsDark(html.classList.contains('dark'));

		// Listen for theme changes
		const observer = new MutationObserver(() => {
			setIsDark(html.classList.contains('dark'));
		});

		observer.observe(html, {
			attributes: true,
			attributeFilter: ['class'],
		});

		return () => observer.disconnect();
	}, []);

	const logoSrc = '/images/logos-companies-I-havent-worked-for-lol.svg';
	const filterStyle = isDark ? 'none' : 'brightness(0)';

	return (
		<div className="logo-ticker-track">
			<img
				src={logoSrc}
				alt="Company logos"
				width="1692"
				height="50"
				style={{ filter: filterStyle }}
			/>
			<img
				src={logoSrc}
				alt="Company logos"
				width="1692"
				height="50"
				aria-hidden="true"
				style={{ filter: filterStyle }}
			/>
		</div>
	);
}
