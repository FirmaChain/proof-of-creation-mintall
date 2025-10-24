# Proof of Creation - Landing Page

A modern, responsive landing page for the Proof of Creation service built with React 19, TypeScript, and Tailwind CSS.

## Features

- 🚀 **React 19** with latest features
- 📝 **TypeScript** for type safety
- 💨 **Tailwind CSS** for utility-first styling
- 🎨 **Framer Motion** for smooth animations
- 📱 **Fully Responsive** design
- ⚡ **Vite** for fast development and building
- 🎯 **Intersection Observer** for scroll-triggered animations

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn or npm

### Installation

1. Install dependencies:

```bash
yarn install
# or
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:

```env
VITE_API_URL=http://localhost:8080
VITE_API_KEY=your-api-key
```

### Development

Run the development server:

```bash
yarn dev
# or
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
yarn build
# or
npm run build
```

Preview the production build:

```bash
yarn preview
# or
npm run preview
```

## Project Structure

```
landing/
├── src/
│   ├── components/       # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Introduction.tsx
│   │   ├── Standards.tsx
│   │   ├── Technology.tsx
│   │   ├── Partnership.tsx
│   │   ├── UseCases.tsx
│   │   ├── Roadmap.tsx
│   │   ├── WhyChoose.tsx
│   │   ├── TechSpecs.tsx
│   │   └── Footer.tsx
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles and Tailwind imports
│   └── vite-env.d.ts    # TypeScript environment declarations
├── public/              # Static assets
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── package.json         # Project dependencies
```

## Component Overview

- **Header**: Navigation bar with mobile menu
- **Hero**: Landing section with CTA buttons
- **Introduction**: Overview of Proof of Creation features
- **Standards**: C2PA compliance and security features
- **Technology**: Blockchain integration details
- **Partnership**: Mintall partnership information
- **UseCases**: Real-world applications
- **Roadmap**: Development timeline
- **WhyChoose**: Web3 governance vision
- **TechSpecs**: API specifications
- **Footer**: Links and contact information

## Customization

### Colors

Edit the color scheme in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Customize primary colors
  }
}
```

### Content

All text content is located directly in the component files for easy modification.

## API Integration

The frontend is designed to work with the Proof of Creation API server. Configure the API endpoint in your `.env` file.

## Deployment

The built application can be deployed to any static hosting service:

- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Firebase Hosting

## License

© 2024 Firmachain. All rights reserved.