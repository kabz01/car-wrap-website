# Car Wrap Company Website

A modern, professional website for a car wrap, PPF (Paint Protection Film), and ceramic coating business. Built with Next.js 14, this system provides a complete solution for showcasing services, managing customer inquiries, and displaying an extensive gallery of wrap colors and vehicle transformations.

![Next.js](https://img.shields.io/badge/Next.js-14.2+-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18+-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css)

## Table of Contents

- [Features](#features)
- [System Overview](#system-overview)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [License](#license)

## Features

### Service Showcase
- **Car Wraps Gallery** - Browse 30+ premium wrap colors with advanced filtering by color, finish type, and category
- **Paint Protection Film (PPF)** - Comprehensive information about paint protection services and benefits
- **Ceramic Coating** - Detailed ceramic coating service offerings with pricing and packages
- **Custom Design Tool** - Interactive car wrap customization interface

### User Experience
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop devices
- **Dark/Light Mode** - Automatic theme switching based on user preferences
- **Smooth Animations** - Fluid transitions powered by Framer Motion
- **Fast Performance** - Server-side rendering with Next.js 14 App Router
- **SEO Optimized** - Built-in SEO features for better search engine visibility

### Forms & Communication
- **Quote Request Forms** - Easy-to-use forms for service inquiries with validation
- **Contact Forms** - Multiple contact methods with offline support
- **Offline-First** - Forms work without internet connection and sync automatically

### Gallery & Portfolio
- **Workshop Gallery** - Real installation photos and before/after transformations
- **Vehicle Categories** - Organized by SUVs, Sedans, Coupes, Hatchbacks, and more
- **High-Quality Images** - Optimized image loading with Next.js Image component

## System Overview

The website is built using modern web technologies to ensure fast performance, excellent user experience, and easy maintenance. The architecture follows Next.js 14 best practices with server-side rendering for optimal SEO.

### Key Components

- **App Router** - Modern Next.js routing with nested layouts
- **Server Components** - Reduced JavaScript bundle size for faster loading
- **Client Components** - Interactive features with React 18
- **API Integration** - Optional Supabase backend for data storage
- **Theme System** - Dark/light mode with persistent user preferences

### Database (Optional)

The system can work standalone or integrate with Supabase for:
- Quote submission storage
- Contact form management
- Analytics and tracking
- User authentication (if needed)

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with server components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework

### UI Components
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Backend (Optional)
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Real-time capabilities
  - Authentication ready

## Installation

### Prerequisites
- Node.js 18.x or higher
- npm or pnpm package manager

### Setup

```bash
# Clone the repository
git clone https://github.com/kabz01/car-wrap-company.git

# Navigate to project directory
cd car-wrap-company

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Build for Production

```bash
npm run build
npm start
```

## Screenshots

### Homepage
![Homepage](https://raw.githubusercontent.com/kabz01/car-wrap-company/main/public/screenshots/homepage.png)

### Car Wraps Gallery
![Car Wraps Gallery](https://raw.githubusercontent.com/kabz01/car-wrap-company/main/public/screenshots/car-wraps-gallery.png)

### Services Page
![Services](https://raw.githubusercontent.com/kabz01/car-wrap-company/main/public/screenshots/services.png)

### Paint Protection Film
![PPF](https://raw.githubusercontent.com/kabz01/car-wrap-company/main/public/screenshots/ppf.png)

### Ceramic Coating
![Ceramic Coating](https://raw.githubusercontent.com/kabz01/car-wrap-company/main/public/screenshots/ceramic-coating.png)

### Contact Page
![Contact](https://raw.githubusercontent.com/kabz01/car-wrap-company/main/public/screenshots/contact.png)

### Dark Mode
![Dark Mode](https://raw.githubusercontent.com/kabz01/car-wrap-company/main/public/screenshots/dark-mode.png)

## Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kabz01/car-wrap-company)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables (if using Supabase)
4. Deploy

### Environment Variables

Create a `.env.local` file for optional Supabase integration:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The website works perfectly without these variables using localStorage fallback.

## License

© 2025 Car Wrap Company. All rights reserved.

---

Built with Next.js 14 and deployed on Vercel.
