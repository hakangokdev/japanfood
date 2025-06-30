'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

const Hero = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const titleVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const descriptionVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const buttonVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const bowlVariants: Variants = {
    hidden: { y: 100, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.5
      }
    }
  };

  const japaneseTextVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 1
      }
    }
  };



  return (
    <section className="w-full relative overflow-hidden">
      {/* Hero Content */}
      <div className="w-full flex items-center justify-center py-20 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-4xl px-4"
          style={{ gap: '24px' }}
        >
          {/* Main Title */}
          <motion.div
            variants={titleVariants}
            className="flex flex-col items-center"
            style={{ gap: '4px' }}
          >
            <motion.h1
              style={{
                fontFamily: typography.fontFamily.primary,
                fontSize: 'clamp(3rem, 8vw, 5rem)', // Responsive font size
                fontWeight: '400',
                lineHeight: '1.2em',
                color: colors.secondary.DEFAULT,
                textAlign: 'center',
                margin: 0,
              }}
            >
              Taste the tradition
            </motion.h1>
            <motion.h1
              style={{
                fontFamily: typography.fontFamily.primary,
                fontSize: 'clamp(3rem, 8vw, 5rem)', // Responsive font size
                fontWeight: '400',
                lineHeight: '1.2em',
                color: colors.secondary.DEFAULT,
                textAlign: 'center',
                margin: 0,
              }}
            >
              of Japan
            </motion.h1>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={descriptionVariants}
            style={{
              fontFamily: typography.fontFamily.secondary,
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', // Responsive font size
              fontWeight: '400',
              lineHeight: '1.4em',
              color: colors.secondary.DEFAULT,
              textAlign: 'center',
              maxWidth: '620px',
              margin: 0,
            }}
          >
           Experience the essence of Japanese cuisine. Fresh ingredients and timeless recipes come together in perfect harmony.
          </motion.p>

          {/* Order Now Button */}
          <motion.button
            variants={buttonVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: `0 8px 25px ${colors.primary.DEFAULT}40`
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="cursor-pointer"
            style={{
              backgroundColor: colors.primary.DEFAULT,
              borderRadius: '24px 0px 24px 0px',
              border: 'none',
              padding: '16px',
              width: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: typography.fontFamily.primary,
              fontSize: '20px',
              fontWeight: '400',
              lineHeight: '1.4em',
              color: colors.white,
              textAlign: 'center',
            }}
            onClick={() => {
              // Order functionality can be added here
              console.log('Order Now clicked');
            }}
          >
            Order Now
          </motion.button>
        </motion.div>
      </div>

      {/* Bowl Section */}
      <div className="relative w-full flex flex-col items-center pb-20">
        {/* Main Bowl Image */}
        <motion.div
          variants={bowlVariants}
          initial="hidden"
          animate="visible"
          className="relative mb-8"
          style={{
            width: 'clamp(300px, 50vw, 600px)',
            height: 'clamp(200px, 33vw, 400px)',
          }}
        >
          <Image
            src="/decorative/bowl.png"
            alt="Traditional Japanese Ramen Bowl"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </motion.div>

        {/* Japanese Text */}
        <motion.div
          variants={japaneseTextVariants}
          initial="hidden"
          animate="visible"
          className="w-full overflow-hidden"
        >
          <div className="flex items-center justify-center whitespace-nowrap">
            <motion.span
              animate={{ x: [0, -200, 0] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
                             style={{
                 fontFamily: typography.fontFamily.japanese,
                 fontSize: 'clamp(3rem, 8vw, 6.25rem)', // 100px responsive
                 fontWeight: '400',
                 lineHeight: '1.4em',
                 color: '#E9DAC6',
                 opacity: 0.6,
                 display: 'inline-block',
                 paddingRight: '4rem'
               }}
            >
              最高の食べ物 最高の食べ物 最高の食べ物
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 