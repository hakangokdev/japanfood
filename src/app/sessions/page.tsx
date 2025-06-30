'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

interface Session {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: string;
  capacity: string;
  includes: string[];
  image: string;
  isPopular?: boolean;
  difficulty?: string;
}

interface SessionCategory {
  id: string;
  name: string;
  icon: string;
  sessions: Session[];
}

const SessionsPage = () => {
  const [activeCategory, setActiveCategory] = useState('cooking');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
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

  const categoryVariants: Variants = {
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

  const sessionVariants: Variants = {
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

  const sessionCategories: SessionCategory[] = [
    {
      id: 'cooking',
      name: 'Cooking Classes',
      icon: '/icons/ramen-icon.svg',
      sessions: [
        {
          id: 1,
          title: 'Sushi Making Workshop',
          description: 'Learn the art of sushi making from our master chef. From rice preparation to fish selection and rolling techniques.',
          duration: '3 hours',
          price: '$85',
          capacity: '8 people max',
          difficulty: 'Beginner',
          includes: ['All ingredients', 'Chef instruction', 'Recipe cards', 'Sake tasting', 'Certificate'],
          image: '/icons/sushi-icon.svg',
          isPopular: true
        },
        {
          id: 2,
          title: 'Ramen Mastery Class',
          description: 'Master the complex flavors of authentic ramen. Learn broth preparation, noodle making, and traditional toppings.',
          duration: '4 hours',
          price: '$95',
          capacity: '6 people max',
          difficulty: 'Intermediate',
          includes: ['Broth recipes', 'Noodle making', 'Toppings prep', 'Take-home kit', 'Chef guidance'],
          image: '/icons/ramen-icon.svg'
        },
        {
          id: 3,
          title: 'Traditional Mochi Making',
          description: 'Experience the ancient art of mochi making using traditional tools and techniques passed down through generations.',
          duration: '2.5 hours',
          price: '$65',
          capacity: '10 people max',
          difficulty: 'Beginner',
          includes: ['Traditional tools', 'Various fillings', 'Tea ceremony', 'Take-home mochi', 'Cultural stories'],
          image: '/icons/mochi-icon.svg'
        }
      ]
    },
    {
      id: 'tasting',
      name: 'Tasting Sessions',
      icon: '/icons/sushi-icon.svg',
      sessions: [
        {
          id: 4,
          title: 'Premium Sake Tasting',
          description: 'Journey through Japan\'s finest sake regions. Taste 8 premium sakes paired with traditional appetizers.',
          duration: '2 hours',
          price: '$75',
          capacity: '12 people max',
          includes: ['8 premium sakes', 'Tasting notes', 'Food pairings', 'Sake guide', 'Take-home bottle'],
          image: '/icons/sushi-icon.svg',
          isPopular: true
        },
        {
          id: 5,
          title: 'Japanese Tea Ceremony',
          description: 'Immerse yourself in the meditative world of traditional Japanese tea ceremony with authentic matcha and sweets.',
          duration: '1.5 hours',
          price: '$45',
          capacity: '8 people max',
          includes: ['Matcha preparation', 'Traditional sweets', 'Ceremony explanation', 'Cultural insights', 'Tea kit'],
          image: '/icons/mochi-icon.svg'
        },
        {
          id: 6,
          title: 'Umami Discovery',
          description: 'Explore the fifth taste through carefully curated dishes that showcase the depth and complexity of umami.',
          duration: '2.5 hours',
          price: '$65',
          capacity: '10 people max',
          includes: ['7-course tasting', 'Umami explanation', 'Ingredient samples', 'Flavor guide', 'Recipe collection'],
          image: '/icons/onigiri-icon.svg'
        }
      ]
    },
    {
      id: 'private',
      name: 'Private Dining',
      icon: '/icons/onigiri-icon.svg',
      sessions: [
        {
          id: 7,
          title: 'Omakase Experience',
          description: 'Ultimate chef\'s choice dining experience with seasonal ingredients and personalized menu creation.',
          duration: '3 hours',
          price: '$150',
          capacity: '2-8 people',
          includes: ['Multi-course meal', 'Sake pairing', 'Personal chef', 'Custom menu', 'Private room'],
          image: '/icons/sushi-icon.svg',
          isPopular: true
        },
        {
          id: 8,
          title: 'Kaiseki Dinner',
          description: 'Traditional multi-course Japanese haute cuisine showcasing seasonal ingredients and artistic presentation.',
          duration: '4 hours',
          price: '$200',
          capacity: '2-6 people',
          includes: ['9-course kaiseki', 'Premium ingredients', 'Artistic presentation', 'Cultural explanation', 'Tea service'],
          image: '/icons/mochi-icon.svg'
        },
        {
          id: 9,
          title: 'Birthday Celebration',
          description: 'Special celebration package with customized menu, traditional decorations, and memorable experiences.',
          duration: '2.5 hours',
          price: '$120',
          capacity: '4-12 people',
          includes: ['Custom menu', 'Birthday cake', 'Decorations', 'Photo session', 'Sake toast'],
          image: '/icons/ramen-icon.svg'
        }
      ]
    }
  ];

  const currentCategory = sessionCategories.find(cat => cat.id === activeCategory);

  return (
    <div 
      className="min-h-screen w-full"
      style={{ backgroundColor: colors.background }}
    >
      <Header />
      
      <main className="pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          {/* Page Title */}
          <motion.div
            variants={titleVariants}
            className="text-center mb-16"
          >
            <h1
              style={{
                fontFamily: typography.fontFamily.primary,
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                fontWeight: '400',
                lineHeight: '1.1',
                color: colors.secondary.DEFAULT,
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Sessions
            </h1>
            <p
              style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                fontWeight: '400',
                lineHeight: '1.4',
                color: colors.secondary.light,
                marginTop: '16px',
                maxWidth: '700px',
                margin: '16px auto 0',
              }}
            >
              Immerse yourself in Japanese culture through our exclusive cooking classes, tasting sessions, and private dining experiences
            </p>
          </motion.div>

          {/* Category Navigation */}
          <motion.div
            variants={categoryVariants}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {sessionCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center gap-3 px-6 py-3 rounded-full border-2 cursor-pointer transition-all duration-300"
                style={{
                  borderColor: activeCategory === category.id ? colors.primary.DEFAULT : colors.secondary.light,
                  backgroundColor: activeCategory === category.id ? 'rgba(229, 110, 12, 1)' : 'rgba(229, 110, 12, 0)',
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: activeCategory === category.id ? 'rgba(229, 110, 12, 1)' : 'rgba(229, 110, 12, 0.1)',
                  boxShadow: activeCategory === category.id 
                    ? `0 8px 25px ${colors.primary.DEFAULT}40` 
                    : `0 4px 15px ${colors.secondary.light}30`
                }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src={category.icon} 
                  alt={category.name}
                  className="w-6 h-6"
                />
                <span
                  style={{
                    fontFamily: typography.fontFamily.primary,
                    fontSize: '18px',
                    fontWeight: '400',
                    color: activeCategory === category.id ? colors.white : colors.secondary.DEFAULT,
                  }}
                >
                  {category.name}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Sessions Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid gap-8 md:gap-10"
            >
              {currentCategory?.sessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  variants={sessionVariants}
                  className="relative bg-white rounded-3xl overflow-hidden shadow-lg border"
                  style={{
                    borderColor: colors.gray[200],
                    borderWidth: '1px',
                  }}
                  whileHover={{ 
                    y: -8,
                    boxShadow: `0 25px 50px ${colors.gray[300]}40`
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Popular Badge */}
                  {session.isPopular && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold z-10"
                      style={{
                        backgroundColor: colors.primary.DEFAULT,
                        color: colors.white,
                        fontFamily: typography.fontFamily.secondary,
                      }}
                    >
                      Popular
                    </motion.div>
                  )}

                  <div className="grid md:grid-cols-3 gap-8 p-8">
                    {/* Session Icon & Info */}
                    <div className="md:col-span-2">
                      <div className="flex items-start gap-6 mb-6">
                        <div
                          className="flex-shrink-0 p-4 rounded-full"
                          style={{
                            backgroundColor: `${colors.primary.DEFAULT}20`,
                            width: '80px',
                            height: '80px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Image
                            src={session.image}
                            alt={session.title}
                            width={40}
                            height={40}
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <h3
                              style={{
                                fontFamily: typography.fontFamily.primary,
                                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                                fontWeight: '400',
                                lineHeight: '1.3',
                                color: colors.secondary.DEFAULT,
                                margin: 0,
                              }}
                            >
                              {session.title}
                            </h3>
                            {session.difficulty && (
                              <span
                                className="px-3 py-1 rounded-full text-sm"
                                style={{
                                  backgroundColor: session.difficulty === 'Beginner' ? `${colors.success}20` : 
                                                 session.difficulty === 'Intermediate' ? `${colors.warning}20` : `${colors.error}20`,
                                  color: session.difficulty === 'Beginner' ? colors.success : 
                                        session.difficulty === 'Intermediate' ? colors.warning : colors.error,
                                  fontFamily: typography.fontFamily.secondary,
                                  fontWeight: '500',
                                }}
                              >
                                {session.difficulty}
                              </span>
                            )}
                          </div>
                          
                          <p
                            style={{
                              fontFamily: typography.fontFamily.secondary,
                              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                              fontWeight: '400',
                              lineHeight: '1.6',
                              color: colors.secondary.light,
                              margin: '0 0 24px 0',
                            }}
                          >
                            {session.description}
                          </p>

                          {/* Session Details */}
                          <div className="grid sm:grid-cols-3 gap-4 mb-6">
                            <div>
                              <p
                                style={{
                                  fontFamily: typography.fontFamily.secondary,
                                  fontSize: '14px',
                                  fontWeight: '600',
                                  color: colors.secondary.light,
                                  margin: '0 0 4px 0',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px',
                                }}
                              >
                                Duration
                              </p>
                              <p
                                style={{
                                  fontFamily: typography.fontFamily.primary,
                                  fontSize: '16px',
                                  fontWeight: '400',
                                  color: colors.secondary.DEFAULT,
                                  margin: 0,
                                }}
                              >
                                {session.duration}
                              </p>
                            </div>
                            
                            <div>
                              <p
                                style={{
                                  fontFamily: typography.fontFamily.secondary,
                                  fontSize: '14px',
                                  fontWeight: '600',
                                  color: colors.secondary.light,
                                  margin: '0 0 4px 0',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px',
                                }}
                              >
                                Capacity
                              </p>
                              <p
                                style={{
                                  fontFamily: typography.fontFamily.primary,
                                  fontSize: '16px',
                                  fontWeight: '400',
                                  color: colors.secondary.DEFAULT,
                                  margin: 0,
                                }}
                              >
                                {session.capacity}
                              </p>
                            </div>
                            
                            <div>
                              <p
                                style={{
                                  fontFamily: typography.fontFamily.secondary,
                                  fontSize: '14px',
                                  fontWeight: '600',
                                  color: colors.secondary.light,
                                  margin: '0 0 4px 0',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px',
                                }}
                              >
                                Price
                              </p>
                              <p
                                style={{
                                  fontFamily: typography.fontFamily.primary,
                                  fontSize: '20px',
                                  fontWeight: '400',
                                  color: colors.primary.DEFAULT,
                                  margin: 0,
                                }}
                              >
                                {session.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Includes Section */}
                      <div>
                        <h4
                          style={{
                            fontFamily: typography.fontFamily.secondary,
                            fontSize: '16px',
                            fontWeight: '600',
                            color: colors.secondary.DEFAULT,
                            margin: '0 0 12px 0',
                          }}
                        >
                          What's Included:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {session.includes.map((item, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-full text-sm"
                              style={{
                                backgroundColor: colors.background,
                                color: colors.secondary.DEFAULT,
                                fontFamily: typography.fontFamily.secondary,
                                border: `1px solid ${colors.gray[200]}`,
                              }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Booking Section */}
                    <div className="flex flex-col justify-center items-center text-center space-y-4">
                      <motion.button
                        className="w-full px-8 py-4 rounded-full border-2 cursor-pointer"
                        style={{
                          borderColor: colors.primary.DEFAULT,
                          backgroundColor: colors.primary.DEFAULT,
                          fontFamily: typography.fontFamily.primary,
                          fontSize: '18px',
                          fontWeight: '400',
                          color: colors.white,
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: colors.secondary.DEFAULT,
                          borderColor: colors.secondary.DEFAULT,
                          boxShadow: `0 8px 25px ${colors.secondary.DEFAULT}40`
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        Book Now
                      </motion.button>
                      
                      <motion.button
                        className="w-full px-8 py-3 rounded-full border-2 cursor-pointer"
                        style={{
                          borderColor: colors.secondary.light,
                          backgroundColor: 'rgba(74, 91, 142, 0)',
                          fontFamily: typography.fontFamily.secondary,
                          fontSize: '16px',
                          fontWeight: '500',
                          color: colors.secondary.DEFAULT,
                        }}
                        whileHover={{ 
                          backgroundColor: 'rgba(74, 91, 142, 1)',
                          color: colors.white,
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Call to Action */}
          <motion.div
            variants={titleVariants}
            className="text-center mt-20 p-12 rounded-3xl"
            style={{ backgroundColor: colors.white }}
          >
            <h3
              style={{
                fontFamily: typography.fontFamily.primary,
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: '400',
                lineHeight: '1.3',
                color: colors.secondary.DEFAULT,
                margin: '0 0 16px 0',
              }}
            >
              Can't find what you're looking for?
            </h3>
            <p
              style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                fontWeight: '400',
                lineHeight: '1.6',
                color: colors.secondary.light,
                margin: '0 0 24px 0',
                maxWidth: '500px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Contact us to create a custom experience tailored to your preferences and group size.
            </p>
            <motion.button
              className="px-8 py-3 rounded-full border-2 cursor-pointer"
              style={{
                borderColor: colors.primary.DEFAULT,
                backgroundColor: 'rgba(229, 110, 12, 0)',
                fontFamily: typography.fontFamily.primary,
                fontSize: '18px',
                fontWeight: '400',
                color: colors.primary.DEFAULT,
              }}
              whileHover={{ 
                backgroundColor: 'rgba(229, 110, 12, 1)',
                color: colors.white,
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Contact Us
            </motion.button>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default SessionsPage; 