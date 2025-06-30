'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  quote: string;
  character: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Charlie",
    title: "Editor",
    company: "NY Times",
    quote: "The sushi here was the freshest and most delicious I've ever had.",
    character: "/testimonials/character-1.svg"
  },
  {
    id: 2,
    name: "Martha",
    title: "Chef",
    company: "Nobu",
    quote: "I highly recommend the tempura - crispy and perfectly seasoned.",
    character: "/testimonials/character-2.svg"
  },
  {
    id: 3,
    name: "Zachery",
    title: "Sous Chef",
    company: "Stars",
    quote: "Great experience! Diverse menu with excellent seafood variety.",
    character: "/testimonials/character-3.svg"
  }
];

const Testimonials = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
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

  const testimonialVariants: Variants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const bubbleVariants: Variants = {
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

  return (
    <section 
      className="w-full py-20 lg:py-32 relative overflow-hidden"
      style={{ backgroundColor: colors.background }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Title */}
        <motion.div
          variants={titleVariants}
          className="text-center mb-16 lg:mb-24"
        >
          <h2
            style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: '400',
              lineHeight: '1.1',
              color: colors.secondary.DEFAULT,
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Testimonials
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={testimonialVariants}
              className="flex flex-col items-center text-center relative"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Speech Bubble with Quote */}
              <motion.div
                variants={bubbleVariants}
                className="relative mb-6"
                style={{
                  maxWidth: '320px',
                  width: '100%',
                }}
              >
                {/* Bubble Background */}
                <div className="relative">
                  <div 
                    className="absolute inset-0"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <Image
                      src="/testimonials/bubble.svg"
                      alt="Speech bubble"
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Quote Text */}
                  <div className="relative z-10 p-6 lg:p-8">
                    <p
                      style={{
                        fontFamily: typography.fontFamily.secondary,
                        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                        fontWeight: '400',
                        lineHeight: '1.5',
                        color: colors.secondary.DEFAULT,
                        margin: 0,
                        textAlign: 'center',
                      }}
                    >
                      "{testimonial.quote}"
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Character Image */}
              <div className="relative mb-6 lg:mb-8">
                <div 
                  className="relative"
                  style={{
                    width: 'clamp(120px, 15vw, 200px)',
                    height: 'clamp(120px, 15vw, 200px)',
                  }}
                >
                  <Image
                    src={testimonial.character}
                    alt={`${testimonial.name} character`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Author Info */}
              <div className="text-center">
                <h3
                  style={{
                    fontFamily: typography.fontFamily.secondary,
                    fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                    fontWeight: '600',
                    lineHeight: '1.3',
                    color: colors.secondary.DEFAULT,
                    margin: '0 0 4px 0',
                  }}
                >
                  - {testimonial.name}
                </h3>
                <p
                  style={{
                    fontFamily: typography.fontFamily.secondary,
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                    fontWeight: '400',
                    lineHeight: '1.4',
                    color: colors.secondary.light,
                    margin: 0,
                    fontStyle: 'italic',
                  }}
                >
                  {testimonial.title}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
