'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: 'recipe' | 'culture' | 'news' | 'tips';
  image: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

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

  const postVariants: Variants = {
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

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'The Art of Making Perfect Sushi Rice',
      excerpt: 'Learn the traditional techniques for preparing shari, the foundation of exceptional sushi.',
      content: 'Sushi rice, or shari, is the heart of exceptional sushi. The perfect balance of vinegar, sugar, and salt creates the ideal base for our fresh ingredients...',
      author: 'Chef Hiroshi Tanaka',
      date: '2025-07-15',
      category: 'recipe',
      image: '/decorative/bowl.png',
      readTime: '5 min read',
      tags: ['sushi', 'rice', 'technique', 'traditional'],
      featured: true
    },
    {
      id: 2,
      title: 'Understanding Japanese Tea Ceremony',
      excerpt: 'Explore the spiritual and cultural significance of the traditional Japanese tea ceremony.',
      content: 'The Japanese tea ceremony, known as sadō or chadō, is a choreographed ritual of preparing and serving Japanese green tea...',
      author: 'Yuki Sato',
      date: '2025-07-12',
      category: 'culture',
      image: '/testimonials/character-2.svg',
      readTime: '8 min read',
      tags: ['culture', 'tea', 'ceremony', 'tradition']
    },
    {
      id: 3,
      title: 'New Winter Menu Launch',
      excerpt: 'Discover our seasonal offerings featuring warm, comforting dishes perfect for winter.',
      content: 'As winter settles in, we are excited to introduce our new seasonal menu featuring warming dishes that capture the essence of Japanese winter cuisine...',
      author: 'Miyabi House Team',
      date: '2025-07-10',
      category: 'news',
      image: '/decorative/bowl.png',
      readTime: '3 min read',
      tags: ['menu', 'winter', 'seasonal', 'new'],
      featured: true
    },
    {
      id: 4,
      title: 'How to Properly Use Chopsticks',
      excerpt: 'Master the elegant art of using chopsticks with our step-by-step guide.',
      content: 'Using chopsticks properly is both an art and a practical skill. Here is our comprehensive guide to mastering this essential dining tool...',
      author: 'Kenji Nakamura',
      date: '2025-07-08',
      category: 'tips',
      image: '/testimonials/character-3.svg',
      readTime: '4 min read',
      tags: ['chopsticks', 'etiquette', 'dining', 'technique']
    },
    {
      id: 5,
      title: 'Traditional Ramen Broth Secrets',
      excerpt: 'Uncover the time-honored methods behind our rich, flavorful ramen broths.',
      content: 'The secret to exceptional ramen lies in the broth. Our chefs spend hours carefully crafting each type of broth using traditional methods...',
      author: 'Chef Hiroshi Tanaka',
      date: '2025-07-05',
      category: 'recipe',
      image: '/decorative/bowl.png',
      readTime: '6 min read',
      tags: ['ramen', 'broth', 'recipe', 'traditional']
    },
    {
      id: 6,
      title: 'The History of Mochi',
      excerpt: 'Journey through the fascinating history and cultural importance of mochi in Japanese society.',
      content: 'Mochi has been a cornerstone of Japanese cuisine and culture for over 2,000 years. This sweet rice cake holds deep cultural significance...',
      author: 'Yuki Sato',
      date: '2025-07-03',
      category: 'culture',
      image: '/decorative/bowl.png',
      readTime: '7 min read',
      tags: ['mochi', 'history', 'culture', 'dessert']
    },
    {
      id: 7,
      title: 'Chef Hiroshi Interview: 20 Years of Excellence',
      excerpt: 'Our head chef shares insights from two decades of perfecting Japanese cuisine.',
      content: 'In this exclusive interview, Chef Hiroshi Tanaka reflects on his journey and the evolution of Japanese cuisine over the past 20 years...',
      author: 'Miyabi House Team',
      date: '2025-07-01',
      category: 'news',
      image: '/testimonials/character-1.svg',
      readTime: '10 min read',
      tags: ['chef', 'interview', 'experience', 'journey']
    },
    {
      id: 8,
      title: 'Sake Pairing Guide for Beginners',
      excerpt: 'Learn how to pair different types of sake with our signature dishes.',
      content: 'Sake pairing is an art that enhances both the drink and the food. Our guide will help you understand the basics of sake selection...',
      author: 'Kenji Nakamura',
      date: '2025-06-28',
      category: 'tips',
      image: '/decorative/bowl.png',
      readTime: '5 min read',
      tags: ['sake', 'pairing', 'guide', 'drinks']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'recipe', name: 'Recipes', count: blogPosts.filter(post => post.category === 'recipe').length },
    { id: 'culture', name: 'Culture', count: blogPosts.filter(post => post.category === 'culture').length },
    { id: 'news', name: 'News', count: blogPosts.filter(post => post.category === 'news').length },
    { id: 'tips', name: 'Tips', count: blogPosts.filter(post => post.category === 'tips').length }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'recipe': return '👨‍🍳';
      case 'culture': return '🏯';
      case 'news': return '📰';
      case 'tips': return '💡';
      default: return '📝';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'recipe': return colors.primary.DEFAULT;
      case 'culture': return '#8B5CF6';
      case 'news': return '#10B981';
      case 'tips': return '#F59E0B';
      default: return colors.secondary.light;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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
              Our Blog
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
              Discover Japanese culture, authentic recipes, and the stories behind our cuisine
            </p>
          </motion.div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <motion.div
              variants={containerVariants}
              className="mb-16"
            >
              <h2
                style={{
                  fontFamily: typography.fontFamily.primary,
                  fontSize: '32px',
                  fontWeight: '400',
                  color: colors.secondary.DEFAULT,
                  marginBottom: '24px',
                  textAlign: 'center',
                }}
              >
                Featured Stories
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    variants={postVariants}
                    transition={{ delay: index * 0.2 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -8 }}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium text-white"
                          style={{
                            backgroundColor: getCategoryColor(post.category),
                            fontFamily: typography.fontFamily.secondary,
                          }}
                        >
                          {getCategoryIcon(post.category)} Featured
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: `${getCategoryColor(post.category)}20`,
                            color: getCategoryColor(post.category),
                            fontFamily: typography.fontFamily.secondary,
                          }}
                        >
                          {getCategoryIcon(post.category)} {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </span>
                        <span
                          style={{
                            fontFamily: typography.fontFamily.secondary,
                            fontSize: '12px',
                            color: colors.secondary.light,
                          }}
                        >
                          {post.readTime}
                        </span>
                      </div>
                      
                      <h3
                        style={{
                          fontFamily: typography.fontFamily.primary,
                          fontSize: '24px',
                          fontWeight: '400',
                          color: colors.secondary.DEFAULT,
                          marginBottom: '12px',
                          lineHeight: '1.3',
                        }}
                      >
                        {post.title}
                      </h3>
                      
                      <p
                        style={{
                          fontFamily: typography.fontFamily.secondary,
                          fontSize: '16px',
                          fontWeight: '400',
                          color: colors.secondary.light,
                          lineHeight: '1.5',
                          marginBottom: '16px',
                        }}
                      >
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            style={{
                              fontFamily: typography.fontFamily.secondary,
                              fontSize: '14px',
                              fontWeight: '500',
                              color: colors.secondary.DEFAULT,
                            }}
                          >
                            {post.author}
                          </span>
                          <span
                            style={{
                              fontFamily: typography.fontFamily.secondary,
                              fontSize: '14px',
                              color: colors.secondary.light,
                            }}
                          >
                            • {formatDate(post.date)}
                          </span>
                        </div>
                        
                        <motion.button
                          className="px-4 py-2 rounded-xl border transition-all duration-300"
                          style={{
                            borderColor: colors.primary.DEFAULT,
                            color: colors.primary.DEFAULT,
                            fontFamily: typography.fontFamily.secondary,
                            fontSize: '14px',
                            fontWeight: '500',
                          }}
                          whileHover={{ 
                            backgroundColor: colors.primary.DEFAULT, 
                            color: colors.white,
                            scale: 1.05 
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Read More
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}

          {/* Category Filters */}
          <motion.div
            variants={containerVariants}
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
                  backgroundColor: selectedCategory === category.id ? colors.primary.DEFAULT : `${colors.primary.DEFAULT}20`
                }}
                whileTap={{ scale: 0.95 }}
              >
                {getCategoryIcon(category.id)} {category.name} ({category.count})
              </motion.button>
            ))}
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                layout
                variants={postVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${getCategoryColor(post.category)}20`,
                        color: getCategoryColor(post.category),
                        fontFamily: typography.fontFamily.secondary,
                      }}
                    >
                      {getCategoryIcon(post.category)} {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      style={{
                        fontFamily: typography.fontFamily.secondary,
                        fontSize: '12px',
                        color: colors.secondary.light,
                      }}
                    >
                      {formatDate(post.date)} • {post.readTime}
                    </span>
                  </div>
                  
                  <h3
                    style={{
                      fontFamily: typography.fontFamily.primary,
                      fontSize: '20px',
                      fontWeight: '400',
                      color: colors.secondary.DEFAULT,
                      marginBottom: '12px',
                      lineHeight: '1.3',
                    }}
                  >
                    {post.title}
                  </h3>
                  
                  <p
                    style={{
                      fontFamily: typography.fontFamily.secondary,
                      fontSize: '14px',
                      fontWeight: '400',
                      color: colors.secondary.light,
                      lineHeight: '1.5',
                      marginBottom: '16px',
                    }}
                  >
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        fontFamily: typography.fontFamily.secondary,
                        fontSize: '14px',
                        fontWeight: '500',
                        color: colors.secondary.DEFAULT,
                      }}
                    >
                      {post.author}
                    </span>
                    
                    <motion.button
                      className="text-primary hover:text-primary-dark transition-colors duration-200"
                      style={{
                        color: colors.primary.DEFAULT,
                        fontFamily: typography.fontFamily.secondary,
                        fontSize: '14px',
                        fontWeight: '500',
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Read More →
                    </motion.button>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 rounded-md text-xs"
                        style={{
                          backgroundColor: colors.gray[100],
                          color: colors.secondary.light,
                          fontFamily: typography.fontFamily.secondary,
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            variants={containerVariants}
            className="mt-20 bg-white rounded-2xl p-8 text-center shadow-lg"
          >
            <h3
              style={{
                fontFamily: typography.fontFamily.primary,
                fontSize: '32px',
                fontWeight: '400',
                color: colors.secondary.DEFAULT,
                marginBottom: '16px',
              }}
            >
              Stay Updated
            </h3>
            <p
              style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '16px',
                fontWeight: '400',
                color: colors.secondary.light,
                marginBottom: '24px',
                maxWidth: '500px',
                margin: '0 auto 24px',
              }}
            >
              Subscribe to our newsletter for the latest recipes, cultural insights, and restaurant news
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200"
                style={{
                  borderColor: colors.gray[300],
                  fontFamily: typography.fontFamily.secondary,
                  fontSize: '16px',
                }}
              />
              <motion.button
                className="px-6 py-3 rounded-xl font-medium transition-all duration-300"
                style={{
                  backgroundColor: colors.primary.DEFAULT,
                  color: colors.white,
                  fontFamily: typography.fontFamily.secondary,
                  fontSize: '16px',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;