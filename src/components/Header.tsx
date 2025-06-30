'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // <--- 1. Değişiklik: Link bileşenini import et
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/constants/colors';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const { openCart, getTotalItems } = useCart();
  // Ana navigation items
  const mainNavItems = ['Home', 'Menu', 'About', 'Gallery', 'Contact'];
  // Dropdown menü items
  const dropdownItems = ['Sessions', 'Blog', 'Events', 'Reservations', 'Gift Cards', 'Order Tracking'];
  const [activeItem, setActiveItem] = useState('Home');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  };

  const logoVariants = {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 }
  };

  const navVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  };

  const navItemVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  };

  const iconVariants = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 }
  };

  const iconItemVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 }
  };

  const mobileMenuVariants = {
    closed: { x: "100%" },
    open: { x: 0 }
  };

  const mobileMenuItemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <motion.header 
      variants={headerVariants}
      initial="initial"
      animate="animate"
      transition={{
        duration: 0.6,
        ease: "easeOut"
      }}
      className={`
        w-full flex items-center relative transition-all duration-300
        ${isMobile ? 'px-4 py-4' : 'px-5 lg:px-8'}
        ${isScrolled ? 'backdrop-blur-sm shadow-lg' : ''}
      `}
      style={{ 
        backgroundColor: isScrolled 
          ? `${colors.background}ee` 
          : colors.background,
        height: isMobile ? '70px' : '80px',
        maxWidth: '1280px',
        margin: '0 auto',
        borderRadius: isScrolled ? '0 0 16px 16px' : '0',
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <motion.div 
        variants={logoVariants}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: "easeOut"
        }}
        className={`flex items-center ${isMobile ? 'flex-shrink-0' : ''}`}
        style={{ 
          width: isMobile ? 'auto' : '125px',
          position: isMobile ? 'relative' : 'absolute',
          left: isMobile ? '0' : '20px'
        }}
      >
        {/* 2. Değişiklik: Ana logoyu Link ile sarma */}
        <Link href="/" onClick={() => setActiveItem('Home')}>
        <motion.h1 
          whileHover={{ 
            scale: 1.05,
            color: colors.primary.DEFAULT
          }}
          transition={{ duration: 0.3 }}
          className="cursor-pointer"
          style={{
            fontFamily: '"Hiro Misake", serif',
            fontSize: isMobile ? '16px' : '20px',
            fontWeight: '400',
            lineHeight: '1.2em',
            color: colors.secondary.DEFAULT,
            margin: 0,
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
          }}
        >
          MIYABI HOUSE
        </motion.h1>
        </Link>
      </motion.div>

      {/* Navigation - Desktop */}
      {!isMobile && (
        <motion.nav 
          variants={navVariants}
          transition={{
            duration: 0.6,
            delay: 0.4,
            staggerChildren: 0.1
          }}
          className="absolute left-1/2 transform -translate-x-1/2 flex items-center"
          style={{ height: '40px' }}
        >
          <motion.ul 
            className="flex items-center"
            style={{ gap: '32px' }}
          >
            {/* Ana navigation items */}
            {mainNavItems.map((item) => (
              <motion.li 
                key={item} 
                variants={navItemVariants}
                transition={{
                  duration: 0.4,
                  ease: "easeOut"
                }}
                className="relative"
              >
                <motion.a
                  href={
                    item === 'Menu' ? '/menu' : 
                    item === 'About' ? '/about' : 
                    item === 'Gallery' ? '/gallery' :
                    item === 'Contact' ? '/contact' :
                    item === 'Home' ? '/' : `#${item.toLowerCase()}`
                  }
                  onClick={(e) => {
                    if (item === 'Menu' || item === 'About' || item === 'Gallery' || item === 'Contact') {
                      setActiveItem(item);
                      return;
                    }
                    if(item === 'Home') {
                      window.location.href = '/';
                    }
                    e.preventDefault();
                    setActiveItem(item);
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="cursor-pointer"
                  style={{
                    fontFamily: 'Satoshi, sans-serif',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '1.4em',
                    color: activeItem === item ? colors.primary.DEFAULT : colors.secondary.DEFAULT,
                    textDecoration: 'none',
                    textAlign: 'center',
                    display: 'block',
                  }}
                >
                  {item}
                </motion.a>
                
                {/* Active indicator dot with animation */}
                <AnimatePresence>
                  {activeItem === item && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 30
                        }
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute rounded-full"
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: colors.primary.DEFAULT,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bottom: '-12px',
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
            
            {/* More dropdown button */}
            <motion.li 
              variants={navItemVariants}
              transition={{
                duration: 0.4,
                ease: "easeOut"
              }}
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <motion.button
                whileHover={{ 
                  scale: 1.1,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer flex items-center gap-1"
                style={{
                  fontFamily: 'Satoshi, sans-serif',
                  fontSize: '18px',
                  fontWeight: '500',
                  lineHeight: '1.4em',
                  color: dropdownItems.includes(activeItem) ? colors.primary.DEFAULT : colors.secondary.DEFAULT,
                  textDecoration: 'none',
                  background: 'none',
                  border: 'none',
                }}
              >
                More
                <motion.span
                  animate={{ rotate: showDropdown ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontSize: '12px' }}
                >
                  ▼
                </motion.span>
              </motion.button>
              
              {/* Dropdown menu */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 rounded-xl shadow-lg overflow-hidden z-50"
                    style={{
                      backgroundColor: colors.background,
                      border: `1px solid ${colors.secondary.light}40`,
                    }}
                  >
                    {dropdownItems.map((item, index) => (
                      <motion.a
                        key={item}
                        href={
                          item === 'Sessions' ? '/sessions' :
                          item === 'Blog' ? '/blog' :
                          item === 'Events' ? '/events' :
                          item === 'Reservations' ? '/reservations' :
                          item === 'Gift Cards' ? '/gift-cards' :
                          item === 'Order Tracking' ? '/order-tracking' :
                          `#${item.toLowerCase()}`
                        }
                        onClick={() => {
                          setActiveItem(item);
                          setShowDropdown(false);
                        }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ backgroundColor: `${colors.primary.DEFAULT}10` }}
                        className="block px-4 py-3 text-left border-b last:border-b-0"
                        style={{
                          fontFamily: 'Satoshi, sans-serif',
                          fontSize: '16px',
                          fontWeight: '400',
                          color: activeItem === item ? colors.primary.DEFAULT : colors.secondary.DEFAULT,
                          textDecoration: 'none',
                          borderColor: `${colors.secondary.light}20`,
                        }}
                      >
                        {item}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Active indicator for dropdown items */}
              <AnimatePresence>
                {dropdownItems.includes(activeItem) && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 30
                      }
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute rounded-full"
                    style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: colors.primary.DEFAULT,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bottom: '-12px',
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.li>
          </motion.ul>
        </motion.nav>
      )}

      {/* Mobile Hamburger Menu Button */}
      {isMobile && (
        <motion.div
          variants={navVariants}
          transition={{
            duration: 0.6,
            delay: 0.4
          }}
          className="flex-1 flex justify-center"
        >
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center w-8 h-8 space-y-1"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 rounded-full"
              style={{ backgroundColor: colors.secondary.DEFAULT }}
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 rounded-full"
              style={{ backgroundColor: colors.secondary.DEFAULT }}
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 rounded-full"
              style={{ backgroundColor: colors.secondary.DEFAULT }}
            />
          </motion.button>
        </motion.div>
      )}

      {/* Action Icons */}
      <motion.div 
        variants={iconVariants}
        transition={{
          duration: 0.6,
          delay: 0.6,
          staggerChildren: 0.1
        }}
        className="flex items-center"
        style={{ 
          gap: isMobile ? '16px' : '24px',
          position: isMobile ? 'relative' : 'absolute',
          right: isMobile ? '0' : '20px'
        }}
      >
        {/* Shopping Bag Icon */}
        <motion.button 
          variants={iconItemVariants}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
          whileHover={{ 
            scale: 1.2,
            rotate: 10,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.9 }}
          onClick={openCart}
          aria-label="Shopping bag"
          className="relative group"
          style={{ 
            width: isMobile ? '20px' : '24px', 
            height: isMobile ? '20px' : '24px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <Image
            src="/icons/bag-happy.svg"
            alt="Shopping bag"
            width={isMobile ? 20 : 24}
            height={isMobile ? 20 : 24}
            style={{ 
              filter: `invert(20%) sepia(35%) saturate(1200%) hue-rotate(190deg) brightness(90%) contrast(85%)`,
              display: 'block'
            }}
          />
          {/* Cart Badge */}
          {getTotalItems() > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-2 -right-2 rounded-full flex items-center justify-center text-white text-xs font-semibold"
              style={{
                backgroundColor: colors.primary.DEFAULT,
                width: '18px',
                height: '18px',
                fontSize: '10px',
                minWidth: '18px',
              }}
            >
              {getTotalItems()}
            </motion.div>
          )}
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            Cart
          </motion.div>
        </motion.button>

        {/* Profile Icon */}
        <Link href="/profile">
        <motion.button 
          variants={iconItemVariants}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
          whileHover={{ 
            scale: 1.2,
            rotate: -10,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.9 }}
          aria-label="User profile"
          className="relative group"
          style={{ 
            width: isMobile ? '20px' : '24px', 
            height: isMobile ? '20px' : '24px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <Image
            src="/icons/profile-circle.svg"
            alt="User profile"
            width={isMobile ? 20 : 24}
            height={isMobile ? 20 : 24}
            style={{ 
              filter: `invert(20%) sepia(35%) saturate(1200%) hue-rotate(190deg) brightness(90%) contrast(85%)`,
              display: 'block'
            }}
          />
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            Profile
          </motion.div>
        </motion.button>
        </Link>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <>
            {/* Backdrop - Hafif karartma */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu - Sağdan kayarak gelen */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                staggerChildren: 0.1,
                delayChildren: 0.1
              }}
              className="fixed top-0 right-0 bottom-0 w-80 z-50 overflow-hidden shadow-2xl"
              style={{
                backgroundColor: colors.background,
                borderLeft: `1px solid ${colors.secondary.DEFAULT}20`,
              }}
            >
              {/* Header kısmı */}
              <div 
                className="flex items-center justify-between p-6 border-b"
                style={{ borderColor: `${colors.secondary.DEFAULT}20` }}
              >
                {/* 3. Değişiklik: Mobil menü logosunu Link ile sarma */}
                <Link 
                  href="/"
                  onClick={() => {
                    setActiveItem('Home');
                    setIsMobileMenuOpen(false);
                  }}
                  className="cursor-pointer"
              >
                <h3 
                  style={{
                    fontFamily: '"Hiro Misake", serif',
                    fontSize: '18px',
                    color: colors.secondary.DEFAULT,
                    margin: 0,
                  }}
                >
                  MIYABI HOUSE
                </h3>
                </Link>
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: `${colors.secondary.DEFAULT}10` }}
                >
                  <motion.span
                    animate={{ rotate: 45 }}
                    className="w-4 h-0.5 absolute rounded-full"
                    style={{ backgroundColor: colors.secondary.DEFAULT }}
                  />
                  <motion.span
                    animate={{ rotate: -45 }}
                    className="w-4 h-0.5 absolute rounded-full"
                    style={{ backgroundColor: colors.secondary.DEFAULT }}
                  />
                </motion.button>
              </div>

              {/* Navigation */}
              <motion.nav className="flex-1 p-6">
                <motion.ul className="space-y-2">
                  {[...mainNavItems, ...dropdownItems].map((item, index) => (
                    <motion.li
                      key={item}
                      variants={mobileMenuItemVariants}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        delay: index * 0.1
                      }}
                      className="relative"
                    >
                      <motion.a
                        href={
                          item === 'Menu' ? '/menu' : 
                          item === 'About' ? '/about' : 
                          item === 'Sessions' ? '/sessions' :
                          item === 'Gallery' ? '/gallery' :
                          item === 'Blog' ? '/blog' :
                          item === 'Contact' ? '/contact' :
                          item === 'Events' ? '/events' :
                          item === 'Reservations' ? '/reservations' :
                          item === 'Gift Cards' ? '/gift-cards' :
                          item === 'Order Tracking' ? '/order-tracking' :
                          `#${item.toLowerCase()}`
                        }
                        onClick={(e) => {
                          if (item === 'Menu' || item === 'About' || item === 'Sessions' || item === 'Gallery' || item === 'Blog' || item === 'Contact' || item === 'Events' || item === 'Reservations' || item === 'Gift Cards' || item === 'Order Tracking') {
                            setActiveItem(item);
                            setIsMobileMenuOpen(false);
                            return; // Let the default navigation happen
                          }
                          if(item === 'Home') {
                            window.location.href = '/';
                          }
                          e.preventDefault();
                          setActiveItem(item);
                          setIsMobileMenuOpen(false);
                        }}
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-between py-4 px-4 rounded-xl transition-all duration-200"
                        style={{
                          fontFamily: 'Satoshi, sans-serif',
                          fontSize: '18px',
                          fontWeight: '500',
                          color: activeItem === item ? colors.primary.DEFAULT : colors.secondary.DEFAULT,
                          backgroundColor: activeItem === item ? `${colors.primary.DEFAULT}15` : 'transparent',
                          textDecoration: 'none',
                          borderLeft: activeItem === item ? `3px solid ${colors.primary.DEFAULT}` : '3px solid transparent',
                        }}
                      >
                        <span>{item}</span>
                        {activeItem === item && (
                          <motion.div
                            initial={{ scale: 0, rotate: 0 }}
                            animate={{ scale: 1, rotate: 360 }}
                            transition={{ duration: 0.4, ease: "backOut" }}
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: colors.primary.DEFAULT }}
                          />
                        )}
                      </motion.a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.nav>

              {/* Footer - İkonlar */}
              <div 
                className="p-6 border-t flex justify-center space-x-6"
                style={{ borderColor: `${colors.secondary.DEFAULT}20` }}
              >
                <motion.button
                  onClick={() => {
                    openCart();
                    setIsMobileMenuOpen(false);
                  }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center relative"
                  style={{ backgroundColor: `${colors.primary.DEFAULT}15` }}
                >
                  <Image
                    src="/icons/bag-happy.svg"
                    alt="Shopping bag"
                    width={20}
                    height={20}
                    style={{ 
                      filter: `invert(20%) sepia(35%) saturate(1200%) hue-rotate(190deg) brightness(90%) contrast(85%)`,
                    }}
                  />
                  {/* Cart Badge */}
                  {getTotalItems() > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                      style={{
                        backgroundColor: colors.primary.DEFAULT,
                        width: '16px',
                        height: '16px',
                        fontSize: '9px',
                        minWidth: '16px',
                      }}
                    >
                      {getTotalItems()}
                    </motion.div>
                  )}
                </motion.button>
                <Link href="/profile">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: -10 }}
                  whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${colors.primary.DEFAULT}15` }}
                >
                  <Image
                    src="/icons/profile-circle.svg"
                    alt="User profile"
                    width={20}
                    height={20}
                    style={{ 
                      filter: `invert(20%) sepia(35%) saturate(1200%) hue-rotate(190deg) brightness(90%) contrast(85%)`,
                    }}
                  />
                </motion.button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header; 