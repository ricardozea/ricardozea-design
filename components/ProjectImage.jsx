import Image from "next/image";

const ProjectImage = ({
  src,
  caption,
  captionElement,
  alt,
  width = 1024,
  height = 800,
  className = "w-full h-auto rounded-lg shadow-lg",
  priority = false,
  quality = 90, // Higher quality to reduce banding
  unoptimized = false, // Option to disable optimization for gradient-heavy images
  loading, // Let parent control loading if needed, or default logic
  ...props
}) => {
  // Use alt if provided, otherwise use caption if it's a string, else empty string
  const altText = alt || (typeof caption === "string" ? caption : "");

  return (
    <>
      <Image
        src={src}
        alt={altText}
        className={className}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        unoptimized={unoptimized}
        loading={loading || (priority ? "eager" : "lazy")}
        {...props}
      />
      <div className="image-footnote-container">
        <p className="image-footnote">{captionElement || caption}</p>
      </div>
    </>
  );
};

export default ProjectImage;
