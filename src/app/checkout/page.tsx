'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const CheckoutPage = () => {
  const { items: cartItems, getTotalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'delivery' | 'payment' | 'confirmation'>('delivery');
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const [deliveryInfo, setDeliveryInfo] = useState<Address>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    phone: ''
  });

  const paymentMethods: PaymentMethod[] = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '🔵' },
    { id: 'apple', name: 'Apple Pay', icon: '🍎' },
    { id: 'google', name: 'Google Pay', icon: '🔴' }
  ];

  const deliveryFee = orderType === 'delivery' ? 5.99 : 0;
  const tax = getTotalPrice() * 0.08; // 8% tax
  const finalTotal = getTotalPrice() + deliveryFee + tax;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('confirmation');
      // clearCart(); // Clear cart after successful order
    }, 3000);
  };

  const OrderSummary = () => (
    <div className="bg-white rounded-2xl p-6 h-fit">
      <h3 style={{
        fontFamily: typography.fontFamily.primary,
        fontSize: '24px',
        color: colors.secondary.DEFAULT,
        marginBottom: '20px'
      }}>
        Order Summary
      </h3>

      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div>
              <h4 style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '16px',
                fontWeight: '500',
                color: colors.secondary.DEFAULT
              }}>
                {item.name}
              </h4>
              <p style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '14px',
                color: colors.secondary.light
              }}>
                Qty: {item.quantity}
              </p>
            </div>
            <span style={{
              fontFamily: typography.fontFamily.secondary,
              fontSize: '16px',
              fontWeight: '500',
              color: colors.secondary.DEFAULT
            }}>
              ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px' }}>
            Subtotal
          </span>
          <span style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px' }}>
            ${getTotalPrice().toFixed(2)}
          </span>
        </div>
        
        {orderType === 'delivery' && (
          <div className="flex justify-between">
            <span style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px' }}>
              Delivery Fee
            </span>
            <span style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px' }}>
              ${deliveryFee.toFixed(2)}
            </span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px' }}>
            Tax
          </span>
          <span style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px' }}>
            ${tax.toFixed(2)}
          </span>
        </div>
        
        <div className="flex justify-between pt-2 border-t">
          <span style={{
            fontFamily: typography.fontFamily.primary,
            fontSize: '20px',
            fontWeight: '500',
            color: colors.secondary.DEFAULT
          }}>
            Total
          </span>
          <span style={{
            fontFamily: typography.fontFamily.primary,
            fontSize: '20px',
            fontWeight: '500',
            color: colors.primary.DEFAULT
          }}>
            ${finalTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );

  const DeliveryStep = () => (
    <div className="space-y-6">
      <div>
        <h2 style={{
          fontFamily: typography.fontFamily.primary,
          fontSize: '32px',
          color: colors.secondary.DEFAULT,
          marginBottom: '8px'
        }}>
          Delivery Information
        </h2>
        <p style={{
          fontFamily: typography.fontFamily.secondary,
          fontSize: '16px',
          color: colors.secondary.light
        }}>
          Please provide your delivery details
        </p>
      </div>

      {/* Order Type Selection */}
      <div className="bg-white rounded-2xl p-6">
        <h3 style={{
          fontFamily: typography.fontFamily.primary,
          fontSize: '20px',
          color: colors.secondary.DEFAULT,
          marginBottom: '16px'
        }}>
          Order Type
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: 'delivery', name: 'Delivery', desc: 'Get it delivered to your door', icon: '🚚' },
            { id: 'pickup', name: 'Pickup', desc: 'Collect from restaurant', icon: '🏪' }
          ].map((type) => (
            <motion.button
              key={type.id}
              onClick={() => setOrderType(type.id as 'delivery' | 'pickup')}
              className="p-4 border rounded-xl text-left"
              style={{
                borderColor: orderType === type.id ? colors.primary.DEFAULT : colors.secondary.light,
                backgroundColor: orderType === type.id ? `${colors.primary.DEFAULT}10` : 'transparent'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl mb-2">{type.icon}</div>
              <h4 style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '16px',
                fontWeight: '500',
                color: colors.secondary.DEFAULT
              }}>
                {type.name}
              </h4>
              <p style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '14px',
                color: colors.secondary.light
              }}>
                {type.desc}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Delivery Address */}
      {orderType === 'delivery' && (
        <div className="bg-white rounded-2xl p-6">
          <h3 style={{
            fontFamily: typography.fontFamily.primary,
            fontSize: '20px',
            color: colors.secondary.DEFAULT,
            marginBottom: '16px'
          }}>
            Delivery Address
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Street Address"
              value={deliveryInfo.street}
              onChange={(e) => setDeliveryInfo({...deliveryInfo, street: e.target.value})}
              className="w-full p-3 border rounded-lg"
              style={{ borderColor: colors.secondary.light }}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                value={deliveryInfo.city}
                onChange={(e) => setDeliveryInfo({...deliveryInfo, city: e.target.value})}
                className="w-full p-3 border rounded-lg"
                style={{ borderColor: colors.secondary.light }}
              />
              <input
                type="text"
                placeholder="State"
                value={deliveryInfo.state}
                onChange={(e) => setDeliveryInfo({...deliveryInfo, state: e.target.value})}
                className="w-full p-3 border rounded-lg"
                style={{ borderColor: colors.secondary.light }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="ZIP Code"
                value={deliveryInfo.zipCode}
                onChange={(e) => setDeliveryInfo({...deliveryInfo, zipCode: e.target.value})}
                className="w-full p-3 border rounded-lg"
                style={{ borderColor: colors.secondary.light }}
              />
              <select
                value={deliveryInfo.country}
                onChange={(e) => setDeliveryInfo({...deliveryInfo, country: e.target.value})}
                className="w-full p-3 border rounded-lg"
                style={{ borderColor: colors.secondary.light }}
              >
                <option value="USA">United States</option>
                <option value="CAN">Canada</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Pickup Information */}
      {orderType === 'pickup' && (
        <div className="bg-white rounded-2xl p-6">
          <h3 style={{
            fontFamily: typography.fontFamily.primary,
            fontSize: '20px',
            color: colors.secondary.DEFAULT,
            marginBottom: '16px'
          }}>
            Pickup Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '16px',
                fontWeight: '500',
                color: colors.secondary.DEFAULT
              }}>
                Miyabi House
              </h4>
              <p style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '14px',
                color: colors.secondary.light
              }}>
                123 Sakura Street, Downtown, NY 10001<br />
                Phone: (555) 123-4567
              </p>
            </div>
            
            <div>
              <label style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Preferred Pickup Time
              </label>
              <input
                type="datetime-local"
                className="w-full mt-2 p-3 border rounded-lg"
                style={{ borderColor: colors.secondary.light }}
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
          </div>
        </div>
      )}

      <motion.button
        onClick={() => setStep('payment')}
        className="w-full py-4 rounded-xl text-white"
        style={{
          backgroundColor: colors.primary.DEFAULT,
          fontFamily: typography.fontFamily.secondary,
          fontSize: '18px',
          fontWeight: '500'
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue to Payment
      </motion.button>
    </div>
  );

  const PaymentStep = () => (
    <div className="space-y-6">
      <div>
        <h2 style={{
          fontFamily: typography.fontFamily.primary,
          fontSize: '32px',
          color: colors.secondary.DEFAULT,
          marginBottom: '8px'
        }}>
          Payment Information
        </h2>
        <p style={{
          fontFamily: typography.fontFamily.secondary,
          fontSize: '16px',
          color: colors.secondary.light
        }}>
          Choose your payment method
        </p>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-2xl p-6">
        <h3 style={{
          fontFamily: typography.fontFamily.primary,
          fontSize: '20px',
          color: colors.secondary.DEFAULT,
          marginBottom: '16px'
        }}>
          Payment Method
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {paymentMethods.map((method) => (
            <motion.button
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              className="p-4 border rounded-xl text-left"
              style={{
                borderColor: paymentMethod === method.id ? colors.primary.DEFAULT : colors.secondary.light,
                backgroundColor: paymentMethod === method.id ? `${colors.primary.DEFAULT}10` : 'transparent'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl mb-2">{method.icon}</div>
              <p style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '14px',
                fontWeight: '500',
                color: colors.secondary.DEFAULT
              }}>
                {method.name}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Card Details */}
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              value={paymentInfo.cardNumber}
              onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
              className="w-full p-3 border rounded-lg"
              style={{ borderColor: colors.secondary.light }}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                value={paymentInfo.expiryDate}
                onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                className="w-full p-3 border rounded-lg"
                style={{ borderColor: colors.secondary.light }}
              />
              <input
                type="text"
                placeholder="CVV"
                value={paymentInfo.cvv}
                onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                className="w-full p-3 border rounded-lg"
                style={{ borderColor: colors.secondary.light }}
              />
            </div>
            
            <input
              type="text"
              placeholder="Cardholder Name"
              value={paymentInfo.cardName}
              onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
              className="w-full p-3 border rounded-lg"
              style={{ borderColor: colors.secondary.light }}
            />
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-2xl p-6">
        <h3 style={{
          fontFamily: typography.fontFamily.primary,
          fontSize: '20px',
          color: colors.secondary.DEFAULT,
          marginBottom: '16px'
        }}>
          Contact Information
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          <input
            type="email"
            placeholder="Email Address"
            value={paymentInfo.email}
            onChange={(e) => setPaymentInfo({...paymentInfo, email: e.target.value})}
            className="w-full p-3 border rounded-lg"
            style={{ borderColor: colors.secondary.light }}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={paymentInfo.phone}
            onChange={(e) => setPaymentInfo({...paymentInfo, phone: e.target.value})}
            className="w-full p-3 border rounded-lg"
            style={{ borderColor: colors.secondary.light }}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <motion.button
          onClick={() => setStep('delivery')}
          className="flex-1 py-4 border rounded-xl"
          style={{
            borderColor: colors.secondary.light,
            color: colors.secondary.DEFAULT,
            fontFamily: typography.fontFamily.secondary,
            fontSize: '16px'
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Back
        </motion.button>
        
        <motion.button
          onClick={handlePlaceOrder}
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
          {isProcessing ? 'Processing...' : `Place Order - $${finalTotal.toFixed(2)}`}
        </motion.button>
      </div>
    </div>
  );

  const ConfirmationStep = () => (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl"
        style={{ backgroundColor: `${colors.primary.DEFAULT}20` }}
      >
        ✅
      </motion.div>
      
      <div>
        <h2 style={{
          fontFamily: typography.fontFamily.primary,
          fontSize: '36px',
          color: colors.secondary.DEFAULT,
          marginBottom: '8px'
        }}>
          Order Confirmed!
        </h2>
        <p style={{
          fontFamily: typography.fontFamily.secondary,
          fontSize: '18px',
          color: colors.secondary.light
        }}>
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 text-left max-w-md mx-auto">
        <h3 style={{
          fontFamily: typography.fontFamily.primary,
          fontSize: '20px',
          color: colors.secondary.DEFAULT,
          marginBottom: '16px'
        }}>
          Order Details
        </h3>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px' }}>
              Order Number
            </span>
            <span style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px', fontWeight: '500' }}>
              #MH{Date.now().toString().slice(-6)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px' }}>
              Estimated {orderType === 'delivery' ? 'Delivery' : 'Pickup'}
            </span>
            <span style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px', fontWeight: '500' }}>
              {orderType === 'delivery' ? '45-60 mins' : '20-30 mins'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px' }}>
              Total Paid
            </span>
            <span style={{
              fontFamily: typography.fontFamily.secondary,
              fontSize: '16px',
              fontWeight: '500',
              color: colors.primary.DEFAULT
            }}>
              ${finalTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <motion.button
        onClick={() => window.location.href = '/order-tracking'}
        className="px-8 py-3 rounded-xl text-white"
        style={{
          backgroundColor: colors.primary.DEFAULT,
          fontFamily: typography.fontFamily.secondary,
          fontSize: '16px',
          fontWeight: '500'
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Track Your Order
      </motion.button>
    </div>
  );

  if (cartItems.length === 0 && step !== 'confirmation') {
    return (
      <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
        <Header />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: '48px',
              color: colors.secondary.DEFAULT,
              marginBottom: '16px'
            }}>
              Your cart is empty
            </h1>
            <p style={{
              fontFamily: typography.fontFamily.secondary,
              fontSize: '18px',
              color: colors.secondary.light,
              marginBottom: '32px'
            }}>
              Add some delicious items to your cart before checkout
            </p>
            <motion.button
              onClick={() => window.location.href = '/menu'}
              className="px-8 py-3 rounded-xl text-white"
              style={{
                backgroundColor: colors.primary.DEFAULT,
                fontFamily: typography.fontFamily.secondary,
                fontSize: '16px',
                fontWeight: '500'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Browse Menu
            </motion.button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
      <Header />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 'delivery' && <DeliveryStep />}
              {step === 'payment' && <PaymentStep />}
              {step === 'confirmation' && <ConfirmationStep />}
            </div>

            {/* Order Summary Sidebar */}
            {step !== 'confirmation' && (
              <div className="lg:col-span-1">
                <OrderSummary />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage; 