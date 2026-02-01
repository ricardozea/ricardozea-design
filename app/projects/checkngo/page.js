import Footer from "@/components/Footer";
import Navigation from '@/components/Navigation';
import { ArrowLeft, ArrowRight, CalendarDots, CalendarStar, UsersThree, PencilRuler, PencilLine, Image } from '@phosphor-icons/react/ssr';

export default function ProjectDetail() {
  return (
    <>
      <Navigation />

      {/* Project Hero Section */}
      <section className="project-hero section">
        <div className="section-container">
          {/* Back Button */}
          <div className="mb-8">
            <a href="/#projects" className="inline-flex items-center gap-2 text-accent-blue-persistent hover:text-accent-blue-subtle transition-colors">
              <ArrowLeft size={20} weight="regular" />
              Back to Projects
            </a>
          </div>

          <div className="project-hero-container max-w-[1200px] mx-auto">
            {/* Project Title */}
            <h1 className="heading-hero project-title mb-12">
              Project <span className="text-brand-primary">Name</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-5">
              {/* Project Description */}
              <div className="project-description">
                <p className="text-description">
                  This is where you'll describe the project in detail. Explain the challenge, the solution, and the impact.
                </p>
                <p className="text-description">
                  This paragraph should give readers a comprehensive overview of what this project accomplished and why it matters.
                </p>
              </div>

              {/* Project Meta */}
              <div className="project-meta-container flex flex-col gap-4">
                <div className="meta-item">
                  <CalendarStar size={24} weight="regular" className="icon-accent-blue-subtle shrink-0" />
                  <div>
                    <span className="meta-label mr-1">Year:</span>
                    <span className="meta-value">2023 - 2024</span>
                  </div>
                </div>
                <div className="meta-item">
                  <CalendarDots size={24} weight="regular" className="icon-accent-blue-subtle shrink-0" />
                  <div>
                    <span className="meta-label mr-1">Duration:</span>
                    <span className="meta-value">6 months</span>
                  </div>
                </div>
                <div className="meta-item">
                  <UsersThree size={24} weight="regular" className="icon-accent-blue-subtle shrink-0" />
                  <div>
                    <span className="meta-label mr-1">Team Size:</span>
                    <span className="meta-value">1 Designer, 2 Developers, and 1 Project Manager</span>
                  </div>
                </div>
                <div className="meta-item">
                  <PencilLine size={24} weight="regular" className="icon-accent-blue-subtle shrink-0" />
                  <div>
                    <span className="meta-label mr-1">Role:</span>
                    <span className="meta-value">Lead Designer</span>
                  </div>
                </div>
                <div className="meta-item">
                  <PencilRuler size={24} weight="regular" className="icon-accent-blue-subtle shrink-0" />
                  <div>
                    <span className="meta-label mr-1">Tools:</span>
                    <span className="meta-value">Lead Designer</span>
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
            Project <span className="text-accent-blue-persistent">Impact</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
            {/* Data Card 1 */}
            <div className="project-data-card red flex flex-col items-center justify-center gap-2 p-8 rounded-lg">
              <h3 className="data-number">84%</h3>
              <p className="data-label">Performance Increase</p>
            </div>

            {/* Data Card 2 */}
            <div className="project-data-card blue flex flex-col items-center justify-center gap-2 p-8 rounded-lg">
              <h3 className="data-number">42%</h3>
              <p className="data-label">Reduced Load Time</p>
            </div>

            {/* Data Card 3 */}
            <div className="project-data-card red flex flex-col items-center justify-center gap-2 p-8 rounded-lg">
              <h3 className="data-number">89%</h3>
              <p className="data-label">User Satisfaction</p>
            </div>

            {/* Data Card 4 */}
            <div className="project-data-card blue flex flex-col items-center justify-center gap-2 p-8 rounded-lg">
              <h3 className="data-number">15K+</h3>
              <p className="data-label">Active Users</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Images Section */}
      <section className="project-images section">
        <div className="section-container">
          <h2 className="heading-section section-title-dark mb-12">
            Project <span className="text-brand-primary">Gallery</span>
          </h2>

          <div className="max-w-[1400px] mx-auto space-y-16">
            {/* Image Block 1 */}
            <div className="project-image-block">
              <div className="project-image-description max-w-[1000px] mx-auto mb-8">
                <h3 className="text-section-subtitle">Initial Design Concept</h3>
                <p className="text-body">
                  This shows the initial design concept and wireframes. Here we focused on user experience
                  and creating an intuitive interface that would solve the core user problems we identified
                  during our research phase.
                </p>
              </div>
              <div className="project-image-container">
                <img
                  src="/images/placeholder-img.png"
                  alt="Project Screenshot 1"
                  className="w-full h-auto rounded-lg shadow-lg mb-2"
                />
                <div className="image-footnote-container flex items-center justify-end gap-1">
                  <Image size={20} weight="regular" className="icon-accent-blue-subtle shrink-0" />
                  <p className="image-footnote m-0">This is a long text that describes the image.</p>
                </div>
              </div>
            </div>

            {/* Image Block 2 */}
            <div className="project-image-block">
              <div className="project-image-description max-w-[1000px] mx-auto mb-8">
                <h3 className="text-section-subtitle">Final Implementation</h3>
                <p className="text-body">
                  The final implementation showcases the polished interface with all interactive elements
                  in place. This version underwent extensive user testing and iterations based on feedback
                  from stakeholders and end users.
                </p>
              </div>
              <div className="project-image-container">
                <img
                  src="/images/placeholder-img.png"
                  alt="Project Screenshot 2"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Image Block 3 */}
            <div className="project-image-block">
              <div className="project-image-description max-w-[1000px] mx-auto mb-8">
                <h3 className="text-section-subtitle">Mobile Experience</h3>
                <p className="text-body">
                  The mobile version was designed with a mobile-first approach, ensuring that all
                  functionality is accessible and optimized for touch interactions across different
                  screen sizes and devices.
                </p>
              </div>
              <div className="project-image-container">
                <img
                  src="/images/placeholder-img.png"
                  alt="Project Screenshot 3"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Navigation */}
      <section className="project-navigation section">
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
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
