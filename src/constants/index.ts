import type { Genre } from '@/types'

// App Configuration
export const APP_CONFIG = {
  name: 'MyStory',
  description: 'Personalisierte Kinderbücher mit KI',
  version: '1.0.0',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  supportEmail: 'support@mystory.app',
} as const

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Kostenlos',
    price: 0,
    priceId: '',
    features: [
      '1 Geschichte pro Monat',
      'Basis Genres verfügbar',
      'PDF Download',
      'Community Support'
    ],
    limits: {
      storiesPerMonth: 1,
      maxChildrenProfiles: 2,
      audioGeneration: false,
      printOnDemand: false,
      interactiveStories: false
    }
  },
  premium: {
    name: 'Premium',
    price: 1299, // in cents
    priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID || '',
    features: [
      'Unbegrenzte Geschichten',
      'Alle Genres verfügbar',
      'KI-Stimme Vorlesefunktion',
      'Interaktive Geschichten',
      'Print-on-Demand Bücher',
      'Prioritäts-Support',
      'Eltern-Dashboard'
    ],
    limits: {
      storiesPerMonth: -1, // unlimited
      maxChildrenProfiles: 10,
      audioGeneration: true,
      printOnDemand: true,
      interactiveStories: true
    }
  }
} as const

// Story Genres
export const GENRES: Record<Genre, {
  name: string
  description: string
  icon: string
  ageRange: string
  themes: string[]
}> = {
  'adventure': {
    name: 'Abenteuer',
    description: 'Spannende Reisen und aufregende Entdeckungen',
    icon: '🗺️',
    ageRange: '4-10 Jahre',
    themes: ['Mut', 'Freundschaft', 'Entdeckungen']
  },
  'fairy-tale': {
    name: 'Märchen',
    description: 'Klassische Märchen neu erzählt',
    icon: '🏰',
    ageRange: '3-8 Jahre',
    themes: ['Magie', 'Gerechtigkeit', 'Träume']
  },
  'space': {
    name: 'Weltraum',
    description: 'Galaktische Abenteuer zwischen den Sternen',
    icon: '🚀',
    ageRange: '5-10 Jahre',
    themes: ['Technologie', 'Erforschung', 'Wissenschaft']
  },
  'pirates': {
    name: 'Piraten',
    description: 'Abenteuer auf hoher See',
    icon: '🏴‍☠️',
    ageRange: '4-9 Jahre',
    themes: ['Schätze', 'Teamwork', 'Abenteuer']
  },
  'fantasy': {
    name: 'Fantasy',
    description: 'Magische Welten voller Wunder',
    icon: '🧙‍♀️',
    ageRange: '5-10 Jahre',
    themes: ['Magie', 'Fantasiewelten', 'Helden']
  },
  'mystery': {
    name: 'Detektiv',
    description: 'Spannende Rätsel lösen',
    icon: '🔍',
    ageRange: '6-10 Jahre',
    themes: ['Rätsel', 'Logik', 'Problemlösung']
  },
  'science': {
    name: 'Wissenschaft',
    description: 'Lernen durch spannende Experimente',
    icon: '🔬',
    ageRange: '5-10 Jahre',
    themes: ['Experimente', 'Natur', 'Lernen']
  },
  'animals': {
    name: 'Tiere',
    description: 'Geschichten mit tierischen Freunden',
    icon: '🦁',
    ageRange: '3-8 Jahre',
    themes: ['Tierwelt', 'Natur', 'Empathie']
  },
  'friendship': {
    name: 'Freundschaft',
    description: 'Herzerwärmende Geschichten über Freundschaft',
    icon: '🤝',
    ageRange: '3-8 Jahre',
    themes: ['Zusammenhalt', 'Hilfsbereitschaft', 'Vertrauen']
  },
  'bedtime': {
    name: 'Gute Nacht',
    description: 'Ruhige Geschichten für die Nacht',
    icon: '🌙',
    ageRange: '3-6 Jahre',
    themes: ['Entspannung', 'Träume', 'Geborgenheit']
  }
} as const

// Story Length Options
export const STORY_LENGTHS = {
  short: {
    name: 'Kurz',
    description: '5-8 Seiten',
    wordCount: { min: 200, max: 400 },
    readingTime: '3-5 Minuten'
  },
  medium: {
    name: 'Mittel',
    description: '10-15 Seiten',
    wordCount: { min: 500, max: 800 },
    readingTime: '8-12 Minuten'
  },
  long: {
    name: 'Lang',
    description: '18-25 Seiten',
    wordCount: { min: 900, max: 1500 },
    readingTime: '15-20 Minuten'
  }
} as const

// Age Groups
export const AGE_GROUPS = {
  preschool: {
    name: 'Kindergarten',
    range: '3-5 Jahre',
    readingSpeed: 50, // words per minute when read to
    characteristics: ['Einfache Wörter', 'Viele Bilder', 'Kurze Sätze']
  },
  'early-reader': {
    name: 'Erstleser',
    range: '6-7 Jahre',
    readingSpeed: 100,
    characteristics: ['Einfache Sätze', 'Große Schrift', 'Wiederholungen']
  },
  'fluent-reader': {
    name: 'Geübte Leser',
    range: '8-10 Jahre',
    readingSpeed: 200,
    characteristics: ['Komplexere Handlung', 'Mehr Text', 'Charakterentwicklung']
  }
} as const

// Print-on-Demand Settings
export const PRINT_OPTIONS = {
  formats: [
    {
      id: 'hardcover',
      name: 'Hardcover',
      description: 'Premium-Qualität mit festem Einband',
      basePrice: 2499, // in cents
      size: '21x21 cm'
    },
    {
      id: 'softcover',
      name: 'Softcover',
      description: 'Flexibler Einband, kostengünstig',
      basePrice: 1999,
      size: '21x21 cm'
    }
  ],
  paperTypes: [
    {
      id: 'standard',
      name: 'Standard',
      description: 'Gute Qualität für den täglichen Gebrauch',
      priceModifier: 0
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Hochwertige Papierqualität',
      priceModifier: 500
    }
  ]
} as const

// File Upload Limits
export const UPLOAD_LIMITS = {
  image: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    maxWidth: 2048,
    maxHeight: 2048
  },
  audio: {
    maxSize: 50 * 1024 * 1024, // 50MB
    allowedTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
    maxDuration: 300 // 5 minutes in seconds
  }
} as const

// AI Service Configuration
export const AI_CONFIG = {
  openai: {
    model: 'gpt-4o-mini',
    maxTokens: 4000,
    temperature: 0.7
  },
  imageGeneration: {
    model: 'dall-e-3',
    size: '1024x1024',
    quality: 'standard'
  },
  tts: {
    provider: 'elevenlabs',
    voice: 'child-friendly',
    stability: 0.5,
    similarityBoost: 0.8
  }
} as const

// Navigation Routes
export const ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  createStory: '/create-story',
  stories: '/stories',
  story: (id: string) => `/stories/${id}`,
  children: '/children',
  child: (id: string) => `/children/${id}`,
  subscription: '/subscription',
  account: '/account',
  help: '/help',
  privacy: '/privacy',
  terms: '/terms'
} as const

// Error Messages
export const ERROR_MESSAGES = {
  general: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
  network: 'Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.',
  unauthorized: 'Sie sind nicht autorisiert, diese Aktion durchzuführen.',
  forbidden: 'Zugriff verweigert.',
  notFound: 'Die angeforderte Ressource wurde nicht gefunden.',
  validation: 'Bitte überprüfen Sie Ihre Eingaben.',
  fileUpload: 'Fehler beim Hochladen der Datei.',
  subscriptionRequired: 'Diese Funktion erfordert ein Premium-Abonnement.',
  quotaExceeded: 'Sie haben Ihr monatliches Limit erreicht.'
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  storyCreated: 'Ihre Geschichte wird erstellt! Sie erhalten eine Benachrichtigung, wenn sie fertig ist.',
  profileSaved: 'Profil erfolgreich gespeichert.',
  subscriptionUpdated: 'Ihr Abonnement wurde erfolgreich aktualisiert.',
  fileUploaded: 'Datei erfolgreich hochgeladen.',
  emailSent: 'E-Mail erfolgreich gesendet.',
  passwordChanged: 'Passwort erfolgreich geändert.'
} as const