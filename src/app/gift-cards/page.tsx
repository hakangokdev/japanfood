'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface GiftCard {
  id: string;
  amount: number;
  design: string;
  background: string;
  textColor: string;
}

interface GiftCardOrder {
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  senderEmail: string;
  message: string;
  deliveryDate: string;
  selectedCard: GiftCard;
  customAmount?: number;
}

const GiftCardsPage = () => {
  const [step, setStep] = useState<'selection' | 'customize' | 'payment' | 'confirmation'>('selection');
  const [selectedCard, setSelectedCard] = useState<GiftCard | null>(null);
  const [customAmount, setCustomAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [orderData, setOrderData] = useState<GiftCardOrder>({
    recipientName: '',
    recipientEmail: '',
    senderName: '',
    senderEmail: '',
    message: '',
    deliveryDate: '',
    selectedCard: {} as GiftCard,
    customAmount: undefined
  });

  const giftCards: GiftCard[] = [
    {
      id: 'classic-25',
      amount: 25,
      design: 'Classic Elegance',
      background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
      textColor: '#ffffff'
    },
    {
      id: 'classic-50',
      amount: 50,
      design: 'Classic Elegance',
      background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
      textColor: '#ffffff'
    },
    {
      id: 'sakura-75',
      amount: 75,
      design: 'Sakura Blossom',
      background: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
      textColor: '#ffffff'
    },
    {
      id: 'sakura-100',
      amount: 100,
      design: 'Sakura Blossom',
      background: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
      textColor: '#ffffff'
    },
    {
      id: 'zen-150',
      amount: 150,
      design: 'Zen Garden',
      background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
      textColor: '#ffffff'
    },
    {
      id: 'zen-200',
      amount: 200,
      design: 'Zen Garden',
      background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
      textColor: '#ffffff'
    },
    {
      id: 'premium-250',
      amount: 250,
      design: 'Premium Gold',
      background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
      textColor: '#1f2937'
    },
    {
      id: 'custom',
      amount: 0,
      design: 'Custom Amount',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      textColor: '#ffffff'
    }
  ];

  const handleCardSelect = (card: GiftCard) => {
    setSelectedCard(card);
    if (card.id === 'custom') {
      setCustomAmount(50); // Default custom amount
    } else {
      setCustomAmount(null);
    }
    setStep('customize');
  };

  const handlePurchase = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('confirmation');
    }, 3000);
  };

  const getFinalAmount = () => {
    return selectedCard?.id === 'custom' ? (customAmount || 0) : (selectedCard?.amount || 0);
  };

  const GiftCardPreview = ({ card, amount, message, recipientName }: {
    card: GiftCard;
    amount?: number;
    message?: string;
    recipientName?: string;
  }) => (
    <div 
      className="w-full max-w-80 h-48 rounded-2xl p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden mx-auto"
      style={{ 
        background: card.background,
        color: card.textColor,
        minHeight: '180px'
      }}
    >
      {/* Decorative Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div className="w-full h-full rounded-full" style={{ 
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)'
        }} />
      </div>
      
      {/* Header */}
      <div>
        <h3 style={{
          fontFamily: typography.fontFamily.primary,
          fontSize: '20px',
          fontWeight: '400',
          marginBottom: '4px'
        }}>
          Miyabi House
        </h3>
        <p style={{
          fontFamily: typography.fontFamily.secondary,
          fontSize: '12px',
          opacity: 0.8
        }}>
          Gift Card
        </p>
      </div>

      {/* Amount */}
      <div className="text-center">
        <p style={{
          fontFamily: typography.fontFamily.primary,
          fontSize: '36px',
          fontWeight: '400',
          margin: 0
        }}>
          ${amount || card.amount}
        </p>
        {recipientName && (
          <p style={{
            fontFamily: typography.fontFamily.secondary,
            fontSize: '14px',
            opacity: 0.9,
            marginTop: '4px'
          }}>
            For {recipientName}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end">
        <div>
          <p style={{
            fontFamily: typography.fontFamily.secondary,
            fontSize: '10px',
            opacity: 0.7
          }}>
            {card.design}
          </p>
        </div>
        <div style={{
          fontFamily: typography.fontFamily.secondary,
          fontSize: '10px',
          opacity: 0.7
        }}>
          Valid for 1 year
        </div>
      </div>
    </div>
  );

  const SelectionStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 style={{
          fontFamily: typography.fontFamily.primary,
          fontSize: 'clamp(24px, 5vw, 36px)',
          color: colors.secondary.DEFAULT,
          marginBottom: '16px'
        }}>
          Choose Your Gift Card
        </h2>
        <p style={{
          fontFamily: typography.fontFamily.secondary,
          fontSize: 'clamp(14px, 3vw, 18px)',
          color: colors.secondary.light
        }}>
          Give the gift of exceptional Japanese dining
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {giftCards.map((card) => (
          <motion.div
            key={card.id}
            className="cursor-pointer"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCardSelect(card)}
          >
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
              <GiftCardPreview card={card} />
              
              <div className="mt-4 text-center">
                <h3 style={{
                  fontFamily: typography.fontFamily.primary,
                  fontSize: 'clamp(16px, 3vw, 20px)',
                  color: colors.secondary.DEFAULT,
                  marginBottom: '8px'
                }}>
                  {card.id === 'custom' ? 'Custom Amount' : `$${card.amount}`}
                </h3>
                <p style={{
                  fontFamily: typography.fontFamily.secondary,
                  fontSize: 'clamp(12px, 2.5vw, 14px)',
                  color: colors.secondary.light
                }}>
                  {card.design}
                </p>
                
                <motion.button
                  className="mt-4 px-6 py-2 rounded-lg"
                  style={{
                    backgroundColor: colors.primary.DEFAULT,
                    color: colors.white,
                    fontFamily: typography.fontFamily.secondary,
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Select
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const CustomizeStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Preview */}
        <div className="space-y-6">
          <h2 style={{
            fontFamily: typography.fontFamily.primary,
            fontSize: 'clamp(20px, 4vw, 28px)',
            color: colors.secondary.DEFAULT
          }}>
            Preview Your Gift Card
          </h2>
          
          <div className="flex justify-center">
            {selectedCard && (
              <GiftCardPreview 
                card={selectedCard} 
                amount={getFinalAmount()}
                recipientName={orderData.recipientName || 'Recipient'}
              />
            )}
          </div>

          {selectedCard?.id === 'custom' && (
            <div className="bg-white rounded-xl p-6">
              <label style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '16px',
                fontWeight: '500',
                color: colors.secondary.DEFAULT,
                display: 'block',
                marginBottom: '8px'
              }}>
                Custom Amount ($25 - $500)
              </label>
              <input
                type="number"
                min="25"
                max="500"
                value={customAmount || ''}
                onChange={(e) => setCustomAmount(parseInt(e.target.value) || 0)}
                className="w-full p-4 border rounded-xl text-center text-xl"
                style={{
                  borderColor: colors.secondary.light,
                  fontFamily: typography.fontFamily.primary
                }}
                placeholder="Enter amount"
              />
            </div>
          )}
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-4 sm:p-8">
          <h3 style={{
            fontFamily: typography.fontFamily.primary,
            fontSize: 'clamp(18px, 3.5vw, 24px)',
            color: colors.secondary.DEFAULT,
            marginBottom: '24px'
          }}>
            Gift Card Details
          </h3>

          <div className="space-y-6">
            {/* Recipient Info */}
            <div>
              <h4 style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '18px',
                fontWeight: '500',
                color: colors.secondary.DEFAULT,
                marginBottom: '16px'
              }}>
                Recipient Information
              </h4>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Recipient's Name"
                  value={orderData.recipientName}
                  onChange={(e) => setOrderData({...orderData, recipientName: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  style={{ borderColor: colors.secondary.light }}
                />
                
                <input
                  type="email"
                  placeholder="Recipient's Email"
                  value={orderData.recipientEmail}
                  onChange={(e) => setOrderData({...orderData, recipientEmail: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  style={{ borderColor: colors.secondary.light }}
                />
              </div>
            </div>

            {/* Sender Info */}
            <div>
              <h4 style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '18px',
                fontWeight: '500',
                color: colors.secondary.DEFAULT,
                marginBottom: '16px'
              }}>
                Your Information
              </h4>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={orderData.senderName}
                  onChange={(e) => setOrderData({...orderData, senderName: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  style={{ borderColor: colors.secondary.light }}
                />
                
                <input
                  type="email"
                  placeholder="Your Email"
                  value={orderData.senderEmail}
                  onChange={(e) => setOrderData({...orderData, senderEmail: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  style={{ borderColor: colors.secondary.light }}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '16px',
                fontWeight: '500',
                color: colors.secondary.DEFAULT,
                display: 'block',
                marginBottom: '8px'
              }}>
                Personal Message (Optional)
              </label>
              <textarea
                value={orderData.message}
                onChange={(e) => setOrderData({...orderData, message: e.target.value})}
                rows={4}
                className="w-full p-3 border rounded-lg"
                style={{ borderColor: colors.secondary.light }}
                placeholder="Write a personal message..."
                maxLength={200}
              />
              <p style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '12px',
                color: colors.secondary.light,
                textAlign: 'right',
                marginTop: '4px'
              }}>
                {orderData.message.length}/200
              </p>
            </div>

            {/* Delivery Date */}
            <div>
              <label style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '16px',
                fontWeight: '500',
                color: colors.secondary.DEFAULT,
                display: 'block',
                marginBottom: '8px'
              }}>
                Delivery Date
              </label>
              <input
                type="date"
                value={orderData.deliveryDate}
                onChange={(e) => setOrderData({...orderData, deliveryDate: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border rounded-lg"
                style={{ borderColor: colors.secondary.light }}
              />
              <p style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '12px',
                color: colors.secondary.light,
                marginTop: '4px'
              }}>
                Leave blank to send immediately
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <motion.button
              onClick={() => setStep('selection')}
              className="flex-1 py-3 border rounded-xl"
              style={{
                borderColor: colors.secondary.light,
                color: colors.secondary.DEFAULT,
                fontFamily: typography.fontFamily.secondary
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Back
            </motion.button>
            
            <motion.button
              onClick={() => setStep('payment')}
              disabled={!orderData.recipientName || !orderData.recipientEmail || getFinalAmount() < 25}
              className="flex-1 py-3 rounded-xl text-white"
              style={{
                backgroundColor: (!orderData.recipientName || !orderData.recipientEmail || getFinalAmount() < 25)
                  ? colors.secondary.light 
                  : colors.primary.DEFAULT,
                fontFamily: typography.fontFamily.secondary,
                fontWeight: '500'
              }}
              whileHover={(!orderData.recipientName || !orderData.recipientEmail || getFinalAmount() < 25) ? {} : { scale: 1.02 }}
              whileTap={(!orderData.recipientName || !orderData.recipientEmail || getFinalAmount() < 25) ? {} : { scale: 0.98 }}
            >
              Continue to Payment
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const PaymentStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-2xl p-8">
        <h2 style={{
          fontFamily: typography.fontFamily.primary,
          fontSize: '32px',
          color: colors.secondary.DEFAULT,
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          Complete Your Purchase
        </h2>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 style={{
            fontFamily: typography.fontFamily.primary,
            fontSize: '20px',
            color: colors.secondary.DEFAULT,
            marginBottom: '16px'
          }}>
            Order Summary
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span style={{ fontFamily: typography.fontFamily.secondary }}>Gift Card Amount</span>
              <span style={{ fontFamily: typography.fontFamily.secondary, fontWeight: '500' }}>
                ${getFinalAmount()}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ fontFamily: typography.fontFamily.secondary }}>Processing Fee</span>
              <span style={{ fontFamily: typography.fontFamily.secondary, fontWeight: '500' }}>$2.99</span>
            </div>
            <div className="flex justify-between pt-3 border-t">
              <span style={{ 
                fontFamily: typography.fontFamily.primary, 
                fontSize: '18px',
                fontWeight: '500'
              }}>
                Total
              </span>
              <span style={{ 
                fontFamily: typography.fontFamily.primary, 
                fontSize: '18px',
                fontWeight: '500',
                color: colors.primary.DEFAULT
              }}>
                ${(getFinalAmount() + 2.99).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="space-y-6">
          <div>
            <label style={{
              fontFamily: typography.fontFamily.secondary,
              fontSize: '16px',
              fontWeight: '500',
              display: 'block',
              marginBottom: '8px'
            }}>
              Card Number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full p-4 border rounded-xl"
              style={{ borderColor: colors.secondary.light }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '16px',
                fontWeight: '500',
                display: 'block',
                marginBottom: '8px'
              }}>
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full p-4 border rounded-xl"
                style={{ borderColor: colors.secondary.light }}
              />
            </div>
            
            <div>
              <label style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '16px',
                fontWeight: '500',
                display: 'block',
                marginBottom: '8px'
              }}>
                CVV
              </label>
              <input
                type="text"
                placeholder="123"
                className="w-full p-4 border rounded-xl"
                style={{ borderColor: colors.secondary.light }}
              />
            </div>
          </div>

          <div>
            <label style={{
              fontFamily: typography.fontFamily.secondary,
              fontSize: '16px',
              fontWeight: '500',
              display: 'block',
              marginBottom: '8px'
            }}>
              Cardholder Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full p-4 border rounded-xl"
              style={{ borderColor: colors.secondary.light }}
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <motion.button
            onClick={() => setStep('customize')}
            className="flex-1 py-4 border rounded-xl"
            style={{
              borderColor: colors.secondary.light,
              color: colors.secondary.DEFAULT,
              fontFamily: typography.fontFamily.secondary
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Back
          </motion.button>
          
          <motion.button
            onClick={handlePurchase}
            disabled={isProcessing}
            className="flex-1 py-4 rounded-xl text-white"
            style={{
              backgroundColor: isProcessing ? colors.secondary.light : colors.primary.DEFAULT,
              fontFamily: typography.fontFamily.secondary,
              fontSize: '18px',
              fontWeight: '500'
            }}
            whileHover={!isProcessing ? { scale: 1.02 } : {}}
            whileTap={!isProcessing ? { scale: 0.98 } : {}}
          >
            {isProcessing ? 'Processing...' : `Purchase Gift Card - $${(getFinalAmount() + 2.99).toFixed(2)}`}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const ConfirmationStep = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2, duration: 0.6 }}
        className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center text-5xl"
        style={{ backgroundColor: `${colors.primary.DEFAULT}20` }}
      >
        🎁
      </motion.div>

      <h2 style={{
        fontFamily: typography.fontFamily.primary,
        fontSize: 'clamp(24px, 6vw, 48px)',
        color: colors.secondary.DEFAULT,
        marginBottom: '16px'
      }}>
        Gift Card Purchased!
      </h2>

      <p style={{
        fontFamily: typography.fontFamily.secondary,
        fontSize: 'clamp(16px, 3vw, 20px)',
        color: colors.secondary.light,
        marginBottom: '32px'
      }}>
        Your gift card has been successfully purchased and will be delivered as scheduled.
      </p>

      <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-lg">
        <h3 style={{
          fontFamily: typography.fontFamily.primary,
          fontSize: 'clamp(18px, 4vw, 24px)',
          color: colors.secondary.DEFAULT,
          marginBottom: '24px'
        }}>
          Purchase Details
        </h3>

        <div className="space-y-4 text-left">
          <div className="flex justify-between">
            <span style={{ fontFamily: typography.fontFamily.secondary, fontWeight: '500' }}>
              Confirmation Number
            </span>
            <span style={{ fontFamily: typography.fontFamily.secondary, color: colors.primary.DEFAULT, fontWeight: '500' }}>
              GC{Date.now().toString().slice(-6)}
            </span>
          </div>

          <div className="flex justify-between">
            <span style={{ fontFamily: typography.fontFamily.secondary, fontWeight: '500' }}>
              Gift Card Amount
            </span>
            <span style={{ fontFamily: typography.fontFamily.secondary }}>
              ${getFinalAmount()}
            </span>
          </div>

          <div className="flex justify-between">
            <span style={{ fontFamily: typography.fontFamily.secondary, fontWeight: '500' }}>
              Recipient
            </span>
            <span style={{ fontFamily: typography.fontFamily.secondary }}>
              {orderData.recipientName}
            </span>
          </div>

          <div className="flex justify-between">
            <span style={{ fontFamily: typography.fontFamily.secondary, fontWeight: '500' }}>
              Delivery
            </span>
            <span style={{ fontFamily: typography.fontFamily.secondary }}>
              {orderData.deliveryDate 
                ? new Date(orderData.deliveryDate).toLocaleDateString()
                : 'Immediately'
              }
            </span>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-xl" style={{ backgroundColor: `${colors.primary.DEFAULT}10` }}>
          <h4 style={{
            fontFamily: typography.fontFamily.primary,
            fontSize: '18px',
            color: colors.secondary.DEFAULT,
            marginBottom: '8px'
          }}>
            What's Next?
          </h4>
          <ul className="space-y-2 text-sm text-left" style={{ color: colors.secondary.light }}>
            <li>• A confirmation email has been sent to {orderData.senderEmail}</li>
            <li>• The gift card will be emailed to {orderData.recipientEmail} on the delivery date</li>
            <li>• Gift cards are valid for 1 year from purchase date</li>
            <li>• Contact us at (555) 123-4567 for any questions</li>
          </ul>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <motion.button
          onClick={() => {
            setStep('selection');
            setSelectedCard(null);
            setCustomAmount(null);
            setOrderData({
              recipientName: '',
              recipientEmail: '',
              senderName: '',
              senderEmail: '',
              message: '',
              deliveryDate: '',
              selectedCard: {} as GiftCard,
              customAmount: undefined
            });
          }}
          className="flex-1 py-3 border rounded-xl"
          style={{
            borderColor: colors.secondary.light,
            color: colors.secondary.DEFAULT,
            fontFamily: typography.fontFamily.secondary
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Purchase Another Gift Card
        </motion.button>

        <motion.button
          onClick={() => window.location.href = '/'}
          className="flex-1 py-3 rounded-xl text-white"
          style={{
            backgroundColor: colors.primary.DEFAULT,
            fontFamily: typography.fontFamily.secondary,
            fontWeight: '500'
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Return Home
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
      <Header />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          {/* Header */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-16"
          >
            <h1 style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              fontWeight: '400',
              lineHeight: '1.1',
              color: colors.secondary.DEFAULT,
              textTransform: 'uppercase',
              margin: 0,
            }}>
              Gift Cards
            </h1>
            <p style={{
              fontFamily: typography.fontFamily.secondary,
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              fontWeight: '400',
              lineHeight: '1.4',
              color: colors.secondary.light,
              marginTop: '16px',
              maxWidth: '600px',
              margin: '16px auto 0',
            }}>
              Share the joy of exceptional Japanese cuisine with your loved ones
            </p>
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {step === 'selection' && <SelectionStep key="selection" />}
            {step === 'customize' && <CustomizeStep key="customize" />}
            {step === 'payment' && <PaymentStep key="payment" />}
            {step === 'confirmation' && <ConfirmationStep key="confirmation" />}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GiftCardsPage; 