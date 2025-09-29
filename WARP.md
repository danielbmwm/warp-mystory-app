# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

MyStory is a Next.js 15 web application for creating personalized children's books using AI. The app allows parents to generate custom stories where their children become the heroes, with AI-generated avatars, text-to-speech narration, and PDF export capabilities.

## Development Commands

### Core Development
```bash
# Start development server with Turbopack
npm run dev

# Build for production (uses Turbopack)
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Environment Setup
```bash
# Copy environment template (if it exists)
cp .env.example .env.local

# Install dependencies
npm install
```

## Tech Stack & Architecture

### Core Framework
- **Next.js 15** with App Router and Turbopack
- **TypeScript** with strict configuration
- **Tailwind CSS 4** for styling
- **React 19** with modern features

### Key Dependencies
- **OpenAI**: Story generation with GPT-4o-mini and DALL-E 3 for images
- **ElevenLabs**: Text-to-speech functionality  
- **Stripe**: Payment processing and subscription management
- **Zustand**: Lightweight state management
- **React Hook Form + Zod**: Form handling with validation
- **Radix UI**: Accessible UI components
- **jsPDF + html2canvas**: PDF generation
- **React Dropzone**: File upload handling

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes for backend functionality  
│   ├── dashboard/         # User dashboard pages
│   ├── stories/          # Story-related pages
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── ui/              # Base UI components (Radix-based)
│   ├── forms/           # Form components
│   ├── story/           # Story-specific components
│   └── layout/          # Layout components
├── lib/                 # Utility functions and configurations
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── store/               # Zustand store definitions
├── utils/               # Helper functions
└── constants/           # Application constants
```

## Key Architecture Patterns

### State Management
- **Zustand** stores for client state management
- Server state managed through Next.js API routes
- Type-safe stores with TypeScript interfaces

### Type System
The app uses comprehensive TypeScript types defined in `src/types/index.ts`:
- **User & Child profiles**: User management and child profile data
- **Story types**: Multi-page stories with metadata, choices, and audio
- **Genre system**: 10 predefined genres with age-appropriate themes
- **Subscription tiers**: Free (1 story/month) vs Premium (unlimited)
- **API contracts**: Request/response types for all endpoints

### Content Generation Workflow
1. **Story Request**: Child profile + genre + custom prompt
2. **AI Generation**: OpenAI GPT-4o-mini creates story content
3. **Image Generation**: DALL-E 3 generates illustrations per page
4. **Audio Generation**: ElevenLabs creates narration (premium feature)
5. **PDF Export**: html2canvas + jsPDF for downloadable books

### Subscription & Payment Model
- **Freemium**: 1 story/month, basic genres, PDF export
- **Premium** (€12.99/month): Unlimited stories, TTS, all genres, print-on-demand
- Stripe integration for subscription management

## Business Logic Constants

### Genre System
10 predefined genres in `src/constants/index.ts`:
- Adventure, Fairy-tale, Space, Pirates, Fantasy
- Mystery, Science, Animals, Friendship, Bedtime
- Each with age ranges, themes, and appropriate complexity

### Story Length Options
- **Short**: 5-8 pages, 200-400 words, 3-5 min read
- **Medium**: 10-15 pages, 500-800 words, 8-12 min read  
- **Long**: 18-25 pages, 900-1500 words, 15-20 min read

### Age Groups & Reading Levels
- **Preschool** (3-5): Simple words, many images, short sentences
- **Early Reader** (6-7): Simple sentences, large font, repetition
- **Fluent Reader** (8-10): Complex plots, more text, character development

## API Architecture

### Story Generation API
```typescript
POST /api/stories/generate
{
  "childName": "Max",
  "childAge": 6, 
  "genre": "adventure",
  "isInteractive": false,
  "customPrompt": "Ein Abenteuer im Weltraum"
}
```

### Avatar Generation API  
```typescript
POST /api/avatar/generate
{
  "childPhoto": File,
  "style": "cartoon"
}
```

## Environment Variables Required

Based on the tech stack, these environment variables are needed:

```env
# OpenAI for story generation and DALL-E images
OPENAI_API_KEY=your_openai_api_key_here

# ElevenLabs for text-to-speech (premium feature)
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Stripe for payments and subscriptions
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID=price_your_premium_price_id

# App configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Development Workflow

### File Upload Validation
- Images: Max 10MB, JPEG/PNG/WebP, max 2048x2048px
- Audio: Max 50MB, MP3/WAV/OGG, max 5min duration
- Validation utilities in `src/lib/utils.ts`

### Utility Functions
Key helpers in `src/lib/utils.ts`:
- `formatFileSize()`: Human-readable file sizes
- `validateImageFile()`: Image upload validation
- `estimateReadingTime()`: Calculate reading duration by age
- `isPremiumUser()`: Feature access control
- `hasFeatureAccess()`: Subscription tier validation

### German Localization
- Interface is German-language focused
- Date/currency formatting for German locale
- German URL slugs with umlaut handling
- Error/success messages in German

## Testing & Development Notes

### Current Status
The app appears to be in early development - the main page still shows Next.js default content, indicating the story generation features are not yet fully implemented.

### Performance Considerations
- Uses Turbopack for fast development builds
- Image optimization through Next.js Image component
- Lazy loading for story content and images

### Security Notes
- API routes handle sensitive operations (AI generation, payments)
- File upload validation prevents malicious files
- Subscription verification before premium feature access
