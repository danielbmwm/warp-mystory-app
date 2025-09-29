# MyStory – Personalisierte Kinderbücher mit KI

Eine Next.js Web-App, mit der Eltern personalisierte Kinderbücher für ihre Kinder generieren können. Die Kinder werden zu den Helden der Geschichten, Geschichten können vorgelesen werden, und es besteht die Option, die Bücher digital zu speichern oder per Print-on-Demand drucken zu lassen.

## 📋 Features

### MVP (Version 1.0)
- ✅ **Foto-Upload** → Avatar/Charakter des Kindes wird automatisch erstellt
- ✅ **Story-Generator** → Eltern/Kinder wählen Genre (Abenteuer, Märchen, Weltraum, Piraten)
- ✅ **PDF-Export** → Geschichten als PDF speichern und teilen
- ✅ **Responsive Design** → Optimiert für Desktop und Mobile

### Beta Features (Version 1.1)
- 🔄 **Avatar-Generierung** → KI-basierte Charaktererstellung aus Fotos
- 🔄 **Text-to-Speech** → KI-Stimme oder Aufnahme der Elternstimme
- 🔄 **Genre-Auswahl** → Erweiterte Auswahl an Geschichtenarten

### Geplante Features (Version 2.0)
- 📅 **Interaktive Geschichten** → Kinder können Entscheidungen treffen
- 📅 **Print-on-Demand** → Physische Bücher bestellen
- 📅 **Eltern-Dashboard** → Gespeicherte Stories, Sammlungen, Abo-Verwaltung
- 📅 **Mobile App** → React Native App für iOS und Android

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React Framework mit App Router
- **TypeScript** - Typisierte JavaScript-Entwicklung
- **Tailwind CSS** - Utility-first CSS Framework
- **Radix UI** - Hochwertige UI-Komponenten
- **Lucide React** - Icon-Library

### Backend & APIs
- **Next.js API Routes** - Backend-Funktionalität
- **OpenAI GPT-4** - Story-Generierung
- **DALL·E 3** - Bild- und Avatar-Generierung
- **ElevenLabs** - Text-to-Speech (TTS)

### State Management & Forms
- **Zustand** - State Management
- **React Hook Form** - Formulare
- **Zod** - Schema-Validierung

### Payment & Subscription
- **Stripe** - Zahlungsabwicklung
- **Stripe Subscriptions** - Abo-Management

### File Handling & PDF
- **React Dropzone** - Datei-Upload
- **jsPDF** - PDF-Generierung
- **html2canvas** - HTML zu Canvas Konvertierung

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x oder höher
- npm oder yarn package manager
- Git

### Installation

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd mystory-app
   ```

2. **Dependencies installieren**
   ```bash
   npm install
   ```

3. **Environment Variables einrichten**
   ```bash
   cp .env.example .env.local
   ```
   
   Dann die API-Keys in `.env.local` eintragen:
   - OpenAI API Key
   - ElevenLabs API Key (für TTS)
   - Stripe Keys (für Zahlungen)

4. **Development Server starten**
   ```bash
   npm run dev
   ```

5. **Browser öffnen**
   ```
   http://localhost:3000
   ```

### Environment Variables

Die wichtigsten Umgebungsvariablen sind in `.env.example` dokumentiert:

```env
# OpenAI für Story-Generierung
OPENAI_API_KEY=your_openai_api_key_here

# ElevenLabs für Text-to-Speech
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Stripe für Zahlungen
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

## 📁 Projektstruktur

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── dashboard/         # Dashboard Seiten
│   ├── stories/          # Story-bezogene Seiten
│   └── globals.css       # Globale Styles
├── components/           # React Komponenten
│   ├── ui/              # Basis UI-Komponenten
│   ├── forms/           # Formular-Komponenten
│   ├── story/           # Story-spezifische Komponenten
│   └── layout/          # Layout-Komponenten
├── lib/                 # Utility-Funktionen
├── hooks/               # Custom React Hooks
├── types/               # TypeScript Type-Definitionen
├── store/               # Zustand Store-Definitionen
├── utils/               # Helper-Funktionen
└── constants/           # App-Konstanten
```

## 🎯 Zielgruppe

### Primäre Zielgruppe
- **Eltern** mit Kindern von 3–10 Jahren
- Technik-affine Familien
- Eltern, die Wert auf personalisierte Inhalte legen

### Sekundäre Zielgruppe
- **Großeltern/Verwandte**, die ein besonderes Geschenk suchen
- **Erzieher/Lehrer** für pädagogische Zwecke

## 💰 Monetarisierung

### Freemium Modell
- **Kostenlos**: 1 Geschichte pro Monat
- **Premium** (€12.99/Monat):
  - Unbegrenzte Geschichten
  - Vorlesefunktion (TTS)
  - PDF & E-Book Export
  - Erweiterte Genres

### Upselling
- **Print-on-Demand**: €20-30 pro physisches Buch
- **Premium-Illustrationen**: €5-10 pro Geschichte

## 🔧 Development

### Code Style
- **ESLint** - Linting
- **Prettier** - Code-Formatierung
- **TypeScript** - Typisierung

### Commands
```bash
# Development Server
npm run dev

# Production Build
npm run build

# Production Server starten
npm start

# Linting
npm run lint

# Type-Checking
npm run type-check
```

## 📦 Deployment

### Vercel (Recommended)
1. Repository zu Vercel connecten
2. Environment Variables einstellen
3. Automatische Deployments sind aktiv

## 🗂 API Documentation

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

## 📄 License

Dieses Projekt steht unter der MIT License.

## 📞 Support

- **Email**: support@mystory.app
- **Issues**: GitHub Issues verwenden

## 🎉 Roadmap

### Q1 2024
- [ ] MVP Release mit Basis-Features
- [ ] Benutzer-Testing und Feedback-Integration
- [ ] Performance-Optimierungen

### Q2 2024
- [ ] Avatar-Generierung implementieren
- [ ] Text-to-Speech Integration
- [ ] Mobile App Development starten

### Q3 2024
- [ ] Interaktive Geschichten
- [ ] Print-on-Demand Integration
- [ ] Advanced Analytics Dashboard

### Q4 2024
- [ ] Mobile App Launch
- [ ] Mehrsprachige Unterstützung
- [ ] Enterprise Features

---

**Erstellt mit ❤️ für Familien, die besondere Geschichten lieben.**
