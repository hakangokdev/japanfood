'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface OrderStatus {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  estimatedTime?: string;
  icon: string;
  time?: string;
}

interface Order {
  id: string;
  date: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  type: 'delivery' | 'pickup';
  status: 'confirmed' | 'preparing' | 'ready' | 'on-the-way' | 'delivered' | 'completed';
  estimatedTime: string;
  address?: string;
  phone: string;
  driver?: {
    name: string;
    phone: string;
    vehicle: string;
  };
}

const OrderTrackingPage = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check for order ID from profile page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedOrderId = sessionStorage.getItem('orderTrackingId');
      if (storedOrderId) {
        setOrderNumber(storedOrderId);
        sessionStorage.removeItem('orderTrackingId'); // Clean up after use
        
        // Auto-search the order
        setIsLoading(true);
        setError('');
        
        setTimeout(() => {
          const order = sampleOrders.find(o => o.id.toLowerCase() === storedOrderId.toLowerCase());
          if (order) {
            setSearchedOrder(order);
            setError('');
          } else {
            setSearchedOrder(null);
            setError('Order not found. Please check your order number and try again.');
          }
          setIsLoading(false);
        }, 1000);
      }
    }
  }, []);

  // Enhanced sample orders data
  const sampleOrders: Order[] = [
    {
      id: 'MH123456',
      date: new Date().toISOString(),
      items: [
        { name: 'Dragon Roll', quantity: 2, price: 16.99 },
        { name: 'Miso Soup', quantity: 1, price: 4.99 },
        { name: 'Chicken Teriyaki', quantity: 1, price: 18.99 }
      ],
      total: 57.96,
      type: 'delivery',
      status: 'on-the-way',
      estimatedTime: '15-20 mins',
      address: '123 Main St, Apt 4B, New York, NY 10001',
      phone: '(555) 123-4567',
      driver: {
        name: 'Kenji Tanaka',
        phone: '(555) 111-2222',
        vehicle: 'Honda Civic - ABC 123'
      }
    },
    {
      id: 'MH789012',
      date: new Date(Date.now() - 3600000).toISOString(),
      items: [
        { name: 'Salmon Sashimi', quantity: 1, price: 22.99 },
        { name: 'California Roll', quantity: 1, price: 12.99 }
      ],
      total: 35.98,
      type: 'pickup',
      status: 'ready',
      estimatedTime: 'Ready now',
      phone: '(555) 987-6543'
    },
    {
      id: 'MH345678',
      date: new Date(Date.now() - 1800000).toISOString(),
      items: [
        { name: 'Tonkotsu Ramen', quantity: 1, price: 18.99 },
        { name: 'Gyoza (6pcs)', quantity: 1, price: 8.99 },
        { name: 'Matcha Ice Cream', quantity: 2, price: 6.99 }
      ],
      total: 40.96,
      type: 'delivery',
      status: 'delivered',
      estimatedTime: 'Delivered',
      address: '456 Cherry Blossom Ave, Tokyo District, 12345',
      phone: '(555) 456-7890'
    }
  ];

  const getOrderStatuses = (order: Order): OrderStatus[] => {
    const baseStatuses = [
      {
        id: 'confirmed',
        title: 'Order Confirmed',
        description: 'We received your order and payment',
        completed: true,
        icon: '✅',
        time: formatTime(new Date(order.date))
      },
      {
        id: 'preparing',
        title: 'Kitchen Preparation',
        description: 'Our skilled chefs are preparing your delicious meal',
        completed: ['preparing', 'ready', 'on-the-way', 'delivered', 'completed'].includes(order.status),
        estimatedTime: order.status === 'preparing' ? '15-20 mins' : undefined,
        icon: '👨‍🍳',
        time: order.status !== 'confirmed' ? formatTime(new Date(new Date(order.date).getTime() + 300000)) : undefined
      }
    ];

    if (order.type === 'delivery') {
      return [
        ...baseStatuses,
        {
          id: 'ready',
          title: 'Ready for Pickup',
          description: 'Your order is ready and our driver is on the way',
          completed: ['ready', 'on-the-way', 'delivered'].includes(order.status),
          icon: '📦',
          time: ['ready', 'on-the-way', 'delivered'].includes(order.status) 
            ? formatTime(new Date(new Date(order.date).getTime() + 900000)) : undefined
        },
        {
          id: 'on-the-way',
          title: 'Out for Delivery',
          description: 'Your order is on its way to your location',
          completed: ['on-the-way', 'delivered'].includes(order.status),
          estimatedTime: order.status === 'on-the-way' ? order.estimatedTime : undefined,
          icon: '🚚',
          time: ['on-the-way', 'delivered'].includes(order.status) 
            ? formatTime(new Date(new Date(order.date).getTime() + 1200000)) : undefined
        },
        {
          id: 'delivered',
          title: 'Delivered Successfully',
          description: 'Enjoy your meal! Thank you for choosing Miyabi House',
          completed: order.status === 'delivered',
          icon: '🎉',
          time: order.status === 'delivered' 
            ? formatTime(new Date(new Date(order.date).getTime() + 1800000)) : undefined
        }
      ];
    } else {
      return [
        ...baseStatuses,
        {
          id: 'ready',
          title: 'Ready for Pickup',
          description: 'Your order is ready! Please visit our restaurant',
          completed: ['ready', 'completed'].includes(order.status),
          estimatedTime: order.status === 'ready' ? 'Ready now' : undefined,
          icon: '🏪',
          time: ['ready', 'completed'].includes(order.status) 
            ? formatTime(new Date(new Date(order.date).getTime() + 1200000)) : undefined
        },
        {
          id: 'completed',
          title: 'Order Complete',
          description: 'Thank you for choosing Miyabi House!',
          completed: order.status === 'completed',
          icon: '🎉',
          time: order.status === 'completed' 
            ? formatTime(new Date(new Date(order.date).getTime() + 1500000)) : undefined
        }
      ];
    }
  };

  const handleSearch = () => {
    if (!orderNumber.trim()) {
      setError('Please enter an order number');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call with more realistic delay
    setTimeout(() => {
      const order = sampleOrders.find(o => o.id.toLowerCase() === orderNumber.toLowerCase());
      if (order) {
        setSearchedOrder(order);
        setError('');
      } else {
        setSearchedOrder(null);
        setError('Order not found. Please check your order number and try again.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickSearch = (orderId: string) => {
    setOrderNumber(orderId);
    const order = sampleOrders.find(o => o.id === orderId);
    if (order) {
      setSearchedOrder(order);
      setError('');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusProgress = (order: Order) => {
    const statusMap: { [key: string]: number } = {
      'confirmed': 25,
      'preparing': 50,
      'ready': 75,
      'on-the-way': 90,
      'delivered': 100,
      'completed': 100
    };
    return statusMap[order.status] || 25; // Default to confirmed state
  };

  const StatusTimeline = ({ order }: { order: Order }) => {
    const statuses = getOrderStatuses(order);

    return (
      <div className="space-y-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <span style={{
              fontFamily: typography.fontFamily.secondary,
              fontSize: '14px',
              fontWeight: '500',
              color: colors.secondary.DEFAULT
            }}>
              Order Progress
            </span>
            <span style={{
              fontFamily: typography.fontFamily.secondary,
              fontSize: '14px',
              fontWeight: '600',
              color: colors.primary.DEFAULT
            }}>
              {getStatusProgress(order)}%
            </span>
          </div>
          <div 
            className="h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: `${colors.secondary.light}20` }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getStatusProgress(order)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ 
                background: `linear-gradient(90deg, ${colors.primary.DEFAULT} 0%, #FF6B35 100%)` 
              }}
            />
          </div>
        </div>

        {/* Status Items */}
        {statuses.map((status, index) => (
          <motion.div
            key={status.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="relative"
          >
            {/* Timeline connector */}
            {index < statuses.length - 1 && (
              <div 
                className="absolute left-6 top-16 w-0.5 h-8"
                style={{ 
                  backgroundColor: status.completed 
                    ? colors.primary.DEFAULT 
                    : `${colors.secondary.light}30` 
                }}
              />
            )}
            
            <div className="flex items-start gap-6">
              <motion.div 
                className="relative z-10 flex items-center justify-center rounded-full text-xl flex-shrink-0"
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: status.completed 
                    ? colors.primary.DEFAULT 
                    : `${colors.secondary.light}20`,
                  color: status.completed ? colors.white : colors.secondary.light,
                  border: status.completed 
                    ? `2px solid ${colors.primary.DEFAULT}` 
                    : `2px solid ${colors.secondary.light}40`
                }}
                whileHover={{ scale: 1.1 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
              >
                {status.icon}
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 style={{
                    fontFamily: typography.fontFamily.primary,
                    fontSize: '20px',
                    fontWeight: '400',
                    color: status.completed ? colors.secondary.DEFAULT : colors.secondary.light,
                    margin: 0
                  }}>
                    {status.title}
                  </h4>
                  
                  {status.time && (
                    <span 
                      className="text-sm px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: status.completed 
                          ? `${colors.primary.DEFAULT}20` 
                          : `${colors.secondary.light}20`,
                        color: status.completed 
                          ? colors.primary.DEFAULT 
                          : colors.secondary.light,
                        fontFamily: typography.fontFamily.secondary,
                        fontWeight: '500'
                      }}
                    >
                      {status.time}
                    </span>
                  )}
                </div>
                
                <p style={{
                  fontFamily: typography.fontFamily.secondary,
                  fontSize: '15px',
                  lineHeight: '1.5',
                  color: colors.secondary.light,
                  margin: '0 0 8px 0'
                }}>
                  {status.description}
                </p>

                {status.estimatedTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{
                      backgroundColor: `${colors.primary.DEFAULT}15`,
                      border: `1px solid ${colors.primary.DEFAULT}30`
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>⏱️</span>
                    <span style={{
                      fontFamily: typography.fontFamily.secondary,
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colors.primary.DEFAULT
                    }}>
                      ETA: {status.estimatedTime}
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const OrderDetails = ({ order }: { order: Order }) => (
    <div className="space-y-6">
      {/* Order Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg border"
        style={{ borderColor: `${colors.primary.DEFAULT}20` }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: '24px',
              fontWeight: '400',
              color: colors.secondary.DEFAULT,
              margin: 0
            }}>
              Order {order.id}
            </h3>
            <p style={{
              fontFamily: typography.fontFamily.secondary,
              fontSize: '14px',
              color: colors.secondary.light,
              margin: '4px 0 0 0'
            }}>
              Placed on {formatDate(order.date)}
            </p>
          </div>
          
          <div className="text-right">
            <div 
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: order.type === 'delivery' 
                  ? `${colors.primary.DEFAULT}20` 
                  : `#10B98120`,
                color: order.type === 'delivery' 
                  ? colors.primary.DEFAULT 
                  : '#10B981'
              }}
            >
              {order.type === 'delivery' ? '🚚' : '🏪'} {order.type.charAt(0).toUpperCase() + order.type.slice(1)}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl" style={{ backgroundColor: colors.background }}>
          <div>
            <h4 style={{
              fontFamily: typography.fontFamily.secondary,
              fontSize: '14px',
              fontWeight: '600',
              color: colors.secondary.DEFAULT,
              margin: '0 0 8px 0'
            }}>
              Contact Information
            </h4>
            <p style={{
              fontFamily: typography.fontFamily.secondary,
              fontSize: '14px',
              color: colors.secondary.light,
              margin: 0
            }}>
              📞 {order.phone}
            </p>
          </div>
          
          {order.address && (
            <div>
              <h4 style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '14px',
                fontWeight: '600',
                color: colors.secondary.DEFAULT,
                margin: '0 0 8px 0'
              }}>
                Delivery Address
              </h4>
              <p style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '14px',
                color: colors.secondary.light,
                margin: 0
              }}>
                📍 {order.address}
              </p>
            </div>
          )}
        </div>

        {/* Driver Info */}
        {order.driver && order.status === 'on-the-way' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl border"
            style={{ 
              backgroundColor: `${colors.primary.DEFAULT}10`,
              borderColor: colors.primary.DEFAULT
            }}
          >
            <h4 style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: '16px',
              color: colors.secondary.DEFAULT,
              margin: '0 0 8px 0'
            }}>
              Your Driver
            </h4>
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                style={{ backgroundColor: colors.primary.DEFAULT, color: colors.white }}
              >
                👨‍🚗
              </div>
              <div>
                <p style={{
                  fontFamily: typography.fontFamily.secondary,
                  fontSize: '14px',
                  fontWeight: '600',
                  color: colors.secondary.DEFAULT,
                  margin: 0
                }}>
                  {order.driver.name}
                </p>
                <p style={{
                  fontFamily: typography.fontFamily.secondary,
                  fontSize: '12px',
                  color: colors.secondary.light,
                  margin: 0
                }}>
                  {order.driver.vehicle} • {order.driver.phone}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Order Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <h4 style={{
          fontFamily: typography.fontFamily.primary,
          fontSize: '20px',
          color: colors.secondary.DEFAULT,
          margin: '0 0 16px 0'
        }}>
          Order Items
        </h4>
        
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl"
              style={{ backgroundColor: colors.background }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                  style={{ 
                    backgroundColor: colors.primary.DEFAULT, 
                    color: colors.white 
                  }}
                >
                  {item.quantity}
                </div>
                <span style={{
                  fontFamily: typography.fontFamily.secondary,
                  fontSize: '16px',
                  fontWeight: '500',
                  color: colors.secondary.DEFAULT
                }}>
                  {item.name}
                </span>
              </div>
              <span style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '16px',
                fontWeight: '600',
                color: colors.secondary.DEFAULT
              }}>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Total */}
        <div 
          className="flex items-center justify-between pt-4 mt-4 border-t"
          style={{ borderColor: `${colors.secondary.light}20` }}
        >
          <span style={{
            fontFamily: typography.fontFamily.primary,
            fontSize: '18px',
            fontWeight: '500',
            color: colors.secondary.DEFAULT
          }}>
            Total
          </span>
          <span style={{
            fontFamily: typography.fontFamily.primary,
            fontSize: '20px',
            fontWeight: '600',
            color: colors.primary.DEFAULT
          }}>
            ${order.total.toFixed(2)}
          </span>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
      <Header />
      
      <main className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: '400',
              lineHeight: '1.1',
              color: colors.secondary.DEFAULT,
              textTransform: 'uppercase',
              margin: '0 0 16px 0'
            }}>
              Track Your Order
            </h1>
            <p style={{
              fontFamily: typography.fontFamily.secondary,
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: colors.secondary.light,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Enter your order number to see real-time updates on your delicious Japanese meal
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-xl mb-8"
            style={{ border: `1px solid ${colors.primary.DEFAULT}20` }}
          >
            <div className="max-w-md mx-auto">
              <label style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '16px',
                fontWeight: '600',
                color: colors.secondary.DEFAULT,
                display: 'block',
                marginBottom: '12px'
              }}>
                Order Number
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="MH123456"
                  className="w-full p-4 pr-24 border-2 rounded-xl text-center text-lg font-mono tracking-wider focus:outline-none transition-all duration-300"
                  style={{
                    borderColor: error ? '#EF4444' : colors.secondary.light,
                    backgroundColor: colors.background,
                    fontFamily: typography.fontFamily.secondary
                  }}
                />
                <motion.button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-lg text-white"
                  style={{
                    backgroundColor: isLoading ? colors.secondary.light : colors.primary.DEFAULT,
                    fontFamily: typography.fontFamily.secondary,
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                  whileHover={!isLoading ? { scale: 1.05 } : {}}
                  whileTap={!isLoading ? { scale: 0.95 } : {}}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      🔄
                    </motion.div>
                  ) : (
                    '🔍'
                  )}
                </motion.button>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-3 text-center"
                  style={{ fontFamily: typography.fontFamily.secondary }}
                >
                  {error}
                </motion.p>
              )}
            </div>

            {/* Quick Search Examples */}
            <div className="mt-8 text-center">
              <p style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '14px',
                color: colors.secondary.light,
                marginBottom: '12px'
              }}>
                Try these sample orders:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {sampleOrders.map((order) => (
                  <motion.button
                    key={order.id}
                    onClick={() => handleQuickSearch(order.id)}
                    className="px-4 py-2 rounded-lg border text-sm"
                    style={{
                      borderColor: colors.primary.DEFAULT,
                      color: colors.primary.DEFAULT,
                      fontFamily: typography.fontFamily.secondary,
                      fontWeight: '500'
                    }}
                    whileHover={{ 
                      backgroundColor: colors.primary.DEFAULT,
                      color: colors.white,
                      scale: 1.05 
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {order.id}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Order Results */}
          <AnimatePresence mode="wait">
            {searchedOrder && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="grid lg:grid-cols-2 gap-8"
              >
                {/* Status Timeline */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 style={{
                    fontFamily: typography.fontFamily.primary,
                    fontSize: '24px',
                    color: colors.secondary.DEFAULT,
                    margin: '0 0 24px 0'
                  }}>
                    Order Status
                  </h3>
                  <StatusTimeline order={searchedOrder} />
                </div>

                {/* Order Details */}
                <OrderDetails order={searchedOrder} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-white rounded-2xl p-8 shadow-lg text-center"
          >
            <h3 style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: '24px',
              color: colors.secondary.DEFAULT,
              margin: '0 0 16px 0'
            }}>
              Need Help?
            </h3>
            <p style={{
              fontFamily: typography.fontFamily.secondary,
              fontSize: '16px',
              color: colors.secondary.light,
              margin: '0 0 24px 0'
            }}>
              Our customer service team is here to assist you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-6 py-3 rounded-xl"
                style={{
                  backgroundColor: colors.primary.DEFAULT,
                  color: colors.white,
                  fontFamily: typography.fontFamily.secondary,
                  fontWeight: '600'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📞 Call Support: (555) 123-FOOD
              </motion.button>
              <motion.button
                className="px-6 py-3 rounded-xl border"
                style={{
                  borderColor: colors.primary.DEFAULT,
                  color: colors.primary.DEFAULT,
                  fontFamily: typography.fontFamily.secondary,
                  fontWeight: '600'
                }}
                whileHover={{ 
                  backgroundColor: colors.primary.DEFAULT,
                  color: colors.white,
                  scale: 1.05 
                }}
                whileTap={{ scale: 0.95 }}
              >
                💬 Live Chat
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderTrackingPage; 