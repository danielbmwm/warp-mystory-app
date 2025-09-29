import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format file size in human readable format
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Convert file to base64
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(',')[1]) // Remove data:image/...;base64, prefix
    }
    reader.onerror = error => reject(error)
  })
}

// Validate image file
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Bitte wählen Sie ein gültiges Bildformat (JPEG, PNG, WebP)'
    }
  }
  
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Die Datei ist zu groß. Maximale Dateigröße ist 10MB'
    }
  }
  
  return { valid: true }
}

// Estimate reading time
export function estimateReadingTime(wordCount: number, ageGroup: 'preschool' | 'early-reader' | 'fluent-reader'): number {
  const wordsPerMinute = {
    'preschool': 50, // Being read to
    'early-reader': 100,
    'fluent-reader': 200
  }
  
  return Math.ceil(wordCount / wordsPerMinute[ageGroup])
}

// Generate story slug
export function generateStorySlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[äöü]/g, (match) => {
      const replacements: { [key: string]: string } = { 'ä': 'ae', 'ö': 'oe', 'ü': 'ue' }
      return replacements[match] || match
    })
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50)
}

// Format date for display
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount / 100) // Assuming amount is in cents
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Check if user is premium
export function isPremiumUser(subscriptionTier: string, subscriptionStatus: string): boolean {
  return subscriptionTier === 'premium' && subscriptionStatus === 'active'
}

// Calculate age group from age
export function getAgeGroup(age: number): 'preschool' | 'early-reader' | 'fluent-reader' {
  if (age <= 4) return 'preschool'
  if (age <= 7) return 'early-reader'
  return 'fluent-reader'
}

// Sanitize HTML content
export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
}

// Convert seconds to MM:SS format
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

// Check if feature is available for user tier
export function hasFeatureAccess(
  feature: 'unlimited-stories' | 'voice-generation' | 'print-books' | 'interactive-stories',
  subscriptionTier: 'free' | 'premium'
): boolean {
  const premiumFeatures = ['unlimited-stories', 'voice-generation', 'print-books']
  return subscriptionTier === 'premium' || !premiumFeatures.includes(feature)
}