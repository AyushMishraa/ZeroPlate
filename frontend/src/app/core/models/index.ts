// User Models
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'donor' | 'receiver' | 'admin';
  provider: 'local' | 'google';
  googleId?: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  message: string;
  user: User & { token: string };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'donor' | 'receiver' | 'admin';
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}

// Food Models
export interface FoodItem {
  _id: string;
  title: string;
  type?: string;
  quantity: number;
  status: 'available' | 'claimed' | 'picked_up' | 'expired';
  donor: User | string;
  expirationDate: Date;
  pickupLocation: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFoodData {
  title: string;
  type?: string;
  quantity: number;
  expirationDate: Date;
  pickupLocation: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}

export interface FoodResponse {
  message: string;
  food: FoodItem[] | FoodItem;
  recommendedNGOs?: any[];
}

// Claim Models
export interface Claim {
  _id: string;
  food: FoodItem | string;
  receiver: User | string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface ClaimResponse {
  message: string;
  claim?: Claim;
  claims?: Claim[];
}

// Admin Dashboard Models
export interface DashboardStats {
  totalUsers: number;
  totalFoodItems: number;
  totalClaims: number;
  pendingPickups: number;
  successfulPickups: number;
  expiredFood: number;
  foodByType: { _id: string; count: number }[];
  donationsPerDay: { _id: string; count: number; totalQuantity: number }[];
}

export interface PendingPickup {
  _id: string;
  food: {
    title: string;
    donor: { name: string; email: string };
  };
  receiver: { name: string; email: string };
  status: string;
  createdAt: Date;
}

// Analytics Models
export interface AnalyticsSummary {
  totalDonations: number;
  totalClaims: number;
  totalMealsSaved: number;
  activeDonors: number;
  activeReceivers: number;
}

export interface TopDonor {
  donorId: string;
  donor: { _id: string; name: string; email: string };
  totalQuantity: number;
  donationsCount: number;
}

export interface FraudData {
  duplicateClaimsCount: number;
  duplicateClaims: any[];
  rapidClaimUsersCount: number;
  rapidClaimUsers: any[];
  suspiciousDonorsCount: number;
  suspiciousDonors: any[];
}

// API Response Wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
