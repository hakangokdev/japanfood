'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

interface Order {
  id: string;
  date: string;
  status: 'completed' | 'preparing' | 'delivered';
  total: string;
  items: string[];
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  totalOrders: number;
  favoriteCategory: string;
}

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

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

  const cardVariants: Variants = {
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

  const tabVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  // Sample user data
  const userProfile: UserProfile = {
    name: 'Yuki Tanaka',
    email: 'yuki.tanaka@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Sakura Street, Tokyo District, 12345',
    joinDate: 'May 2025',
    totalOrders: 47,
    favoriteCategory: 'Sushi'
  };

  // Sample order history
  const orderHistory: Order[] = [
    {
      id: 'MH345678',
      date: 'July 15, 2025',
      status: 'delivered',
      total: '$40.96',
      items: ['Tonkotsu Ramen', 'Gyoza (6pcs)', 'Matcha Ice Cream']
    },
    {
      id: 'MH123456',
      date: 'July 12, 2025',
      status: 'preparing',
      total: '$57.96',
      items: ['Dragon Roll', 'Miso Soup', 'Chicken Teriyaki']
    },
    {
      id: 'MH789012',
      date: 'June 28, 2025',
      status: 'completed',
      total: '$35.98',
      items: ['Salmon Sashimi', 'California Roll']
    },
    {
      id: 'MH111213',
      date: 'June 25, 2025',
      status: 'delivered',
      total: '$52.25',
      items: ['Omakase Selection', 'Seafood Ramen', 'Fruit Mochi', 'Sake Tasting']
    }
  ];

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '/icons/profile-circle.svg' },
    { id: 'orders', name: 'Order History', icon: '/icons/bag-happy.svg' },
    { id: 'settings', name: 'Settings', icon: '/icons/mochi-icon.svg' }
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return colors.primary.DEFAULT;
      case 'preparing':
        return '#f59e0b';
      case 'delivered':
        return '#10b981';
      default:
        return colors.secondary.light;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'preparing':
        return 'Preparing';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Unknown';
    }
  };

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
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
              My Profile
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
              Manage your account, view order history, and update preferences
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <motion.div
              variants={cardVariants}
              className="lg:col-span-1"
            >
              <div 
                className="bg-white rounded-3xl p-6 shadow-lg border"
                style={{ borderColor: colors.gray[200] }}
              >
                {/* Profile Avatar */}
                <div className="text-center mb-6">
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${colors.primary.DEFAULT}20` }}
                  >
                    <Image
                      src="/icons/profile-circle.svg"
                      alt="Profile"
                      width={40}
                      height={40}
                      style={{ 
                        filter: `invert(60%) sepia(90%) saturate(5000%) hue-rotate(15deg) brightness(100%) contrast(100%)`,
                      }}
                    />
                  </div>
                  <h3
                    style={{
                      fontFamily: typography.fontFamily.primary,
                      fontSize: '20px',
                      fontWeight: '400',
                      color: colors.secondary.DEFAULT,
                      margin: '0 0 4px 0',
                    }}
                  >
                    {userProfile.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: typography.fontFamily.secondary,
                      fontSize: '14px',
                      fontWeight: '400',
                      color: colors.secondary.light,
                      margin: 0,
                    }}
                  >
                    Member since {userProfile.joinDate}
                  </p>
                </div>

                {/* Navigation Tabs */}
                <nav className="space-y-2">
                  {tabs.map((tab, index) => (
                    <motion.button
                      key={tab.id}
                      variants={tabVariants}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setActiveTab(tab.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300"
                      style={{
                        backgroundColor: activeTab === tab.id ? `${colors.primary.DEFAULT}15` : 'transparent',
                        borderLeft: activeTab === tab.id ? `3px solid ${colors.primary.DEFAULT}` : '3px solid transparent',
                      }}
                      whileHover={{
                        backgroundColor: activeTab === tab.id ? `${colors.primary.DEFAULT}15` : `${colors.gray[100]}`,
                        x: 5,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Image
                        src={tab.icon}
                        alt={tab.name}
                        width={20}
                        height={20}
                        style={{ 
                          filter: activeTab === tab.id 
                            ? `invert(60%) sepia(90%) saturate(5000%) hue-rotate(15deg) brightness(100%) contrast(100%)`
                            : `invert(40%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(85%)`,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: typography.fontFamily.secondary,
                          fontSize: '16px',
                          fontWeight: '500',
                          color: activeTab === tab.id ? colors.primary.DEFAULT : colors.secondary.DEFAULT,
                        }}
                      >
                        {tab.name}
                      </span>
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              variants={cardVariants}
              className="lg:col-span-3"
            >
              <AnimatePresence mode="wait">
                {activeTab === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-3xl p-8 shadow-lg border"
                    style={{ borderColor: colors.gray[200] }}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h2
                        style={{
                          fontFamily: typography.fontFamily.primary,
                          fontSize: '32px',
                          fontWeight: '400',
                          color: colors.secondary.DEFAULT,
                          margin: 0,
                        }}
                      >
                        Profile Information
                      </h2>
                      <motion.button
                        onClick={() => setIsEditing(!isEditing)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 rounded-full border-2"
                        style={{
                          borderColor: colors.primary.DEFAULT,
                          backgroundColor: isEditing ? 'rgba(229, 110, 12, 1)' : 'rgba(229, 110, 12, 0)',
                          fontFamily: typography.fontFamily.secondary,
                          fontSize: '14px',
                          fontWeight: '500',
                          color: isEditing ? colors.white : colors.primary.DEFAULT,
                        }}
                      >
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                      </motion.button>
                    </div>

                    {/* Profile Stats */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: colors.gray[50] }}>
                        <div
                          style={{
                            fontFamily: typography.fontFamily.primary,
                            fontSize: '28px',
                            fontWeight: '400',
                            color: colors.primary.DEFAULT,
                            margin: '0 0 4px 0',
                          }}
                        >
                          {userProfile.totalOrders}
                        </div>
                        <div
                          style={{
                            fontFamily: typography.fontFamily.secondary,
                            fontSize: '14px',
                            fontWeight: '500',
                            color: colors.secondary.light,
                          }}
                        >
                          Total Orders
                        </div>
                      </div>
                      <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: colors.gray[50] }}>
                        <div
                          style={{
                            fontFamily: typography.fontFamily.primary,
                            fontSize: '28px',
                            fontWeight: '400',
                            color: colors.primary.DEFAULT,
                            margin: '0 0 4px 0',
                          }}
                        >
                          {userProfile.favoriteCategory}
                        </div>
                        <div
                          style={{
                            fontFamily: typography.fontFamily.secondary,
                            fontSize: '14px',
                            fontWeight: '500',
                            color: colors.secondary.light,
                          }}
                        >
                          Favorite Category
                        </div>
                      </div>
                      <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: colors.gray[50] }}>
                        <div
                          style={{
                            fontFamily: typography.fontFamily.primary,
                            fontSize: '28px',
                            fontWeight: '400',
                            color: colors.primary.DEFAULT,
                            margin: '0 0 4px 0',
                          }}
                        >
                          VIP
                        </div>
                        <div
                          style={{
                            fontFamily: typography.fontFamily.secondary,
                            fontSize: '14px',
                            fontWeight: '500',
                            color: colors.secondary.light,
                          }}
                        >
                          Member Status
                        </div>
                      </div>
                    </div>

                    {/* Profile Form */}
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label
                            style={{
                              fontFamily: typography.fontFamily.secondary,
                              fontSize: '14px',
                              fontWeight: '500',
                              color: colors.secondary.DEFAULT,
                              display: 'block',
                              marginBottom: '8px',
                            }}
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            disabled={!isEditing}
                            defaultValue={userProfile.name}
                            className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300"
                            style={{
                              borderColor: isEditing ? colors.primary.DEFAULT : colors.gray[200],
                              backgroundColor: isEditing ? colors.white : colors.gray[50],
                              fontFamily: typography.fontFamily.secondary,
                              fontSize: '16px',
                              color: colors.secondary.DEFAULT,
                            }}
                          />
                        </div>
                        <div>
                          <label
                            style={{
                              fontFamily: typography.fontFamily.secondary,
                              fontSize: '14px',
                              fontWeight: '500',
                              color: colors.secondary.DEFAULT,
                              display: 'block',
                              marginBottom: '8px',
                            }}
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            disabled={!isEditing}
                            defaultValue={userProfile.email}
                            className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300"
                            style={{
                              borderColor: isEditing ? colors.primary.DEFAULT : colors.gray[200],
                              backgroundColor: isEditing ? colors.white : colors.gray[50],
                              fontFamily: typography.fontFamily.secondary,
                              fontSize: '16px',
                              color: colors.secondary.DEFAULT,
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label
                            style={{
                              fontFamily: typography.fontFamily.secondary,
                              fontSize: '14px',
                              fontWeight: '500',
                              color: colors.secondary.DEFAULT,
                              display: 'block',
                              marginBottom: '8px',
                            }}
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            disabled={!isEditing}
                            defaultValue={userProfile.phone}
                            className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300"
                            style={{
                              borderColor: isEditing ? colors.primary.DEFAULT : colors.gray[200],
                              backgroundColor: isEditing ? colors.white : colors.gray[50],
                              fontFamily: typography.fontFamily.secondary,
                              fontSize: '16px',
                              color: colors.secondary.DEFAULT,
                            }}
                          />
                        </div>
                        <div>
                          <label
                            style={{
                              fontFamily: typography.fontFamily.secondary,
                              fontSize: '14px',
                              fontWeight: '500',
                              color: colors.secondary.DEFAULT,
                              display: 'block',
                              marginBottom: '8px',
                            }}
                          >
                            Member Since
                          </label>
                          <input
                            type="text"
                            disabled
                            defaultValue={userProfile.joinDate}
                            className="w-full px-4 py-3 rounded-xl border-2"
                            style={{
                              borderColor: colors.gray[200],
                              backgroundColor: colors.gray[50],
                              fontFamily: typography.fontFamily.secondary,
                              fontSize: '16px',
                              color: colors.secondary.light,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          style={{
                            fontFamily: typography.fontFamily.secondary,
                            fontSize: '14px',
                            fontWeight: '500',
                            color: colors.secondary.DEFAULT,
                            display: 'block',
                            marginBottom: '8px',
                          }}
                        >
                          Address
                        </label>
                        <textarea
                          disabled={!isEditing}
                          defaultValue={userProfile.address}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 resize-none"
                          style={{
                            borderColor: isEditing ? colors.primary.DEFAULT : colors.gray[200],
                            backgroundColor: isEditing ? colors.white : colors.gray[50],
                            fontFamily: typography.fontFamily.secondary,
                            fontSize: '16px',
                            color: colors.secondary.DEFAULT,
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'orders' && (
                  <motion.div
                    key="orders"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-3xl p-8 shadow-lg border"
                    style={{ borderColor: colors.gray[200] }}
                  >
                    <h2
                      style={{
                        fontFamily: typography.fontFamily.primary,
                        fontSize: '32px',
                        fontWeight: '400',
                        color: colors.secondary.DEFAULT,
                        margin: '0 0 32px 0',
                      }}
                    >
                      Order History
                    </h2>

                    <div className="space-y-6">
                      {orderHistory.map((order, index) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border rounded-2xl p-6"
                          style={{ borderColor: colors.gray[200] }}
                          whileHover={{ 
                            y: -2,
                            boxShadow: `0 8px 25px ${colors.gray[300]}40`
                          }}
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <div>
                              <h3
                                style={{
                                  fontFamily: typography.fontFamily.primary,
                                  fontSize: '20px',
                                  fontWeight: '400',
                                  color: colors.secondary.DEFAULT,
                                  margin: '0 0 4px 0',
                                }}
                              >
                                {order.id}
                              </h3>
                              <p
                                style={{
                                  fontFamily: typography.fontFamily.secondary,
                                  fontSize: '14px',
                                  fontWeight: '400',
                                  color: colors.secondary.light,
                                  margin: 0,
                                }}
                              >
                                {order.date}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-4 mt-4 md:mt-0">
                              <div
                                className="px-3 py-1 rounded-full text-xs font-semibold"
                                style={{
                                  backgroundColor: `${getStatusColor(order.status)}20`,
                                  color: getStatusColor(order.status),
                                  fontFamily: typography.fontFamily.secondary,
                                }}
                              >
                                {getStatusText(order.status)}
                              </div>
                              <span
                                style={{
                                  fontFamily: typography.fontFamily.primary,
                                  fontSize: '20px',
                                  fontWeight: '400',
                                  color: colors.primary.DEFAULT,
                                }}
                              >
                                {order.total}
                              </span>
                            </div>
                          </div>
                          
                          <div>
                            <p
                              style={{
                                fontFamily: typography.fontFamily.secondary,
                                fontSize: '14px',
                                fontWeight: '500',
                                color: colors.secondary.DEFAULT,
                                margin: '0 0 8px 0',
                              }}
                            >
                              Items:
                            </p>
                            <p
                              style={{
                                fontFamily: typography.fontFamily.secondary,
                                fontSize: '14px',
                                fontWeight: '400',
                                color: colors.secondary.light,
                                margin: '0 0 16px 0',
                                lineHeight: '1.5',
                              }}
                            >
                              {order.items.join(', ')}
                            </p>
                            
                            {/* Order Tracking Button */}
                            <div className="flex justify-end">
                              <motion.a
                                href="/order-tracking"
                                onClick={() => {
                                  // Store order ID in session storage for auto-fill
                                  if (typeof window !== 'undefined') {
                                    sessionStorage.setItem('orderTrackingId', order.id);
                                  }
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-200"
                                style={{
                                  borderColor: colors.primary.DEFAULT,
                                  color: colors.primary.DEFAULT,
                                  fontFamily: typography.fontFamily.secondary,
                                  fontSize: '14px',
                                  fontWeight: '500',
                                  textDecoration: 'none'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = colors.primary.DEFAULT;
                                  e.currentTarget.style.color = colors.white;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                  e.currentTarget.style.color = colors.primary.DEFAULT;
                                }}
                              >
                                <span>🔍</span>
                                Track Order
                              </motion.a>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'settings' && (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-3xl p-8 shadow-lg border"
                    style={{ borderColor: colors.gray[200] }}
                  >
                    <h2
                      style={{
                        fontFamily: typography.fontFamily.primary,
                        fontSize: '32px',
                        fontWeight: '400',
                        color: colors.secondary.DEFAULT,
                        margin: '0 0 32px 0',
                      }}
                    >
                      Account Settings
                    </h2>

                    <div className="space-y-8">
                      {/* Notifications */}
                      <div className="border-b pb-8" style={{ borderColor: colors.gray[200] }}>
                        <h3
                          style={{
                            fontFamily: typography.fontFamily.primary,
                            fontSize: '20px',
                            fontWeight: '400',
                            color: colors.secondary.DEFAULT,
                            margin: '0 0 16px 0',
                          }}
                        >
                          Notifications
                        </h3>
                        <div className="space-y-4">
                          {[
                            'Email notifications for new orders',
                            'SMS notifications for order updates',
                            'Marketing emails and promotions',
                            'Weekly newsletter'
                          ].map((setting, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span
                                style={{
                                  fontFamily: typography.fontFamily.secondary,
                                  fontSize: '16px',
                                  fontWeight: '400',
                                  color: colors.secondary.DEFAULT,
                                }}
                              >
                                {setting}
                              </span>
                              <motion.div
                                className="w-12 h-6 rounded-full cursor-pointer flex items-center"
                                style={{ 
                                  backgroundColor: index % 2 === 0 ? colors.primary.DEFAULT : colors.gray[300],
                                  padding: '2px',
                                }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <motion.div
                                  className="w-5 h-5 rounded-full"
                                  style={{ backgroundColor: colors.white }}
                                  animate={{ x: index % 2 === 0 ? 24 : 0 }}
                                  transition={{ duration: 0.3 }}
                                />
                              </motion.div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Privacy */}
                      <div className="border-b pb-8" style={{ borderColor: colors.gray[200] }}>
                        <h3
                          style={{
                            fontFamily: typography.fontFamily.primary,
                            fontSize: '20px',
                            fontWeight: '400',
                            color: colors.secondary.DEFAULT,
                            margin: '0 0 16px 0',
                          }}
                        >
                          Privacy
                        </h3>
                        <div className="space-y-4">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full text-left px-4 py-3 rounded-xl border"
                            style={{
                              borderColor: colors.gray[200],
                              fontFamily: typography.fontFamily.secondary,
                              fontSize: '16px',
                              fontWeight: '400',
                              color: colors.secondary.DEFAULT,
                              backgroundColor: colors.white,
                            }}
                          >
                            Download my data
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full text-left px-4 py-3 rounded-xl border"
                            style={{
                              borderColor: colors.gray[200],
                              fontFamily: typography.fontFamily.secondary,
                              fontSize: '16px',
                              fontWeight: '400',
                              color: colors.secondary.DEFAULT,
                              backgroundColor: colors.white,
                            }}
                          >
                            Delete my account
                          </motion.button>
                        </div>
                      </div>

                      {/* Security */}
                      <div>
                        <h3
                          style={{
                            fontFamily: typography.fontFamily.primary,
                            fontSize: '20px',
                            fontWeight: '400',
                            color: colors.secondary.DEFAULT,
                            margin: '0 0 16px 0',
                          }}
                        >
                          Security
                        </h3>
                        <div className="space-y-4">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full text-left px-4 py-3 rounded-xl border"
                            style={{
                              borderColor: colors.primary.DEFAULT,
                              fontFamily: typography.fontFamily.secondary,
                              fontSize: '16px',
                              fontWeight: '500',
                              color: colors.primary.DEFAULT,
                              backgroundColor: `${colors.primary.DEFAULT}05`,
                            }}
                          >
                            Change Password
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full text-left px-4 py-3 rounded-xl border"
                            style={{
                              borderColor: colors.gray[200],
                              fontFamily: typography.fontFamily.secondary,
                              fontSize: '16px',
                              fontWeight: '400',
                              color: colors.secondary.DEFAULT,
                              backgroundColor: colors.white,
                            }}
                          >
                            Two-factor authentication
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage; 