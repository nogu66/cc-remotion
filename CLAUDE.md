# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Remotion video project that programmatically creates videos using React components. Remotion renders React components as video frames at 30 fps.

## Development Commands

- `npm run dev` - Launch Remotion Studio (interactive preview at http://localhost:3000)
- `npx remotion render <composition-id>` - Render a composition to video (e.g., `npx remotion render HelloWorld out/video.mp4`)
- `npm run build` - Bundle the project for deployment
- `npm run lint` - Run ESLint and TypeScript type checking
- `npm run upgrade` - Upgrade Remotion to the latest version

## Architecture

### Entry Point and Composition Registration

- `src/index.ts` - Entry point that registers the root component via `registerRoot()`
- `src/Root.tsx` - Defines all available compositions using `<Composition>` components. Each composition appears in the Remotion Studio sidebar and can be rendered independently.

### Composition Structure

Compositions are defined with:
- `id` - Unique identifier used for rendering (e.g., `npx remotion render HelloWorld`)
- `component` - React component to render
- `durationInFrames` - Length of video (150 frames = 5 seconds at 30fps)
- `fps` - Frame rate (30)
- `width` / `height` - Output dimensions (1920x1080)
- `schema` - Zod schema for props validation and UI controls in Studio
- `defaultProps` - Default values for parametrized rendering

### Animation Patterns

Remotion uses frame-based animations:
- `useCurrentFrame()` - Get current frame number
- `useVideoConfig()` - Get composition config (fps, duration, dimensions)
- `spring()` - Physics-based spring animations
- `interpolate()` - Map frame ranges to value ranges
- `<Sequence from={frame}>` - Time-shift child components to start at specific frames
- `<AbsoluteFill>` - Absolutely positioned div that fills the composition

### Styling

- Tailwind CSS v4 is configured via `@remotion/tailwind-v4`
- Webpack config in `remotion.config.ts` enables Tailwind processing

### Configuration

`remotion.config.ts` sets global Remotion options:
- Video image format (JPEG for better performance)
- Output overwrite behavior
- Webpack configuration (Tailwind integration)

### Props and Parametrization

Use Zod schemas (`@remotion/zod-types`) to:
- Define type-safe props with `zColor()` for color inputs
- Generate Studio UI controls automatically
- Enable parametrized rendering via CLI flags

## Type Checking

TypeScript is configured with strict mode. The `remotion.config.ts` file is excluded from type checking as it uses a different module system.
