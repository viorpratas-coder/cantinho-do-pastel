export interface FidelityCode {
  id: string;
  code: string;
  customer_name: string;
  customer_phone: string;
  used: boolean;
  used_date?: string;
  created_at: string;
}

export interface CustomerFidelityData {
  id: string;
  customer_name: string;
  customer_phone: string;
  stamps: number;
  last_reward_date?: string;
  profile_image?: string;
  level: number;
  points: number;
  total_spent: number;
  rewards_claimed: number;
  last_activity_date?: string;
  registration_date: string;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
  last_login?: string;
}