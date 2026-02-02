'use client';

import { useState } from 'react';
import Image from "next/image";
import { ThemeToggle } from "../components/ThemeSwitcher";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import HeroLogo from "../components/HeroLogo";
import SocialIcons from '../components/SocialIcons';
import ContactForm from '../components/ContactForm';
import { MotionBurst } from "../components/MotionBurst";
import { Tooltip } from "../components/Tooltip";
import { ExternalLink } from "../components/ExternalLink";
import AboutImageTransition from "../components/AboutImageTransition";
import Modal from "../components/Modal";

import {
	ArrowLineDown,
	ArrowRight,
	Tag,
	PenNibIcon,
	Toolbox,
	Quotes,
	GraduationCap,
	Certificate,
	MouseMiddleClick,
	Pen,
	DownloadSimple,
	Envelope,
	Book,
} from '@phosphor-icons/react/ssr';

export default function Home() {

	return (
		<>
			<Navigation />
			{/* Hero Section */}
			<header id="home" className="hero">
				<div className="hero-content flex flex-col max-w-[1440px] mx-auto relative z-2 p-6 pt-20 md:p-14 md:pt-20">

					{/* Main Content */}
					<div className="hero-main">

						{/* Logo */}
						<HeroLogo />

						{/* Hero Title */}
						<h1 className="heading-hero hero-title">
							Sr.
							<span className="hero-title-brand">Web</span>
							&
							<span className="text-nowrap">
								<span className="hero-title-info">Product</span> Designer
							</span>
						</h1>

						{/* Hero Description */}
						<p className="text-description hero-description">
							<span className="strikethrough">Crafting digital experiences</span>
							… Well, I've been doing this for 💩-load of time <span className="text-nowrap">¯\(ツ)/¯</span>
						</p>
					</div>

					{/* CTA Button */}
					<div className="hero-cta">
						<a href="#projects" className="cta-button button-primary">
							View My Work
							<ArrowLineDown size={24} />
						</a>
					</div>
				</div>
			</header>

			{/* Projects Section */}
			<section id="projects" className="projects">
				<div className="section-container">
					<h2 className="heading-section section-title-dark">
						What <span className="text-brand-secondary">You</span> <span className="text-brand-primary text-nowrap">Came Here</span> For
					</h2>
					<div className="max-w-[40rem] mx-auto">
						<p className="text-description">Ok, I'll <abbr title="Keep It Simple, Stupid">K.I.S.S.</abbr> 😁</p>
						<p className="text-description">
							In the following two projects I showcase most of my skills and design&nbsp;capabilities
							<MotionBurst
								data-motion-burst="true"
								animationOptions={{
									count: 20,
									colors: ['#F3C536', '#F3C536', '#F3C536', '#F3C536', '#F3C536', '#F3C536'],
									particleSize: 2,
									explosionRadius: 30,
									duration: 0.3
								}}
								hideAfterBurst={true}
								removeFromDOM={true}
								className="hover:scale-110 transition-transform duration-200"
							>
								<Tooltip>
									<span>This cheering banana is annoying me. <br />Turn the damn thing off!</span>
									<span className="inline-block ml-1 -mt-2 w-6 h-6 relative">
										<Image
											src="/images/banana-cheerer.gif"
											alt="Cheering banana"
											fill
											sizes="24px"
											style={{ objectFit: "contain" }}
											unoptimized
										/>
									</span>
								</Tooltip>
							</MotionBurst>.
						</p>
						<p>You will see things about:</p>
						<ol className="columns-2 gap-[2rem]">
							<li>Web Design (doh!)</li>
							<li>Product Design (really! lol)</li>
							<li>Figma Designs</li>
							<li>Figma Variables</li>
							<li>Figma Prototypes</li>
							<li>Figma Components</li>
							<li>Accessibility Expertise</li>
							<li>Design System</li>
							<li>AI (Artificial Intelligence)</li>
							<li>Typography Expertise</li>
							<li>Responsive Typography</li>
							<li>Color Systems</li>
							<li>Branding</li>
							<li>Information Architecture</li>
							<li>HTML & CSS (Frontend)</li>
							<li>CodePen (HTML + CSS) demos</li>
							<li>Before & After Designs</li>
							<li>Unapologetic content 🤣</li>
						</ol>
						<p>I know there is still a lot to learn, but there is also a lot to share. That's what this portfolio is for.</p>
						<p>Well, have at it! <span className="inline-flex transform-[rotateY(180deg)]">🏃🏽‍♂️💨</span></p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-[1400px] mx-auto">

						{/* Project Card */}
						<article className="project-card max-w-[670px] mx-auto lg:mx-0">
							<div className="project-card-header">
								<img
									src="/images/logo-nodesource-for-dark.svg"
									alt="NodeSource Logo"
								/>
								<h3 className="project-card-title visually-hidden">NodeSource</h3>
							</div>

							<div className="project-card-image">
								<Image
									src="/images/nodesource/ncore-design-system-cover.png"
									alt="Project Screenshot"
									width={670}
									height={300}
									className="w-full h-full object-cover"
								/>
							</div>

							<div className="project-card-footer flex flex-row gap-4">
								<div className="project-card-label-icon" title="Tags">
									<Tag className="rotate-y-180" size={16} weight="bold"/>
								</div>

								<div className="project-card-content">
									<ul className="project-card-tags-list">
										<li>Design Systems</li>
										<li>Web Design</li>
										<li>Product Design</li>
										<li>Accessibility</li>
										<li>Figma</li>
										<li>AI (Midjourney)</li>
										<li>CodePen (HTML + CSS [Sass])</li>
										<li>Prototyping</li>
										<li>Frontend</li>
									</ul>

									<a href="/projects/nodesource" className="cta-button button-primary small">
										View Project
										<ArrowRight size={16} weight="bold" />
									</a>
								</div>
							</div>
						</article>

						{/* Project Card 2 */}
						<article className="project-card max-w-[670px] mx-auto lg:mx-0">
							<div className="project-card-header">
								<img
									src="/images/logo-purina.svg"
									alt="Purina Logo"
								/>
								<h3 className="project-card-title visually-hidden">Nestlé Purina</h3>
							</div>

							<div className="project-card-image">
								<Image
									src="/images/nestlepurina/404-error-page-new-design-5-live.png"
									alt="Project Screenshot"
									width={670}
									height={300}
								/>
							</div>

							<div className="project-card-footer flex flex-row gap-4">
								<div className="project-card-label-icon" title="Tags">
									<Tag className="rotate-y-180" size={16} weight="bold" />
								</div>

								<div className="project-card-content">
									<ul className="project-card-tags-list">
										<li>Figma</li>
										<li>Web Design</li>
										<li>CodePen (HTML + CSS [Sass])</li>
										<li>Prototyping</li>
										<li>Branding</li>
										<li>Information Architecture</li>
										<li><abbr title="Responsive Web Design">RWD</abbr></li>
										<li>Interaction Design</li>
										<li>Usability</li>
									</ul>

									<a href="/projects/nestlepurina" className="cta-button button-primary small">
										View Project
										<ArrowRight size={16} weight="bold" />
									</a>
								</div>
							</div>
						</article>
					</div>
				</div>
			</section>

			{/* Skills Section */}
			<section id="skills" className="skills">
				<div className="section-container">
					<p className="flex justify-center m-0">In the words of the almighty Scott Adams:</p>
					<h2 className="heading-section section-title-light">
						<img src="/images/img-character-dilbert.svg" alt="Dilbert" title="Dilbert by Scott Adams" className="character"/>
						<span className="text-accent-blue-persistent">Talent</span> <span className="text-accent-red-persistent">Stack</span>
					</h2>

					{/* Skills Cards - First Row */}
					<div className="cards-grid-container">

						{/* Skill Card 1 */}
						<div className="skill-card red">
							<div className="flex items-center gap-2">
								<div className="skill-icon-container red">
									<PenNibIcon className="skill-icon rotate-y-180" size={24} weight="light" />
								</div>
								<h3>Web & Product Design</h3>
							</div>
							<p>Plenty of experience in the industry. I don't play politics with managers or sugarcoat the truth for CEOs. I take your complex mess and turn it into a high-performance tool that hits every standard.</p>
							<p>You hire me for the results, not for my "yes". BTW, I will never call you "boss", lol.</p>
							<ul className="skill-tag-container">
								<li>Figma</li>
								<li>HTML + CSS</li>
								<li>CodePen</li>
								<li>Windsurf</li>
								<li>Midjourney</li>
								<li>UX Pilot</li>
								<li>Banani</li>
								<li>ChatGPT</li>
								<li>Gemini</li>
								<li>Claude</li>
								<li>Versive</li>
								<li>Tailwind CSS</li>
								<li>Sass</li>
								<li>Color-Ramp.com</li>
							</ul>
						</div>

						{/* Skill Card 2 */}
						<div className="skill-card blue">
							<div className="flex items-center gap-2">
								<div className="skill-icon-container blue">
									<PenNibIcon className="skill-icon rotate-y-180" size={24} weight="light" />
								</div>
								<h3>Figma Expertise</h3>
							</div>
							<p>I've been using Figma since it was launched back in September 2016. Figma was a game-changer due to its OS-agnostic nature.</p>
							<p>This was a blessing for me since I no longer had to deal with Mac-lovers and their dumbfounded belief that Macs were better than PCs, haha 🤣.</p>
						</div>

						{/* Skill Card 3 */}
						<div className="skill-card red">
							<div className="flex items-center gap-2">
								<div className="skill-icon-container red">
									<PenNibIcon className="skill-icon rotate-y-180" size={24} weight="light" />
								</div>
								<h3>Accessibility</h3>
							</div>
							<p><span className="highlighted-text">The 1st of the three things a designer must dominate.</span> Making designs accessible are part of how I operate by default. Just like everything has to be responsive, everything also has to be accessible.</p>
							<p>The pinnacle of my accessibility skills is <ExternalLink href="https://color-ramp.com/">Color-Ramp.com</ExternalLink> "Create 100% accessible color ramps in less than 5 seconds, no BS".</p>
							<ul className="skill-tag-container">
								<li>Figma plugins</li>
								<li>Color-Ramp.com</li>
								<li>HTML5</li>
								<li>ADA</li>
								<li>JAWS</li>
								<li>NVDA</li>
								<li>Section 508</li>
								<li>WAI-ARIA</li>
								<li>WCAG</li>
							</ul>
						</div>

						{/* Skill Card 4 */}
						<div className="skill-card blue">
							<div className="flex items-center gap-2">
								<div className="skill-icon-container blue">
									<PenNibIcon className="skill-icon rotate-y-180" size={24} weight="light" />
								</div>
								<h3><abbr title="Artificial Intelligence">AI</abbr> Expertise</h3>
							</div>
							<p>Who can live their lives without AI these days anymore? 🤔. From removing backgrounds from images in Figma to developing entire applications with the help of AI, is the breath of my AI expertise.</p>
							<p>Wireframing, design exploration, custom images, videos, marketing, etc. is where AI becomes part of how I operate.</p>
							<ul className="skill-tag-container">
								<li>Figma plugins</li>
								<li>Windsurf</li>
								<li>Midjourney</li>
								<li>UX Pilot</li>
								<li>Banani</li>
								<li>ChatGPT</li>
								<li>Gemini</li>
								<li>Claude</li>
								<li>Versive</li>
							</ul>
						</div>

						{/* Skill Card 5 */}
						<div className="skill-card red">
							<div className="flex items-center gap-2">
								<div className="skill-icon-container red">
									<PenNibIcon className="skill-icon rotate-y-180" size={24} weight="light" />
								</div>
								<h3>Design Systems</h3>
							</div>
							<p>I've heard the term "Design System" many years ago, but after Figma introduced variables, the concept exploded. My flagship design system is the one I created for NodeSource, N|Core.</p>
							<p>To level up my design system skills, I did a bootcamp specifically for that. <ExternalLink href="https://maven.com/certificate/sBHiXyRc" title="Design Systems Bootcamp Certificate">Check out my certificate</ExternalLink></p>
							<ul className="skill-tag-container">
								<li>Figma Variables</li>
								<li>Color-Ramp.com</li>
							</ul>
						</div>

						{/* Skill Card 6 */}
						<div className="skill-card blue">
							<div className="flex items-center gap-2">
								<div className="skill-icon-container blue">
									<PenNibIcon className="skill-icon rotate-y-180" size={24} weight="light" />
								</div>
								<h3>HTML & CSS</h3>
							</div>
							<p>I love HTML & CSS. I've even written two books about them bro! <ExternalLink href="https://masteringrwd.com/" title="Mastering Responsive Web Design">Mastering Responsive Web Design</ExternalLink> and <ExternalLink href="https://www.amazon.com/Developers-Reference-Guide-Joshua-Johanan/dp/1783552131" title="Web Developer's Reference Guide">Web Developer's Reference Guide</ExternalLink>.</p>
							<p>All I've learned, I've learned on my own, building stuff in all my jobs, freelancing, and personal projects. But more importantly, mentoring others.</p>
							<ul className="skill-tag-container">
								<li>Windsurf</li>
								<li>Sublime Text</li>
								<li>CodePen</li>
								<li>JSFiddle</li>
							</ul>
						</div>

						{/* Skill Card 7 */}
						<div className="skill-card red">
							<div className="flex items-center gap-2">
								<div className="skill-icon-container red">
									<PenNibIcon className="skill-icon rotate-y-180" size={24} weight="light" />
								</div>
								<h3>Prototyping</h3>
							</div>
							<p>Most of the times, Figma prototyping is a waste of time, lol. When a prototype tries to replicate the browser's behavior, that's when it's a waste of time.</p>
							<p>But when it's about helping prove a concept, showcase a specific behavior/feature, or visualize content architecture, then it is worth prototyping.</p>
							<p>HTML+CSS+JS protyping is the best way to go, especially with all the "vibe coding" apps out there these days.</p>
							<ul className="skill-tag-container">
								<li>Figma</li>
								<li>HTML & CSS</li>
								<li>CodePen</li>
							</ul>
						</div>

						{/* Skill Card 8 */}
						<div className="skill-card blue">
							<div className="flex items-center gap-2">
								<div className="skill-icon-container blue">
									<PenNibIcon className="skill-icon rotate-y-180" size={24} weight="light" />
								</div>
								<h3>Typography</h3>
							</div>
							<p><span className="highlighted-text">The 2nd of the three things a designer must dominate.</span> I admit it: I have not designed a typeface (at least, not yet, lol). But I do understand the importance of dotting your i's and crossing your t's. No pun… actually, it was intended. </p>
							<p>Learning how to use and create a Modular Scale, has taken my typography skills to 🚀.</p>
							<ul className="skill-tag-container">
								<li>Modular Scale</li>
								<li>Typescale.com</li>
								<li>Figma plugin: Typescales</li>
								<li>Google Fonts</li>
								<li>Font Squirrel</li>
								<li>CSS functions: <code>clamp()</code> <code>calc()</code> <code>progress()</code></li>
							</ul>
						</div>

						{/* Skill Card 9 */}
						<div className="skill-card red">
							<div className="flex items-center gap-2">
								<div className="skill-icon-container red">
									<PenNibIcon className="skill-icon rotate-y-180" size={24} weight="light" />
								</div>
								<h3>Color Systems</h3>
							</div>
							<p><span className="highlighted-text">The 3rd of the three things a designer must dominate.</span> Color can get ugly quickly. Don't believe me? Look: <abbr title="Cyan, Magenta, Yellow, Key (Black)">CMYK</abbr>, <abbr title="Red, Green, Blue">RGB</abbr>, <abbr title="Hexadecimal">HEX</abbr>, <abbr title="Hue, Saturation, Lightness">HSL</abbr>, <abbr title="Hue, Saturation, Value">HSV</abbr>, <abbr title="Hue, Chroma, Luminance">HCL</abbr>, <abbr title="Lightness, Chroma, Hue">LCH</abbr>, <abbr title="OK Lightness, Chroma, Hue">OKLCH</abbr>, <abbr title="CIE Lightness, a, b">Lab</abbr>. And plenty more.</p>
							<p>And that's not even mentioning the Alpha channel. </p>
							<p>Told you it could get ugly, lol.</p>
							<ul className="skill-tag-container">
								<li>Color-Ramp.com</li>
								<li>Coolors.co</li>
								<li>Supa Palette</li>
								<li>Supa Design Tokens</li>
							</ul>
						</div>
					</div>
					<p className="text-description personal-comment">☝🏽It goes without saying that I'm still learning. I am open minded and not set in my ways despite my experience. So… yeah.</p>
					<p className="personal-comment">Plus, I really like to <ExternalLink href="https://adplist.org/mentors/ricardo-zea" title="View ADPList profile">share my knowledge with others</ExternalLink>.</p>
				</div>
			</section>

			{/* Data Section */}
			<section id="data" className="data">
				<div className="section-container">
					<small className="flex justify-center mb-3">"Greetings! Ah-ah-ah!" lol</small>
					<h2 className="heading-section section-title-dark">
						<img src="/images/img-character-count.svg" alt="Count von Count" title="Count von Count" className="character"/>
						Let's <span className="text-brand-primary">Count!</span>
					</h2>

					{/* Data Cards */}
					<div className="cards-grid-container">

						<div className="data-card red">
							<h3>{new Date().getFullYear() - 2000}+</h3>
							<p>Years of Experience</p>
						</div>

						<div className="data-card red">
							<h3>{new Date().getFullYear() - 2009}+</h3>
							<p>Years Teaching/Mentoring</p>
						</div>

						<div className="data-card red">
							<h3>6.3k+</h3>
							<p>Likes for a Sass article</p>
						</div>

						<div className="data-card red">
							<h3>300+</h3>
							<p>Technical Design Interviews</p>
						</div>

						<div className="data-card blue">
							<h3>150+</h3>
							<p>Designers & Devs Taught</p>
						</div>

						<div className="data-card blue">
							<h3>120+</h3>
							<p>Overall Designed Websites/Pages</p>
						</div>

						<div className="data-card blue">
							<h3>2</h3>
							<p>Published Web Design Books</p>
						</div>

						<div className="data-card blue">
							<h3>2</h3>
							<p>Languages (<abbr title="English - Fluent">EN</abbr> & <abbr title="Spanish - Native">ES</abbr>)</p>
						</div>

						<div className="data-card red centered">
							<h3>0%</h3>
							<p>Dependency on Adobe 💪🏽</p>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section id="testimonials" className="testimonials">
				<div className="section-container">
					<h2 className="heading-section section-title-light">
						He <span className="text-accent-blue-persistent">Said</span> She <span className="text-accent-red-persistent">Said</span>
					</h2>

					{/* Testimonials Cards */}
					<div className="cards-grid-container">

						{/* Testimonial Card 1 */}
						<div className="testimonial-card">
							{/* Quote Icon */}
							<div className="testimonial-quote-icon">
								<Quotes className="red-quote-icon" size={60} weight="fill" />
							</div>

							{/* User Info */}
							<div className="testimonial-user-info">
								<Image
									src="/images/avatar-testimonial-jefferson.png"
									alt="User Avatar"
									width={48}
									height={48}
									className="testimonial-avatar"
								/>
								<div className="testimonial-name-position-container">
									<h3>Jefferson A.</h3>
									<p>UX/UI Designer</p>
								</div>
							</div>

							{/* Content */}
							<p>First of all i am indeed thankful to met such a true definition of a Mentor, very remarkable moment that i got a genuine advise that exceed my expectation.</p>
							<p>Mr. Zea indeed knows branding, he spotted even a tiny details mistake of my work which are important to be aware for every designers credibility.</p>
							<p>Mr. Zea gave an advise with empathy and truly passing on his experience of knowledge to help my situation to be good. I am very happy thank you so much Mr. Zea.</p>

							{/* CTA Button */}
							<ExternalLink href="https://adplist.org/mentors/ricardo-zea" className="review-link">
								See Review
							</ExternalLink>
						</div>

						{/* Testimonial Card 2 */}
						<div className="testimonial-card">
							{/* Quote Icon */}
							<div className="testimonial-quote-icon">
								<Quotes className="blue-quote-icon" size={60} weight="fill" />
							</div>

							{/* User Info */}
							<div className="testimonial-user-info">
								<Image
									src="/images/avatar-testimonial-yue.png"
									alt="User Avatar"
									width={48}
									height={48}
									className="testimonial-avatar"
								/>
								<div className="testimonial-name-position-container">
									<h3>Yue Zhao (Janie)</h3>
									<p>Research Assistant, University of Pennsylvania</p>
								</div>
							</div>

							{/* Content */}
							<p>I am a recurring mentee and have had the pleasure of scheduling two meetings with Ricardo. He is incredibly kind, patient, and has provided me with invaluable advice on improving my portfolio and presentation skills.</p>
							<p>Ricardo is highly knowledgeable and has a unique ability to break down complex problems into clear, actionable bullet points, making it easy to understand and implement solutions.</p>
							<p>I highly recommend scheduling a meeting with him—it’s an opportunity you won’t want to miss!</p>

							{/* CTA Button */}
							<ExternalLink href="https://www.codementor.io/@ricardozea" className="review-link">
								See Review
							</ExternalLink>
						</div>

						{/* Testimonial Card 3 */}
						<div className="testimonial-card">
							{/* Quote Icon */}
							<div className="testimonial-quote-icon">
								<Quotes className="red-quote-icon" size={60} weight="fill" />
							</div>

							{/* User Info */}
							<div className="testimonial-user-info">
								<Image
									src="/images/avatar-testimonial-bryce.png"
									alt="User Avatar"
									width={48}
									height={48}
									className="testimonial-avatar"
								/>
								<div className="testimonial-name-position-container">
									<h3>Bryce Baril</h3>
									<p>Chief Solutions Officer, NodeSource</p>
								</div>
							</div>

							{/* Content */}
							<p>Ricardo is a pleasure to work with: prompt, consistently reliable, and just generally a nice guy.</p>
							<p>He's able to provide both expert and well-researched UX guidance our team needs and designs unique and well-considered UI mocks. He's patient with our questions while walking us through the designs and happily responsive to collaborative design changes.</p>
							<p>I don't see a reason that I'd look elsewhere.</p>

							{/* CTA Button */}
							<ExternalLink href="https://www.linkedin.com/in/ricardozea/details/recommendations/ " className="review-link">
								See Review
							</ExternalLink>
						</div>
						{/* Testimonial Card 4 */}
						<div className="testimonial-card">
							{/* Quote Icon */}
							<div className="testimonial-quote-icon">
								<Quotes className="blue-quote-icon" size={60} weight="fill" />
							</div>

							{/* User Info */}
							<div className="testimonial-user-info">
								<Image
									src="/images/avatar-testimonial-eric.png"
									alt="User Avatar"
									width={48}
									height={48}
									className="testimonial-avatar"
								/>
								<div className="testimonial-name-position-container">
									<h3>Eric Lapointe</h3>
									<p>Director - Retirement Implementation Specialist, Willis Tower Watson</p>
								</div>
							</div>

							{/* Content */}
							<p>Ricardo has the ability to understand your needs even through complicated and sometimes contradictory discusssions between the business people. He provides good suggestions and is very well organized to keep track and make you aware of the improvements he makes.</p>
							<p>It was a pleaseure to work with him.</p>

							{/* CTA Button */}
							<ExternalLink href="#" className="review-link">
								See Review
							</ExternalLink>
						</div>

						{/* Testimonial Card 5 */}
						<div className="testimonial-card">
							{/* Quote Icon */}
							<div className="testimonial-quote-icon">
								<Quotes className="red-quote-icon" size={60} weight="fill" />
							</div>

							{/* User Info */}
							<div className="testimonial-user-info">
								<Image
									src="/images/avatar-testimonial-tina.png"
									alt="User Avatar"
									width={48}
									height={48}
									className="testimonial-avatar"
								/>
								<div className="testimonial-name-position-container">
									<h3>Tina George</h3>
									<p>Founder, TAG Marketing Group</p>
								</div>
							</div>

							{/* Content */}
							<p>Ricardo is a meticulous web designer and manages to stay focused on the voice and needs of the client. He is an honest and hardworking team player - always willing to pitch in to help the team.</p>
							<p>Ricardo's design skills, communication and openness to solving problems are all valuable traits. I really enjoyed working with him one-on-one or in a team.</p>
							<p>Without hesitation, I highly recommend Ricardo for any design project.</p>

							{/* CTA Button */}
							<ExternalLink href="#" className="review-link">
								See Review
							</ExternalLink>
						</div>

						{/* Testimonial Card 6 */}
						<div className="testimonial-card">
							{/* Quote Icon */}
							<div className="testimonial-quote-icon">
								<Quotes className="blue-quote-icon" size={60} weight="fill" />
							</div>

							{/* User Info */}
							<div className="testimonial-user-info">
								<Image
									src="/images/avatar-testimonial-allen.png"
									alt="User Avatar"
									width={48}
									height={48}
									className="testimonial-avatar"
								/>
								<div className="testimonial-name-position-container">
									<h3>Allen May</h3>
									<p>Full Stack Developer, CareSource</p>
								</div>
							</div>

							{/* Content */}
							<p>I have worked with Ricardo on several projects where he has demonstrated his depth of knowledge in frontend web development. I have also read his book - Mastering Responsive Web Development. Ricardo and I organize a CodePen Meetup together that talks about using the frontend development tool.</p>
							<p>Ricardo continues to impress me with his depth of knowledge and his aggressive research on web technologies.</p>
							<p>I consider him a respected friend and collaborator.</p>

							{/* CTA Button */}
							<ExternalLink href="#" className="review-link">
								See Review
							</ExternalLink>
						</div>
					</div>
				</div>
			</section>

			{/* About Section */}
			<section id="about" className="about">
				<div className="section-container">
					<h2 className="heading-section section-title-dark">
						About <span className="text-brand-primary">Ricardo</span> <span className="text-brand-secondary">Zea</span>
					</h2>

					<div className="about-content grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1400px] mx-auto">
						{/* Left Column - Image */}
						<div className="about-image-container">
							<div className="about-image-wrapper relative overflow-hidden">
								<AboutImageTransition className="about-image" />
							</div>

							{/* Education and Experience Section */}
							<div className="about-credentials">

								{/* Experience Column */}
								<div className="about-experience">
									<h3>Latest Experience</h3>

									<div className="credential-item mt-4">
										<div className="credential-icon-wrapper">
											<MouseMiddleClick size={32} weight="light" />
										</div>
										<div className="credential-content">
											<h4>Sr. Web & Product Designer (freelance)</h4>
											<p>NodeSource, LLC<br />December 2020 - Present</p>
										</div>
									</div>

									<div className="credential-item mt-6">
										<div className="credential-icon-wrapper">
											<Pen size={32} weight="light" className="rotate-y-180" />
										</div>
										<div className="credential-content">
											<h4>Sr. UI/UX Designer (remote)</h4>
											<p>Willis Tower Watson<br />March 2023 - August 2024</p>
										</div>
									</div>
								</div>

								{/* Education Column */}
								<div className="about-education">
									<h3>Education</h3>

									<div className="credential-item mt-4">
										<div className="credential-icon-wrapper">
											<GraduationCap size={32} weight="light" />
										</div>
										<div className="credential-content">
											<h4>Masters in Advertising / Bachelor of Arts in Marketing</h4>
											<p>Universidad Pontificia Bolivariana (Colombia)</p>
											<Modal
												trigger={
													<span className="modal-link">
														View Diploma
													</span>
												}
												ariaLabel="Open diploma modal"
												className="border-gradient"
											>
												<div className="modal-content-layout">
													<div className="modal-image-wrapper">
														<img
															src="/images/img-diploma-upb.png"
															alt="Universidad Pontificia Bolivariana Diploma"
															className="modal-image-content"
														/>
													</div>
													<div className="modal-text-section">
														<h3>College Diploma</h3>
														<h4>Fun Fact</h4>
														<p>Yes, I used AI to partially create this image. However, the diploma IS REAL, lol.</p>
														<p>I started with the original image of the diploma and used Figma's "Edit with prompt" to create the scene. I then used Affinity Photo to smack it over the frame.</p>
														<p>Why Affinity Photo you may ask? Remember I am 0% dependent on Adobe products? 😜</p>
													</div>
												</div>
											</Modal>
										</div>
									</div>

									<div className="credential-item mt-6">
										<div className="credential-icon-wrapper">
											<Certificate size={32} weight="light" />
										</div>
										<div className="credential-content">
											<h4>Design Systems Bootcamp</h4>
											<p>By Maven - Instructor: Molly Hellmuth</p>
											<ExternalLink href="https://maven.com/certificate/sBHiXyRc" className="flex items-center gap-1">
												View Certificate
											</ExternalLink>
										</div>
									</div>
								</div>

							</div>

							{/* CTA Buttons */}
							<div className="about-cta flex flex-wrap gap-4 mt-8">
								<a href="#" className="cta-button button-primary flex items-center gap-2">
									Download Resume (PDF - 1.1 MB)
									<DownloadSimple size={20} weight="regular" />
								</a>

								<a href="#contact" className="cta-button button-secondary flex items-center gap-2">
									Get In Touch
									<Envelope size={20} weight="regular" />
								</a>
							</div>
						</div>

						{/* Right Column - Content */}
						<div className="about-text-container flex flex-col">

							<div className="about-bio">
								<p>Hey there!</p>
								<p>I'm Ricardo. I'm a Sr. Web & Product Designer. I've been in the design industry for more than 20 years.</p>
								<div className="stage-container stage-card stage-card-red">
									<div className="stage-card-header">
										<div className="stage-version">Stage 1 // Origins</div>
									</div>
									<div className="stage-card-body">
										<p>Started my career in a small ad agency in Colombia called "Firma Publicitaria" doing print design.</p>
										<p>It was a great technical and business learning experience, but I quickly realized that designing for print friggin' sucked, lol.</p>
									</div>
								</div>
								<div className="stage-container stage-card stage-card-blue">
									<div className="stage-card-header">
										<div className="stage-version">Stage 2 // Print</div>
									</div>
									<div className="stage-card-body">
										<p>From the ad agency, I went to a printing company called "Multigráficas". It was also a great technical learning experience.</p>
										<p>The printing techs showed me how the machines worked, let me add the inks to the rollers, cut the papers with that giant-💩 guillotine.</p>
										<p>However, I quickly confirmed that designing for print really, truly sucked, haha.</p>
									</div>
								</div>
								<p>Regardless of how much desiging for print sucked, I was actually very good at it.</p>
								<p>I became an expert in file extensions, image resolution, CMYK techniques, drum scanners, print production, special inks, types of paper and finishes, print formats of all sizes (from flyers to billboards), etc.</p>
								<div className="stage-container stage-card stage-card-green">
									<div className="stage-card-header">
										<div className="stage-version">Stage 3 // Web</div>
									</div>
									<div className="stage-card-body">
										<p>From the printing company, I went to software development company called "Netsac" as a "web" designer. On top of taking my first steps with HTML and CSS, I got really good at Flash and even became a teacher.</p>
										<p>And that's how my Web Design career got going.</p>
									</div>
								</div>
								<p>One major difference between myself and other designers, was that I was very technically knowledgeable.</p>
								<p>So I became very good at understanding the conditions, limitations, and powers of the web. I got really good at HTML and CSS, including Sass. Some people think I'm a developer, but I'm not.</p>
								<p>But I do know how to work closely with developers to ensure that high-quality products are built efficiently.</p>
								<p>Also, accessibility is a subject I care about. So I built <ExternalLink href="https://color-ramp.com">Color-Ramp.com</ExternalLink> so designers can create 100% accessible color ramps in less than 5 seconds, no BS.</p>
								<p>I also co-created <ExternalLink href="https://aspiremap.ai">AspireMap.ai</ExternalLink>, a B2C platform that helps students and career-changers find career paths aligned with their values, personality, aptitudes, and skills.</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Authoring Section */}
			<section id="authoring" className="authoring">
				<div className="section-container">
					<h2 className="heading-section section-title-light">
						Books & <span className="text-accent-blue-persistent">Guides</span>
					</h2>

					{/* Authoring Cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-[1400px] mx-auto">
						{/* Authoring Card 1 */}
						<div className="authoring-card flex flex-col rounded-lg overflow-hidden">
							{/* Card Image */}
							<div className="authoring-card-image">
								<Image
									src="/images/img-book-mastering-rwd.png"
									alt="Book cover"
									width={392}
									height={294}
								/>
							</div>

							{/* Card Content */}
							<div className="card-content">
								<div className="flex flex-col gap-2">
									<h3 className="mb-2">Mastering Responsive Web Design with HTML5 and CSS3</h3>

									{/* Rating */}
									<div className="rating-stars-container w-fit flex items-center gap-1 px-2">
										★★★★☆ 3.9
									</div>
								</div>

								{/* Description */}
								<p>
									In 2014 I got contacted by Packt Publishing to write a book for them. I said No, lol. In 2015 they contacted me again, and I was like <span className="personal-comment">"Damn, these guys are persisent! Hmmm, this is something I've never done before. Alright! F it! Let's do it!".</span> haha😂.
								</p>
								<p>Would I do it again? Nope! </p>

								{/* Testimonial */}
								<div className="testimonial-container">

									<div className="flex items-start gap-3">
										{/* <Image
											src="/images/placeholder-avatar.png"
											alt="Reviewer"
											width={40}
											height={40}
										/> */}
										<blockquote>
											"A+ book for both beginners and advance level web designers."
										</blockquote>
										{/* Quote Icon */}
										<div className="quote-icon-container">
											<Quotes className="red-quote-icon" size={32} weight="fill" />
										</div>
									</div>
								</div>

								{/* Testimonial */}
								<div className="testimonial-container">

									<div className="flex items-start gap-3">
										{/* <Image
											src="/images/placeholder-avatar.png"
											alt="Reviewer"
											width={40}
											height={40}
										/> */}
										<blockquote>
											"This book is a great resource for people new to front-end development or seasoned veterans. […]"
										</blockquote>
										{/* Quote Icon */}
										<div className="quote-icon-container">
											<Quotes className="red-quote-icon" size={32} weight="fill" />
										</div>
									</div>
								</div>
								{/* CTA Link */}
								<ExternalLink href="https://www.packtpub.com/en-us/product/mastering-responsive-web-design-9781783550234"  title='Link opens in a new tab'>
									View Book
								</ExternalLink>
							</div>
						</div>

						{/* Authoring Card 2 */}
						<div className="authoring-card flex flex-col rounded-lg overflow-hidden">
							{/* Card Image */}
							<div className="authoring-card-image">
								<Image
									src="/images/img-book-web-devs-ref-guide.png"
									alt="Book cover"
									width={392}
									height={294}
								/>
							</div>

							{/* Card Content */}
							<div className="card-content">
								<div className="flex flex-col gap-2">
									<h3 className="mb-2">Web Developer's Reference Guide</h3>

									{/* Rating */}
									<div className="rating-stars-container w-fit flex items-center gap-1 px-2">
										★★★★★ 4.7
									</div>
								</div>

								{/* Description */}
								<p>
									Packt Publishing contacts me again at the end of 2015 to work on this book. I was going to work with other authors. I was doing several chapters about CSS. I wrote a whole chaptert about CSS Pseudo Classes and Pseudo Elements… but another author had already written it 😒. See next card from Smashing Magazine, lol 👉🏽…
								</p>

								{/* Testimonial */}
								<div className="testimonial-container">

									<div className="flex items-start gap-3">
										{/* <Image
											src="/images/placeholder-avatar.png"
											alt="Reviewer"
											width={40}
											height={40}
										/> */}
										<blockquote>
											"I have been writing software since the time when ALL phones had wires. And I have been working with HTML since the birth of the Internet.This is the most thorough and complete reference I have ever seen. […]"
										</blockquote>
										{/* Quote Icon */}
										<div className="quote-icon-container">
											<Quotes className="blue-quote-icon" size={32} weight="fill" />
										</div>
									</div>
								</div>
								{/* CTA Link */}
								<ExternalLink href="https://www.packtpub.com/en-us/product/web-developers-reference-guide-9781783552146" title='Link opens in a new tab'>
									View Book
								</ExternalLink>
							</div>
						</div>

						{/* Authoring Card 3 */}
						<div className="authoring-card flex flex-col rounded-lg overflow-hidden md:col-span-2 md:w-[calc(50%_-_0.75rem)] md:mx-auto lg:col-span-1 lg:w-auto lg:mx-0">
							{/* Card Image */}
							<div className="authoring-card-image">
								<Image
									src="/images/img-book-smashing-magazine-article.png"
									alt="Book cover"
									width={392}
									height={294}
								/>
							</div>

							{/* Card Content */}
							<div className="card-content">
								<div className="flex flex-col gap-2">
									<h3 className="mb-2">An Ultimate Guide To CSS Pseudo Classes And Pseudo Elements</h3>
								</div>

								{/* Description */}
								<p>
									…So I didn't want to let that ton of content sit in my drive, so I offered it to Smashing Magazine and Vitaly (Founder of SmashingMag) accepted it and published the chapter I wrote for the book as an article on Smashing Magazine.
								</p>

								{/* Testimonial */}
								<div className="testimonial-container">

									<div className="flex items-start gap-3">
										{/* <Image
											src="/images/placeholder-avatar.png"
											alt="Reviewer"
											width={40}
											height={40}
										/> */}
										<blockquote>
											"Olá amigo Ricardo, This great article has been translated into Brazilian-Portuguese and is alive at{' '}
											<ExternalLink
												href="https://maujor.com/tutorial/guia-definitivo-das-pseudoclasses-e-pseudoelementos-css.php"
												title="Brazilian-Portuguese translation"
											>
												here
											</ExternalLink>
											."
										</blockquote>
										{/* Quote Icon */}
										<div className="quote-icon-container">
											<Quotes className="red-quote-icon" size={32} weight="fill" />
										</div>
									</div>
								</div>

								{/* Testimonial */}
								<div className="testimonial-container">

									<div className="flex items-start gap-3">
										{/* <Image
											src="/images/placeholder-avatar.png"
											alt="Reviewer"
											width={40}
											height={40}
										/> */}

										<blockquote>"This is a superb article Ricardo, thank you for putting it together. I've been using a lot of these for a while but you've highlighted a few that are completely new to me."</blockquote>
										{/* Quote Icon */}
										<div className="quote-icon-container">
											<Quotes className="red-quote-icon" size={32} weight="fill" />
										</div>
									</div>
								</div>
								{/* CTA Link */}
								<ExternalLink href="https://www.smashingmagazine.com/2016/05/an-ultimate-guide-to-css-pseudo-classes-and-pseudo-elements/" title='Link opens in a new tab'>
									View Article
								</ExternalLink>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section id="contact" className="contact">
				<div className="section-container">

					<div className="contact-section">
						{/* Left Column - Contact Info */}
						<div className="contact-info">
							<h2 className="heading-section section-title-dark !m-0 !text-left">
								Get In <span className="text-brand-primary">Touch</span>
							</h2>
							<p className="text-description">You know what to do.</p>

							{/* Email */}
							<div className="contact-email">
								<Envelope size={40} weight="light" />
								<div className="contact-email-content">
									<p>Email:</p>
									<p><a href="mailto:ricardozea@gmail.com">ricardozea@gmail.com</a></p>
								</div>
							</div>

							{/* Social Icons */}
							<p className="!m-0">Find me on:</p>
							<SocialIcons />
						</div>

						{/* Right Column - Contact Form */}
						<div className="contact-form-container">
							<ContactForm />
						</div>
					</div>
				</div>
			</section>


			{/* Footer */}
			<Footer />
		</>
	);
}
