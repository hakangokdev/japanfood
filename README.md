# 🍱 Miyabi House - Premium Japanese Restaurant Website

<div align="center">

![Miyabi House Logo](https://github.com/user-attachments/assets/ccf364fd-a070-4f22-8db4-4606b549cde7)

**A sophisticated, full-featured Japanese restaurant website built with Next.js 15 and modern web technologies**

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-ff69b4?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

## 🌟 Overview

Miyabi House is a premium Japanese restaurant website that combines traditional Japanese aesthetics with modern web technologies. The project features a complete restaurant management system including online ordering, reservations, event bookings, and customer management.

## ✨ Features

### 🏠 **Core Pages**
- **Homepage** - Hero section with animations, specialties showcase, testimonials
- **Menu** - Interactive food catalog with categories and detailed items
- **About** - Restaurant story, chef information, and company values
- **Gallery** - Photo showcase with category filtering and modal views
- **Contact** - Contact form, location map, and business information

### 🛒 **E-Commerce Features**
- **Shopping Cart** - Add/remove items, quantity management, real-time totals
- **Checkout** - Multi-step process with delivery/pickup options
- **Order Tracking** - Real-time order status with progress visualization
- **Payment Integration** - Multiple payment methods (Credit Card, PayPal, Apple Pay, Google Pay)

### 📅 **Booking & Events**
- **Reservations** - Table booking system with date/time selection
- **Events** - Workshop and tasting event bookings
- **Gift Cards** - Digital gift card purchase and customization
- **Sessions** - Private dining and chef table experiences

### 👤 **User Management**
- **Profile System** - User account management and preferences
- **Order History** - Complete order tracking and reordering
- **Blog** - Japanese culture articles and recipes
- **Newsletter** - Subscription and promotional content

### 🎨 **Design & UX**
- **Responsive Design** - Mobile-first approach for all devices
- **Dark/Light Mode** - Theme switching capability
- **Animations** - Smooth Framer Motion transitions
- **Japanese Typography** - Custom Hiro Misake font integration
- **Color System** - Carefully crafted Japanese-inspired palette

## 🛠 Technology Stack

### **Frontend**
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 3.0
- **Animations**: Framer Motion 11.0
- **Icons**: Custom SVG icon system
- **Fonts**: Custom Japanese typography (Hiro Misake)

### **Development Tools**
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **npm**: Package management
- **Git**: Version control

### **Deployment**
- **Platform**: Vercel (recommended)
- **Environment**: Node.js 18+
- **Build**: Static site generation (SSG)

## 🚀 Installation

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/hakangokdev/japanfood.git
   cd japanfood
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start

# Export static files
npm run export
```

## 📁 Project Structure

```
japanfood/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── about/             # About page
│   │   ├── blog/              # Blog functionality
│   │   ├── cart/              # Shopping cart
│   │   ├── checkout/          # Checkout process
│   │   ├── contact/           # Contact page
│   │   ├── events/            # Event bookings
│   │   ├── gallery/           # Photo gallery
│   │   ├── gift-cards/        # Gift card system
│   │   ├── menu/              # Menu catalog
│   │   ├── order-tracking/    # Order status tracking
│   │   ├── profile/           # User profile
│   │   ├── reservations/      # Table reservations
│   │   ├── sessions/          # Private dining
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable components
│   │   ├── Cart.tsx          # Shopping cart component
│   │   ├── Footer.tsx        # Site footer
│   │   ├── Header.tsx        # Navigation header
│   │   ├── Hero.tsx          # Hero section
│   │   ├── OurSpecialties.tsx # Menu showcase
│   │   └── Testimonials.tsx   # Customer reviews
│   ├── constants/             # Design system
│   │   ├── colors.ts         # Color palette
│   │   ├── typography.ts     # Font definitions
│   │   └── index.ts          # Exports
│   ├── context/              # React Context
│   │   └── CartContext.tsx   # Shopping cart state
│   └── contexts/             # Additional contexts
├── public/                   # Static assets
│   ├── decorative/          # Decorative elements
│   ├── fonts/               # Custom fonts
│   ├── icons/               # SVG icons
│   ├── images/              # Restaurant photos
│   └── testimonials/        # Customer avatars
├── eslint.config.mjs        # ESLint configuration
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies
├── postcss.config.mjs       # PostCSS configuration
├── tailwind.config.js       # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Design System

### **Color Palette**
```typescript
colors: {
  primary: {
    DEFAULT: '#E56E0C',    // Warm Orange
    light: '#F7A072',      // Light Orange
    dark: '#B8530A'        // Dark Orange
  },
  secondary: {
    DEFAULT: '#333F72',    // Deep Blue
    light: '#8C92AC',      // Light Blue-Gray
    dark: '#1A1F3A'        // Dark Navy
  },
  background: '#F3EDE1',   // Warm Cream
  white: '#FFFFFF',        // Pure White
  black: '#000000'         // Pure Black
}
```

### **Typography**
- **Primary Font**: Hiro Misake (Japanese-inspired)
- **Secondary Font**: Satoshi (Modern Sans-serif)
- **Responsive Scaling**: clamp() functions for fluid typography

## 📚 Component Documentation

### **Header Component**
- Responsive navigation with mobile hamburger menu
- Dropdown menu for additional pages
- Shopping cart integration with item count
- Profile access and authentication

### **Cart System**
- Context-based state management
- Persistent cart across page navigation
- Real-time price calculations
- Item quantity management

### **Order Tracking**
- Real-time status updates
- Progress visualization
- Driver information display
- Estimated delivery times

## 🔧 Configuration

### **Environment Variables**
Create a `.env.local` file in the root directory:

```env
# Optional: Add your environment variables here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### **Customization**

#### Colors
Modify colors in `src/constants/colors.ts`:
```typescript
export const colors = {
  primary: {
    DEFAULT: '#your-color',
    // ...
  }
}
```

#### Typography
Update fonts in `src/constants/typography.ts`:
```typescript
export const typography = {
  fontFamily: {
    primary: 'Your-Font',
    // ...
  }
}
```

## 🧪 Testing

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check
```

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+
- **Large Screens**: 1440px+

## ⚡ Performance Optimizations

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Static Generation**: Pre-rendered pages for better SEO
- **Animation Performance**: GPU-accelerated animations
- **Bundle Optimization**: Tree shaking and minification

## 🔒 Security Features

- **Type Safety**: Full TypeScript implementation
- **Input Validation**: Form validation and sanitization
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Built-in Next.js security features

## 🌐 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+

## 📈 SEO Features

- **Meta Tags**: Dynamic meta descriptions and titles
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: Automatic sitemap generation
- **Open Graph**: Social media sharing optimization
- **Page Speed**: Optimized Core Web Vitals

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow TypeScript best practices
- Use conventional commits
- Add proper component documentation
- Ensure responsive design
- Test across multiple browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Hakan Gök**
- GitHub: [@hakangokdev](https://github.com/hakangokdev)
- Website: [hakangok.tech](https://www.hakangok.tech/)
- Email: [gokhakan42@mgmail.com](mailto:gokhakan42@gmail.com)

## 🙏 Acknowledgments

- **Design Inspiration**: Traditional Japanese aesthetics
- **Photography**: Unsplash contributors
- **Icons**: Custom SVG icon system
- **Fonts**: Hiro Misake typography
- **Animation Library**: Framer Motion team

---

<div align="center">

**Built with ❤️ for the Japanese culinary experience**

[⭐ Star this repository](https://github.com/hakangokdev/japanfood) if you found it helpful!

</div>