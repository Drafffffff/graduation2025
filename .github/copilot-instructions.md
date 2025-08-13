# PicCopilot - AI Era Poster Design Tool

PicCopilot is a React Router v7 single-page application built with TypeScript, Vite, TailwindCSS, and GSAP animations. It's an interactive poster design tool showcasing AI concepts including Chain of Thought, Semantic Embedding, Color Algorithms, and Flex Layout systems.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap and Build the Repository
Execute these commands in sequence. **NEVER CANCEL any build or long-running commands**:

1. **Install dependencies**:
   ```bash
   npm install
   ```
   - Takes ~60 seconds. NEVER CANCEL. Set timeout to 120+ seconds.
   - Installs React Router v7, TypeScript, GSAP, Socket.io, TailwindCSS and other dependencies.

2. **Fix type dependencies** (required for development):
   ```bash
   npm install --save-dev @types/chroma-js
   ```
   - Required for `chroma-js` color manipulation library used in `/col` route.
   - Takes ~5 seconds.
   
   Create type declaration file for color-thief-ts:
   ```bash
   cat > color-thief-ts.d.ts << 'EOF'
   declare module 'color-thief-ts' {
     export default class ColorThief {
       getColor(sourceImage: HTMLImageElement | HTMLCanvasElement | string, quality?: number): [number, number, number];
       getPalette(sourceImage: HTMLImageElement | HTMLCanvasElement | string, colorCount?: number, quality?: number): Array<[number, number, number]>;
       getColorAsync(sourceImage: HTMLImageElement | HTMLCanvasElement | string, quality?: number): Promise<[number, number, number]>;
       getPaletteAsync(sourceImage: HTMLImageElement | HTMLCanvasElement | string, colorCount?: number, quality?: number): Promise<Array<[number, number, number]>>;
     }
   }
   EOF
   ```

3. **Type checking**:
   ```bash
   npm run typecheck
   ```
   - Runs `react-router typegen && tsc`.
   - Takes ~5 seconds. Should complete without errors after type fixes.

4. **Build the application**:
   ```bash
   npm run build
   ```
   - Takes ~6 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
   - Creates optimized SPA build in `build/client/` directory.
   - Application is configured for SPA mode (ssr: false) - no server-side rendering.

### Development and Testing

#### Development Server
```bash
npm run dev
```
- Starts Vite development server on `http://localhost:5173/`
- Includes hot module replacement (HMR)
- Takes ~3 seconds to start
- **CRITICAL**: Some GSAP plugins may show warnings about fonts not being loaded - this is normal during development

#### Production Testing
```bash
# Serve the built application
npx serve build/client -p 3000
```
- Serves production build on `http://localhost:3000`
- **Note**: The standard `npm run start` does NOT work because application is in SPA mode

#### Manual Validation Scenarios
**ALWAYS run through these validation steps after making changes:**

1. **Home page functionality**:
   - Navigate to `http://localhost:5173/` (dev) or `http://localhost:3000/` (prod)
   - Verify animated image carousel loads properly
   - Check that animated text renders correctly (Chinese and English)
   - Verify all four main sections are clickable: Chain of Thought, Semantic Embedding, Color Algorithm, Flex Layout

2. **Route navigation testing**:
   - Test `/cot` - Chain of Thought page with timeline and animations
   - Test `/col` - Color Algorithm page with color extraction and palette tools
   - Test `/vec` - Semantic Embedding visualization page
   - Test `/lay` - Flex Layout demonstration page
   - Test `/gen` - Generation tools page
   - Test `/show` - Showcase page
   - Test `/cmf` - Additional feature page

3. **Interactive features**:
   - On `/col` route: Test color picker and palette generation
   - Verify back button functionality (top-left on each page)
   - Check that animations complete without errors

### Key Technical Details

#### Available npm Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - **DOES NOT WORK** (SPA mode, no server build)
- `npm run typecheck` - Run TypeScript checking

#### File Structure
```
app/
├── routes/         # Route components (home.tsx, cot.tsx, col.tsx, etc.)
├── components/     # Shared React components
├── style/          # CSS modules and styles
├── root.tsx        # Root application component
└── routes.ts       # Route configuration

public/             # Static assets organized by route
├── font/          # Custom fonts (NotoSansSC variants)
├── cot/           # Chain of Thought assets
├── col/           # Color algorithm assets
├── vec/           # Vector/embedding assets
└── [other routes] # Assets for other routes
```

#### Important Dependencies
- **React Router v7**: Latest version with new file-based routing
- **GSAP**: Professional animation library with plugins (SplitText, DrawSVG, Flip)
- **TailwindCSS v4**: Utility-first CSS framework
- **Socket.io**: Real-time communication (used in some routes)
- **Chroma.js**: Color manipulation library
- **Swiper**: Touch slider component

## Build and Deployment

### Docker (Currently Issues)
**Warning**: Docker build currently fails due to devDependencies not being available in build stage.
- The Dockerfile needs modification to include devDependencies during build
- Alternative: Use the static build approach with `npx serve build/client`

### Static Deployment
The application builds to a static SPA that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Deploy the contents of `build/client/` directory.

## Development Guidelines

### No Linting/Testing Setup
**Important**: This project currently has NO linting or testing configuration.
- No ESLint, Prettier, or Jest setup
- No automated code formatting
- **Always manually validate changes** through browser testing

### Code Style
- TypeScript with strict mode enabled
- React functional components with hooks
- CSS Modules for component-specific styling
- GSAP for complex animations and interactions

### Common Development Tasks

#### Adding New Routes
1. Create new route file in `app/routes/`
2. Add route configuration to `app/routes.ts`
3. Create corresponding assets directory in `public/`
4. Test navigation from home page

#### Working with GSAP Animations
- GSAP plugins are registered in individual route components
- Use `useGSAP` hook for React integration
- Common plugins: Flip, SplitText, DrawSVGPlugin
- **Note**: SplitText warnings about fonts are normal during development

#### Handling Static Assets
- Assets are organized by route in `public/` directory
- Reference assets with absolute paths from public root
- Large datasets (like `backgroundParams_rows.csv`) are included in public

### Known Issues and Workarounds

1. **Type errors for color-thief-ts**: 
   - Install `@types/chroma-js` as devDependency
   - Create `color-thief-ts.d.ts` type declaration file in project root
   - **Note**: `col.tsx` has type mismatches that need manual fixing for strict type checking

2. **TypeScript strict mode issues**:
   - Some routes (particularly `/col`) have type mismatches between RGB arrays and string expectations
   - These don't affect runtime functionality but cause TypeScript errors
   - Run `npm run typecheck` to identify issues before building

3. **Docker build fails**: Use static serving instead of Docker for now

4. **GSAP font warnings**: Normal during development, resolved in production

5. **npm run start doesn't work**: Use `npx serve build/client` for production testing

### Performance Considerations

- Build output is optimized and tree-shaken
- Large animation libraries are code-split by route
- Static assets are properly cached
- Application loads and renders within 2-3 seconds on modern browsers

## Common Commands Reference

These are the exact commands and outputs from frequently run operations:

### Repository root structure
```bash
ls -la
# Output includes:
.dockerignore    Dockerfile       README.md        app/             
package-lock.json package.json    public/          react-router.config.ts
tsconfig.json    vite.config.ts   .github/
```

### App directory structure  
```bash
ls -la app/
# Output:
app.css          components/      root.tsx         routes/          
routes.ts        style/
```

### Available routes
```bash
ls app/routes/
# Output:
cmf.tsx    col.tsx    cot.tsx    gen.tsx    
home.tsx   lay.tsx    show.tsx   vec.tsx
```

### Public assets by route
```bash
ls public/
# Output:
back.svg            backgroundParams_rows.csv    col/    cot/    
favicon.ico         font/                        gen/    home/   
lay/                show/                        vec/
```

## Troubleshooting

### Build Failures
- Ensure all type dependencies are installed
- Check that GSAP animations don't reference missing elements
- Verify all imported assets exist in public directory

### Runtime Errors
- Check browser console for GSAP target not found warnings
- Verify Socket.io connections if using real-time features
- Test with both development and production builds

### Navigation Issues
- Application uses client-side routing only
- Direct URL access requires proper static server configuration
- Back button uses custom component, not browser back

**Remember**: Always test changes manually in the browser - there are no automated tests to catch regressions.