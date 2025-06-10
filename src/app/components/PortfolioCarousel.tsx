'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence, PanInfo } from 'framer-motion'; // Added EventInfo
import { ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import Image from 'next/image';
// Removed specific 'MouseEvent' import as framer-motion's types are more appropriate
// import { MouseEvent } from 'react'; 

// Define TypeScript interfaces
interface Project {
  id: number;
  title: string;
  client: string;
  description: string;
  tags: string[];
  image: string;
  url: string;
}

// Interface for a single project item coming directly from ACF
interface ProjectItemFromAcf {
  title: string;
  client: string;
  description: string;
  tag1?: string; // These are optional as they might not always be set
  tag2?: string;
  tag3?: string;
  image?: { // Image object from ACF
    url: string;
    // Add other image properties if ACF provides them, e.g., width, height, alt
  };
  project_url: string;
}

// Interface for the overall ACF data object passed to this component
interface PortfolioCarouselAcfData {
  projects_card?: ProjectItemFromAcf[]; // projects_card is an array of ProjectItemFromAcf, and it might be optional itself
}

interface PortfolioCarouselProps {
  acfData: PortfolioCarouselAcfData; // The ACF data object with better typing
}

export default function PortfolioCarousel({ acfData }: PortfolioCarouselProps) {
  // CORE LOGIC: Extract projects from acfData
  // Ensure acfData.projects_card exists and is an array before mapping
  const projects: Project[] = (acfData?.projects_card || []).map((projectItem, index: number) => ({
    id: index,
    title: projectItem.title || '',
    client: projectItem.client || '',
    description: projectItem.description || '',
    // Filter out any empty strings from tags (e.g., if tag1 is empty)
    tags: [projectItem.tag1, projectItem.tag2, projectItem.tag3].filter((tag): tag is string => Boolean(tag)),
    image: projectItem.image?.url || 'https://via.placeholder.com/1200x800?text=No+Image',
    url: projectItem.project_url || '#',
  }));

  // --- Framer Motion specific states and controls ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // For directional animations
  const [isAnimating, setIsAnimating] = useState(false); // To prevent rapid clicks
  const [isDragging, setIsDragging] = useState(false); // For drag functionality
  const controls = useAnimation(); // For controlling card animations
  const carouselRef = useRef<HTMLDivElement>(null); // For drag constraints

  // Custom cursor states
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoveringNav, setHoveringNav] = useState<"next" | "prev" | false>(false);

  // Progress bar animation
  const progressControls = useAnimation();

  // Memoize handleNext and handlePrev functions using useCallback
  const handleNext = useCallback(() => {
    if (isAnimating || projects.length === 0) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex(prev => (prev === projects.length - 1 ? 0 : prev + 1));
  }, [isAnimating, projects.length]); // Dependencies for useCallback

  const handlePrev = useCallback(() => {
    if (isAnimating || projects.length === 0) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex(prev => (prev === 0 ? projects.length - 1 : prev - 1));
  }, [isAnimating, projects.length]); // Dependencies for useCallback


  useEffect(() => {
    // Update progress when currentIndex changes
    if (projects.length > 0) {
      progressControls.start({
        width: `${(currentIndex / (projects.length - 1)) * 100}%`,
        transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] }
      });
    } else {
      progressControls.start({ width: "0%" }); // Reset if no projects
    }
  }, [currentIndex, projects.length, progressControls]);

  // Auto-advance carousel
  useEffect(() => {
    if (projects.length === 0) return;

    const timer = setTimeout(() => {
      if (!isDragging && !hoveringNav) {
        handleNext(); // Now handleNext is a stable dependency
      }
    }, 6000);

    return () => clearTimeout(timer);
  }, [currentIndex, isDragging, hoveringNav, projects.length, handleNext]); // Added handleNext to dependency array

  // --- FIX START ---
  // The 'event' parameter from framer-motion's drag events can be MouseEvent, TouchEvent, or PointerEvent.
  // We can use the generic 'Event' type or import React's specific synthetic event types.
  // For framer-motion, using Event | PointerEvent | TouchEvent is often robust.
  // Or simply using 'React.MouseEvent | React.TouchEvent | React.PointerEvent' as the event type.
  // Framer Motion's PanInfo type already provides the necessary types implicitly, so we just ensure consistency.
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => { // Corrected event type
  // --- FIX END ---
    setIsDragging(false);
    if (Math.abs(info?.offset?.x || 0) > 100) {
      if (info.offset.x < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    // Snap back to origin if drag wasn't enough to change slide
    controls.start({ x: 0, transition: { type: "spring", stiffness: 400, damping: 20 } });
    setIsAnimating(false); // End animation state after drag
  };

  const updateCursorPosition = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  // Slider animation variants
  const sliderVariants = {
    incoming: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    active: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 100, damping: 20 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
      }
    },
    outgoing: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 100, damping: 20 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
      }
    })
  };

  // Custom cursor variants
  const cursorVariants = {
    default: {
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
      opacity: 0
    },
    hover: {
      x: cursorPosition.x - 40,
      y: cursorPosition.y - 40,
      opacity: 1,
      height: 80,
      width: 80,
      transition: {
        type: "spring",
        mass: 0.5
      }
    }
  };

  // Conditional Rendering: Show "No projects" message if empty
  if (projects.length === 0) {
    return (
      <div className="relative flex h-[55vh] w-full items-center justify-center rounded-t-[50px] bg-black text-xl text-white">
        No portfolio projects found. (Ensure ACF data is loaded correctly in WordPress)
      </div>
    );
  }

  // Main Carousel Render (only if projects exist)
  return (
    <div
      className="relative h-[55vh] w-full overflow-hidden rounded-t-[50px] bg-black"
      onMouseMove={updateCursorPosition}
    >
      {/* Custom Cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/10 bg-opacity-20 backdrop-blur-sm" // Fixed initial size
        variants={cursorVariants}
        initial="default"
        animate={hoveringNav ? "hover" : "default"}
      >
        {hoveringNav && (
          <motion.div
            className="text-xs font-medium uppercase tracking-widest text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {hoveringNav === 'next' ? 'Next' : 'Prev'}
          </motion.div>
        )}
      </motion.div>

      {/* Subtle grain texture overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-20">
        <svg height="100%" width="100%">
          <filter id="noise">
            <feTurbulence baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" type="fractalNoise" />
            <feColorMatrix values="0" type="saturate" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" opacity="0.15" />
        </svg>
      </div>

      {/* Main carousel */}
      <motion.div
        ref={carouselRef} // Ref for drag constraints
        className="h-full"
      >
        <motion.div
          className="h-full w-full cursor-grab active:cursor-grabbing"
          drag="x" // Enable horizontal dragging
          dragConstraints={carouselRef} // Constrain drag to the carousel container
          dragElastic={0.1} // Little bounce effect
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          animate={controls} // Connect to useAnimation controls
          onAnimationComplete={() => setIsAnimating(false)} // Reset animating state
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex} // Essential for AnimatePresence to track item changes
              custom={direction}
              variants={sliderVariants}
              initial="incoming"
              animate="active"
              exit="outgoing"
              className="absolute inset-0 flex h-full w-full flex-col justify-end"
            >
              {/* Project Image with Parallax Effect */}
              <motion.div
                className="absolute inset-0 z-0 opacity-70"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 to-[#DB3246]/40" />
                <Image
                  src={projects[currentIndex].image}
                  alt={projects[currentIndex].title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Content */}
              <motion.div
                className="relative z-20 flex w-full flex-col justify-between p-8 md:flex-row md:p-16 lg:p-20"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              >
                {/* Project details */}
                <div className="mb-8 flex-1 md:mb-0">
                  <div className="mb-4 flex items-center">
                    <div className="mr-4 h-px w-10 bg-white/60" />
                    <span className="text-sm font-medium text-white/70">{projects[currentIndex].client}</span>
                  </div>

                  <h2 className="mb-4 text-4xl font-medium tracking-tight text-white">
                    {projects[currentIndex].title}
                  </h2>

                  <p className="mb-6 max-w-lg text-white">
                    {projects[currentIndex].description}
                  </p>

                  <motion.a
                    href={projects[currentIndex].url}
                    className="group inline-flex items-center text-white"
                    whileHover={{ x: 5 }} // Slight move on hover
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="mr-3">View project</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </motion.a>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 md:flex-col md:items-end md:w-1/3 lg:w-1/4">
                  {projects[currentIndex].tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-white/20 px-3 py-1 text-sm font-medium text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Navigation */}
      <div className="absolute bottom-8 right-8 z-30 flex space-x-4 md:bottom-16 md:right-16">
        <motion.button
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white"
          onClick={handlePrev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setHoveringNav('prev')}
          onMouseLeave={() => setHoveringNav(false)}
        >
          <ArrowLeft className="h-5 w-5" />
        </motion.button>

        <motion.button
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white"
          onClick={handleNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setHoveringNav('next')}
          onMouseLeave={() => setHoveringNav(false)}
        >
          <ArrowRight className="h-5 w-5" />
        </motion.button>
      </div>

      {/* Progress Bar (Optional, can be added if needed) */}
      {/* Example:
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/20 rounded-full z-30">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: "0%" }}
          animate={progressControls}
        />
      </div>
      */}
    </div>
  );
}