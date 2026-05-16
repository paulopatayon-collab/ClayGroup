# Shader Components Demo

A Next.js project showcasing interactive 3D shader effects built with Three.js and React Three Fiber.

## Features

- ✨ Custom GLSL shaders with animated effects
- 🎨 Multiple shader modes (Mesh Gradient, Dot Orbit, Combined)
- 🎯 Built with shadcn/ui components
- 🎭 Tailwind CSS 4 styling
- 📦 TypeScript support
- 🚀 Next.js 16 App Router

## Project Structure

```
my-shader-app/
├── app/
│   ├── demo/
│   │   └── page.tsx          # Main demo page
│   ├── globals.css            # Global styles with custom theme
│   ├── layout.tsx
│   └── page.tsx               # Home page
├── components/
│   └── ui/
│       ├── background-paper-shaders.tsx  # Core shader components
│       ├── mesh-gradient.tsx             # Mesh gradient wrapper
│       ├── dot-orbit.tsx                 # Dot orbit wrapper
│       └── button.tsx                    # shadcn button
└── lib/
    └── utils.ts               # Utility functions
```

## Components

### MeshGradient (from @paper-design/shaders-react)
Ultra-fast animated mesh gradient shader with zero dependencies. This is the main component that creates the beautiful paper-like animated background.

**Props:**
- `className`: Additional CSS classes
- `colors`: Array of color strings for the gradient
- `speed`: Animation speed multiplier (default: 1.0)
- `backgroundColor`: Canvas background color
- `wireframe`: Enable wireframe mode ("true" or "false")

### DotOrbit (from @paper-design/shaders-react)
Animated orbital dot patterns with customizable colors and motion.

**Props:**
- `className`: Additional CSS classes
- `dotColor`: Color of the dots
- `orbitColor`: Color of the orbit paths
- `speed`: Animation speed multiplier (default: 1.0)
- `intensity`: Effect intensity (default: 1.5)

### ShaderPlane (Custom Component in /components/ui)
A plane geometry with custom vertex and fragment shaders that create animated noise patterns. This is an additional custom component for advanced use cases.

**Props:**
- `position`: [x, y, z] position in 3D space
- `color1`: Primary color (default: "#ff5722")
- `color2`: Secondary color (default: "#ffffff")

### EnergyRing (Custom Component in /components/ui)
Animated rotating rings with pulsing opacity. This is an additional custom component for advanced use cases.

**Props:**
- `radius`: Ring radius (default: 1)
- `position`: [x, y, z] position in 3D space

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, pnpm, or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the home page.

Navigate to [http://localhost:3000/demo](http://localhost:3000/demo) to see the shader demo.

### Build for Production

```bash
npm run build
npm start
```

## Dependencies

### Core
- `next` - React framework
- `react` - UI library
- `react-dom` - React DOM renderer

### 3D Graphics
- `three` - 3D graphics library (used by @paper-design/shaders-react)
- `@react-three/fiber` - React renderer for Three.js (used by @paper-design/shaders-react)
- `@paper-design/shaders-react` - **Zero-dependency canvas shaders from Paper Design**
- `@types/three` - TypeScript types for Three.js

### UI & Styling
- `tailwindcss` - Utility-first CSS framework
- `shadcn/ui` - Re-usable component library
- `class-variance-authority` - CSS class management
- `clsx` - Utility for constructing className strings
- `tailwind-merge` - Merge Tailwind CSS classes

## Customization

### Changing Colors

Edit the color arrays in `app/demo/page.tsx`:

```tsx
<MeshGradient
  colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
  // ... other props
/>
```

### Modifying Shaders

Edit the shader code in `components/ui/background-paper-shaders.tsx`:

```tsx
const vertexShader = `
  // Your custom vertex shader code
`

const fragmentShader = `
  // Your custom fragment shader code
`
```

### Theme Customization

Modify CSS variables in `app/globals.css`:

```css
:root {
  --background: oklch(0 0 0);
  --foreground: oklch(1 0 0);
  /* ... other variables */
}
```

## Why `/components/ui`?

The `/components/ui` folder is the standard convention for shadcn/ui components:
- Separates reusable UI primitives from feature-specific components
- shadcn CLI automatically installs components here
- Maintains consistency across shadcn-based projects
- Makes it easier to update components via CLI

## Troubleshooting

### Canvas not rendering
Make sure you're using the `"use client"` directive at the top of components that use Three.js.

### TypeScript errors
Ensure `@types/three` is installed:
```bash
npm install --save-dev @types/three
```

### Build warnings about lockfiles
This is normal if you have multiple projects in the same directory. You can ignore it or configure `turbopack.root` in `next.config.js`.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## License

MIT
