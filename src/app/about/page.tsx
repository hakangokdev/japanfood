'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
}

interface Value {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const AboutPage = () => {
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

  const textVariants: Variants = {
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

  const cardVariants: Variants = {
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

  const imageVariants: Variants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Hiroshi Tanaka",
      role: "Head Chef & Owner",
      description: "With over 20 years of experience in traditional Japanese cuisine, Chef Tanaka brings authentic flavors from Tokyo to your table.",
      image: "/testimonials/character-1.svg"
    },
    {
      id: 2,
      name: "Yuki Sato",
      role: "Sushi Master",
      description: "Trained in the art of sushi making for 15 years, Yuki-san ensures every piece is crafted to perfection with the freshest ingredients.",
      image: "/testimonials/character-2.svg"
    },
    {
      id: 3,
      name: "Kenji Nakamura",
      role: "Ramen Specialist",
      description: "Master of ramen broth and noodle preparation, Kenji brings authentic flavors from the streets of Osaka to our kitchen.",
      image: "/testimonials/character-3.svg"
    }
  ];

  const values: Value[] = [
    {
      id: 1,
      title: "Authenticity",
      description: "We honor traditional Japanese cooking techniques passed down through generations",
      icon: "/icons/sushi-icon.svg"
    },
    {
      id: 2,
      title: "Quality",
      description: "Only the finest and freshest ingredients make it to your plate",
      icon: "/icons/ramen-icon.svg"
    },
    {
      id: 3,
      title: "Craftsmanship",
      description: "Every dish is prepared with meticulous attention to detail and artistry",
      icon: "/icons/mochi-icon.svg"
    },
    {
      id: 4,
      title: "Hospitality",
      description: "We welcome every guest with the warmth of Japanese omotenashi service",
      icon: "/icons/onigiri-icon.svg"
    }
  ];

  return (
    <div 
      className="min-h-screen w-full"
      style={{ backgroundColor: colors.background }}
    >
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
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
              About Us
            </h1>
            <p
              style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                fontWeight: '400',
                lineHeight: '1.4',
                color: colors.secondary.light,
                marginTop: '16px',
                maxWidth: '600px',
                margin: '16px auto 0',
              }}
            >
              Discover the story behind Miyabi House and our passion for authentic Japanese cuisine
            </p>
          </motion.div>
        </motion.section>

        {/* Story Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="py-20 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={textVariants}>
                <h2
                  style={{
                    fontFamily: typography.fontFamily.primary,
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    fontWeight: '400',
                    lineHeight: '1.2',
                    color: colors.secondary.DEFAULT,
                    textTransform: 'uppercase',
                    margin: '0 0 24px 0',
                  }}
                >
                  Our Story
                </h2>
                <div className="space-y-6">
                  <p
                    style={{
                      fontFamily: typography.fontFamily.secondary,
                      fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
                      fontWeight: '400',
                      lineHeight: '1.6',
                      color: colors.secondary.DEFAULT,
                      margin: 0,
                    }}
                  >
                    Founded in 2018, Miyabi House began as a dream to bring the authentic flavors and traditions of Japan to our local community. Our founder, Chef Hiroshi Tanaka, spent decades perfecting his craft in Tokyo's most renowned restaurants.
                  </p>
                  <p
                    style={{
                      fontFamily: typography.fontFamily.secondary,
                      fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
                      fontWeight: '400',
                      lineHeight: '1.6',
                      color: colors.secondary.DEFAULT,
                      margin: 0,
                    }}
                  >
                    Every dish at Miyabi House tells a story of tradition, craftsmanship, and respect for ingredients. We believe that food is not just nourishment, but a way to connect cultures and create lasting memories.
                  </p>
                  <p
                    style={{
                      fontFamily: typography.fontFamily.secondary,
                      fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
                      fontWeight: '400',
                      lineHeight: '1.6',
                      color: colors.secondary.DEFAULT,
                      margin: 0,
                    }}
                  >
                    From our handcrafted sushi to our soul-warming ramen, each meal is prepared with the utmost care and attention to detail, ensuring an authentic Japanese dining experience.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                variants={imageVariants}
                className="relative"
                style={{
                  height: 'clamp(300px, 40vw, 500px)',
                  borderRadius: '24px 0px 24px 0px',
                  overflow: 'hidden',
                  border: `2px solid ${colors.secondary.DEFAULT}`,
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: colors.gray[100] }}
                >
                  <Image
                    src="/decorative/bowl.png"
                    alt="Traditional Japanese cuisine"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="py-20"
          style={{ backgroundColor: colors.white }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={titleVariants}
              className="text-center mb-16"
            >
              <h2
                style={{
                  fontFamily: typography.fontFamily.primary,
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: '400',
                  lineHeight: '1.2',
                  color: colors.secondary.DEFAULT,
                  textTransform: 'uppercase',
                  margin: '0 0 16px 0',
                }}
              >
                Our Values
              </h2>
              <p
                style={{
                  fontFamily: typography.fontFamily.secondary,
                  fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
                  fontWeight: '400',
                  lineHeight: '1.6',
                  color: colors.secondary.light,
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                The principles that guide everything we do at Miyabi House
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.id}
                  variants={cardVariants}
                  className="text-center p-8 rounded-3xl border"
                  style={{
                    borderColor: colors.gray[200],
                    backgroundColor: colors.background,
                  }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: `0 20px 40px ${colors.gray[300]}40`
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6 flex justify-center">
                    <div
                      className="p-4 rounded-full"
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
                        src={value.icon}
                        alt={value.title}
                        width={40}
                        height={40}
                      />
                    </div>
                  </div>
                  <h3
                    style={{
                      fontFamily: typography.fontFamily.primary,
                      fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                      fontWeight: '400',
                      lineHeight: '1.3',
                      color: colors.secondary.DEFAULT,
                      margin: '0 0 12px 0',
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: typography.fontFamily.secondary,
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                      fontWeight: '400',
                      lineHeight: '1.5',
                      color: colors.secondary.light,
                      margin: 0,
                    }}
                  >
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={titleVariants}
              className="text-center mb-16"
            >
              <h2
                style={{
                  fontFamily: typography.fontFamily.primary,
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: '400',
                  lineHeight: '1.2',
                  color: colors.secondary.DEFAULT,
                  textTransform: 'uppercase',
                  margin: '0 0 16px 0',
                }}
              >
                Meet Our Team
              </h2>
              <p
                style={{
                  fontFamily: typography.fontFamily.secondary,
                  fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
                  fontWeight: '400',
                  lineHeight: '1.6',
                  color: colors.secondary.light,
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                The passionate chefs and artisans who bring Japan to your table
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  variants={cardVariants}
                  className="text-center p-8 rounded-3xl border bg-white"
                  style={{
                    borderColor: colors.gray[200],
                  }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: `0 20px 40px ${colors.gray[300]}40`
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6 flex justify-center">
                    <div
                      className="relative overflow-hidden rounded-full"
                      style={{
                        width: '120px',
                        height: '120px',
                        border: `3px solid ${colors.primary.DEFAULT}`,
                      }}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h3
                    style={{
                      fontFamily: typography.fontFamily.primary,
                      fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                      fontWeight: '400',
                      lineHeight: '1.3',
                      color: colors.secondary.DEFAULT,
                      margin: '0 0 8px 0',
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: typography.fontFamily.secondary,
                      fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
                      fontWeight: '600',
                      lineHeight: '1.4',
                      color: colors.primary.DEFAULT,
                      margin: '0 0 16px 0',
                    }}
                  >
                    {member.role}
                  </p>
                  <p
                    style={{
                      fontFamily: typography.fontFamily.secondary,
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                      fontWeight: '400',
                      lineHeight: '1.5',
                      color: colors.secondary.light,
                      margin: 0,
                    }}
                  >
                    {member.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="py-20"
          style={{ backgroundColor: colors.secondary.DEFAULT }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              variants={titleVariants}
              style={{
                fontFamily: typography.fontFamily.primary,
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: '400',
                lineHeight: '1.2',
                color: colors.white,
                textTransform: 'uppercase',
                margin: '0 0 24px 0',
              }}
            >
              Experience Japan
            </motion.h2>
            <motion.p
              variants={textVariants}
              style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
                fontWeight: '400',
                lineHeight: '1.6',
                color: colors.white,
                margin: '0 0 32px 0',
                opacity: 0.9,
              }}
            >
              Join us for an authentic Japanese dining experience that honors tradition while embracing innovation
            </motion.p>
            <motion.a
              href="/menu"
              variants={cardVariants}
              className="cursor-pointer border-2 inline-block text-decoration-none"
              style={{
                backgroundColor: colors.primary.DEFAULT,
                borderColor: colors.primary.DEFAULT,
                borderRadius: '24px 0px 24px 0px',
                padding: '16px 32px',
                fontFamily: typography.fontFamily.primary,
                fontSize: '20px',
                fontWeight: '400',
                lineHeight: '1.4em',
                color: colors.white,
                textAlign: 'center',
                textDecoration: 'none',
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: colors.white,
                color: colors.primary.DEFAULT,
                boxShadow: `0 8px 25px ${colors.primary.DEFAULT}40`
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              Visit Our Menu
            </motion.a>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage; 