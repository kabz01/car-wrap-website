# Car Wrap Company Website 🚗

A modern, professional website for a car wrap, PPF (Paint Protection Film), and ceramic coating business. Built with cutting-edge web technologies to deliver a seamless user experience.

![Car Wrap Website](https://via.placeholder.com/1200x600/1a1a1a/ffffff?text=Car+Wrap+Company+Website)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [License](#license)

## ✨ Features

### 🎨 Services Showcase
- **Car Wraps Gallery** - Browse 30+ premium wrap colors with advanced filtering
- **Paint Protection Film (PPF)** - Detailed information about paint protection services
- **Ceramic Coating** - Professional ceramic coating services
- **Custom Design** - Interactive car wrap customization tool

### 🌟 User Experience
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop
- **Dark/Light Mode** - Automatic theme switching based on user preference
- **Smooth Animations** - Powered by Framer Motion for fluid transitions
- **Fast Performance** - Server-side rendering with Next.js 14
- **SEO Optimized** - Built-in SEO features for better search visibility

### 📝 Forms & Contact
- **Quote Request Forms** - Easy-to-use forms for service inquiries
- **Contact Forms** - Multiple ways to get in touch
- **Offline Support** - Forms work even without internet connection

### 🖼️ Gallery
- **Workshop Gallery** - Real installation photos
- **Before/After Showcase** - Visual proof of quality work
- **Vehicle Categories** - SUVs, Sedans, Coupes, and more

## 🛠️ Tech Stack

### Frontend Framework
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### Backend & Database
- **[Supabase](https://supabase.com/)** (Optional) - Backend as a Service
  - Database for storing form submissions
  - Real-time capabilities
  - Authentication ready

### Form Handling
- **[React Hook Form](https://react-hook-form.com/)** - Performant form validation
- **[Zod](https://zod.dev/)** - Schema validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Form resolver integration

### Additional Libraries
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management
- **[class-variance-authority](https://cva.style/docs)** - CSS utility for components
- **[clsx](https://github.com/lukeed/clsx)** & **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Conditional classes

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **pnpm** package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kabz01/car-wrap-company.git
   cd car-wrap-company
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
car-wrap-company/
├── app/                      # Next.js App Router
│   ├── about/               # About page
│   ├── car-wraps/           # Car wraps gallery
│   ├── ceramic-coating/     # Ceramic coating service
│   ├── components/          # Page-specific components
│   │   ├── header.tsx       # Navigation header
│   │   └── footer.tsx       # Site footer
│   ├── contact/             # Contact page
│   ├── customize/           # Car customization tool
│   ├── paint-protection/    # PPF service page
│   ├── services/            # Services overview
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # Reusable components
│   ├── ui/                  # UI component library
│   ├── theme-provider.tsx   # Theme context
│   └── theme-toggle.tsx     # Dark mode toggle
├── hooks/                   # Custom React hooks
├── lib/                     # Utility libraries
│   ├── supabase.ts         # Supabase client
│   └── utils.ts            # Helper functions
├── public/                  # Static assets
│   └── images/             # Image assets
│       ├── services/       # Service photos
│       └── wraps/          # Wrap color samples
└── styles/                  # Additional styles
```

## 🔐 Environment Variables

The application works without environment variables, but for full functionality (database submissions), create a `.env.local` file:

```env
# Supabase Configuration (Optional)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Without Supabase
The website will work perfectly without database integration. Form submissions will be stored locally in the browser's localStorage as a fallback.

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables (if using Supabase)
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kabz01/car-wrap-company)

### Deploy to Netlify

1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables

## 📸 Screenshots

### Homepage
![Homepage](https://via.placeholder.com/1200x600/1a1a1a/ffffff?text=Homepage+Screenshot)

The homepage features a stunning hero section with call-to-action buttons, service highlights, and customer testimonials.

### Car Wraps Gallery
![Car Wraps Gallery](https://via.placeholder.com/1200x600/1a1a1a/ffffff?text=Car+Wraps+Gallery)

Browse through 30+ premium wrap colors with live filtering by color, finish type, and category.

### Services Page
![Services](https://via.placeholder.com/1200x600/1a1a1a/ffffff?text=Services+Page)

Detailed information about all services offered including car wraps, PPF, and ceramic coating.

### Contact Page
![Contact](https://via.placeholder.com/1200x600/1a1a1a/ffffff?text=Contact+Page)

Easy-to-use contact forms with offline support and instant validation.

### Dark Mode
![Dark Mode](https://via.placeholder.com/1200x600/0a0a0a/ffffff?text=Dark+Mode)

Beautiful dark mode implementation that respects user preferences.

## 🎯 Key Features Explained

### Offline-First Architecture
The application includes fallback mechanisms for when users are offline:
- Form submissions are stored locally
- Automatic sync when connection is restored
- No data loss even without internet

### Performance Optimization
- **Image Optimization** - Next.js automatic image optimization
- **Code Splitting** - Automatic route-based code splitting
- **Server Components** - Reduced JavaScript bundle size
- **Lazy Loading** - Images and components load on demand

### SEO Ready
- Semantic HTML structure
- Meta tags and Open Graph support
- Sitemap generation
- Structured data markup

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

© 2025 Car Wrap Company. All rights reserved.

## 📧 Contact

For support or inquiries, please visit the contact page on the website.

---

**Built with ❤️ using Next.js 14**
