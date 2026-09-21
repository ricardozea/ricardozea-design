import SocialIcons from "./SocialIcons";
import { Tooltip } from "./Tooltip";

export default function Footer() {
	return (
		<footer className="footer">
			<div className="footer-container">
				{/* Top Section */}
				<div className="logo-nav-container">
					{/* Logo */}
					<div className="footer-logo reveal reveal-fade">
						<img
							src="/images/logo-ricardo-zea-full.svg"
							alt="Ricardo Zea Logo"
							className="footer-logo-image"
							width="240"
							height="80"
						/>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="credits-container">
					{/* Credits */}
					<div className="footer-credits">
						<p className="footer-credits-text reveal reveal-fade">
							2006 | {new Date().getFullYear().toString()} - v6.0 - Designed and coded by me. After all, I claim I know HTML and CSS, the proof is all around <span className="reveal reveal-slide" data-reveal-delay="0.1">☝🏽</span><span className="reveal reveal-slide" data-reveal-delay="0.2">☝🏽</span><span className="reveal reveal-slide" data-reveal-delay="0.3">👇🏽</span><span className="reveal reveal-slide" data-reveal-delay="0.4">👇🏽</span><span className="reveal reveal-slide" data-reveal-delay="0.5">👈🏽</span><span className="reveal reveal-slide" data-reveal-delay="0.6">👉🏽</span><span className="reveal reveal-slide" data-reveal-delay="0.7">👈🏽</span><span className="reveal reveal-slide" data-reveal-delay="0.8">👉🏽</span><span className="reveal reveal-slide" data-reveal-delay="0.9">🅱️</span><span className="reveal reveal-slide" data-reveal-delay="1.0">🅰️</span><span className="reveal reveal-slide" data-reveal-delay="1.1">💥</span><span className="reveal reveal-slide" data-reveal-delay="1.2">🤌🏽</span> <span className="reveal reveal-slide" data-reveal-delay="1.3">lol.</span>
						</p>
						<div className="tech-stack-container">
							<p className="reveal reveal-line">This is what I used to build this thing:</p>
							<div className="tech-stack-container">

								{/* Web Section */}
								<div className="tech-section-container reveal reveal-line" data-reveal-delay="0.1">
									<span className="tech-title">Web:</span>
									<div className="tech-logos">
										<Tooltip tabIndex="0">
											<span>HTML5</span>
											<img src="/images/logo-html5.svg" alt="HTML5 logo" width="24" height="24" />
										</Tooltip>
										<Tooltip tabIndex="0">
											<span>CSS3</span>
											<img src="/images/logo-css3.svg" alt="CSS3 logo" width="24" height="24" />
										</Tooltip>
										<Tooltip tabIndex="0">
											<span>JavaScript</span>
											<img src="/images/logo-js.svg" alt="JavaScript logo" width="24" height="24" />
										</Tooltip>
										<Tooltip tabIndex="0">
											<span>TailwindCSS</span>
											<img src="/images/logo-tailwindcss.svg" alt="Tailwind CSS logo" width="24" height="24" />
										</Tooltip>
									</div>
								</div>

								{/* Development Section */}
								<div className="tech-section-container reveal reveal-line" data-reveal-delay="0.3">
									<span className="tech-title">Development:</span>
									<div className="tech-logos">
										<Tooltip tabIndex="0">
											<span>Devin</span>
											<img src="/images/logo-devin.svg" alt="Devin logo" width="24" height="24" />
										</Tooltip>
										<Tooltip tabIndex="0">
											<span>Antigravity</span>
											<img src="/images/logo-antigravity.svg" alt="Antigravity logo" width="24" height="24" />
										</Tooltip>
										<Tooltip tabIndex="0">
											<span>Next.js</span>
											<img src="/images/logo-nextjs.svg" alt="Next.js logo" width="24" height="24" />
										</Tooltip>
										<Tooltip tabIndex="0">
											<span>Node.js</span>
											<img src="/images/logo-nodejs.svg" alt="Node.js logo" width="24" height="24" />
										</Tooltip>
										<Tooltip tabIndex="0">
											<span>React</span>
											<img src="/images/logo-react.svg" alt="React logo" width="24" height="24" />
										</Tooltip>
										<Tooltip tabIndex="0">
											<span>GitHub</span>
											<img src="/images/logo-github.svg" alt="GitHub logo" width="24" height="24" />
										</Tooltip>
										<Tooltip tabIndex="0">
											<span>Vercel</span>
											<img src="/images/logo-vercel.svg" alt="Vercel logo" width="24" height="24" />
										</Tooltip>
										<Tooltip tabIndex="0">
											<span>Motion</span>
											<img src="/images/logo-motion.svg" alt="Motion logo" width="24" height="24" />
										</Tooltip>
									</div>
								</div>

								{/* Design Section */}
								<div className="tech-section-container reveal reveal-line" data-reveal-delay="0.5">
									<span className="tech-title">Design:</span>
									<div className="tech-logos">
										<Tooltip tabIndex="0">
											<span>Figma</span>
											<img src="/images/logo-figma.svg" alt="Figma logo" width="24" height="24" />
										</Tooltip>
										<Tooltip tabIndex="0">
											<span>Color-Ramp.com</span>
											<img src="/images/logo-color-ramp.svg" alt="Color-Ramp.com logo" width="24" height="24" />
										</Tooltip>
										<Tooltip tabIndex="0">
											<span>Google Fonts</span>
											<img src="/images/logo-google-fonts.svg" alt="Google Fonts logo" width="24" height="24" />
										</Tooltip>
										<Tooltip tabIndex="0">
											<span>Phosphor Icons</span>
											<img src="/images/logo-phosphor.svg" alt="Phosphor Icons logo" width="24" height="24" />
										</Tooltip>
									</div>
								</div>

								{/* AI Section */}
								<div className="tech-section-container reveal reveal-line" data-reveal-delay="0.7">
									<span className="tech-title">AI:</span>
									<div className="tech-logos">
										<Tooltip tabIndex="0">
											<span>Figma</span>
											<img src="/images/logo-figma.svg" alt="Figma logo" width="24" height="24" />
										</Tooltip>
										<Tooltip tabIndex="0">
											<span>UX Pilot</span>
											<img src="/images/logo-uxpilot.svg" alt="UX Pilot logo" width="24" height="24" />
										</Tooltip>
										<Tooltip tabIndex="0">
											<span>Banani</span>
											<img src="/images/logo-banani.svg" alt="Banani logo" width="24" height="24" />
										</Tooltip>
										<Tooltip tabIndex="0">
											<span>Dora AI</span>
											<img src="/images/logo-dora.svg" alt="Dora AI logo" width="24" height="24" />
										</Tooltip>
										<Tooltip tabIndex="0">
											<span>ChatGPT</span>
											<img src="/images/logo-openai.svg" alt="ChatGPT logo" width="24" height="24" />
										</Tooltip>
										<Tooltip tabIndex="0">
											<span>Gemini</span>
											<img src="/images/logo-gemini.svg" alt="Gemini logo" width="24" height="24" />
										</Tooltip>
										<Tooltip tabIndex="0">
											<span>Grok</span>
											<img src="/images/logo-grok.svg" alt="Grok logo" width="24" height="24" />
										</Tooltip>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Social Icons */}
					<SocialIcons className="footer-social-icons" />
				</div>
				<div className="footer-disclaimer reveal reveal-fade">
					<p className="disclaimer">All logos, characters, and brand names blah, blah, blah are the property of their respective owners. Their use does not imply endorsement. If anything, it's the other way around, lol.</p>
				</div>
			</div>
		</footer>
	);
}
