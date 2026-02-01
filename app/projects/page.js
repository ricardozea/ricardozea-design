import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ProjectImage from "@/components/ProjectImage";
import Image from "next/image";
import {
	ArrowLeft,
	ArrowRight,
	CalendarDots,
	CalendarStar,
	CodeIcon,
	PencilRuler,
	PencilLine,
	Tag,
	UsersThree,
} from "@phosphor-icons/react/ssr";

export default function ProjectDetail() {
	return (
		<>
			<Navigation />

			{/* Project Hero Section */}
			<section className="project-hero section">
				<div className="section-container">
					<div className="project-hero-container max-w-[1200px] mx-auto">
						{/* Project Title */}
						<h1 className="heading-hero project-title mb-12">
							Project <span className="text-brand-primary">Name</span>
						</h1>

						<div className="meta-data-container">
							{/* Project Description */}
							<div className="project-description">
								<h2>Project Description</h2>
								<p className="text-description">
									This is where you'll describe the project in detail. Explain
									the challenge, the solution, and the impact.
								</p>
								<ul className="text-description">
									<li>Key Feature 1.</li>
									<li>Key Feature 2.</li>
									<li>Key Feature 3.</li>
								</ul>
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
										<span className="meta-value">2024</span>
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
										<span className="meta-value">X months</span>
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
											1 Designer, Developers, PM
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
										<span className="meta-value">Lead Designer</span>
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
										<span className="meta-value">Figma</span>
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
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Project Data Section */}
			<section className="project-data section">
				<div className="section-container">
					<h2 className="heading-section section-title-light mb-12">
						Almighty <span className="text-accent-blue-persistent">Numbers</span>
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
						{/* Data Card 1 */}
						<div className="project-data-card red flex flex-col items-center justify-center gap-2 p-8 rounded-lg">
							<h3 className="data-number">80%</h3>
							<p className="data-label">Performance Increase</p>
						</div>

						{/* Data Card 2 */}
						<div className="project-data-card blue flex flex-col items-center justify-center gap-2 p-8 rounded-lg">
							<h3 className="data-number">50%</h3>
							<p className="data-label">Reduced Load Time</p>
						</div>

						{/* Data Card 3 */}
						<div className="project-data-card red flex flex-col items-center justify-center gap-2 p-8 rounded-lg">
							<h3 className="data-number">90%</h3>
							<p className="data-label">User Satisfaction</p>
						</div>

						{/* Data Card 4 */}
						<div className="project-data-card blue flex flex-col items-center justify-center gap-2 p-8 rounded-lg">
							<h3 className="data-number">10K+</h3>
							<p className="data-label">Active Users</p>
						</div>
					</div>
				</div>
			</section>

			{/* Project Images Section */}
			<section className="project-images section">
				<div className="section-container">
					<div className="max-w-[1400px] mx-auto space-y-16">
						{/* Image Block 1: Single Image */}
						<div className="project-image-block">
							<div className="project-image-description">
								<h3 className="text-section-subtitle">
									<strong>Single Image</strong> Layout
								</h3>
								<div className="description-container">
									<h4>Subheading for Single Image</h4>
									<p>Description for the single image layout section.</p>
								</div>
							</div>

							{/* Second description block for Single Image Layout */}
							<div className="project-image-description content-right">
								<div className="description-container">
									<h4>Additional Subheading</h4>
									<p>
										This is an additional paragraph that aligns to the right on
										large screens because of the empty H3 tag above.
									</p>
								</div>
							</div>

							<div className="project-image-container">
								<ProjectImage
									src="/images/placeholder-img.png"
									alt="XXXXX"
									caption="Image footnote text"
								/>
							</div>
						</div>

						<hr />

						{/* Image Block 2: Two Images Side by Side */}
						<div className="project-image-block">
							<div className="project-image-description">
								<h3>Two Images Side by Side</h3>
								<div className="description-container">
									<h4>Subheading for Side by Side Images</h4>
									<p>Description for the side-by-side image layout.</p>
								</div>
							</div>
							<div className="project-image-container grid grid-cols-1 items-end sm:grid-cols-2 gap-4">
								<div className="quadrant-container">
									<ProjectImage
										src="/images/placeholder-img.png"
										alt="XXXXX"
										caption="Image 1 description"
									/>
								</div>
								<div className="quadrant-container">
									<ProjectImage
										src="/images/placeholder-img.png"
										alt="XXXXX"
										caption="Image 2 description"
									/>
								</div>
							</div>
						</div>

						<hr />

						{/* Image Block 3: Four Images (2x2 Grid) */}
						<div className="project-image-block">
							<div className="project-image-description">
								<h3>Four Images (2x2 Grid)</h3>
								<div className="description-container">
									<h4>Subheading for Grid Images</h4>
									<p>Description for the 2x2 grid layout.</p>
								</div>
							</div>
							<div className="project-image-container grid grid-cols-1 items-end sm:grid-cols-2 gap-4">
								{/* Image 1 */}
								<div className="quadrant-container">
									<ProjectImage
										src="/images/placeholder-img.png"
										alt="XXXXX"
										caption="Grid Image 1"
									/>
								</div>
								{/* Image 2 */}
								<div className="quadrant-container">
									<ProjectImage
										src="/images/placeholder-img.png"
										alt="XXXXX"
										caption="Grid Image 2"
									/>
								</div>
								{/* Image 3 */}
								<div className="quadrant-container">
									<ProjectImage
										src="/images/placeholder-img.png"
										alt="XXXXX"
										caption="Grid Image 3"
									/>
								</div>
								{/* Image 4 */}
								<div className="quadrant-container">
									<ProjectImage
										src="/images/placeholder-img.png"
										alt="XXXXX"
										caption="Grid Image 4"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Project Navigation */}
			<section className="project-navigation section">
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
			</section>

			{/* Footer */}
			<Footer />
		</>
	);
}
