export type CarCategory = 'all' | 'luxury' | 'suv' | 'sedan' | 'sport' | 'economy';
export type RentalType = 'all' | 'with-driver' | 'without-driver';
export type TransmissionType = 'automatic' | 'manual';
export type FuelType = 'بنزینی' | 'هیبرید' | 'توربوشارژ';

export interface Car {
  id: string;
  slug: string;
  name: string;
  englishName: string;
  brand: string;
  model: string;
  year: string;
  category: 'luxury' | 'suv' | 'sedan' | 'sport' | 'economy';
  transmission: TransmissionType;
  seats: number;
  fuel: FuelType;
  engine: string;
  dailyRate: number; // in Tomans
  weeklyRate: number; // in Tomans per day
  monthlyRate: number; // in Tomans per day
  deposit: number; // in Tomans
  kmLimitPerDay: number; // km
  extraKmFee: number; // in Tomans per km
  insuranceIncluded: string;
  withDriverAvailable: boolean;
  withoutDriverAvailable: boolean;
  image: string;
  gallery?: string[];
  isFeatured?: boolean;
  isPopular?: boolean;
  inStock: boolean;
  color: string;
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
  tags: string[];
}

export interface BookingRequest {
  id: string;
  carId: string;
  carName: string;
  carImage: string;
  rentalType: 'with-driver' | 'without-driver';
  pickupCity: string;
  returnCity: string;
  pickupDate: string;
  returnDate: string;
  days: number;
  insuranceTier: 'standard' | 'golden-cdw';
  customerName: string;
  customerPhone: string;
  nationalCode?: string;
  notes?: string;
  estimatedPrice: number;
  depositAmount: number;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'contacted';
}

export interface CustomerReview {
  id: string;
  name: string;
  city: string;
  date: string;
  rating: number;
  carName: string;
  comment: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'docs' | 'pricing' | 'driver' | 'rules';
}

export interface BranchLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  workingHours: string;
  isAirportHub?: boolean;
}
