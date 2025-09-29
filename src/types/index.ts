// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  subscriptionTier: 'free' | 'premium';
  subscriptionStatus: 'active' | 'inactive' | 'canceled';
  storiesCreated: number;
  maxStoriesPerMonth: number;
  createdAt: Date;
  updatedAt: Date;
}

// Child Profile Types
export interface Child {
  id: string;
  name: string;
  age: number;
  avatarUrl?: string;
  parentId: string;
  preferences: {
    favoriteGenres: Genre[];
    favoriteCharacters: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

// Story Types
export interface Story {
  id: string;
  title: string;
  content: StoryPage[];
  genre: Genre;
  childId: string;
  parentId: string;
  coverImageUrl?: string;
  audioUrl?: string;
  status: 'draft' | 'generating' | 'completed' | 'error';
  isInteractive: boolean;
  metadata: StoryMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoryPage {
  id: string;
  pageNumber: number;
  text: string;
  imageUrl?: string;
  audioUrl?: string;
  choices?: StoryChoice[];
}

export interface StoryChoice {
  id: string;
  text: string;
  nextPageId?: string;
  consequences?: string;
}

export interface StoryMetadata {
  wordCount: number;
  estimatedReadTime: number;
  ageAppropriate: boolean;
  themes: string[];
  characters: string[];
  setting: string;
}

// Genre Types
export type Genre = 
  | 'adventure'
  | 'fairy-tale'
  | 'space'
  | 'pirates'
  | 'fantasy'
  | 'mystery'
  | 'science'
  | 'animals'
  | 'friendship'
  | 'bedtime';

// Story Generation Types
export interface StoryGenerationRequest {
  childName: string;
  childAge: number;
  genre: Genre;
  isInteractive: boolean;
  customPrompt?: string;
  avatarImageBase64?: string;
  preferences?: {
    length: 'short' | 'medium' | 'long';
    complexity: 'simple' | 'moderate' | 'advanced';
    themes: string[];
  };
}

export interface StoryGenerationResponse {
  success: boolean;
  storyId?: string;
  error?: string;
  estimatedCompletionTime?: number;
}

// Avatar Generation Types
export interface AvatarGenerationRequest {
  childPhoto: File;
  style: 'cartoon' | 'realistic' | 'anime' | 'watercolor';
}

export interface AvatarGenerationResponse {
  success: boolean;
  avatarUrl?: string;
  error?: string;
}

// Payment Types
export interface Subscription {
  id: string;
  userId: string;
  stripeSubscriptionId: string;
  tier: 'free' | 'premium';
  status: 'active' | 'inactive' | 'canceled' | 'past_due';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

// Print-on-Demand Types
export interface PrintOrder {
  id: string;
  storyId: string;
  userId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';
  shippingAddress: Address;
  trackingNumber?: string;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form Types
export interface CreateStoryFormData {
  childId: string;
  genre: Genre;
  customPrompt?: string;
  isInteractive: boolean;
  length: 'short' | 'medium' | 'long';
  themes: string[];
}

export interface ChildProfileFormData {
  name: string;
  age: number;
  favoriteGenres: Genre[];
  avatar?: File;
}

// UI State Types
export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
}

export interface NotificationState {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

// Audio Types
export interface AudioSettings {
  voice: 'child-friendly' | 'narrator' | 'parent-voice';
  speed: number;
  volume: number;
  autoPlay: boolean;
}

// Export Settings
export interface ExportOptions {
  format: 'pdf' | 'epub' | 'print';
  includeAudio: boolean;
  paperSize?: 'a4' | 'letter' | 'custom';
  quality: 'standard' | 'high' | 'premium';
}