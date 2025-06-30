'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

interface GalleryItem {
  id: number;
  title: string;
  category: 'food' | 'interior' | 'atmosphere' | 'chef';
  image: string;
  description: string;
}

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.05,
        delayChildren: 0.1
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

  const filterVariants: Variants = {
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

  const imageVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)",
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const modalVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  // Gallery data with real images
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: 'Fresh Sushi Selection',
      category: 'food',
      image: '/images/pexels-pixabay-271715.jpg',
      description: 'Our finest selection of fresh sushi, prepared by master chef Hiroshi Tanaka'
    },
    {
      id: 2,
      title: 'Traditional Ramen Bowl',
      category: 'food',
      image: '/images/pexels-rajesh-tp-749235-2098085.jpg',
      description: 'Rich tonkotsu broth with handmade noodles and traditional toppings'
    },
    {
      id: 3,
      title: 'Restaurant Interior',
      category: 'interior',
      image: '/images/pexels-pixabay-37352.jpg',
      description: 'Modern Japanese design with traditional elements and warm lighting'
    },
    {
      id: 4,
      title: 'Head Chef Hiroshi',
      category: 'chef',
      image: '/images/japanchef.jpg',
      description: 'Head Chef Hiroshi Tanaka preparing fresh sushi with precision and care'
    },
    {
      id: 5,
      title: 'Dining Atmosphere',
      category: 'atmosphere',
      image: '/images/pexels-frans-van-heerden-201846-670705.jpg',
      description: 'Cozy dining experience with authentic Japanese ambiance'
    },
    {
      id: 6,
      title: 'Authentic Japanese Cuisine',
      category: 'food',
      image: '/images/pexels-elli-559179-1854665.jpg',
      description: 'Traditional and modern Japanese dishes, made fresh daily'
    },
    {
      id: 7,
      title: 'Private Dining Experience',
      category: 'interior',
      image: '/images/pexels-pixabay-357756.jpg',
      description: 'Intimate setting for special occasions and business meetings'
    },
    {
      id: 8,
      title: 'Kitchen Artistry',
      category: 'atmosphere',
      image: '/images/pexels-1155579-2871757.jpg',
      description: 'Traditional Japanese culinary techniques in our modern kitchen'
    },
    {
      id: 9,
      title: 'Master Chef at Work',
      category: 'chef',
      image: '/images/japanchef2.jpg',
      description: 'Our talented chefs working together to create culinary art'
    },
    {
      id: 10,
      title: 'Fresh Ingredients',
      category: 'food',
      image: '/images/pexels-ngqah83-884600.jpg',
      description: 'Premium quality ingredients sourced fresh daily'
    },
    {
      id: 11,
      title: 'Traditional Preparation',
      category: 'food',
      image: '/images/pexels-pixabay-357756 (1).jpg',
      description: 'Time-honored techniques for preparing authentic Japanese dishes'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Photos', count: galleryItems.length },
    { id: 'food', name: 'Food', count: galleryItems.filter(item => item.category === 'food').length },
    { id: 'interior', name: 'Interior', count: galleryItems.filter(item => item.category === 'interior').length },
    { id: 'atmosphere', name: 'Atmosphere', count: galleryItems.filter(item => item.category === 'atmosphere').length },
    { id: 'chef', name: 'Our Chefs', count: galleryItems.filter(item => item.category === 'chef').length }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleImageLoad = (itemId: number) => {
    setImagesLoaded(prev => new Set([...prev, itemId]));
  };

  const ImageSkeleton = () => (
    <div 
      className="animate-pulse bg-gray-200 w-full h-full absolute inset-0"
      style={{ backgroundColor: `${colors.secondary.light}30` }}
    />
  );

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
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
              Gallery
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
              Explore the beauty of Miyabi House through our curated collection of photographs
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            variants={filterVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="px-6 py-3 rounded-full border transition-all duration-300"
                style={{
                  borderColor: selectedCategory === category.id ? colors.primary.DEFAULT : colors.secondary.light,
                  backgroundColor: selectedCategory === category.id ? colors.primary.DEFAULT : 'transparent',
                  color: selectedCategory === category.id ? colors.white : colors.secondary.DEFAULT,
                  fontFamily: typography.fontFamily.secondary,
                  fontSize: '16px',
                  fontWeight: '500',
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 10 
                  }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
              >
                {category.name} ({category.count})
              </motion.button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ 
                    delay: index * 0.05,
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                  onClick={() => setSelectedImage(item)}
                  whileHover={{ 
                    y: -8,
                    z: 0,
                    transition: { 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20 
                    }
                  }}
                  style={{
                    transform: 'translate3d(0, 0, 0)',
                    willChange: 'transform'
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {!imagesLoaded.has(item.id) && <ImageSkeleton />}
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                        imagesLoaded.has(item.id) ? 'opacity-100' : 'opacity-0'
                      }`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 6}
                      loading={index < 6 ? 'eager' : 'lazy'}
                      quality={85}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      onLoad={() => handleImageLoad(item.id)}
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3
                      style={{
                        fontFamily: typography.fontFamily.primary,
                        fontSize: '18px',
                        fontWeight: '400',
                        color: colors.secondary.DEFAULT,
                        marginBottom: '8px',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: typography.fontFamily.secondary,
                        fontSize: '14px',
                        fontWeight: '400',
                        color: colors.secondary.light,
                        lineHeight: '1.4',
                      }}
                    >
                      {item.description}
                    </p>
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium mt-3"
                      style={{
                        backgroundColor: `${colors.primary.DEFAULT}20`,
                        color: colors.primary.DEFAULT,
                        fontFamily: typography.fontFamily.secondary,
                      }}
                    >
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.section>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1200px) 100vw, 80vw"
                    quality={90}
                    priority
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 w-10 h-10 text-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200"
                    style={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}
                  >
                    ✕
                  </button>
                </div>
                
                <div className="p-6">
                  <h3
                    style={{
                      fontFamily: typography.fontFamily.primary,
                      fontSize: '24px',
                      fontWeight: '400',
                      color: colors.secondary.DEFAULT,
                      marginBottom: '8px',
                    }}
                  >
                    {selectedImage.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: typography.fontFamily.secondary,
                      fontSize: '16px',
                      fontWeight: '400',
                      color: colors.secondary.light,
                      lineHeight: '1.6',
                    }}
                  >
                    {selectedImage.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default GalleryPage; 