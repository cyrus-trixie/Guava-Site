'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, ShieldCheck, Database, ChevronRight } from 'lucide-react';

// --- MODIFIED IMPORT START ---
// Import the AboutAcfData interface from your centralized types file.
// Adjust the path if your 'types' directory is located differently.
import { AboutAcfData } from '../api/index'; 
// --- MODIFIED IMPORT END ---

// --- REMOVE THE LOCAL INTERFACE DEFINITION ---
// Delete this block, as it's now defined globally in src/types/acf.d.ts
/*
export interface AboutAcfData {
  header1: string;
  header2: string;
  paragraph1: string;
  paragraph2: string;
  button_url: string;
  button: string;
  video: string;
  header3: string;
  header3_first_subtitle: string;
  header3_first_paragraph: string;
  header3_second_subtitle: string;
  header3_second_paragraph: string;
  header3_third_subtitle: string;
  header3_third_paragraph: string;
}
*/
// --- END REMOVAL ---


// Define the props interface for the component (this remains the same)
interface AboutGuavaCreativeProps {
  acfData: AboutAcfData;
}

export default function AboutGuavaCreative({ acfData }: AboutGuavaCreativeProps) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInView(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  const videoVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  const BackgroundPattern = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute h-full w-full opacity-5">
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="dotGrid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="#DB3246" />
            </pattern>
          </defs>
          <rect fill="url(#dotGrid)" height="100%" width="100%" />
        </svg>
      </div>
    </div>
  );

  return (
    <div className="relative overflow-hidden bg-white px-6 py-16 lg:px-0">
      <BackgroundPattern />

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="absolute left-0 top-0 h-1 bg-[#DB3246]"
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          className="relative grid grid-cols-1 gap-16 lg:grid-cols-2"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <div className="flex flex-col justify-center">
            <motion.h1
              variants={itemVariants}
              className="mt-3 text-5xl font-bold tracking-tight text-gray-900"
            >
              <span className="block">{acfData.header1}</span>
              <span className="block text-[#DB3246]">{acfData.header2}</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg leading-relaxed text-gray-700"
            >
              {acfData.paragraph1}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-4 text-lg leading-relaxed text-gray-700"
            >
              {acfData.paragraph2}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10">
              <motion.a
                href={acfData.button_url}
                className="group relative inline-flex items-center overflow-hidden rounded-full bg-[#DB3246] px-6 py-2 font-medium text-white"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">{acfData.button}</span>
                <motion.span
                  className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.5 }}
                />
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            className="relative flex items-center justify-center lg:sticky lg:top-24"
            variants={videoVariants}
          >
            <motion.div
              className="relative w-full overflow-hidden rounded-2xl shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-[#DB3246] opacity-20 blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <motion.div
                className="aspect-h-9 aspect-w-16 rotate-3 overflow-hidden rounded-2xl bg-[#DB3246]/10 shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <video
                  className="h-full w-full bg-[#DB3246]/30 object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="https://guavacreative.com/preview.jpg"
                >
                  <source src={acfData.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <motion.div
                  className="absolute left-0 top-0 h-1 w-full rounded-full bg-[#DB3246] opacity-70"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 h-2 w-full rounded-full bg-[#DB3246] opacity-70"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 1.4 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
        className="mx-auto mt-12 max-w-6xl rounded-xl bg-[#1a1a1a] p-8 shadow-md sm:p-12"
      >
        <h2 className="mb-8 text-center text-4xl font-bold text-white">
          {acfData.header3}
        </h2>
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-[#DB3246] p-3">
              <Rocket className="h-10 w-10 text-white" />
            </div>
            <p className="mt-4 text-lg font-semibold text-white">
              {acfData.header3_first_subtitle}
            </p>
            <p className="mt-2 text-sm text-white">
              {acfData.header3_first_paragraph}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-[#DB3246] p-3">
              <ShieldCheck className="h-10 w-10 text-white" />
            </div>
            <p className="mt-4 text-lg font-semibold text-white">
              {acfData.header3_second_subtitle}
            </p>
            <p className="mt-2 text-sm text-white">
              {acfData.header3_second_paragraph}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-[#DB3246] p-3">
              <Database className="h-10 w-10 text-white" />
            </div>
            <p className="mt-4 text-lg font-semibold text-white">
              {acfData.header3_third_subtitle}
            </p>
            <p className="mt-2 text-sm text-white">
              {acfData.header3_third_paragraph}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}