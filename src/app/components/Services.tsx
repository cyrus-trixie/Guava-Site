'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  Lightbulb,
  Globe,
  Video,
  MousePointerClick,
  Megaphone,
  BarChart2
} from 'lucide-react';

// Custom icons that match our aesthetic better than heroicons
const icons = {
  ArrowUpRight, 
  Lightbulb,
  Globe,
  Video,
  MousePointerClick,
  Megaphone,
  BarChart2
};


export default function Services({acfData}) {
  const [isInView, setIsInView] = useState(false);





  
const features = [
  {
    name: acfData.card_title1,
    description:
      acfData.card_paragraph1,
    icon: 'Lightbulb', // Fixed icon name
    delay: 0,
  },
  {
    name: acfData.card_title2,
    description:
      acfData.card_paragraph2,
    icon: 'Globe', // Fixed icon name
    delay: 0.1,
  },
  {
    name: acfData.card_title3,
    description:
     acfData.card_paragraph3,
    icon: 'Video', // Fixed icon name
    delay: 0.2,
  },
  {
    name: acfData.card_title4,
    description:
      acfData.card_paragraph4,
    icon: 'MousePointerClick', // Fixed icon name
    delay: 0.3,
  },
  {
    name: acfData.card_title5,
    description:
      acfData.card_paragraph5,
    icon: 'Megaphone', // Already correct
    delay: 0.4,
  },
  {
    name: acfData.card_title6,
    description:
      acfData.card_paragraph6,
    icon: 'BarChart2', // Fixed icon name
    delay: 0.5,
  },
];
  
  useEffect(() => {
    // Set isInView to true after component mounts to trigger animations
    const timer = setTimeout(() => {
      setIsInView(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.25, 0.1, 0.25, 1.0],
        delay: delay 
      }
    })
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    },
    hover: { 
      scale: 1.1,
      rotate: 5, 
      transition: { duration: 0.3 }
    }
  };

  // Background pattern component
  const BackgroundPattern = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute right-0 top-16 h-full w-1/2 opacity-5" viewBox="0 0 500 500">
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#DB3246" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div className="absolute -left-24 top-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-[#DB3246] to-pink-500 opacity-5 blur-3xl"></div>
      <div className="absolute -right-24 bottom-1/4 w-96 h-96 rounded-full bg-gradient-to-l from-[#DB3246] to-orange-400 opacity-5 blur-3xl"></div>
    </div>
  );

  return (
    <div className="relative bg-white pb-12 overflow-hidden">
      <BackgroundPattern />
     
      <div className="mx-auto max-w-6xl px-6 lg:px-0">
        <motion.div 
          className="mx-auto max-w-4xl lg:text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <motion.span 
              className="inline-block text-sm font-medium tracking-widest text-[#DB3246] uppercase"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {acfData.small_header}
            </motion.span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="mt-2 text-3xl font-bold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance"
          >
            {acfData.header1_title}
            <span className="block text-[#DB3246]">{acfData.header2_title}</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="mt-6 text-lg/8 text-gray-600 max-w-2xl mx-auto"
          >
            {acfData.header_paragraph}
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="mx-auto mt-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-8 lg:max-w-none lg:grid-cols-3 lg:gap-y-8">
            {features.map((feature) => {
              const Icon = icons[feature.icon];
              
              return (
                <motion.div 
                  key={feature.name} 
                  className="relative pl-16 group"
                  custom={feature.delay}
                  variants={featureVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                >
                  <dt className="text-lg font-semibold text-gray-900 flex items-center">
                    <motion.div 
                      className="absolute top-0 left-0 flex size-12 items-center justify-center rounded-xl bg-[#DB3246] group-hover:shadow-lg"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <Icon className="size-6 text-white" />
                    </motion.div>
                    <span>{feature.name}</span>
                  </dt>
                  <dd className="mt-3 text-base/7 text-gray-600">{feature.description}</dd>
                  
                  <motion.div 
                    initial={{ opacity: 0, width: 0 }}
                    whileHover={{ opacity: 1, width: '100%', transition: { duration: 0.3 } }}
                    className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-[#DB3246] to-transparent"
                  />
                  
                  <motion.a
                    href="#"
                    className="inline-flex items-center mt-4 text-sm font-medium text-[#DB3246] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Learn more <ArrowUpRight className="ml-1 size-4" />
                  </motion.a>
                </motion.div>
              );
            })}
          </dl>
        </motion.div>
      </div>
    </div>
  );
}