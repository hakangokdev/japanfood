'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

const Cart = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  const cartVariants = {
    closed: { x: "100%" },
    open: { x: 0 }
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 0.3 }
  };

  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
            onClick={closeCart}
          />
          
          {/* Cart Panel */}
          <motion.div
            variants={cartVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 z-50 overflow-hidden shadow-2xl"
            style={{
              backgroundColor: colors.background,
              borderLeft: `1px solid ${colors.gray[200]}`,
            }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-6 border-b"
              style={{ borderColor: colors.gray[200] }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: typography.fontFamily.primary,
                    fontSize: '24px',
                    fontWeight: '400',
                    color: colors.secondary.DEFAULT,
                    margin: 0,
                  }}
                >
                  Your Cart
                </h2>
                <p
                  style={{
                    fontFamily: typography.fontFamily.secondary,
                    fontSize: '14px',
                    fontWeight: '400',
                    color: colors.secondary.light,
                    margin: '4px 0 0 0',
                  }}
                >
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                </p>
              </div>
              
              <motion.button
                onClick={closeCart}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 flex items-center justify-center rounded-full"
                style={{ backgroundColor: colors.gray[100] }}
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

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                /* Empty Cart */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-64 p-6 text-center"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: colors.gray[100] }}
                  >
                    <Image
                      src="/icons/bag-happy.svg"
                      alt="Empty cart"
                      width={32}
                      height={32}
                      style={{ 
                        filter: `invert(60%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(85%)`,
                      }}
                    />
                  </div>
                  <h3
                    style={{
                      fontFamily: typography.fontFamily.primary,
                      fontSize: '18px',
                      fontWeight: '400',
                      color: colors.secondary.DEFAULT,
                      margin: '0 0 8px 0',
                    }}
                  >
                    Your cart is empty
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
                    Add some delicious items from our menu!
                  </p>
                </motion.div>
              ) : (
                /* Cart Items */
                <div className="p-4">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl p-4 shadow-sm border"
                        style={{ borderColor: colors.gray[200] }}
                      >
                        <div className="flex items-start gap-4">
                          {/* Item Image */}
                          <div
                            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${colors.primary.DEFAULT}20` }}
                          >
                            <Image
                              src={item.image || `/icons/${item.category.toLowerCase()}-icon.svg`}
                              alt={item.name}
                              width={24}
                              height={24}
                            />
                          </div>

                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <h4
                              style={{
                                fontFamily: typography.fontFamily.primary,
                                fontSize: '16px',
                                fontWeight: '400',
                                color: colors.secondary.DEFAULT,
                                margin: '0 0 4px 0',
                                lineHeight: '1.3',
                              }}
                            >
                              {item.name}
                            </h4>
                            <p
                              style={{
                                fontFamily: typography.fontFamily.secondary,
                                fontSize: '12px',
                                fontWeight: '400',
                                color: colors.secondary.light,
                                margin: '0 0 8px 0',
                                textTransform: 'capitalize',
                              }}
                            >
                              {item.category}
                            </p>
                            
                            {/* Price and Quantity Controls */}
                            <div className="flex items-center justify-between">
                              <span
                                style={{
                                  fontFamily: typography.fontFamily.primary,
                                  fontSize: '16px',
                                  fontWeight: '400',
                                  color: colors.primary.DEFAULT,
                                }}
                              >
                                {item.price}
                              </span>
                              
                              <div className="flex items-center gap-2">
                                {/* Decrease Quantity */}
                                <motion.button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  whileTap={{ scale: 0.9 }}
                                  className="w-6 h-6 rounded-full flex items-center justify-center border"
                                  style={{
                                    borderColor: colors.gray[300],
                                    backgroundColor: colors.white,
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: '12px',
                                      color: colors.secondary.DEFAULT,
                                      lineHeight: 1,
                                    }}
                                  >
                                    −
                                  </span>
                                </motion.button>
                                
                                {/* Quantity */}
                                <span
                                  style={{
                                    fontFamily: typography.fontFamily.secondary,
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: colors.secondary.DEFAULT,
                                    minWidth: '20px',
                                    textAlign: 'center',
                                  }}
                                >
                                  {item.quantity}
                                </span>
                                
                                {/* Increase Quantity */}
                                <motion.button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  whileTap={{ scale: 0.9 }}
                                  className="w-6 h-6 rounded-full flex items-center justify-center border"
                                  style={{
                                    borderColor: colors.primary.DEFAULT,
                                    backgroundColor: colors.primary.DEFAULT,
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: '12px',
                                      color: colors.white,
                                      lineHeight: 1,
                                    }}
                                  >
                                    +
                                  </span>
                                </motion.button>
                              </div>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <motion.button
                            onClick={() => removeFromCart(item.id)}
                            whileTap={{ scale: 0.9 }}
                            className="flex-shrink-0 p-1"
                          >
                            <span
                              style={{
                                fontSize: '16px',
                                color: colors.secondary.light,
                                cursor: 'pointer',
                              }}
                            >
                              ×
                            </span>
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div 
                className="border-t p-6 space-y-4"
                style={{ 
                  borderColor: colors.gray[200],
                  backgroundColor: colors.white 
                }}
              >
                {/* Clear Cart Button */}
                <motion.button
                  onClick={clearCart}
                  whileTap={{ scale: 0.95 }}
                  className="w-full text-center py-2"
                  style={{
                    fontFamily: typography.fontFamily.secondary,
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.secondary.light,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Clear Cart
                </motion.button>

                {/* Total */}
                <div className="flex items-center justify-between py-2">
                  <span
                    style={{
                      fontFamily: typography.fontFamily.primary,
                      fontSize: '18px',
                      fontWeight: '400',
                      color: colors.secondary.DEFAULT,
                    }}
                  >
                    Total
                  </span>
                  <span
                    style={{
                      fontFamily: typography.fontFamily.primary,
                      fontSize: '24px',
                      fontWeight: '400',
                      color: colors.primary.DEFAULT,
                    }}
                  >
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-full"
                  style={{
                    backgroundColor: colors.primary.DEFAULT,
                    fontFamily: typography.fontFamily.primary,
                    fontSize: '18px',
                    fontWeight: '400',
                    color: colors.white,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart; 