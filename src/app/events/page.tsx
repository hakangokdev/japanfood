'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  capacity: number;
  booked: number;
  category: 'workshop' | 'tasting' | 'cultural' | 'private';
  image: string;
  description: string;
  includes: string[];
  chef: string;
}

const EventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const events: Event[] = [
         {
       id: 1,
       title: 'Sushi Making Workshop',
       date: '2025-06-15',
       time: '18:00',
      duration: '3 hours',
      price: 89,
      capacity: 12,
      booked: 8,
      category: 'workshop',
      image: '/images/pexels-pixabay-271715.jpg',
      description: 'Learn the ancient art of sushi making with our master chef Hiroshi. Hands-on experience with premium ingredients.',
      includes: ['All ingredients', 'Sake tasting', 'Take-home sushi kit', 'Recipe booklet'],
      chef: 'Chef Hiroshi Tanaka'
    },
         {
       id: 2,
       title: 'Sake & Japanese Whisky Tasting',
       date: '2025-06-20',
       time: '19:30',
      duration: '2 hours',
      price: 65,
      capacity: 16,
      booked: 12,
      category: 'tasting',
      image: '/images/pexels-frans-van-heerden-201846-670705.jpg',
      description: 'Discover the subtle flavors and rich history of Japanese sake and whisky with our sommelier.',
      includes: ['6 sake varieties', '4 whisky samples', 'Tasting notes', 'Light appetizers'],
      chef: 'Sake Master Kenji'
    },
         {
       id: 3,
       title: 'Tea Ceremony Experience',
       date: '2025-06-22',
       time: '15:00',
      duration: '90 minutes',
      price: 45,
      capacity: 8,
      booked: 3,
      category: 'cultural',
      image: '/images/pexels-elli-559179-1854665.jpg',
      description: 'Immerse yourself in the tranquil world of Japanese tea ceremony. Learn the traditional way of preparing matcha.',
      includes: ['Matcha tea', 'Traditional sweets', 'Ceremony guide', 'Cultural insights'],
      chef: 'Tea Master Yuki'
    },
         {
       id: 4,
       title: 'Ramen Masterclass',
       date: '2025-06-25',
       time: '17:00',
      duration: '4 hours',
      price: 95,
      capacity: 10,
      booked: 6,
      category: 'workshop',
      image: '/images/pexels-rajesh-tp-749235-2098085.jpg',
      description: 'Master the complex art of ramen making. From bone broth to hand-pulled noodles.',
      includes: ['All ingredients', 'Broth techniques', 'Noodle making', 'Recipe collection'],
      chef: 'Chef Hiroshi Tanaka'
    },
         {
       id: 5,
       title: 'Private Chef Table Experience',
       date: '2025-06-28',
       time: '20:00',
      duration: '3 hours',
      price: 150,
      capacity: 6,
      booked: 2,
      category: 'private',
      image: '/images/japanchef.jpg',
      description: 'Exclusive dining experience at the chef\'s table with personalized omakase menu.',
      includes: ['7-course omakase', 'Wine pairing', 'Chef interaction', 'Exclusive access'],
      chef: 'Chef Hiroshi Tanaka'
    },
         {
       id: 6,
       title: 'Bento Box Workshop',
       date: '2025-07-05',
       time: '16:00',
      duration: '2.5 hours',
      price: 75,
      capacity: 14,
      booked: 9,
      category: 'workshop',
      image: '/images/pexels-1155579-2871757.jpg',
      description: 'Learn to create beautiful and balanced bento boxes with seasonal ingredients.',
      includes: ['Bento box', 'All ingredients', 'Presentation tips', 'Nutritional guide'],
      chef: 'Chef Yuki Sato'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Events', count: events.length },
    { id: 'workshop', name: 'Workshops', count: events.filter(e => e.category === 'workshop').length },
    { id: 'tasting', name: 'Tastings', count: events.filter(e => e.category === 'tasting').length },
    { id: 'cultural', name: 'Cultural', count: events.filter(e => e.category === 'cultural').length },
    { id: 'private', name: 'Private', count: events.filter(e => e.category === 'private').length }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAvailability = (capacity: number, booked: number) => {
    const remaining = capacity - booked;
    if (remaining === 0) return { text: 'Sold Out', color: '#DC2626' };
    if (remaining <= 3) return { text: `${remaining} spots left`, color: '#F59E0B' };
    return { text: 'Available', color: '#10B981' };
  };

  const BookingForm = ({ event }: { event: Event }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      guests: 1,
      specialRequests: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Booking submitted for ${event.title}! We'll contact you soon.`);
      setShowBookingForm(false);
      setSelectedEvent(null);
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        onClick={() => setShowBookingForm(false)}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 style={{ 
            fontFamily: typography.fontFamily.primary,
            fontSize: '28px',
            color: colors.secondary.DEFAULT,
            marginBottom: '16px'
          }}>
            Book Event
          </h3>
          
          <p style={{ 
            fontFamily: typography.fontFamily.secondary,
            fontSize: '16px',
            color: colors.secondary.light,
            marginBottom: '24px'
          }}>
            {event.title} - {formatDate(event.date)} at {event.time}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px', fontWeight: '500' }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full mt-1 p-3 border rounded-lg"
                style={{ borderColor: colors.secondary.light }}
              />
            </div>

            <div>
              <label style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px', fontWeight: '500' }}>
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full mt-1 p-3 border rounded-lg"
                style={{ borderColor: colors.secondary.light }}
              />
            </div>

            <div>
              <label style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px', fontWeight: '500' }}>
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full mt-1 p-3 border rounded-lg"
                style={{ borderColor: colors.secondary.light }}
              />
            </div>

            <div>
              <label style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px', fontWeight: '500' }}>
                Number of Guests
              </label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                className="w-full mt-1 p-3 border rounded-lg"
                style={{ borderColor: colors.secondary.light }}
              >
                {Array.from({ length: Math.min(4, event.capacity - event.booked) }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px', fontWeight: '500' }}>
                Special Requests
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                className="w-full mt-1 p-3 border rounded-lg h-20"
                style={{ borderColor: colors.secondary.light }}
                placeholder="Dietary restrictions, allergies, etc."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setShowBookingForm(false)}
                className="flex-1 py-3 border rounded-lg"
                style={{ 
                  borderColor: colors.secondary.light,
                  color: colors.secondary.DEFAULT,
                  fontFamily: typography.fontFamily.secondary
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-lg text-white"
                style={{ 
                  backgroundColor: colors.primary.DEFAULT,
                  fontFamily: typography.fontFamily.secondary,
                  fontWeight: '500'
                }}
              >
                Book Now (${event.price * formData.guests})
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
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
              Events
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
              Join us for exclusive culinary experiences, workshops, and cultural events
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name} ({category.count})
              </motion.button>
            ))}
          </motion.div>

          {/* Events Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredEvents.map((event, index) => {
                const availability = getAvailability(event.capacity, event.booked);
                
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    style={{ transform: 'translate3d(0, 0, 0)' }}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 right-4">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: availability.color }}
                        >
                          {availability.text}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: colors.primary.DEFAULT,
                            color: colors.white
                          }}
                        >
                          {event.category.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 style={{
                          fontFamily: typography.fontFamily.primary,
                          fontSize: '22px',
                          fontWeight: '400',
                          color: colors.secondary.DEFAULT,
                        }}>
                          {event.title}
                        </h3>
                        <span style={{
                          fontFamily: typography.fontFamily.secondary,
                          fontSize: '20px',
                          fontWeight: '600',
                          color: colors.primary.DEFAULT,
                        }}>
                          ${event.price}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <p style={{ 
                          fontFamily: typography.fontFamily.secondary,
                          fontSize: '14px',
                          color: colors.secondary.light 
                        }}>
                          📅 {formatDate(event.date)}
                        </p>
                        <p style={{ 
                          fontFamily: typography.fontFamily.secondary,
                          fontSize: '14px',
                          color: colors.secondary.light 
                        }}>
                          🕐 {event.time} ({event.duration})
                        </p>
                        <p style={{ 
                          fontFamily: typography.fontFamily.secondary,
                          fontSize: '14px',
                          color: colors.secondary.light 
                        }}>
                          👨‍🍳 {event.chef}
                        </p>
                      </div>

                      <p style={{
                        fontFamily: typography.fontFamily.secondary,
                        fontSize: '14px',
                        color: colors.secondary.light,
                        lineHeight: '1.5',
                        marginBottom: '16px'
                      }}>
                        {event.description}
                      </p>

                      <div className="flex gap-3">
                        <motion.button
                          onClick={() => setSelectedEvent(event)}
                          className="flex-1 py-2 border rounded-lg"
                          style={{
                            borderColor: colors.secondary.light,
                            color: colors.secondary.DEFAULT,
                            fontFamily: typography.fontFamily.secondary,
                            fontSize: '14px'
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Details
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            setSelectedEvent(event);
                            setShowBookingForm(true);
                          }}
                          disabled={event.capacity - event.booked === 0}
                          className="flex-1 py-2 rounded-lg text-white"
                          style={{
                            backgroundColor: event.capacity - event.booked === 0 
                              ? colors.secondary.light 
                              : colors.primary.DEFAULT,
                            fontFamily: typography.fontFamily.secondary,
                            fontSize: '14px',
                            fontWeight: '500'
                          }}
                          whileHover={event.capacity - event.booked > 0 ? { scale: 1.02 } : {}}
                          whileTap={event.capacity - event.booked > 0 ? { scale: 0.98 } : {}}
                        >
                          {event.capacity - event.booked === 0 ? 'Sold Out' : 'Book Now'}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </motion.section>

        {/* Event Details Modal */}
        <AnimatePresence>
          {selectedEvent && !showBookingForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 w-10 h-10 text-white rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                  >
                    ✕
                  </button>
                </div>

                <div className="p-8">
                  <h3 style={{
                    fontFamily: typography.fontFamily.primary,
                    fontSize: '32px',
                    fontWeight: '400',
                    color: colors.secondary.DEFAULT,
                    marginBottom: '16px'
                  }}>
                    {selectedEvent.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px', fontWeight: '500' }}>
                        Date & Time
                      </p>
                      <p style={{ fontFamily: typography.fontFamily.secondary, fontSize: '16px', color: colors.secondary.light }}>
                        {formatDate(selectedEvent.date)}<br />
                        {selectedEvent.time} ({selectedEvent.duration})
                      </p>
                    </div>
                    <div>
                      <p style={{ fontFamily: typography.fontFamily.secondary, fontSize: '14px', fontWeight: '500' }}>
                        Availability
                      </p>
                      <p style={{ fontFamily: typography.fontFamily.secondary, fontSize: '16px', color: colors.secondary.light }}>
                        {selectedEvent.capacity - selectedEvent.booked} of {selectedEvent.capacity} spots
                      </p>
                    </div>
                  </div>

                  <p style={{
                    fontFamily: typography.fontFamily.secondary,
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: colors.secondary.light,
                    marginBottom: '24px'
                  }}>
                    {selectedEvent.description}
                  </p>

                  <div className="mb-6">
                    <h4 style={{ 
                      fontFamily: typography.fontFamily.primary,
                      fontSize: '20px',
                      color: colors.secondary.DEFAULT,
                      marginBottom: '12px'
                    }}>
                      What's Included
                    </h4>
                    <ul className="space-y-2">
                      {selectedEvent.includes.map((item, index) => (
                        <li key={index} style={{
                          fontFamily: typography.fontFamily.secondary,
                          fontSize: '14px',
                          color: colors.secondary.light
                        }}>
                          ✓ {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="flex-1 py-3 border rounded-lg"
                      style={{
                        borderColor: colors.secondary.light,
                        color: colors.secondary.DEFAULT,
                        fontFamily: typography.fontFamily.secondary
                      }}
                    >
                      Close
                    </button>
                    <button
                      onClick={() => setShowBookingForm(true)}
                      disabled={selectedEvent.capacity - selectedEvent.booked === 0}
                      className="flex-1 py-3 rounded-lg text-white"
                      style={{
                        backgroundColor: selectedEvent.capacity - selectedEvent.booked === 0 
                          ? colors.secondary.light 
                          : colors.primary.DEFAULT,
                        fontFamily: typography.fontFamily.secondary,
                        fontWeight: '500'
                      }}
                    >
                      {selectedEvent.capacity - selectedEvent.booked === 0 ? 'Sold Out' : `Book for $${selectedEvent.price}`}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Booking Form Modal */}
        <AnimatePresence>
          {showBookingForm && selectedEvent && (
            <BookingForm event={selectedEvent} />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default EventsPage;