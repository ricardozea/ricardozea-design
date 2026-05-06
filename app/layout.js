import './globals.css'; // Import Tailwind CSS
import { Roboto_Flex } from "next/font/google";
import { Alan_Sans } from "next/font/google";
import { ThemeProvider, ThemeStylesheet, ThemeToggle } from "../components/ThemeSwitcher";
import RevealController from "../components/RevealController";
import DeferredStyles from "../components/DeferredStyles";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import BackToTop from "../components/BackToTop";
import ProjectPageBodyClass from "../components/ProjectPageBodyClass";

const robotoFlex = Roboto_Flex({
	subsets: ["latin"],
	variable: "--font-roboto-flex",
	display: 'swap',
	axes: ['wght', 'wdth', 'opsz'],
	weight: 'variable',
});

const alanSans = Alan_Sans({
	subsets: ["latin"],
	variable: "--font-alan-sans",
	display: 'swap',
	weight: 'variable',
	fallback: ['sans-serif'],
});

export const metadata = {
	metadataBase: new URL('https://ricardozea.design'),
	title: {
		default: 'Ricardo Zea - Sr. Web & Product Designer',
		template: '%s | Ricardo Zea',
	},
	description:
		'Portfolio of Ricardo Zea, Sr. Web & Product Designer. 20+ years of experience in the industry. He will NOT design your PowerPoint template 😂.',
	keywords: [
		'Ricardo Zea',
		'Product Designer',
		'Web Designer',
		'UX Designer',
		'UI Designer',
		'Frontend Developer',
		'Design Systems',
		'Portfolio',
	],
	authors: [{ name: 'Ricardo Zea' }],
	creator: 'Ricardo Zea',
	publisher: 'Ricardo Zea',
	applicationName: 'Ricardo Zea',
	alternates: {
		canonical: '/',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
	},
	openGraph: {
		type: 'website',
		url: '/',
		siteName: 'Ricardo Zea',
		title: 'Ricardo Zea - Sr. Web & Product Designer',
		description:
			'Portfolio of Ricardo Zea, Sr. Web & Product Designer. 20+ years of experience in the industry. He will NOT design your PowerPoint template 😂.',
		images: [
			{
				url: '/og.png',
				width: 1200,
				height: 630,
				alt: 'Ricardo Zea - Sr. Web & Product Designer',
				type: 'image/png',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Ricardo Zea - Sr. Web & Product Designer',
		description:
			'Portfolio of Ricardo Zea, Sr. Web & Product Designer. 20+ years of experience in the industry. He will NOT design your PowerPoint template 😂.',
		images: ['/og.png'],
	},
};

export const viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#000000' },
	],
};

export default function RootLayout({ children }) {
	return (
		<ThemeProvider>
			<html lang="en" suppressHydrationWarning className="reveal-init">
				<head>
					{/* Inline critical CSS for above-the-fold content */}
					<style dangerouslySetInnerHTML={{__html: `:root{--space-xxl:40px;--space-xl:32px;--space-l:24px;--space-m:16px;--space-s:12px;--space-xs:8px;--corner-l:16px;--corner-m:8px;--corner-s:4px;--corner-xs:2px;--hero-beams-offset-x:-6;--hero-beams-speed-multiplier:2;--hero-beams-base-duration:14}*,*::before,*::after{box-sizing:border-box;letter-spacing:calc(progress(1em,18px,77px)*-0.05em)}html{font-size:clamp(1rem,0.5rem + 1vw,1.125rem);overflow-x:hidden}body{margin:0;padding:0;font-size:1rem;font-family:var(--font-roboto-flex),sans-serif;font-weight:200;text-wrap:pretty;overflow-x:hidden}html.reveal-init .reveal{opacity:0;transform:translateY(12px);will-change:transform,opacity,clip-path}.hero{position:relative;min-height:100vh;display:flex;flex-direction:column}.hero-bg{z-index:0;object-fit:cover;object-position:center}.hero-content{flex:1;display:flex;flex-direction:column;position:relative;z-index:2}.hero-main{flex:1;display:flex;flex-direction:column;justify-content:center;gap:1.5rem}.heading-hero{font-size:clamp(2.5rem,5vw,3.56rem);line-height:1.1;font-weight:200;margin:0}.text-description{font-size:clamp(1.125rem,2vw,1.44rem);line-height:1.6}.hero-description{color:var(--text-persistent-light)}.strikethrough{text-decoration:line-through}.skip-to-content{position:absolute;top:-100px;left:0;z-index:100;padding:0.5rem 1rem;background:var(--bg-surface);color:var(--text-bold)}.skip-to-content:focus{top:0}.cta-button{display:inline-flex;align-items:center;gap:0.5rem;padding:1rem 2rem;font-size:1rem;font-weight:400;text-decoration:none;border-radius:var(--corner-m);transition:all 0.3s ease}.glow-button{position:relative;z-index:1;background:linear-gradient(135deg,#8B5CF6 0%,#6366F1 100%);color:white;border:none;outline:2px solid transparent;outline-offset:3px}.glow-button-wrap{position:relative;display:inline-block;border-radius:var(--corner-m)}`}} />
					{/* Theme stylesheets are managed by ThemeStylesheet component */}
					<ThemeStylesheet />
					{/* Preload deferred stylesheet */}
					<link rel="preload" href="/css/styles-ricardozea-v6.css" as="style" />
					<noscript>
						<link rel="stylesheet" href="/css/styles-ricardozea-v6.css" />
					</noscript>
					<link rel="icon" href="/favicon.ico?v=2" sizes="any" />
					<noscript>
						<link
							rel="stylesheet"
							href="/css/color-tokens-dark-mode.css"
							data-theme="dark"
						/>
					</noscript>
					<script
						dangerouslySetInnerHTML={{
							__html: `
								(function() {
									try {
										const savedTheme = localStorage.getItem('theme') || 'dark';
										// Only set the class on the HTML element for immediate visual feedback
										// The actual stylesheet will be handled by the ThemeStylesheet component
										if (savedTheme === 'light') {
											document.documentElement.classList.add('light');
											document.documentElement.classList.remove('dark');
										} else {
											document.documentElement.classList.add('dark');
											document.documentElement.classList.remove('light');
										}
									} catch (e) {
										console.error('Error setting initial theme', e);
									}
								})();
							`,
						}}
					/>
				</head>
				<body
					id="top"
					className={`${robotoFlex.variable} ${alanSans.variable} antialiased homepage`}
					suppressHydrationWarning
				>
					<ProjectPageBodyClass />
					<a
						href="#start-content"
						className="skip-to-content"
					>
						Skip to content
					</a>
					<main tabIndex={-1}>
						{children}
					</main>
					<DeferredStyles />
					<RevealController />
					<Analytics />
					<SpeedInsights />
					<BackToTop />
				</body>
			</html>
		</ThemeProvider>
	);
}
