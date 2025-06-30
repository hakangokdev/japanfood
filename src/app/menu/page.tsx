'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image?: string;
  isPopular?: boolean;
}

interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  items: MenuItem[];
}

const MenuPage = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('sushi');

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

  const menuItemVariants: Variants = {
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

  const menuCategories: MenuCategory[] = [
    {
      id: 'sushi',
      name: 'Sushi',
      icon: '/icons/sushi-icon.svg',
      items: [
        {
          id: 1,
          name: 'Nigiri Sushi Set',
          description: 'Fresh tuna, salmon, yellowtail, and sea bream over seasoned rice',
          price: '$28.00',
          isPopular: true
        },
        {
          id: 2,
          name: 'Chirashi Bowl',
          description: 'Assorted sashimi over sushi rice with seasonal vegetables',
          price: '$32.00'
        },
        {
          id: 3,
          name: 'Maki Combo',
          description: 'California roll, spicy tuna roll, and salmon avocado roll',
          price: '$24.00'
        },
        {
          id: 4,
          name: 'Omakase Selection',
          description: 'Chef\'s choice of 8 pieces nigiri and 1 specialty roll',
          price: '$45.00',
          isPopular: true
        },
        {
          id: 5,
          name: 'Vegetarian Sushi',
          description: 'Cucumber, avocado, pickled radish, and inari sushi',
          price: '$22.00'
        },
        {
          id: 6,
          name: 'Dragon Roll',
          description: 'Eel and cucumber topped with avocado and teriyaki sauce',
          price: '$18.00'
        }
      ]
    },
    {
      id: 'ramen',
      name: 'Ramen',
      icon: '/icons/ramen-icon.svg',
      items: [
        {
          id: 7,
          name: 'Tonkotsu Ramen',
          description: 'Rich pork bone broth with chashu, soft-boiled egg, and green onions',
          price: '$16.00',
          isPopular: true
        },
        {
          id: 8,
          name: 'Miso Ramen',
          description: 'Savory miso broth with corn, bamboo shoots, and nori',
          price: '$15.00'
        },
        {
          id: 9,
          name: 'Spicy Tantanmen',
          description: 'Sesame and chili oil broth with ground pork and vegetables',
          price: '$17.00'
        },
        {
          id: 10,
          name: 'Shoyu Ramen',
          description: 'Clear soy sauce broth with traditional toppings',
          price: '$14.00'
        },
        {
          id: 11,
          name: 'Vegetable Ramen',
          description: 'Plant-based broth with seasonal vegetables and tofu',
          price: '$13.00'
        },
        {
          id: 12,
          name: 'Seafood Ramen',
          description: 'Rich seafood broth with shrimp, scallops, and fish cake',
          price: '$19.00'
        }
      ]
    },
    {
      id: 'mochi',
      name: 'Mochi',
      icon: '/icons/mochi-icon.svg',
      items: [
        {
          id: 13,
          name: 'Traditional Mochi Set',
          description: 'Red bean, green tea, and black sesame flavors',
          price: '$12.00'
        },
        {
          id: 14,
          name: 'Fruit Mochi',
          description: 'Strawberry, mango, and lychee filled mochi',
          price: '$14.00',
          isPopular: true
        },
        {
          id: 15,
          name: 'Ice Cream Mochi',
          description: 'Vanilla, chocolate, and green tea ice cream wrapped in mochi',
          price: '$10.00'
        },
        {
          id: 16,
          name: 'Seasonal Special',
          description: 'Chef\'s seasonal creation with premium ingredients',
          price: '$16.00'
        },
        {
          id: 17,
          name: 'Daifuku Assortment',
          description: 'Traditional soft mochi with sweet filling varieties',
          price: '$11.00'
        }
      ]
    },
    {
      id: 'onigiri',
      name: 'Onigiri',
      icon: '/icons/onigiri-icon.svg',
      items: [
        {
          id: 18,
          name: 'Salmon Onigiri',
          description: 'Grilled salmon with seasoned rice wrapped in nori',
          price: '$4.50'
        },
        {
          id: 19,
          name: 'Tuna Mayo Onigiri',
          description: 'Spicy tuna mayo filling with crispy nori',
          price: '$5.00',
          isPopular: true
        },
        {
          id: 20,
          name: 'Pickled Plum Onigiri',
          description: 'Traditional umeboshi center with perfect rice texture',
          price: '$4.00'
        },
        {
          id: 21,
          name: 'Teriyaki Chicken Onigiri',
          description: 'Tender chicken teriyaki with vegetables',
          price: '$5.50'
        },
        {
          id: 22,
          name: 'Vegetable Onigiri',
          description: 'Mixed vegetables and seasoning with brown rice option',
          price: '$4.00'
        }
      ]
    }
  ];

  const currentCategory = menuCategories.find(cat => cat.id === activeCategory);

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
              Our Menu
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
              Discover authentic Japanese flavors crafted with traditional techniques and the finest ingredients
            </p>
          </motion.div>

          {/* Category Navigation */}
          <motion.div
            variants={categoryVariants}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {menuCategories.map((category) => (
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

          {/* Menu Items */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid gap-6 md:gap-8"
            >
              {currentCategory?.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={menuItemVariants}
                  className="relative bg-white rounded-3xl p-6 md:p-8 shadow-lg border"
                  style={{
                    borderColor: colors.gray[200],
                    borderWidth: '1px',
                  }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: `0 20px 40px ${colors.gray[300]}40`
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Popular Badge */}
                  {item.isPopular && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: colors.primary.DEFAULT,
                        color: colors.white,
                        fontFamily: typography.fontFamily.secondary,
                      }}
                    >
                      Popular
                    </motion.div>
                  )}

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
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
                        {item.name}
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
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span
                        style={{
                          fontFamily: typography.fontFamily.primary,
                          fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                          fontWeight: '400',
                          color: colors.primary.DEFAULT,
                        }}
                      >
                        {item.price}
                      </span>
                      
                      <motion.button
                        onClick={() => addToCart({
                          id: `${activeCategory}-${item.id}`,
                          name: item.name,
                          price: item.price,
                          category: activeCategory,
                        })}
                        className="px-6 py-2 rounded-full border-2 cursor-pointer"
                        style={{
                          borderColor: colors.primary.DEFAULT,
                          backgroundColor: 'rgba(229, 110, 12, 0)',
                          fontFamily: typography.fontFamily.secondary,
                          fontSize: '14px',
                          fontWeight: '500',
                          color: colors.primary.DEFAULT,
                        }}
                        whileHover={{ 
                          backgroundColor: 'rgba(229, 110, 12, 1)',
                          color: colors.white,
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        Add to Order
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default MenuPage; 