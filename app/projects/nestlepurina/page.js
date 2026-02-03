import Footer from "@/components/Footer";
import Navigation from '@/components/Navigation';
import DynamicFrame from "@/components/DynamicFrame";
import ProjectImage from "@/components/ProjectImage";
import Image from "next/image";
import { ExternalLink } from "@/components/ExternalLink";
import {
	ArrowLeft,
	ArrowRight,
	CalendarDots,
	CalendarStar,
	Check,
	CodeIcon,
	HandsPraying,
	PencilLine,
	PencilRuler,
	Tag,
	UsersThree,
} from "@phosphor-icons/react/ssr";

export default function ProjectDetail() {
	return (
		<>
			<Navigation />

			{/* Project Hero Section */}
			<section className="project-hero">
				<div className="section-container">
					<div className="project-hero-container max-w-[1200px] mx-auto">
						{/* Project Title */}
						<h1 className="heading-hero project-title mb-12">
							All Kinds of{" "}
							<span className="text-brand-secondary">Design Stuff</span> for{" "}
							<span className="text-brand-primary">Purina</span>
						</h1>

						<div className="meta-data-container">
							{/* Project Description */}
							<div className="project-description">
								<h2>Project Description</h2>
								<p className="text-description">
									I was the Lead Designer for their internal Checkmark team. I was assigned to work with their HubX group. All my design work affected Purina.com.
								</p>
								<p>
									Due to my experence and knowledge, they created a "Lunch & Learn" session where I shared my knowledge about general design topics, HTML+CSS techniques, Responsive Design, UX and UI Design, etc. I even have some recordings of the sessions somewhere, lol.
								</p>
								<p>
									This is a long page where a elaborate on multiple of my design capabilities. Get ready to scroll! 😂
								</p>
							</div>

							{/* Project Meta */}
							<div className="project-description project-meta-container flex flex-col gap-3">
								<h2 className="">Project Metadata</h2>
								<div className="meta-item">
									<CalendarStar
										size={24}
										weight="regular"
										className="icon-accent-blue-subtle shrink-0"
									/>
									<div>
										<span className="meta-label mr-1">Year:</span>
										<span className="meta-value">2021 - 2022</span>
									</div>
								</div>
								<div className="meta-item">
									<CalendarDots
										size={24}
										weight="regular"
										className="icon-accent-blue-subtle shrink-0"
									/>
									<div>
										<span className="meta-label mr-1">Duration:</span>
										<span className="meta-value">1 year and 1 month</span>
									</div>
								</div>
								<div className="meta-item">
									<UsersThree
										size={24}
										weight="regular"
										className="icon-accent-blue-subtle shrink-0"
									/>
									<div>
										<span className="meta-label mr-1">Team Size:</span>
										<span className="meta-value">
											Project Manager, Product Manager, 5 Devs (External team),
											Designer (Moi)
										</span>
									</div>
								</div>
								<div className="meta-item">
									<PencilLine
										size={24}
										weight="regular"
										className="icon-accent-blue-subtle shrink-0"
									/>
									<div>
										<span className="meta-label mr-1">Role:</span>
										<span className="meta-value">
											Sr. Specialist UX/UI Designer
										</span>
									</div>
								</div>
								<div className="meta-item">
									<PencilRuler
										size={24}
										weight="regular"
										className="icon-accent-blue-subtle shrink-0"
									/>
									<div>
										<span className="meta-label mr-1">Tools:</span>
										<span className="meta-value">
											Figma, CodePen (HTML + CSS), Trello, Confluence
										</span>
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
										<span className="meta-value">HTML and CSS</span>
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
										<span className="meta-value">Figma, UX/UI Design, HTML & CSS, CodePen (HTML + CSS), Prototyping, Branding, Information Architecture, <abbr title="Responsive Web Design">RWD</abbr>, Interaction Design, Usability</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Project Data Section */}
			<section className="project-data">
				<div className="section-container">
					<h2 className="heading-section section-title-light mb-12">
						Almighty <span className="text-accent-blue-persistent">Numbers</span>
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
						{/* Data Card 1 */}
						<div className="project-data-card red flex flex-col items-center justify-center gap-2 p-8 rounded-lg">
							<h3 className="data-number">100s</h3>
							<p className="data-label">Of Dogs</p>
						</div>

						{/* Data Card 2 */}
						<div className="project-data-card blue flex flex-col items-center justify-center gap-2 p-8 rounded-lg">
							<h3 className="data-number">101s</h3>
							<p className="data-label">Of Cats (I'm a cat guy)</p>
						</div>

						{/* Data Card 3 */}
						<div className="project-data-card red flex flex-col items-center justify-center gap-2 p-8 rounded-lg">
							<h3 className="data-number">20+</h3>
							<p className="data-label">Employess trained in design subjects</p>
						</div>

						{/* Data Card 4 */}
						<div className="project-data-card blue flex flex-col items-center justify-center gap-2 p-8 rounded-lg">
							<h3 className="data-number">2 Great Coworkers</h3>
							<p className="data-label">Rene, Jill <HandsPraying  size={20} weight="regular" color="var(--text-accent-blue-persistent)" className="inline-block"/> (for real)</p>
						</div>
					</div>
				</div>
			</section>

			{/* Project Images Section */}
			<section className="project-images">
				<div className="section-container">
					<div className="max-w-[1400px] mx-auto space-y-16">
						{/* Image Block 1 */}
						<div className="project-image-block">
							<div className="project-image-description">
								<h3 className="text-section-subtitle">
									<strong>404 Page:</strong> Redesign
								</h3>
								<div className="description-container">
									<p>
										When I landed on Nestle.com's 404 Error page, I realized there was a problem: Their error page showcased a bunch of their products.
									</p>
									<p>
										This was a very bad branding idea because it gave their brand a negative connotation.
									</p>
								</div>
								<h3 className="text-section-subtitle">Before</h3>
								<div className="description-container">
									<p>Here's what they had 👇🏽:</p>
								</div>
							</div>
							<div className="project-image-container">
								<ProjectImage
									src="/images/nestlepurina/404-error-page-original.png"
									caption="BEFORE: Old 404 Error Page - Terrible branding idea! lol"
								/>
							</div>
						</div>

						{/* Image Block 2 */}
						<div className="project-image-block">
							<div className="project-image-description">
								<h3>After</h3>
								<div className="description-container">
									<h4>Design and Branding Decisions</h4>
									<p>
										To fix the negative brand connotation and make this error page easier to relate to:
									</p>
									<ol>
										<li>
											Removed the products and showcased the animals instead.
										</li>
										<li>
											Added some emotion by giving the cats and dogs a “voice”.
										</li>
										<li>Used microcopy to make the message more relatable.</li>
										<li>Tapped into the love humans have for their pets.</li>
									</ol>
									<h4>The Solution vs. Reality</h4>
									<p>
										Here's the 404 Error Page I designed vs. what they implemented 👇🏽:
									</p>
								</div>
							</div>
							<div className="project-image-container grid grid-cols-1 items-end sm:grid-cols-2 gap-4">
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nestlepurina/404-error-page-new-design-5.png"
										alt="My 404 page design 🙂 Not too bad, lol."
										captionElement={<>My design 🙂. Not too bad, lol.</>}
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nestlepurina/404-error-page-new-design-5-live.png"
										alt="Their implementation 🙄 Check it out for yourself here!."
										captionElement={<>Their implementation 🙄 Check it out for yourself{" "}
											<ExternalLink href="https://web.archive.org/web/20240528011004/https://www.purina.com/404"> here!
											</ExternalLink>{" "}
										</>}
									/>
								</div>
							</div>
						</div>

						{/* Image Block 3 */}
						<div className="project-image-block">
							<div className="project-image-description">
								<h3>Check out other 404 page designs</h3>
								<div className="description-container">
									<p>Well, not much to say here other than 3 cats, 1 dog. Scroll down dang it! 😜.</p>
								</div>
							</div>
							<div className="project-image-container grid grid-cols-1 items-end sm:grid-cols-2 gap-4">
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nestlepurina/404-error-page-new-design-1.png"
										caption="404 Error Page Cat #1"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nestlepurina/404-error-page-new-design-4.png"
										caption="404 Error Page Cat #2"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nestlepurina/404-error-page-new-design-3.png"
										caption="404 Error Page Cat #3"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nestlepurina/404-error-page-new-design-2.png"
										caption="404 Error Page Dog, lol"
									/>
								</div>
							</div>
						</div>

						<hr />

						{/* Image Block 4 */}
						<div className="project-image-block">
							{/* Ingredients Map: Redesign */}
							<div className="project-image-description">
								<h3>
									<strong>Ingredients Map:</strong> Redesign, Interaction
									Design, and HTML+CSS demo
								</h3>
								<div className="description-container">
									<h4>Redesign</h4>
									<p>
										I inherited this project from a prior designer. I then realized that there were multiple things I could do to make this map as good as possible:
									</p>
									<ol>
										<li>Use the entire screen rather than a windowed map.</li>
										<li>
											Create a floating column to house all necessary filters.
										</li>
										<li>
											Make the hero area smaller, since the map was the main feature on this page.
										</li>
										<li>
											Remove the CTA from the hero, since trying to take the user to another page defeated the purpose of having a map in the first place.
										</li>
										<li>
											Remove the Sourcing Quality Ingredients section at the bottom, so users can focus on the map.
										</li>
									</ol>
									<p>Here are the map designs side by side 👇🏽:</p>
								</div>
							</div>
							<div className="project-image-container grid grid-cols-1 items-end sm:grid-cols-2 gap-4">
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nestlepurina/traceability-map-before.png"
										caption="Their original map design"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nestlepurina/traceability-map-after.png"
										caption="My map design 🙂"
									/>
								</div>
							</div>

							{/* Ingredients Map: Interaction Design */}
							<div className="project-image-description">
								<h3>Interaction Design</h3>
								<div className="description-container">
									<h4>Empty State</h4>
									<p>When no ingredients are selected:</p>
									<ul>
										<li>
											A friendly cat guides the user to explore ingredients.
										</li>
										<li>
											Microcopy is the “cat's voice” that explains what to do next.
										</li>
										<li>
											It sets the tone for a friendly, approachable experience.
										</li>
										<li>
											The cat stands over a branded-red line so it's not floating in mid-air.
										</li>
									</ul>
									<p>Check out the empty state 👇🏽:</p>
								</div>
							</div>
							<div className="project-image-container">
								<ProjectImage
									src="/images/nestlepurina/traceability-map-empty-state.png"
									caption="They never approved this design, hahaha 😂 (but I love it!)."
								/>
							</div>

							<div className="project-image-container">
								{/* Ingredients Map: HTML + CSS Demo */}
								<div className="project-image-description">
									<h3>HTML + CSS</h3>
									<div className="description-container">
										<h4>CodePen (HTML + CSS) Demo</h4>
										<h5>Funny story</h5>
										<p>
											When I first showed this new map design to the stakeholders, they loved it. Then during a meeting where I presented the designs of the new map, the developers didn't look too happy 😜. They were not clear about what was wrong with the map in their eyes, but I could tell they weren't thrilled with what they now had to implement. Not only that, but they also had to make it responsive, obviously.
										</p>
										<p>
											After several meetings that week, they still had not even started to work on it.
										</p>
										<p>
											So I took a couple of hours out of my weekend (time I didn't charge for BTW) and created a simple demo on CodePen that had the basic map layout and was fully responsive.
										</p>
										<p>
											The developers didn't like that I built this demo, haha 😂. But it showed them that the responsive layout was definitely possible.
										</p>
										<p>Here's the CodePen demo I created 👇🏽:</p>
									</div>
								</div>
								<DynamicFrame resizable>
									<iframe
										height="1200"
										style={{ width: "100%" }}
										title="Purina.com - Drawers with map - prototype"
										src="https://codepen.io/ricardozea/embed/preview/JjyrXRo/6f3b00d730636a2c75e7548509a7c07f?default-tab=result"
										loading="lazy"
										allowtransparency="true"
										sandbox="allow-scripts allow-same-origin"
									/>
								</DynamicFrame>
								<div className="image-footnote-container">
									<p className="image-footnote">
										And it really was that simple 🙂
									</p>
								</div>
							</div>
						</div>

						<hr />

						{/* Image Block 5 */}
						<div className="project-image-block">
							<div className="project-image-description">
								<h3>Ecommerce</h3>
								<div className="description-container">
									<h4>Designs for the Product Listing Page</h4>
									<h5>Problem: Complex filtering and sorting</h5>
									<p>
										The original page had all filters/checkboxes in a single column, making the page practically unusable.
									</p>
									<h4>My Solution</h4>
									<ul>
										<li>
											Better scannability by reorganizing filters into multiple columns.
										</li>
										<li>
											Improved discoverability through logical grouping and ordering of filter options.
										</li>
										<li>
											Reduced cognitive load with intuitive sorting options and clear labels.
										</li>
										<li>
											Enhanced user experience by minimizing vertical scroll through optimized layouts (2 columns for filters) and collapsible sections.
										</li>
										<li>
											Alphabetical order for filters (Yep! They weren't 🙄 lol).
										</li>
									</ul>
								</div>
							</div>
							<div className="project-image-container grid grid-cols-1 items-end sm:grid-cols-2 gap-4 mt-6">
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nestlepurina/product-listing-page-design-1.png"
										caption="Design #1 - Categories box at the top"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nestlepurina/product-listing-page-design-2.png"
										caption="Design #2 - Categories box at the bottom"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nestlepurina/product-listing-page-design-3.png"
										caption="Design #3 - Pagination and Sorting at the top"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/nestlepurina/product-listing-page-design-4.png"
										caption="Design #4 - No Pagination or Sorting"
									/>
								</div>
							</div>
						</div>

						{/* Image Block 6 */}
						<div className="project-image-block">
							<div className="project-image-description">
								<h3>Original Product Listing Page</h3>
								<div className="description-container">
									<p>
										Oh brother 😖… Good luck reaching the bottom of that scroll!
										🤣
									</p>
								</div>
							</div>
							<div className="scrollable-image-container">
								<ProjectImage
									src="/images/nestlepurina/product-listing-page-original.png"
									caption="Original Product Listing Page"
								/>
							</div>
							<div className="image-footnote-container">
								<p className="image-footnote">
									Yes, I know, I know! HOW!?!? 😂
								</p>
							</div>
						</div>

						<hr />

						{/* Image Block 7 */}
						<div className="project-image-block">
							<div className="project-image-description">
								<h3>Information Architecture and Figma Prototype</h3>
								<div className="description-container">
									<h4>Information Architecture File</h4>
									<p>
										The giant <span title="ass">🫏</span> screen below, showcases how complex their information architecture was. My responsibility was to take that IA and build a Figma prototype for mobile.
									</p>
									<p>Screenshot from Figma with all the frames 👇🏽:</p>
								</div>
							</div>
							<div className="scrollable-image-container">
								<ProjectImage
									src="/images/nestlepurina/new-navigation-ia-mobile-all-frames.png"
									caption="Information Architecture and Figma Prototype"
									loading="lazy"
								/>
							</div>
							<div className="image-footnote-container">
								<p className="image-footnote">
									Massive file. In case another designer needed to work on it, I carefully organized it. Well, I tried, lol.
								</p>
							</div>

							<div className="project-image-description content-right">
								<div className="description-container">
									<h4>Figma Prototype</h4>
									<p>
										This prototype is only here to show that I have the skills to build prototypes 🙂. It is the result of the frames from the IA file above.
									</p>
									<p>
										Using a prototype without any context, friggin' sucks. Want to use the prototype? Have at it. And yes, it's fully functional. 👇🏽:
									</p>
								</div>
							</div>
							<div className="project-image-container mobile-prototype-container">
								<DynamicFrame>
									<iframe
										style={{ width: "100%" }}
										height="800"
										src="https://embed.figma.com/proto/oLnl9SRpWospY1vcPbqLYn/New-Navigation-IA---MOBILE?page-id=306%3A43&node-id=306-789&node-type=frame&viewport=575%2C2593%2C0.37&scaling=scale-down&content-scaling=fixed&starting-point-node-id=306%3A789&hide-ui=1&embed-host=share"
										allowFullScreen
										loading="lazy"
									></iframe>
								</DynamicFrame>
							</div>
							<div className="image-footnote-container">
								<p className="image-footnote">
									Figma prototype skills? <Check size={24} weight="regular" color="var(--text-accent-green)"/>
								</p>
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
						<a
							href="#"
							className="project-nav-link prev flex items-center gap-3"
						>
							<ArrowLeft size={24} weight="regular" />
							<div>
								<p className="text-caption">Previous Project</p>
								<h4 className="text-body-bold">Project Name</h4>
							</div>
						</a>

						<a href="/#projects" className="cta-button button-secondary">
							All Projects
						</a>

						<a
							href="#"
							className="project-nav-link next flex items-center gap-3"
						>
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
