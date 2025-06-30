'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion: string;
  specialRequests: string;
}

const ReservationPage = () => {
  const [step, setStep] = useState<'form' | 'confirmation'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    occasion: '',
    specialRequests: ''
  });

  const occasions = [
    'Birthday Celebration',
    'Anniversary',
    'Business Meeting',
    'Date Night',
    'Family Gathering',
    'Special Occasion',
    'Casual Dining'
  ];

  const timeSlots: TimeSlot[] = [
    { time: '17:00', available: true },
    { time: '17:30', available: true },
    { time: '18:00', available: false },
    { time: '18:30', available: true },
    { time: '19:00', available: true },
    { time: '19:30', available: false },
    { time: '20:00', available: true },
    { time: '20:30', available: true },
    { time: '21:00', available: true },
    { time: '21:30', available: false },
    { time: '22:00', available: true }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const reservationData = {
      ...formData,
      date: selectedDate,
      time: selectedTime
    };

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('confirmation');
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 60); // 60 days from today
    return maxDate.toISOString().split('T')[0];
  };

  const ReservationForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <h2 style={{
          fontFamily: typography.fontFamily.primary,
          fontSize: '36px',
          color: colors.secondary.DEFAULT,
          marginBottom: '8px',
          textAlign: 'center'
        }}>
          Make a Reservation
        </h2>
        
        <p style={{
          fontFamily: typography.fontFamily.secondary,
          fontSize: '18px',
          color: colors.secondary.light,
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          Book your table at Miyabi House for an unforgettable dining experience
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Guest Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '16px',
                fontWeight: '500',
                color: colors.secondary.DEFAULT,
                display: 'block',
                marginBottom: '8px'
              }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-4 border rounded-xl"
                style={{
                  borderColor: colors.secondary.light,
                  fontFamily: typography.fontFamily.secondary,
                  fontSize: '16px'
                }}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '16px',
                fontWeight: '500',
                color: colors.secondary.DEFAULT,
                display: 'block',
                marginBottom: '8px'
              }}>
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-4 border rounded-xl"
                style={{
                  borderColor: colors.secondary.light,
                  fontFamily: typography.fontFamily.secondary,
                  fontSize: '16px'
                }}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '16px',
                fontWeight: '500',
                color: colors.secondary.DEFAULT,
                display: 'block',
                marginBottom: '8px'
              }}>
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-4 border rounded-xl"
                style={{
                  borderColor: colors.secondary.light,
                  fontFamily: typography.fontFamily.secondary,
                  fontSize: '16px'
                }}
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '16px',
                fontWeight: '500',
                color: colors.secondary.DEFAULT,
                display: 'block',
                marginBottom: '8px'
              }}>
                Number of Guests *
              </label>
              <select
                required
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                className="w-full p-4 border rounded-xl"
                style={{
                  borderColor: colors.secondary.light,
                  fontFamily: typography.fontFamily.secondary,
                  fontSize: '16px'
                }}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <label style={{
              fontFamily: typography.fontFamily.secondary,
              fontSize: '16px',
              fontWeight: '500',
              color: colors.secondary.DEFAULT,
              display: 'block',
              marginBottom: '8px'
            }}>
              Preferred Date *
            </label>
            <input
              type="date"
              required
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={getMinDate()}
              max={getMaxDate()}
              className="w-full md:w-auto p-4 border rounded-xl"
              style={{
                borderColor: colors.secondary.light,
                fontFamily: typography.fontFamily.secondary,
                fontSize: '16px'
              }}
            />
            {selectedDate && (
              <p style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '14px',
                color: colors.primary.DEFAULT,
                marginTop: '8px'
              }}>
                {formatDate(selectedDate)}
              </p>
            )}
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label style={{
                fontFamily: typography.fontFamily.secondary,
                fontSize: '16px',
                fontWeight: '500',
                color: colors.secondary.DEFAULT,
                display: 'block',
                marginBottom: '16px'
              }}>
                Available Times *
              </label>
              
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {timeSlots.map((slot) => (
                  <motion.button
                    key={slot.time}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                    className="p-3 border rounded-xl text-center"
                    style={{
                      borderColor: selectedTime === slot.time 
                        ? colors.primary.DEFAULT 
                        : slot.available 
                          ? colors.secondary.light 
                          : '#E5E7EB',
                      backgroundColor: selectedTime === slot.time
                        ? colors.primary.DEFAULT
                        : slot.available
                          ? 'transparent'
                          : '#F9FAFB',
                      color: selectedTime === slot.time
                        ? colors.white
                        : slot.available
                          ? colors.secondary.DEFAULT
                          : '#9CA3AF',
                      fontFamily: typography.fontFamily.secondary,
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: slot.available ? 'pointer' : 'not-allowed'
                    }}
                    whileHover={slot.available ? { scale: 1.05 } : {}}
                    whileTap={slot.available ? { scale: 0.95 } : {}}
                  >
                    {slot.time}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Occasion */}
          <div>
            <label style={{
              fontFamily: typography.fontFamily.secondary,
              fontSize: '16px',
              fontWeight: '500',
              color: colors.secondary.DEFAULT,
              display: 'block',
              marginBottom: '8px'
            }}>
              Occasion (Optional)
            </label>
            <select
              value={formData.occasion}
              onChange={(e) => setFormData({...formData, occasion: e.target.value})}
              className="w-full p-4 border rounded-xl"
              style={{
                borderColor: colors.secondary.light,
                fontFamily: typography.fontFamily.secondary,
                fontSize: '16px'
              }}
            >
              <option value="">Select an occasion</option>
              {occasions.map((occasion) => (
                <option key={occasion} value={occasion}>
                  {occasion}
                </option>
              ))}
            </select>
          </div>

          {/* Special Requests */}
          <div>
            <label style={{
              fontFamily: typography.fontFamily.secondary,
              fontSize: '16px',
              fontWeight: '500',
              color: colors.secondary.DEFAULT,
              display: 'block',
              marginBottom: '8px'
            }}>
              Special Requests
            </label>
            <textarea
              value={formData.specialRequests}
              onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
              rows={4}
              className="w-full p-4 border rounded-xl"
              style={{
                borderColor: colors.secondary.light,
                fontFamily: typography.fontFamily.secondary,
                fontSize: '16px'
              }}
              placeholder="Dietary restrictions, seating preferences, allergies, etc."
            />
          </div>

          {/* Restaurant Info */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: '20px',
              color: colors.secondary.DEFAULT,
              marginBottom: '12px'
            }}>
              Restaurant Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p style={{ fontFamily: typography.fontFamily.secondary, fontWeight: '500' }}>
                  📍 Address
                </p>
                <p style={{ fontFamily: typography.fontFamily.secondary, color: colors.secondary.light }}>
                  123 Sakura Street<br />
                  Downtown, NY 10001
                </p>
              </div>
              
              <div>
                <p style={{ fontFamily: typography.fontFamily.secondary, fontWeight: '500' }}>
                  📞 Phone
                </p>
                <p style={{ fontFamily: typography.fontFamily.secondary, color: colors.secondary.light }}>
                  (555) 123-4567
                </p>
              </div>
              
              <div>
                <p style={{ fontFamily: typography.fontFamily.secondary, fontWeight: '500' }}>
                  🕒 Dinner Hours
                </p>
                <p style={{ fontFamily: typography.fontFamily.secondary, color: colors.secondary.light }}>
                  Monday - Sunday<br />
                  5:00 PM - 10:00 PM
                </p>
              </div>
              
              <div>
                <p style={{ fontFamily: typography.fontFamily.secondary, fontWeight: '500' }}>
                  📋 Cancellation Policy
                </p>
                <p style={{ fontFamily: typography.fontFamily.secondary, color: colors.secondary.light }}>
                  Free cancellation up to<br />
                  2 hours before reservation
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={!selectedDate || !selectedTime || isSubmitting}
            className="w-full py-4 rounded-xl text-white text-lg font-medium"
            style={{
              backgroundColor: (!selectedDate || !selectedTime || isSubmitting) 
                ? colors.secondary.light 
                : colors.primary.DEFAULT,
              fontFamily: typography.fontFamily.secondary
            }}
            whileHover={(!selectedDate || !selectedTime || isSubmitting) ? {} : { scale: 1.02 }}
            whileTap={(!selectedDate || !selectedTime || isSubmitting) ? {} : { scale: 0.98 }}
          >
            {isSubmitting ? 'Making Reservation...' : 'Reserve Table'}
          </motion.button>
        </form>
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
        🎉
      </motion.div>

      <h2 style={{
        fontFamily: typography.fontFamily.primary,
        fontSize: '48px',
        color: colors.secondary.DEFAULT,
        marginBottom: '16px'
      }}>
        Reservation Confirmed!
      </h2>

      <p style={{
        fontFamily: typography.fontFamily.secondary,
        fontSize: '20px',
        color: colors.secondary.light,
        marginBottom: '32px'
      }}>
        Thank you for choosing Miyabi House. We look forward to serving you!
      </p>

      <div className="bg-white rounded-2xl p-8 shadow-lg text-left">
        <h3 style={{
          fontFamily: typography.fontFamily.primary,
          fontSize: '28px',
          color: colors.secondary.DEFAULT,
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          Reservation Details
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span style={{ fontFamily: typography.fontFamily.secondary, fontWeight: '500' }}>
              Confirmation Number
            </span>
            <span style={{ fontFamily: typography.fontFamily.secondary, color: colors.primary.DEFAULT, fontWeight: '500' }}>
              MR{Date.now().toString().slice(-6)}
            </span>
          </div>

          <div className="flex justify-between">
            <span style={{ fontFamily: typography.fontFamily.secondary, fontWeight: '500' }}>
              Name
            </span>
            <span style={{ fontFamily: typography.fontFamily.secondary }}>
              {formData.name}
            </span>
          </div>

          <div className="flex justify-between">
            <span style={{ fontFamily: typography.fontFamily.secondary, fontWeight: '500' }}>
              Date & Time
            </span>
            <span style={{ fontFamily: typography.fontFamily.secondary }}>
              {formatDate(selectedDate)} at {selectedTime}
            </span>
          </div>

          <div className="flex justify-between">
            <span style={{ fontFamily: typography.fontFamily.secondary, fontWeight: '500' }}>
              Party Size
            </span>
            <span style={{ fontFamily: typography.fontFamily.secondary }}>
              {formData.guests} {formData.guests === 1 ? 'guest' : 'guests'}
            </span>
          </div>

          {formData.occasion && (
            <div className="flex justify-between">
              <span style={{ fontFamily: typography.fontFamily.secondary, fontWeight: '500' }}>
                Occasion
              </span>
              <span style={{ fontFamily: typography.fontFamily.secondary }}>
                {formData.occasion}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span style={{ fontFamily: typography.fontFamily.secondary, fontWeight: '500' }}>
              Contact
            </span>
            <span style={{ fontFamily: typography.fontFamily.secondary }}>
              {formData.email}
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
            Important Information
          </h4>
          <ul className="space-y-2 text-sm" style={{ color: colors.secondary.light }}>
            <li>• A confirmation email has been sent to {formData.email}</li>
            <li>• Please arrive 10 minutes before your reservation time</li>
            <li>• Free cancellation up to 2 hours before your reservation</li>
            <li>• Contact us at (555) 123-4567 for any changes</li>
          </ul>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <motion.button
          onClick={() => {
            setStep('form');
            setFormData({
              name: '',
              email: '',
              phone: '',
              date: '',
              time: '',
              guests: 2,
              occasion: '',
              specialRequests: ''
            });
            setSelectedDate('');
            setSelectedTime('');
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
          Make Another Reservation
        </motion.button>

        <motion.button
          onClick={() => window.location.href = '/menu'}
          className="flex-1 py-3 rounded-xl text-white"
          style={{
            backgroundColor: colors.primary.DEFAULT,
            fontFamily: typography.fontFamily.secondary,
            fontWeight: '500'
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Menu
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
      <Header />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-16"
          >
            <h1 style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontWeight: '400',
              lineHeight: '1.1',
              color: colors.secondary.DEFAULT,
              textTransform: 'uppercase',
              margin: 0,
            }}>
              Reservations
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
              Experience the finest Japanese cuisine in an intimate setting
            </p>
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {step === 'form' && <ReservationForm key="form" />}
            {step === 'confirmation' && <ConfirmationStep key="confirmation" />}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReservationPage; 