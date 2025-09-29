import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Sparkles, Heart, Download, Mic, Users } from "lucide-react";
import { GENRES, SUBSCRIPTION_PLANS } from "@/constants";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-purple-600" />,
      title: "KI-Generierte Geschichten",
      description: "Einzigartige Geschichten mit OpenAI GPT-4, in denen Ihr Kind der Held ist"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Personalisierte Charaktere",
      description: "Avatars basierend auf Fotos Ihres Kindes mit DALL-E 3"
    },
    {
      icon: <Mic className="h-8 w-8 text-green-600" />,
      title: "Vorlesefunktion",
      description: "KI-Stimmen lesen die Geschichten vor (Premium Feature)"
    },
    {
      icon: <Download className="h-8 w-8 text-orange-600" />,
      title: "PDF Export",
      description: "Speichern und teilen Sie die Geschichten als PDF"
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Altersgerecht",
      description: "Geschichten angepasst an das Alter und die Interessen Ihres Kindes"
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: "Familienfreundlich",
      description: "Sichere, pädagogisch wertvolle Inhalte für die ganze Familie"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-purple-600" />
              <span className="font-bold text-2xl text-gray-900">MyStory</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-800 hover:text-purple-600 transition-colors">
                Features
              </a>
              <a href="#genres" className="text-gray-800 hover:text-purple-600 transition-colors">
                Genres
              </a>
              <a href="#pricing" className="text-gray-800 hover:text-purple-600 transition-colors">
                Preise
              </a>
              <Button variant="outline">Anmelden</Button>
              <Link href="/create-story">
                <Button>Geschichte erstellen</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Personalisierte
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                {" "}Kinderbücher{" "}
              </span>
              mit KI
            </h1>
            <p className="text-xl text-gray-800 mb-8 max-w-3xl mx-auto">
              Erstellen Sie einzigartige Geschichten, in denen Ihr Kind der Held ist. 
              Mit KI-generierter Handlung, personalisierten Charakteren und Vorlesefunktion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create-story">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Erste Geschichte erstellen
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Beispiele ansehen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Warum Eltern MyStory lieben
            </h2>
            <p className="text-xl text-gray-800">
              Innovative Technologie trifft auf pädagogisch wertvolle Inhalte
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Genres Section */}
      <section id="genres" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vielfältige Genres für jedes Kind
            </h2>
            <p className="text-xl text-gray-800">
              Von Abenteuern bis zu Gute-Nacht-Geschichten
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Object.entries(GENRES).slice(0, 10).map(([key, genre]) => (
              <Card key={key} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-4xl mb-2">{genre.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{genre.name}</h3>
                  <p className="text-sm text-gray-800 mb-2">{genre.ageRange}</p>
                  <p className="text-xs text-gray-700">{genre.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Einfache, transparente Preise
            </h2>
            <p className="text-xl text-gray-800">
              Starten Sie kostenlos und erweitern Sie bei Bedarf
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">{SUBSCRIPTION_PLANS.free.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-gray-900">Kostenlos</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {SUBSCRIPTION_PLANS.free.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">
                  Kostenlos starten
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="relative border-purple-200 shadow-lg">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Beliebt
                </span>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">{SUBSCRIPTION_PLANS.premium.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-gray-900">€12,99</span>
                  <span className="text-gray-800">/Monat</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {SUBSCRIPTION_PLANS.premium.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Premium werden
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Bereit für das erste Abenteuer?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Erstellen Sie in wenigen Minuten eine personalisierte Geschichte für Ihr Kind
          </p>
          <Link href="/create-story">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
              Jetzt kostenlos starten
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-8 w-8 text-purple-400" />
                <span className="font-bold text-xl">MyStory</span>
              </div>
              <p className="text-gray-300">
                Personalisierte Kinderbücher mit KI - für unvergessliche Geschichten
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Produkt</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Genres</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preise</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Hilfe</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Rechtliches</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AGB</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 MyStory. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
