export type BeneficiaryStatus =
  | 'submitted'
  | 'under_review'
  | 'assessment'
  | 'accommodation_matching'
  | 'booking_confirmed'
  | 'active_gap_month'
  | 'completed'
  | 'follow_up'
  | 'closed';

export type PropertyVerificationStatus =
  | 'pending'
  | 'under_inspection'
  | 'approved'
  | 'rejected';

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'active'
  | 'completed'
  | 'cancelled';

export type ServiceProviderCategory =
  | 'counselling'
  | 'therapy'
  | 'restorative_mentorship'
  | 'wellness'
  | 'coaching'
  | 'healthcare';

export type ServiceProviderStatus =
  | 'pending'
  | 'verified'
  | 'on_leave';

export type ServiceRequestStatus =
  | 'pending'
  | 'assigned'
  | 'confirmed'
  | 'completed'
  | 'cancelled';

export type SafetyAlertSeverity =
  | 'low'
  | 'medium'
  | 'high'
  | 'critical';

export type SafetyAlertStatus =
  | 'open'
  | 'acknowledged'
  | 'escalated'
  | 'resolved';

export type ComfortCategory =
  | 'food'
  | 'entertainment'
  | 'personal_care'
  | 'activities'
  | 'transport'
  | 'ergonomics';

export type ComfortStatus =
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'in_delivery'
  | 'fulfilled';

export type ExpenseCategory =
  | 'accommodation'
  | 'clinical_wellbeing'
  | 'comfort_hampers'
  | 'transport'
  | 'incidentals';

export type PropertyIssueType =
  | 'plumbing'
  | 'heating'
  | 'keys_locks'
  | 'wifi_utilities'
  | 'cleanliness'
  | 'other';

export type PropertyIssueStatus =
  | 'open'
  | 'in_progress'
  | 'resolved';

export interface GetToKnowMe {
  favouriteMeals: string;
  snacksAndDrinks: string;
  dietaryRestrictions: string;
  musicPreferences: string;
  booksAndMovies: string;
  hobbies: string;
  personalCareScents: string;
  preferredDailyActivities: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  dateOfBirth: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  status: BeneficiaryStatus;
  circumstances: string; // e.g. Burnout & Caregiver Fatigue, Traumatic Transition
  narrative: string;
  urgencyLevel: 'standard' | 'urgent' | 'critical';
  supportNeeded: string[]; // e.g. ['counselling', 'quiet_rest', 'social_work']
  accommodationPreferences: {
    preferredLocation: string;
    accessibilityNeeds: string;
    petConsiderations: string;
    moveInDate: string;
  };
  stayStartDate?: string;
  stayEndDate?: string;
  assignedPropertyId?: string;
  assignedPropertyName?: string;
  assignedBookingId?: string;
  allocatedBudget: number;
  spentBudget: number;
  getToKnowMe?: GetToKnowMe;
  verificationData?: VerificationData;
  isIdentityVerified?: boolean;
  securityClearanceCode?: string;
  twoFactorEnabled?: boolean;
  popiaConsentDate?: string;
  keypadUnlocked?: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  date: string;
  rating: number;
  content: string;
  location?: string;
}

export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  province: string; // South African Province (e.g. Western Cape, KwaZulu-Natal, Mpumalanga, etc.)
  propertyType: 'cottage' | 'studio' | 'apartment' | 'retreat_villa' | 'guest_suite';
  bedrooms: number;
  bathrooms: number;
  verificationStatus: PropertyVerificationStatus;
  availabilityStart: string;
  availabilityEnd: string;
  amenities: string[];
  safetyFeatures: string[];
  houseRules: string[];
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  photos: string[];
  description: string;
  currentBeneficiaryId?: string;
  inspectionNotes?: string;
  createdAt: string;

  // Airbnb Features & Pricing (in ZAR)
  nightlyPrice?: number;
  monthlyRate?: number;
  cleaningFee?: number;
  serviceFee?: number;
  rating?: number;
  reviewCount?: number;
  category?: string; // e.g. 'vineyards' | 'beachfront' | 'mountains' | 'forest' | 'countryside' | 'off_grid'
  maxGuests?: number;
  beds?: number;
  isSuperhost?: boolean;
  isGuestFavorite?: boolean;
  reviews?: Review[];
}

export interface VerificationData {
  idType: 'sa_id' | 'passport';
  idNumber: string;
  idDocumentName?: string;
  idVerified: boolean;
  residentialAddress: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
  proofOfAddressDocName?: string;
  addressVerified: boolean;
  facePhotoData?: string;
  faceLivenessConfirmed: boolean;
  faceMatchScore: number; // e.g. 98.4
  faceVerified: boolean;
  verificationDate?: string;
  certificateRef?: string;
}

export interface Booking {
  id: string;
  beneficiaryId: string;
  beneficiaryName: string;
  beneficiaryEmail?: string;
  beneficiaryPhone?: string;
  propertyId: string;
  propertyTitle: string;
  propertyAddress?: string;
  propertyCity?: string;
  propertyPhoto?: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  notes?: string;
  createdAt: string;

  // Vacation Booking & Payment Details
  totalNights?: number;
  nightlyRate?: number;
  totalAmount?: number;
  grantCoveredAmount?: number;
  cleaningFee?: number;
  serviceFee?: number;
  paidAmount?: number;
  paymentMethod?: 'card' | 'instant_eft' | 'grant_voucher' | 'capitec_pay';
  paymentStatus?: 'paid' | 'grant_sponsored' | 'pending';
  paymentRef?: string;
  guestsCount?: number;
  keycode?: string;
  checkInInstructions?: string;
  retreatType?: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  title: string;
  category: ServiceProviderCategory;
  email: string;
  phone: string;
  verificationStatus: ServiceProviderStatus;
  rating: number;
  completedSessions: number;
  bio: string;
  photoUrl: string;
}

export interface ServiceRequest {
  id: string;
  beneficiaryId: string;
  beneficiaryName: string;
  serviceType: ServiceProviderCategory;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  urgency: 'standard' | 'high' | 'urgent';
  status: ServiceRequestStatus;
  providerId?: string;
  providerName?: string;
  meetingLink?: string;
  createdAt: string;
}

export interface WellbeingCheckin {
  id: string;
  beneficiaryId: string;
  beneficiaryName: string;
  date: string;
  mood: 1 | 2 | 3 | 4 | 5; // 5 = Very Good, 4 = Good, 3 = Okay, 2 = Struggling, 1 = Very Bad / Crisis
  note: string;
  needsSupportCall: boolean;
  safetyEscalated: boolean;
  createdAt: string;
}

export interface ComfortRequest {
  id: string;
  beneficiaryId: string;
  beneficiaryName: string;
  category: ComfortCategory;
  title: string;
  details: string;
  status: ComfortStatus;
  deliveryNote?: string;
  requestedAt: string;
  fulfilledAt?: string;
}

export interface SafetyAlert {
  id: string;
  beneficiaryId: string;
  beneficiaryName: string;
  propertyId?: string;
  propertyTitle?: string;
  severity: SafetyAlertSeverity;
  status: SafetyAlertStatus;
  message: string;
  actionTaken?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface Expense {
  id: string;
  beneficiaryId: string;
  beneficiaryName: string;
  category: ExpenseCategory;
  amount: number;
  description: string;
  receiptRef: string;
  date: string;
  approvedBy: string;
}

export interface Feedback {
  id: string;
  beneficiaryId: string;
  beneficiaryName: string;
  rating: number; // 1-5
  reflection: string;
  overallExperience: string;
  postStayOutcome: string;
  date: string;
}

export interface FollowUp {
  id: string;
  beneficiaryId: string;
  beneficiaryName: string;
  milestone: '30_days' | '60_days' | '90_days' | 'custom';
  scheduledDate: string;
  status: 'scheduled' | 'completed' | 'rescheduled' | 'missed';
  notes: string;
  caseWorker: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: 'beneficiary' | 'admin' | 'provider';
  recipientId: string;
  recipientRole: 'beneficiary' | 'admin' | 'provider';
  content: string;
  timestamp: string;
  read: boolean;
}

export interface PropertyIssue {
  id: string;
  propertyId: string;
  propertyTitle: string;
  beneficiaryId: string;
  beneficiaryName: string;
  issueType: PropertyIssueType;
  description: string;
  urgency: 'low' | 'medium' | 'urgent';
  status: PropertyIssueStatus;
  reportedDate: string;
  resolvedDate?: string;
}

export type UserRole = 'public' | 'beneficiary' | 'admin';
