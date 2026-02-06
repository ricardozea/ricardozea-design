import SocialIcons from "./SocialIcons";
import { Tooltip } from "./Tooltip";

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
										<Tooltip tabIndex="0" aria-label="HTML5">
											<span>HTML5</span>
											<img src="/images/logo-html5.svg" alt="" aria-hidden="true" />
										</Tooltip>
										<Tooltip tabIndex="0" aria-label="CSS3">
											<span>CSS3</span>
											<img src="/images/logo-css3.svg" alt="" aria-hidden="true" />
										</Tooltip>
										<Tooltip tabIndex="0" aria-label="JavaScript">
											<span>JavaScript</span>
											<img src="/images/logo-js.svg" alt="" aria-hidden="true" />
										</Tooltip>
										<Tooltip tabIndex="0" aria-label="TailwindCSS">
											<span>TailwindCSS</span>
											<img src="/images/logo-tailwindcss.svg" alt="" aria-hidden="true" />
										</Tooltip>
									</div>
								</div>

								{/* Development Section */}
								<div className="tech-section-container">
									<span className="tech-title">Development:</span>
									<div className="tech-logos">
										<Tooltip tabIndex="0" aria-label="Windsurf">
											<span>Windsurf</span>
											<img src="/images/logo-windsurf.svg" alt="" aria-hidden="true" />
										</Tooltip>
										<Tooltip tabIndex="0" aria-label="Antigravity">
											<span>Antigravity</span>
											<img src="/images/logo-antigravity.svg" alt="" aria-hidden="true" />
										</Tooltip>
										<Tooltip tabIndex="0" aria-label="Next.js">
											<span>Next.js</span>
											<img src="/images/logo-nextjs.svg" alt="" aria-hidden="true" />
										</Tooltip>
										<Tooltip tabIndex="0" aria-label="Node.js">
											<span>Node.js</span>
											<img src="/images/logo-nodejs.svg" alt="" aria-hidden="true" />
										</Tooltip>
										<Tooltip tabIndex="0" aria-label="React">
											<span>React</span>
											<img src="/images/logo-react.svg" alt="" aria-hidden="true" />
										</Tooltip>
										<Tooltip tabIndex="0" aria-label="GitHub">
											<span>GitHub</span>
											<img src="/images/logo-github.svg" alt="" aria-hidden="true" />
										</Tooltip>
										<Tooltip tabIndex="0" aria-label="Vercel">
											<span>Vercel</span>
											<img src="/images/logo-vercel.svg" alt="" aria-hidden="true" />
										</Tooltip>
										<Tooltip tabIndex="0" aria-label="Motion">
											<span>Motion</span>
											<img src="/images/logo-motion.svg" alt="" aria-hidden="true" />
										</Tooltip>
									</div>
								</div>

								{/* Design Section */}
								<div className="tech-section-container">
									<span className="tech-title">Design:</span>
									<div className="tech-logos">
										<Tooltip tabIndex="0" aria-label="Figma">
											<span>Figma</span>
											<img src="/images/logo-figma.svg" alt="" aria-hidden="true" />
										</Tooltip>
										<Tooltip tabIndex="0" aria-label="Color-Ramp.com">
											<span>Color-Ramp.com</span>
											<img src="/images/logo-color-ramp.svg" alt="" aria-hidden="true" />
										</Tooltip>
										<Tooltip tabIndex="0" aria-label="Google Fonts">
											<span>Google Fonts</span>
											<img src="/images/logo-google-fonts.svg" alt="" aria-hidden="true" />
										</Tooltip>
										<Tooltip tabIndex="0" aria-label="Phosphor Icons">
											<span>Phosphor Icons</span>
											<img src="/images/logo-phosphor.svg" alt="" aria-hidden="true" />
										</Tooltip>
									</div>
								</div>

								{/* AI Section */}
								<div className="tech-section-container">
									<span className="tech-title">AI:</span>
									<div className="tech-logos">
										<Tooltip tabIndex="0" aria-label="Figma">
											<span>Figma</span>
											<img src="/images/logo-figma.svg" alt="" aria-hidden="true" />
										</Tooltip>
										<Tooltip tabIndex="0" aria-label="UX Pilot">
											<span>UX Pilot</span>
											<img src="/images/logo-uxpilot.svg" alt="" aria-hidden="true" />
										</Tooltip>
										<Tooltip tabIndex="0" aria-label="Banani">
											<span>Banani</span>
											<img src="/images/logo-banani.svg" alt="" aria-hidden="true" />
										</Tooltip>
										<Tooltip tabIndex="0" aria-label="Dora AI">
											<span>Dora AI</span>
											<img src="/images/logo-dora.svg" alt="" aria-hidden="true" />
										</Tooltip>
										<Tooltip tabIndex="0" aria-label="ChatGPT">
											<span>ChatGPT</span>
											<img src="/images/logo-openai.svg" alt="" aria-hidden="true" />
										</Tooltip>
										<Tooltip tabIndex="0" aria-label="Gemini">
											<span>Gemini</span>
											<img src="/images/logo-gemini.svg" alt="" aria-hidden="true" />
										</Tooltip>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Social Icons */}
					<SocialIcons className="footer-social-icons" />
				</div>
				<div className="footer-disclaimer">
					<p className="disclaimer">All logos, characters, and brand names blah, blah, blah are the property of their respective owners. Their use does not imply endorsement. Their use does not imply endorsement.</p>
				</div>
			</div>
		</footer>
	);
}
