import SocialIcons from "./SocialIcons";

export default function Footer() {
	return (
		<footer className="footer">
			<div className="footer-container">
				{/* Top Section */}
				<div className="logo-nav-container">
					{/* Logo */}
					<div className="footer-logo">
						<img
							src="/images/logo-ricardo-zea-full.svg"
							alt="Ricardo Zea Logo"
							className="footer-logo-image"
						/>
					</div>

					{/* Navigation */}
					<nav className="footer-nav">
						<a href="#home">Home</a>
						<a href="#about">About</a>
						<a href="#contact">Contact</a>
					</nav>
				</div>

				{/* Bottom Section */}
				<div className="credits-container">
					{/* Credits */}
					<div className="footer-credits">
						<p className="footer-credits-text">
							2006 | {new Date().getFullYear().toString()} - v6.0 - Designed and coded by me. After all, I claim I know HTML and CSS, the proof is all around ☝🏽☝🏽👇🏽👇🏽👈🏽👉🏽👈🏽👉🏽🅱️🅰️💥🤌🏽 lol.
						</p>
						<div className="tech-stack-container">
							<p>This is what I used to build this thing:</p>
							<div className="tech-stack-container">

								{/* Web Section */}
								<div className="tech-section-container">
									<span className="tech-title">Web:</span>
									<div className="tech-logos">
										<img
											src="/images/logo-html5.svg"
											alt="HTML5"
										/>
										<img src="/images/logo-css3.svg" alt="CSS3" />
										<img
											src="/images/logo-js.svg"
											alt="JavaScript"
										/>
										<img
											src="/images/logo-tailwindcss.svg"
											alt="TailwindCSS"
										/>
									</div>
								</div>

								{/* Development Section */}
								<div className="tech-section-container">
									<span className="tech-title">Development:</span>
									<div className="tech-logos">
										<img
											src="/images/logo-windsurf.svg"
											alt="Windsurf"
										/>
										<img
											src="/images/logo-antigravity.svg"
											alt="Antigravity"
										/>
										<img
											src="/images/logo-nextjs.svg"
											alt="Next.js"
										/>
										<img
											src="/images/logo-nodejs.svg"
											alt="Node.js"
										/>
										<img
											src="/images/logo-react.svg"
											alt="React"
										/>
										<img
											src="/images/logo-motion.svg"
											alt="Motion"
										/>
									</div>
								</div>

								{/* Design Section */}
								<div className="tech-section-container">
									<span className="tech-title">Design:</span>
									<div className="tech-logos">
										<img
											src="/images/logo-figma.svg"
											alt="Figma"
										/>
										<img
											src="/images/logo-color-ramp.svg"
											alt="Color-Ramp.com"
										/>
										<img
											src="/images/logo-google-fonts.svg"
											alt="Google Fonts"
										/>
										<img
											src="/images/logo-phosphor.svg"
											alt="Phosphor"
											title="Phosphor Icons"
										/>
									</div>
								</div>

								{/* AI Section */}
								<div className="tech-section-container">
									<span className="tech-title">AI:</span>
									<div className="tech-logos">
										<img
											src="/images/logo-figma.svg"
											alt="Figma"
										/>
										<img
											src="/images/logo-uxpilot.svg"
											alt="UX Pilot"
										/>
										<img
											src="/images/logo-banani.svg"
											alt="Banani"
										/>
										<img
											src="/images/logo-dora.svg"
											alt="Dora AI"
										/>
										<img
											src="/images/logo-openai.svg"
											alt="ChatGPT"
										/>
										<img
											src="/images/logo-gemini.svg"
											alt="Gemini"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Social Icons */}
					<SocialIcons className="footer-social-icons" />
				</div>
				<div className="footer-disclaimer">
					<p className="disclaimer">All logos, characters, and brand names blah, blah, blah are the property of their respective owners. Their use does not imply endorsement.</p>
				</div>
			</div>
		</footer>
	);
}
