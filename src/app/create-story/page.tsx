"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ArrowLeft, Upload, Wand2, Loader2 } from "lucide-react";
import { GENRES, STORY_LENGTHS } from "@/constants";
import Link from "next/link";
import type { Genre } from "@/types";

type StoryLength = keyof typeof STORY_LENGTHS;

interface FormData {
  childName: string;
  childAge: string;
  selectedGenre: Genre | null;
  selectedLength: StoryLength | null;
  customPrompt: string;
  isInteractive: boolean;
  photo: File | null;
}

export default function CreateStoryPage() {
  const [formData, setFormData] = useState<FormData>({
    childName: '',
    childAge: '',
    selectedGenre: null,
    selectedLength: null,
    customPrompt: '',
    isInteractive: false,
    photo: null
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const [generatedStory, setGeneratedStory] = useState<any>(null);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.childName.trim()) {
      newErrors.childName = 'Name des Kindes ist erforderlich';
    }
    
    if (!formData.childAge) {
      newErrors.childAge = 'Alter ist erforderlich';
    }
    
    if (!formData.selectedGenre) {
      newErrors.selectedGenre = 'Bitte wählen Sie ein Genre';
    }
    
    if (!formData.selectedLength) {
      newErrors.selectedLength = 'Bitte wählen Sie eine Geschichtenlänge';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setMessage('');
    
    try {
      const requestData = {
        childName: formData.childName.trim(),
        childAge: parseInt(formData.childAge),
        genre: formData.selectedGenre,
        length: formData.selectedLength,
        customPrompt: formData.customPrompt.trim(),
        isInteractive: formData.isInteractive
      };
      
      console.log('Sending request data:', requestData);
      
      const response = await fetch('/api/stories/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });
      
      const result = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', result);
      
      if (response.ok) {
        setMessage('Geschichte erfolgreich erstellt!');
        console.log('Story created:', result.story);
        setGeneratedStory(result.story);
        // Don't reset form immediately - let user see the story first
      } else {
        console.error('API Error:', result);
        setMessage('Fehler beim Erstellen der Geschichte: ' + (result.error || 'Unbekannter Fehler'));
      }
    } catch (error) {
      setMessage('Netzwerkfehler beim Erstellen der Geschichte. Bitte versuchen Sie es erneut.');
      console.error('Story generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const startNewStory = () => {
    setGeneratedStory(null);
    setMessage('');
    setErrors({});
    setFormData({
      childName: '',
      childAge: '',
      selectedGenre: null,
      selectedLength: null,
      customPrompt: '',
      isInteractive: false,
      photo: null
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-6 w-6 text-gray-600" />
                <BookOpen className="h-8 w-8 text-purple-600" />
                <span className="font-bold text-2xl text-gray-900">MyStory</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Anmelden</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Neue Geschichte erstellen
          </h1>
          <p className="text-xl text-gray-800">
            Lassen Sie uns eine einzigartige Geschichte für Ihr Kind erstellen
          </p>
        </div>

        {/* Show generated story if available */}
        {generatedStory ? (
          <div className="space-y-8">
            {/* Story Display */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                  <span>{generatedStory.title}</span>
                </CardTitle>
                <CardDescription>
                  Geschichte für {generatedStory.childName}, {generatedStory.childAge} Jahre alt
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {generatedStory.content}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={startNewStory}
                size="lg" 
                variant="outline"
                className="px-8"
              >
                Neue Geschichte erstellen
              </Button>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8"
              >
                Als PDF herunterladen
              </Button>
            </div>
            
            {message && (
              <div className="text-center">
                <div className="inline-block bg-green-50 text-green-800 border border-green-200 px-4 py-2 rounded-md">
                  {message}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
          {/* Step 1: Child Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
                <span>Informationen über Ihr Kind</span>
              </CardTitle>
              <CardDescription>
                Erzählen Sie uns etwas über Ihr Kind, damit wir die Geschichte personalisieren können
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name des Kindes *
                  </label>
                  <input
                    type="text"
                    placeholder="z.B. Emma"
                    value={formData.childName}
                    onChange={(e) => setFormData({...formData, childName: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 ${
                      errors.childName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.childName && (
                    <p className="text-red-500 text-xs mt-1">{errors.childName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alter *
                  </label>
                  <select 
                    value={formData.childAge}
                    onChange={(e) => setFormData({...formData, childAge: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 ${
                      errors.childAge ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Alter wählen</option>
                    {Array.from({ length: 8 }, (_, i) => i + 3).map(age => (
                      <option key={age} value={age}>{age} Jahre</option>
                    ))}
                  </select>
                  {errors.childAge && (
                    <p className="text-red-500 text-xs mt-1">{errors.childAge}</p>
                  )}
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto für Avatar (optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-800">
                    Klicken Sie hier oder ziehen Sie ein Foto hinein
                  </p>
                  <p className="text-xs text-gray-700 mt-1">
                    PNG, JPG, WebP bis zu 10MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Genre Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
                <span>Genre wählen</span>
              </CardTitle>
              <CardDescription>
                Welche Art von Geschichte soll es werden?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(GENRES).map(([key, genre]) => (
                  <div
                    key={key}
                    onClick={() => setFormData({...formData, selectedGenre: key as Genre})}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.selectedGenre === key 
                        ? 'border-purple-500 bg-purple-100 ring-2 ring-purple-200' 
                        : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{genre.icon}</div>
                      <h3 className="font-semibold text-sm mb-1">{genre.name}</h3>
                      <p className="text-xs text-gray-700 mb-1">{genre.ageRange}</p>
                      <p className="text-xs text-gray-800">{genre.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              {errors.selectedGenre && (
                <p className="text-red-500 text-xs mt-2">{errors.selectedGenre}</p>
              )}
            </CardContent>
          </Card>

          {/* Step 3: Story Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">3</span>
                <span>Geschichte anpassen</span>
              </CardTitle>
              <CardDescription>
                Wählen Sie die Länge und geben Sie besondere Wünsche an
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Story Length */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Geschichtenlänge
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(STORY_LENGTHS).map(([key, length]) => (
                    <div
                      key={key}
                      onClick={() => setFormData({...formData, selectedLength: key as StoryLength})}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.selectedLength === key 
                          ? 'border-purple-500 bg-purple-100 ring-2 ring-purple-200' 
                          : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                      }`}
                    >
                      <h3 className="font-semibold mb-2">{length.name}</h3>
                      <p className="text-sm text-gray-800 mb-1">{length.description}</p>
                      <p className="text-xs text-gray-700 mb-1">
                        {length.wordCount.min}-{length.wordCount.max} Wörter
                      </p>
                      <p className="text-xs text-gray-700">{length.readingTime}</p>
                    </div>
                  ))}
                </div>
                {errors.selectedLength && (
                  <p className="text-red-500 text-xs mt-2">{errors.selectedLength}</p>
                )}
              </div>

              {/* Custom Prompt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Besondere Wünsche (optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="z.B. 'Die Geschichte soll im Weltraum spielen und ein Raumschiff haben...'"
                  value={formData.customPrompt}
                  onChange={(e) => setFormData({...formData, customPrompt: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
                <p className="text-xs text-gray-700 mt-1">
                  Geben Sie spezifische Details oder Wünsche für die Geschichte an
                </p>
              </div>

              {/* Interactive Story Option */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="interactive"
                  checked={formData.isInteractive}
                  onChange={(e) => setFormData({...formData, isInteractive: e.target.checked})}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="interactive" className="text-sm text-gray-700">
                  Interaktive Geschichte erstellen (Premium)
                </label>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                  Premium
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <div className="text-center pt-8">
            <Button 
              onClick={handleSubmit}
              disabled={isLoading}
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-12 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Erstelle Geschichte...
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5 mr-2" />
                  Geschichte generieren
                </>
              )}
            </Button>
            <p className="text-sm text-gray-700 mt-4">
              {isLoading ? 'Bitte warten...' : 'Die Generierung dauert etwa 2-3 Minuten'}
            </p>
            {message && !generatedStory && (
              <div className={`mt-4 p-4 rounded-md ${
                message.includes('Fehler') || message.includes('Netzwerk') 
                  ? 'bg-red-50 text-red-800 border border-red-200' 
                  : 'bg-green-50 text-green-800 border border-green-200'
              }`}>
                {message}
              </div>
            )}
          </div>
          </div>
        )}
      </div>
    </div>
  );
}
