'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

interface SpecialtyCardProps {
  title: string;
  varieties: string;
  icon: React.ReactNode;
  delay: number;
}

const OurSpecialties = () => {
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

  const cardVariants: Variants = {
    hidden: { y: 100, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  // Figma SVG Icons
  const SushiIcon = () => (
    <img 
      src="/icons/sushi-icon.svg" 
      alt="Sushi illustration"
      className="w-full h-full object-contain"
    />
  );

  const RamenIcon = () => (
    <img 
      src="/icons/ramen-icon.svg" 
      alt="Ramen illustration"
      className="w-full h-full object-contain"
    />
  );

  const MochiIcon = () => (
    <img 
      src="/icons/mochi-icon.svg" 
      alt="Mochi illustration"
      className="w-full h-full object-contain"
    />
  );

  const OnigiriIcon = () => (
    <img 
      src="/icons/onigiri-icon.svg" 
      alt="Onigiri illustration"
      className="w-full h-full object-contain"
    />
  );

  const SpecialtyCard: React.FC<SpecialtyCardProps> = ({ title, varieties, icon, delay }) => (
    <motion.div
      variants={cardVariants}
      className="relative"
      style={{
        width: '290px',
        height: '366px',
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
    >
      {/* Main Card Border */}
      <div
        className="absolute inset-0 border"
        style={{
          borderColor: colors.secondary.DEFAULT,
          borderWidth: '1px',
          borderRadius: '48px 0px 48px 0px',
        }}
      />

      {/* Food Illustration */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: '24px',
          top: '24px',
          width: '242px',
          height: '180px',
        }}
      >
        {icon}
      </div>

      {/* Content Section */}
      <div
        className="absolute"
        style={{
          left: '24px',
          top: '224px',
          width: '242px',
          height: '38px',
        }}
      >
        {/* Variety Count */}
        <div
          className="absolute"
          style={{
            right: '0px',
            top: '14px',
            fontSize: '14px',
            fontFamily: typography.fontFamily.secondary,
            fontWeight: '400',
            lineHeight: '1.4em',
            color: colors.secondary.DEFAULT,
            textAlign: 'right',
          }}
        >
          {varieties}
        </div>

        {/* Food Name */}
        <div
          className="absolute"
          style={{
            left: '0px',
            top: '0px',
            fontSize: '32px',
            fontFamily: typography.fontFamily.primary,
            fontWeight: '400',
            lineHeight: '1.2em',
            color: colors.secondary.DEFAULT,
            textAlign: 'center',
          }}
        >
          {title}
        </div>
      </div>

      {/* Order Now Button */}
      <motion.div
        className="absolute border flex items-center justify-center cursor-pointer"
        style={{
          left: '24px',
          top: '282px',
          width: '242px',
          padding: '16px',
          borderColor: colors.primary.DEFAULT,
          borderWidth: '1px',
          borderRadius: '24px 0px 24px 0px',
        }}
        initial={{ backgroundColor: 'rgba(229, 110, 12, 0)' }}
        whileHover={{ 
          backgroundColor: 'rgba(229, 110, 12, 1)',
          transition: { duration: 0.3 }
        }}
        whileTap={{ 
          scale: 0.95,
          transition: { duration: 0.1 }
        }}
      >
        <motion.span
          style={{
            fontSize: '20px',
            fontFamily: typography.fontFamily.primary,
            fontWeight: '400',
            lineHeight: '1.4em',
            textAlign: 'center',
          }}
          initial={{ color: colors.primary.DEFAULT }}
          whileHover={{ 
            color: colors.white,
            transition: { duration: 0.3 }
          }}
        >
          Order Now
        </motion.span>
      </motion.div>
    </motion.div>
  );

  const specialties = [
    {
      title: "Sushi",
      varieties: "12 varieties",
      icon: <SushiIcon />,
    },
    {
      title: "Ramen",
      varieties: "8 varieties",
      icon: <RamenIcon />,
    },
    {
      title: "MOCHI",
      varieties: "5 varieties",
      icon: <MochiIcon />,
    },
    {
      title: "onigiri",
      varieties: "5 varieties",
      icon: <OnigiriIcon />,
    },
  ];

  return (
    <section className="w-full flex flex-col items-center py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center"
        style={{ gap: '40px' }}
      >
        {/* Section Title */}
        <motion.h2
          variants={titleVariants}
          style={{
            fontFamily: typography.fontFamily.primary,
            fontSize: '48px',
            fontWeight: '400',
            lineHeight: '1.2em',
            color: colors.secondary.DEFAULT,
            textAlign: 'center',
            margin: 0,
          }}
        >
          Our Specialties
        </motion.h2>

        {/* Specialty Cards Grid */}
        <div 
          className="flex flex-wrap items-center justify-center"
          style={{ gap: '40px', maxWidth: '1280px' }}
        >
          {specialties.map((specialty, index) => (
            <SpecialtyCard
              key={specialty.title}
              title={specialty.title}
              varieties={specialty.varieties}
              icon={specialty.icon}
              delay={index * 0.2}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default OurSpecialties; 