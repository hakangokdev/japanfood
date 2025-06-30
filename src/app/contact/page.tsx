'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  reservationDate?: string;
  partySize?: number;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
    reservationDate: '',
    partySize: 2
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
        reservationDate: '',
        partySize: 2
      });
    } catch (error) {
      setSubmitStatus('error');
    }
    
    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  const contactInfo = [
    {
      id: 1,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      icon: '📞',
      description: 'Call us for reservations'
    },
    {
      id: 2,
      title: 'Email',
      value: 'info@miyabihouse.com',
      icon: '✉️',
      description: 'Send us a message'
    },
    {
      id: 3,
      title: 'Address',
      value: '123 Sakura Street, Tokyo District, 12345',
      icon: '📍',
      description: 'Visit our restaurant'
    },
    {
      id: 4,
      title: 'Hours',
      value: 'Mon-Sun: 11:00 AM - 10:00 PM',
      icon: '🕐',
      description: 'We are open 7 days a week'
    }
  ];

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
      <Header />
      
      <main className="pt-20">
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
              Contact Us
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
              Get in touch with us for reservations, inquiries, or just to say hello
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.id}
                variants={cardVariants}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3
                  style={{
                    fontFamily: typography.fontFamily.primary,
                    fontSize: '20px',
                    fontWeight: '400',
                    color: colors.secondary.DEFAULT,
                    marginBottom: '8px',
                  }}
                >
                  {info.title}
                </h3>
                <p
                  style={{
                    fontFamily: typography.fontFamily.secondary,
                    fontSize: '16px',
                    fontWeight: '500',
                    color: colors.primary.DEFAULT,
                    marginBottom: '4px',
                  }}
                >
                  {info.value}
                </p>
                <p
                  style={{
                    fontFamily: typography.fontFamily.secondary,
                    fontSize: '14px',
                    fontWeight: '400',
                    color: colors.secondary.light,
                  }}
                >
                  {info.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              variants={cardVariants}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2
                style={{
                  fontFamily: typography.fontFamily.primary,
                  fontSize: '32px',
                  fontWeight: '400',
                  color: colors.secondary.DEFAULT,
                  marginBottom: '24px',
                }}
              >
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: colors.secondary.DEFAULT, fontFamily: typography.fontFamily.secondary }}>Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200"
                      style={{ borderColor: colors.gray[300], fontFamily: typography.fontFamily.secondary, fontSize: '16px' }}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: colors.secondary.DEFAULT, fontFamily: typography.fontFamily.secondary }}>Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200"
                      style={{ borderColor: colors.gray[300], fontFamily: typography.fontFamily.secondary, fontSize: '16px' }}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: colors.secondary.DEFAULT, fontFamily: typography.fontFamily.secondary }}>Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200"
                      style={{ borderColor: colors.gray[300], fontFamily: typography.fontFamily.secondary, fontSize: '16px' }}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{ color: colors.secondary.DEFAULT, fontFamily: typography.fontFamily.secondary }}>Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200"
                      style={{ borderColor: colors.gray[300], fontFamily: typography.fontFamily.secondary, fontSize: '16px' }}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="reservation">Reservation</option>
                      <option value="private">Private Event</option>
                      <option value="catering">Catering</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                {formData.subject === 'reservation' && (
                  <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                    <div>
                      <label htmlFor="reservationDate" className="block text-sm font-medium mb-2" style={{ color: colors.secondary.DEFAULT, fontFamily: typography.fontFamily.secondary }}>Preferred Date</label>
                      <input
                        type="date"
                        id="reservationDate"
                        name="reservationDate"
                        value={formData.reservationDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200"
                        style={{ borderColor: colors.gray[300], fontFamily: typography.fontFamily.secondary, fontSize: '16px' }}
                      />
                    </div>
                    <div>
                      <label htmlFor="partySize" className="block text-sm font-medium mb-2" style={{ color: colors.secondary.DEFAULT, fontFamily: typography.fontFamily.secondary }}>Party Size</label>
                      <select
                        id="partySize"
                        name="partySize"
                        value={formData.partySize}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200"
                        style={{ borderColor: colors.gray[300], fontFamily: typography.fontFamily.secondary, fontSize: '16px' }}
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                        <option value={11}>11+ Guests</option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: colors.secondary.DEFAULT, fontFamily: typography.fontFamily.secondary }}>Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 resize-vertical transition-all duration-200"
                    style={{ borderColor: colors.gray[300], fontFamily: typography.fontFamily.secondary, fontSize: '16px' }}
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-medium text-lg transition-all duration-300"
                  style={{
                    backgroundColor: isSubmitting ? colors.gray[400] : colors.primary.DEFAULT,
                    color: colors.white,
                    fontFamily: typography.fontFamily.primary,
                  }}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-100 text-green-700 rounded-xl text-center"
                    style={{ fontFamily: typography.fontFamily.secondary }}
                  >
                    Thank you! Your message has been sent successfully.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-100 text-red-700 rounded-xl text-center"
                    style={{ fontFamily: typography.fontFamily.secondary }}
                  >
                    Sorry, there was an error sending your message. Please try again.
                  </motion.div>
                )}
              </form>
            </motion.div>

            <motion.div variants={cardVariants} className="space-y-8">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p style={{ fontFamily: typography.fontFamily.secondary, fontSize: '16px', color: colors.secondary.light }}>
                      Interactive Map
                    </p>
                    <p style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px', color: colors.secondary.light }}>
                      123 Sakura Street, Tokyo District
                    </p>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 style={{ fontFamily: typography.fontFamily.primary, fontSize: '20px', color: colors.secondary.DEFAULT, marginBottom: '12px' }}>
                    Find Us
                  </h3>
                  <p style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px', color: colors.secondary.light, lineHeight: '1.5', marginBottom: '16px' }}>
                    Located in the heart of the Tokyo District, our restaurant is easily accessible by public transportation and offers convenient parking.
                  </p>
                  <motion.button
                    className="px-6 py-3 rounded-xl border transition-all duration-300"
                    style={{
                      borderColor: colors.primary.DEFAULT,
                      color: colors.primary.DEFAULT,
                      fontFamily: typography.fontFamily.secondary,
                      fontSize: '14px',
                      fontWeight: '500',
                    }}
                    whileHover={{ scale: 1.05, backgroundColor: colors.primary.DEFAULT, color: colors.white }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Directions
                  </motion.button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 style={{ fontFamily: typography.fontFamily.primary, fontSize: '24px', color: colors.secondary.DEFAULT, marginBottom: '16px' }}>
                  Business Hours
                </h3>
                <div className="space-y-3">
                  {[
                    { day: 'Monday - Thursday', hours: '11:00 AM - 10:00 PM' },
                    { day: 'Friday - Saturday', hours: '11:00 AM - 11:00 PM' },
                    { day: 'Sunday', hours: '12:00 PM - 9:00 PM' }
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span style={{ fontFamily: typography.fontFamily.secondary, fontSize: '16px', fontWeight: '500', color: colors.secondary.DEFAULT }}>
                        {schedule.day}
                      </span>
                      <span style={{ fontFamily: typography.fontFamily.secondary, fontSize: '16px', color: colors.secondary.light }}>
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 style={{ fontFamily: typography.fontFamily.primary, fontSize: '24px', color: colors.secondary.DEFAULT, marginBottom: '16px' }}>
                  Follow Us
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Instagram', handle: '@miyabihouse', url: '#' },
                    { name: 'Facebook', handle: 'Miyabi House Restaurant', url: '#' },
                    { name: 'Twitter', handle: '@miyabihouse', url: '#' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all duration-200"
                      whileHover={{ x: 5 }}
                    >
                      <span style={{ fontFamily: typography.fontFamily.secondary, fontSize: '16px', fontWeight: '500', color: colors.secondary.DEFAULT }}>
                        {social.name}
                      </span>
                      <span style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px', color: colors.primary.DEFAULT }}>
                        {social.handle}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
