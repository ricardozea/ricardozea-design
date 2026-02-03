"use client";

import Footer from "@/components/Footer";
import Navigation from '@/components/Navigation';
import DynamicFrame from "@/components/DynamicFrame";
import ProjectImage from "@/components/ProjectImage";
import { useState } from 'react';
import { ExternalLink } from "@/components/ExternalLink";
import {
	ArrowLeft,
	ArrowRight,
	CalendarStar,
	CodeIcon,
	Info,
	PencilLine,
	PencilRuler,
	Tag,
	UsersThree,
} from '@phosphor-icons/react/ssr';

export default function ProjectDetail() {
	const currentYear = new Date().getFullYear();
	const yearsOfEvolution = currentYear - 2024;
	const [showAnswer, setShowAnswer] = useState(false);

	return (
		<>
			<Navigation />

			{/* Project Hero Section */}
			<section className="project-hero">
				<div className="section-container">

					<div className="project-hero-container max-w-[1200px] mx-auto">
						{/* Project Title */}
						<h1 className="heading-hero project-title mb-12">
							A <span className="text-brand-secondary">Design System</span> and <span className="text-brand-primary">Product Design</span> for NodeSource
						</h1>

						<div className="meta-data-container">
							{/* Project Description */}
							<div className="project-description">
								<p className="text-description">
									Design systems are all the rage. Practically every single post in LinkedIn is about these darn design systems. Eeeeeeveryone is making them. Well, here's mine, lol.
								</p>
								<p>
									In addition, when I inherited this project I was provided files made in… Sketch 😒. I'm glad that's not a thing anymore, haha. So I imported a 💩-ton files to Figma and today I have taken NodeSource's flagship product, N|Solid Console, their website, and other products to a whole new level 😁👍🏽.
								</p>
								<p>
									Quick note: I've been freelancing for NodeSource since 2020. What you'll see here is from 2024 until now.
								</p>
							</div>

							{/* Project Meta */}
							<div className="project-meta-container flex flex-col gap-3">
								<div className="meta-item">
									<CalendarStar size={24} weight="regular" className="icon-accent-blue-subtle shrink-0" />
									<div>
										<span className="meta-label mr-1">Year:</span>
										<span className="meta-value">2024 - Current</span>
									</div>
								</div>
								<div className="meta-item">
									<UsersThree size={24} weight="regular" className="icon-accent-blue-subtle shrink-0" />
									<div>
										<span className="meta-label mr-1">Team Size:</span>
										<span className="meta-value">CEO, CTO, Solutions Director, Project Manager, 8 Devs (Internal), Designer (Moi)</span>
									</div>
								</div>
								<div className="meta-item">
									<PencilLine size={24} weight="regular" className="icon-accent-blue-subtle shrink-0" />
									<div>
										<span className="meta-label mr-1">Role:</span>
										<span className="meta-value">Sr. Web & Product Designer</span>
									</div>
								</div>
								<div className="meta-item">
									<PencilRuler size={24} weight="regular" className="icon-accent-blue-subtle shrink-0" />
									<div>
										<span className="meta-label mr-1">Tools:</span>
										<span className="meta-value">Figma, Midjourney, <ExternalLink href="https://color-ramp.com/">Color-Ramp</ExternalLink>, UX Pilot, Zeplin, Windsurf, CodePen, Slack</span>
									</div>
								</div>
								<div className="meta-item">
									<CodeIcon
										size={24}
										weight="regular"
										className="icon-accent-blue-subtle shrink-0"
									/>
									<div>
										<span className="meta-label mr-1">Technologies:</span>
										<span className="meta-value">HTML, CSS, AI</span>
									</div>
								</div>
								<div className="meta-item">
									<Tag
										size={24}
										weight="regular"
										className="icon-accent-blue-subtle shrink-0 rotate-y-180"
									/>
									<div>
										<span className="meta-label mr-1">Tags:</span>
										<span className="meta-value">Design Systems, Product Design, Accessibility, Figma, AI (Midjourney), CodePen (HTML + CSS), Prototyping, Frontend</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<hr />

			{/* Project Data Section */}
			<section className="project-data">
				<div className="section-container">
					<h2 className="heading-section section-title-light mb-12">
						Almighty <span className="text-accent-blue-persistent">Numbers</span>
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
						{/* Data Card 1 */}
						<div className="project-data-card red flex flex-col items-center justify-center gap-2 p-8 rounded-lg">
							<h3 className="data-number">370+</h3>
							<p className="data-label">Components (and counting)</p>
						</div>

						{/* Data Card 2 */}
						<div className="project-data-card blue flex flex-col items-center justify-center gap-2 p-8 rounded-lg">
							<h3 className="data-number">100%</h3>
							<p className="data-label">Accessible (WCAG 2.2)</p>
						</div>

						{/* Data Card 3 */}
						<div className="project-data-card red flex flex-col items-center justify-center gap-2 p-8 rounded-lg">
							<h3 className="data-number">12</h3>
							<p className="data-label">Team Members</p>
						</div>

						{/* Data Card 4 */}
						<div className="project-data-card blue flex flex-col items-center justify-center gap-2 p-8 rounded-lg">
							<h3 className="data-number">{yearsOfEvolution}+</h3>
							<p className="data-label">Years of Evolution</p>
						</div>
					</div>
				</div>
			</section>

			<hr />

			{/* Project Images Section */}
			<section className="project-images">
				<div className="section-container">

					<div className="max-w-[1400px] mx-auto space-y-16">

						{/* Image Block */}
						<div className="project-image-block">
							<div className="project-image-description max-w-[1000px] mx-auto mb-8">
								<h3 className="text-section-subtitle">Origins</h3>
								<div className="description-container">
									<h4>What's the pattern?</h4>
									<p>
										Most of NodeSource's products start with the motif "N|"… yeah, a vertical bar (Pipe symbol). The names with "Solid|" are pricing plans.
									</p>
									<p>
										Check out all their products logos below 👇🏻:
									</p>
								</div>
							</div>
							<div className="project-image-container">
								<ProjectImage
									src="/images/nodesource/ncore-design-system-product-logos.png"
									caption="All NodeSource's products logos"
								/>
							</div>
						</div>

						{/* Image Block */}
						<div className="project-image-block">
							<div className="project-image-description max-w-[1000px] mx-auto mb-8">
								<h3 className="text-section-subtitle">Design System</h3>
								<div className="description-container">
									<h4>Name: N|Core</h4>
									<p>
										Obviously I had to use the "N|" motif somehow. And "Core" is a central system that everything else is built upon. That's how the name N|Core happen. Doh!
									</p>
									<p>
										Below: Cover design for the Figma file and justification page for the name N|Core below 👇🏽:
									</p>
								</div>
							</div>
							<div className="project-image-container grid grid-cols-1 items-end sm:grid-cols-2 gap-4">
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/ncore-design-system-cover.png"
										caption="N|Core Design System Cover"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/ncore-design-system-meaning.png"
										caption="Justification for N|Core Design System"
									/>
								</div>
							</div>
						</div>

						<hr />

						{/* Image Block */}
						<div className="project-image-block">
							<div className="project-image-description max-w-[1000px] mx-auto mb-8">
								<h3 className="text-section-subtitle">Figma Variables</h3>
								<div className="description-container">
									<h4>Primitives & Tokens for Color and Typography, Numbers, and Modular Scale variables</h4>
									<p>
										With these variables in place, creating new components is like "pttt!", easy peasy.
									</p>
									<h4>Did you build this design system from scratch?</h4>
									<p>
										What! No way! I used the <strong>UI Prep Design System</strong> as a starting point. I got access to the full DS file after completing the <strong>Design System Bootcamp</strong> by Molly Hellmut. I completed this bootcamp in October 13th, 2024.
									</p>
									<p>
										Check out <ExternalLink href="https://maven.com/certificate/sBHiXyRc">my certificate!</ExternalLink> lol.
									</p>
								</div>
							</div>
							<div className="project-image-container grid grid-cols-1 items-end sm:grid-cols-2 gap-4">
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/ncore-design-system-var-1-color-primitives.png"
										caption="Color Primitives"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/ncore-design-system-var-2-color-tokens.png"
										caption="Color Tokens"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/ncore-design-system-var-3-type-primitives.png"
										caption="Typography Primitives"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/ncore-design-system-var-4-type-tokens.png"
										caption="Typography Tokens"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/ncore-design-system-var-5-numbers.png"
										caption="Numbers"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/ncore-design-system-var-6-modular-scale.png"
										caption="Modular Scale (🙅🏽8pt grid system)"
									/>
								</div>
							</div>
						</div>

						<hr />

						{/* Image Block */}
						<div className="project-image-block">
							<div className="project-image-description max-w-[1000px] mx-auto mb-8">
								<h3 className="text-section-subtitle">Typography System</h3>
								<div className="description-container">
									<h4>Lets talk typography, will ya?</h4>
									<p className="info-text">
										<Info size={24} weight="regular" />Note: I will use the term "typeface" and "font" interchangeably. I DO KNOW the difference, but for the sake of making this thing somewhat enjoyable to read for designers and non-designers… whatever, lol.
									</p>

									<p>
										When I inheretied the NodeSource project, I was given the "Source Sans Pro" typeface. RED FLAG! 🚩. Why?
									</p>
									<ol>
										<li>Performance:
											<ul>
												<li>The user would have to download a file for each style. Yeah, right.</li>
												<li>Because this font had to be served locally.</li>
												<li>Multiple files: One file per style. 🤯</li>
											</ul>
										</li>
										<li>Headaches: That meant having to deal with TTF, OTF, and WOFF files. No thanks!</li>
									</ol>
									<p>
										What a P.I.A. 🫏
									</p>
									<p>
										So, guess what I did? Went to Google Fonts! And lo and behold, there was the almighty "Source Sans 3" 🥳. All kinds of "wins":
									</p>
									<ol>
										<li>Performance:
											<ul>
												<li>Variable font: One file to download.</li>
												<li>Served by Google. Way faster servers.</li>
											</ul>
										</li>
										<li>No headaches: Didn't have to deal with TTF, OTF, and WOFF files.</li>
									</ol>
									<p>
										And for the monospaced font, NodeSource was already using "Source Code Pro" which is also on Google Fonts, lol. 👍🏽
									</p>
									<h4>Fun fact</h4>
									<p>
										All fonts, Source Sans Pro, Source Sans 3, and Source Code Pro are created by the same designer, Paul D. Hunt. HA! (that sounded funny in my head, not so much here, lol).
									</p>
									<h4>Modular Scale, WTF is that?</h4>
									<p>
										A modular scale is a bunch of numbers/values that are harmonious with each other. These numbers can be used for typography, spacing, margins, line-heights, etc.
									</p>
									<p>
										All the font sizes used in the N|Core Design System are based on a modular scale. Check out the <ExternalLink href="https://www.modularscale.com/?1.125,1140,14&em&1.3">modular scale here</ExternalLink>. If you're not familiar with a Modular Scale, that page is going to mean 💩.
									</p>
									<h4>Bro, why didn't you use the 8pt grid system?</h4>
									<p> Because:</p>
									<ol>
										<li>Every single designer in the planet uses that damn 8pt grid system, lol.</li>
										<li>The Modular Scale app provides all font sizes in <code>em</code>, which is much more useful for developers.</li>
									</ol>
									<hr />
									<p>
										Aaaaaaaaaanyway, check out the screenshot for the Typography System from Figma below 👇🏽:
									</p>
								</div>
							</div>
							<div className="project-image-container">
								<ProjectImage
									src="/images/nodesource/ncore-design-system-typescale.png"
									caption="Typescale using a Modular Scale"
								/>
							</div>
						</div>

						{/* CodePen Demo Block */}
						<div className="project-image-block">
							<div className="project-image-description max-w-[1000px] mx-auto mb-8">
								<h3 className="text-section-subtitle">HTML + CSS</h3>
								<div className="description-container">
									<h4>CodePen Demo</h4>
									<p>
										What the heck is happening in this demo?
									</p>
									<ol>
										<li>As you shrink/enlarge the viewport, the font sizes changes.</li>
										<li>The font sizes are based on the Modular Scale which keeps the harmony regardless of the viewport size.</li>
										<li>This method uses the <code>calc()</code> function.</li>
										<li className="info-text"><Info size={24} weight="regular" />FYI, the <code>clamp()</code> function wasn't supported at the time 🤷🏽.</li>
									</ol>
								</div>
							</div>
							<div className="project-image-container">
								<DynamicFrame resizable>
									<iframe
										height="800"
										style={{ width: "100%" }}
										title="CodePen Demo"
										src="https://codepen.io/ricardozea/embed/XWwzxoG?default-tab=result"
										loading="lazy"
										allowtransparency="true"
										sandbox="allow-scripts allow-same-origin"
									/>
								</DynamicFrame>
								<div className="image-footnote-container">
									<p className="image-footnote">
										Here's an example YOU can drop in your CSS: <code>font-size: clamp(12px, 4vw, 18px);</code>
									</p>
								</div>
							</div>
						</div>

						<hr />

						{/* Image Block */}
						<div className="project-image-block">
							<div className="project-image-description max-w-[1000px] mx-auto mb-8">
								<h3 className="text-section-subtitle">Color System</h3>
								<div className="description-container">
									<h4>Lets talk colors, will ya?</h4>
									<p>
										When I inherited the NodeSource project, the client had 7 base colors defined. You can see them on the "Base Colors" column on the image below with white background.
									</p>
									<p>
										After a 💩-ton of work, using all kinds of color creation tools and Figma plugins, the final color palette is show below in the screenshot from Figma.
									</p>
									<h4>Why was it difficult to create the color palette?</h4>
									<p>
										Because:
									</p>
									<ol>
										<li>As powerful as they may be, the Figma plugins do not consider accessibility. In other words, they can create shades that don't work with either White or Black text.</li>
										<li>Most tools only create a Light mode ramp.</li>
										<li>Some tools are unncessarily complicated to use.</li>
										<li>I ended editing each shade in each ramp manually to make sure they were accessible.</li>
									</ol>
									<h4>What tool did you use then?</h4>
									<p>
										Well, I went and built and designed the damn tool myself, lol.
									</p>
									<p>
										Create accessible color ramps in less than 5 seconds, no BS: <ExternalLink href="https://www.color-ramp-generator.com/">Color-Ramp.com</ExternalLink>
									</p>
								</div>
							</div>
							<div className="project-image-container grid grid-cols-1 items-end sm:grid-cols-2 gap-4">
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/ncore-design-system-colors-old.png"
										caption="Middle column: 7 defined dolors by the client"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/ncore-design-system-colors.png"
										caption="100% accessible Light and Dark mode color ramps"
									/>
								</div>
							</div>
						</div>

						<hr />

						{/* Image Block */}
						<div className="project-image-block">
							<div className="project-image-description max-w-[1000px] mx-auto mb-8">
								<h3 className="text-section-subtitle">Design System Components</h3>
								<div className="description-container">
									<h4>Friggin' Buttons, lol</h4>
									<p>
										144 buttons in total… damn, haha.
									</p>
									<p>
										Although not all buttons are used (yet), they are ready when the moment comes. NodeSource has multiple products and with a design system like N|Core, supporting new products is easier.
									</p>
									<p>
										Check out the buttons in Dark and Light modes below 👇🏽:
									</p>
								</div>
							</div>
							<div className="project-image-container grid grid-cols-1 items-end sm:grid-cols-2 gap-4">
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/ncore-design-system-buttons-dark-mode.png"
										caption="Dark mode buttons"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/ncore-design-system-buttons-light-mode.png"
										caption="Light mode buttons"
									/>
								</div>
							</div>
						</div>

						{/* Image Block */}
						<div className="project-image-block">
							<div className="project-image-description content-right max-w-[1000px] mx-auto mb-8">
								<div className="description-container">
									<h4>Input Fields</h4>
									<p>
										These input fields are a work in progress, but for now I have:
									</p>
									<ol>
										<li>Text</li>
										<li>Password</li>
										<li>Search</li>
										<li>Upload file</li>
										<li>Number</li>
										<li>Textarea</li>
										<li>Select menu</li>
									</ol>
									<p>
										Checkboxes and radio buttons are in their own pages.
									</p>
									<h4>What's pending?</h4>
									<p>
										The Small versions 😁.
									</p>
								</div>
							</div>
							<div className="project-image-container grid grid-cols-1 items-end sm:grid-cols-2 gap-4">
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/ncore-design-system-inputs.png"
										caption="All current input fields [WIP]"
										captionElement={<>All current input fields [<abbr title="Work In Progress">WIP</abbr>]</>}
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/ncore-design-system-inputs-detail.png"
										caption="Input text detail - Notice the Properties panel 😎"
									/>
								</div>
							</div>
						</div>

						{/* Image Block */}
						<div className="project-image-block">
							<div className="project-image-description content-right max-w-[1000px] mx-auto mb-8">
								<div className="description-container">
									<h4>Tables</h4>
									<p>
										Oh boy, tables in Figma! Well, initially I was using the plugin Table Creator. It worked well for a while, until I realized that if the file had a lot of tables, the performance of Figma would go in the gutter.
									</p>
									<p>
										I also wasn't too fond of depending on a plugin for this. So, following best practices and scalability, I created a table component.
									</p>
									<p>
										I can build any kind of table in a snap with this component.
									</p>
									<p>
										Check out the table component in Dark and Light modes below 👇🏽:
									</p>
								</div>
							</div>
							<div className="project-image-container grid grid-cols-1 items-end sm:grid-cols-2 gap-4">
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/ncore-design-system-table.png"
										caption="Table component"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/ncore-design-system-table-detail.png"
										caption="Table detail: Dark and Light modes"
									/>
								</div>
							</div>
						</div>

						<hr />

						{/* Image Block */}
						<div className="project-image-block">
							<div className="project-image-description max-w-[1000px] mx-auto mb-8">
								<h3 className="text-section-subtitle">N|Solid Console</h3>
								<div className="description-container">
									<h4>NodeSource's Flagship Product</h4>
									<p>Here is an example of the Dashboard table UI with selected rows.</p>
								</div>
							</div>
							<div className="project-image-container grid grid-cols-1 items-end sm:grid-cols-2 gap-4">
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/nsolid-console-selected-processes-1.png"
										caption="Figma file showing the design with a 12-column layout"
										quality={95}
										className="plain"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/nsolid-console-selected-processes-2.png"
										caption="Dev handoff via Zeplin"
										quality={95}
										className="plain"
									/>
								</div>
								<div className="quadrant-container sm:col-span-2 sm:flex sm:flex-col sm:items-center">
									<ProjectImage
										src="/images/nodesource/nsolid-console-selected-processes-3.png"
										caption="Final Dashboard screen implemented by the devs"
										quality={95}
										className="plain"
									/>
								</div>
							</div>
						</div>

						<hr />

						{/* Image Block */}
						<div className="project-image-block">
							<div className="project-image-description max-w-[1000px] mx-auto mb-8">
								<h3 className="text-section-subtitle">NodeSource Website Redesign</h3>
								<div className="description-container">
									<h4>The 2020 and 2024 Websites</h4>
									<p>
										I started working with NodeSource in 2020 and inherited an old website with serious accessibility and branding issues.
										</p>
									<p>
										In 2024, I was asked: "Hay amigo Ricardo, we need to redesign the website. Are you down for the job?" Well, DOH! 😒 lol
									</p>
									<h4>AI with Midjourney</h4>
									<p>
										This is when I first started using Midjourney to generate images for the website. All icons and hero background textures were generated using Midjourney.
									</p>
									<p>Check out the 2020 and 2024 websites below 👇🏽:</p>
								</div>
							</div>
							<div className="project-image-container grid grid-cols-1 items-end sm:grid-cols-2 gap-4">
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/homepage-2020.png"
										caption="2020 Homepage design I inherited. SERIOUS accessibility issues 😶"
										className="plain"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/homepage-2026.png"
										caption="Redesign 2024: Homepage. Bolder branding and Accessibility-compliant."
										className="plain"
									/>
								</div>
							</div>

							<div className="project-image-description content-right max-w-[1000px] mx-auto mt-16 mb-8">
								<div className="description-container">
									<h4>Design Process: NodeSource's flagship product page</h4>
									<p>
										The CEO provided me with the initial wireframes. Wait, WHAT?! 😶. Yep! Talk about a client that has their shit together, eh!
									</p>
									<p>
										The beauty of the provided wireframes was NOT that I didn't have to create any wireframes. I would've been happy to do so. The beauty was that it provided me with a clear… what? I'll give you 1 guess:
										{!showAnswer ? (
											<button
												onClick={() => setShowAnswer(true)}
												className="guess-button"
											>
												Use my 1 guess!
											</button>
										) : (
											<span className="guess-answer"> Information Architecture! 🤣</span>
										)}
									</p>
									<p>
										Icons and hero background texture were generated using Midjourney as well.
									</p>
									<p>
										Check the design process for the N|Solid product page below 👇🏽:
									</p>
								</div>
							</div>
							<div className="project-image-container grid grid-cols-1 items-end sm:grid-cols-2 gap-4">
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/website-nodesource-page-1.png"
										caption="Figma file. From left: Components & Exploration, Design, and Wirframe"
										quality={95}
										className="plain"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/website-nodesource-page-2.png"
										caption="Close up of the Design and the Wireframe"
										quality={95}
										className="plain"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/website-nodesource-page-3.png"
										caption="Dev handoff using Zeplin"
										quality={95}
										className="plain"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/website-nodesource-page-4.png"
										caption="Final page implemented by the devs"
										quality={95}
										className="plain"
									/>
								</div>
							</div>
						</div>

						<hr />

						{/* Image Block */}
						<div className="project-image-block">
							<div className="project-image-description max-w-[1000px] mx-auto mb-8">
								<h3 className="text-section-subtitle">Mobile Menu Prototype</h3>
								<div className="description-container">
									<p>
										This is a very bare prototype I built to show the devs how the mobile menu should look and work.
									</p>
									<p>
										As simple as this prototype is, multiple design decisions are happening here:
									</p>
									<ol>
										<li><strong>Interaction Design:</strong>
											<ul>
												<li>40x40px target size of the hamburger menu button.</li>
												<li>Slide-in navigation with a duration of <code>0.2s</code> and <code>ease-in-out</code> timing function. In other words, the damn thing feels organic and responsive, haha.</li>
												<li>Tranforming the "3-line" icon to an "x" icon to clearly convey when the menu is open or closed. This also happens smoothly and quickly.</li>
												<li>Dropdowns from main nav items are also smoothly animated.</li>
												<li>For good measure, hover effects on menu and submenu items. This is also a visual cue when the link is tapped on a mobile device.</li>
											</ul>
										</li>
										<li><strong>Accessibility:</strong>
											<ul>
												<li>All elements are accessible from a typography and color contrast perspective.</li>
												<li>Hover effects on menu and submenu items.</li>
											</ul>
										</li>
										<li><strong>Scalability:</strong> This structure uses the same menu used on the desktop version. One menu to rule them all! 🤣</li>
									</ol>
									<p>Click on the hamburger icon in the prototype below 👇🏽:</p>
								</div>
							</div>
							<div className="project-image-container">
								<div className="project-image-container mobile-prototype-container">
									<DynamicFrame>
										<iframe
											style={{ width: "100%" }}
											height="800"
											src="https://embed.figma.com/proto/xqrpLAFRFBvnwGzFhej3yN/NodeSource-Website-2024--Copy-?page-id=3148%3A3396&node-id=6033%3A4597&node-id=6033-4598&viewport=510%2C40%2C1.43&scaling=scale-down&content-scaling=fixed&hide-ui=1&embed-host=share"
											allowFullScreen
											loading="lazy"
										></iframe>
									</DynamicFrame>
								</div>
								<div className="image-footnote-container">
									<p className="image-footnote">
										Simple 🫏 prototype
									</p>
								</div>
							</div>
						</div>

						<hr />

						{/* Image Block */}
						<div className="project-image-block">
							<div className="project-image-description max-w-[1000px] mx-auto mb-8">
								<h3 className="text-section-subtitle">A few more notes about Color Accessibility and Branding ☝🏽</h3>
								<div className="description-container">
									<h4>Accessibility issues with the color off the bat! 🦇 (there is no baseball bat emoji, WTF, lol)</h4>
									<p>
										The original green <code>#5AC878</code> the client providedwas Ok.
									</p>
									<p>
										The problem was that the prior designs had white text over that green which failed accessibility with a contrast ratio of <code>2.1:1</code> - Minimum contrast ratio should be <code>4.5:1</code> for Normal size text.
									</p>
									<p>
										I knew I needed to use black text over that green. But I went a step further and lighten up that green a little to make it "pop" (🤦🏽lol ) in Dark mode, and settled on <code>#71D08B</code>. The contrast ratio was excellent: <code>11.09:1</code> with dark text.
									</p>
									<p>
										This adjustment was ideal for Dark mode, which is NodeSource’s default theme.
									</p>
									<h4>Retaining branding identity</h4>
									<p>
										To get to the new green <code>#71D08B</code>, I edited the Lightness in the HSL color space of the original green <code>#5AC878</code> from <code>57%</code> to <code>63%</code>. It was light enough while retaining the same Hue and Saturation of the original green 👍🏽.
									</p>
									<p>
										Branding improvement FTW! 🙂
									</p>
								</div>
							</div>
							<div className="project-image-container grid grid-cols-1 items-end sm:grid-cols-2 gap-4">
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/ncore-design-system-old-green.png"
										caption="Old green: Accessibility = 💀"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/ncore-design-system-new-green.png"
										caption="New green: Accessibility = 💪🏽"
									/>
								</div>
							</div>

							<div className="project-image-description content-right max-w-[1000px] mx-auto mt-16 mb-8">
								<div className="description-container">
									<h4>Brand enhancement for Light mode</h4>
									<p>
										The new green <code>#71D08B</code> was made for Dark mode. For Light mode, I took a similar approach but this time I edited the Saturation and Lightness of the original green <code>#5AC878</code>, from <code>50%, 57%</code> to <code>52%, 24%</code>.
									</p>
									<p>
										This gave me a darker, more saturated green perfect for Light mode while retaining the same Hue of the original green. The contrast ratio is <code>7.9:1</code> with white text or over light backgrounds.
									</p>
									<p>
										Check out all the greens in and the NodeSource logo in both Dark and Light modes below 👇🏽:
									</p>
								</div>
							</div>
							<div className="project-image-container grid grid-cols-1 items-end sm:grid-cols-2 gap-4">
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/ncore-design-system-original-vs-new-green.png"
										caption="Original vs. New greens"
										quality={95}
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nodesource/ncore-design-system-nodesource-logos.png"
										caption="NodeSource logos with new greens"
									/>
								</div>
							</div>

							<div className="project-image-description content-right max-w-[1000px] mx-auto mt-8">
								<div className="description-container">
									<p>
										Phew! 😅 - Look at you, you made it all the way down here! Thank you! 🙏🏽lol
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr />
			</section>

			{/* Project Navigation */}
			{/* <section className="project-navigation">
				<div className="section-container">
					<div className="flex justify-between items-center max-w-[1400px] mx-auto">
						<a href="#" className="project-nav-link prev flex items-center gap-3">
							<ArrowLeft size={24} weight="regular" />
							<div>
								<p className="text-caption">Previous Project</p>
								<h4 className="text-body-bold">Project Name</h4>
							</div>
						</a>

						<a href="/#projects" className="cta-button button-secondary">
							All Projects
						</a>

						<a href="#" className="project-nav-link next flex items-center gap-3">
							<div className="text-right">
								<p className="text-caption">Next Project</p>
								<h4 className="text-body-bold">Project Name</h4>
							</div>
							<ArrowRight size={24} weight="regular" />
						</a>
					</div>
				</div>
			</section> */}

			{/* Footer */}
			<Footer />
		</>
	);
}
