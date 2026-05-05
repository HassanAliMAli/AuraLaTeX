# Project Instructions

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Hosting**: Cloudflare Pages
- **Backend**: Cloudflare Pages Functions (Edge Runtime)
- **LaTeX Compilation**: External API (YtoTech LaTeX API)

## Code Style
- **Naming**: 
  - PascalCase for React components (e.g., `EditorPage.tsx`)
  - camelCase for functions, variables, and hooks
  - kebab-case for routes/pages (if applicable)
- **Patterns**:
  - Functional components with hooks
  - Modular components in `src/components/`
  - Explicit typing for all function props and state
  - Framer Motion for all page transitions and modal overlays

## Testing
- **Linter**: `npm run lint` (ESLint)
- **Type Check**: `tsc -b` (included in build)
- **Test Runner**: None explicitly configured yet (Add Vitest/Jest if needed)

## Build & Run
- **Dev**: `npm run dev` (Vite)
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Preview**: `npm run preview`

## Project Structure
- `functions/`: Cloudflare Pages Functions (Edge Runtime)
- `src/components/`: UI components and page layouts
- `src/types/`: TypeScript interfaces and types
- `public/`: Static assets (logo, favicons, etc.)

## Conventions
- **Routing**: Handled via `window.location.hash` and state in `App.tsx`
- **LaTeX**: Compilation is proxied through `/api/compile` to avoid CORS and hide external API details
- **PDF**: Handled as Base64 strings internally, converted to Blob URLs for preview
- **Storage**: Local state for editor content; Supabase for persistent projects
- **Project Name**: AuraLaTeX
- **Last Updated**: 2024-05-05
