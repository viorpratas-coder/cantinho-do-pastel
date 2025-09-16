import { supabase } from '@/lib/supabaseClient';
import { FidelityCode, CustomerFidelityData } from '@/lib/types';

export class FidelityService {
  // Customer operations
  static async authenticateCustomer(name: string, phone: string): Promise<CustomerFidelityData | null> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('customer_phone', phone)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Cliente não encontrado
          return null;
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error authenticating customer:', error);
      throw error;
    }
  }

  static async registerCustomer(name: string, phone: string): Promise<CustomerFidelityData> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .insert([
          {
            customer_name: name,
            customer_phone: phone,
            stamps: 0,
            level: 1,
            points: 0,
            total_spent: 0,
            rewards_claimed: 0,
            registration_date: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error registering customer:', error);
      throw error;
    }
  }

  static async getCustomerStamps(name: string, phone: string): Promise<FidelityCode[]> {
    try {
      const { data, error } = await supabase
        .from('fidelity_codes')
        .select('*')
        .eq('customer_name', name)
        .eq('customer_phone', phone)
        .eq('used', true)
        .order('used_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting customer stamps:', error);
      throw error;
    }
  }

  static async getStampCount(name: string, phone: string): Promise<number> {
    try {
      const stamps = await this.getCustomerStamps(name, phone);
      return stamps.length;
    } catch (error) {
      console.error('Error getting stamp count:', error);
      throw error;
    }
  }

  static async canClaimReward(name: string, phone: string): Promise<boolean> {
    try {
      const count = await this.getStampCount(name, phone);
      return count >= 5;
    } catch (error) {
      console.error('Error checking reward eligibility:', error);
      throw error;
    }
  }

  static async addPoints(phone: string, points: number): Promise<CustomerFidelityData> {
    try {
      // Buscar cliente existente
      const { data: customer, error: fetchError } = await supabase
        .from('customers')
        .select('*')
        .eq('customer_phone', phone)
        .single();

      if (fetchError) throw fetchError;
      if (!customer) throw new Error('Cliente não encontrado');

      // Calcular novos pontos e nível
      const newPoints = customer.points + points;
      const newLevel = this.getCustomerLevel(newPoints);

      // Atualizar cliente
      const { data, error } = await supabase
        .from('customers')
        .update({
          points: newPoints,
          level: newLevel,
          stamps: customer.stamps + 1,
          last_activity_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', customer.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding points:', error);
      throw error;
    }
  }

  static async addPointsFromPurchase(phone: string, amount: number): Promise<CustomerFidelityData> {
    try {
      const pointsToAdd = Math.floor(amount / 10);
      if (pointsToAdd <= 0) {
        throw new Error('Valor insuficiente para adicionar pontos');
      }
      return await this.addPoints(phone, pointsToAdd);
    } catch (error) {
      console.error('Error adding points from purchase:', error);
      throw error;
    }
  }

  static async claimReward(phone: string): Promise<CustomerFidelityData | null> {
    try {
      // Buscar cliente existente
      const { data: customer, error: fetchError } = await supabase
        .from('customers')
        .select('*')
        .eq('customer_phone', phone)
        .single();

      if (fetchError) throw fetchError;
      if (!customer) throw new Error('Cliente não encontrado');

      // Verificar se tem pontos suficientes
      if (customer.points < 100) {
        return null;
      }

      // Atualizar cliente
      const { data, error } = await supabase
        .from('customers')
        .update({
          points: customer.points - 100,
          rewards_claimed: customer.rewards_claimed + 1,
          last_reward_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', customer.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error claiming reward:', error);
      throw error;
    }
  }

  static getCustomerLevel(points: number): number {
    if (points >= 1000) return 5; // Diamante
    if (points >= 500) return 4;   // Ouro
    if (points >= 250) return 3;   // Prata
    if (points >= 100) return 2;   // Bronze
    return 1;                      // Iniciante
  }

  static async setCustomerProfileImage(phone: string, imageData: string): Promise<CustomerFidelityData> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .update({
          profile_image: imageData,
          updated_at: new Date().toISOString()
        })
        .eq('customer_phone', phone)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error setting customer profile image:', error);
      throw error;
    }
  }

  static async getCustomerProfileImage(phone: string): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('profile_image')
        .eq('customer_phone', phone)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Cliente não encontrado
          return null;
        }
        throw error;
      }
      
      return data?.profile_image || null;
    } catch (error) {
      console.error('Error getting customer profile image:', error);
      throw error;
    }
  }

  // Admin operations
  static async generateCode(customerName: string, customerPhone: string): Promise<string> {
    try {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = 'FID-';
      for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      const { error } = await supabase
        .from('fidelity_codes')
        .insert([
          {
            code,
            customer_name: customerName,
            customer_phone: customerPhone,
            used: false,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      return code;
    } catch (error) {
      console.error('Error generating code:', error);
      throw error;
    }
  }

  static async getAllCodes(): Promise<FidelityCode[]> {
    try {
      const { data, error } = await supabase
        .from('fidelity_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting all codes:', error);
      throw error;
    }
  }

  static async markCodeAsUsed(code: string, customerName: string, customerPhone: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('fidelity_codes')
        .update({ 
          used: true, 
          used_date: new Date().toISOString() 
        })
        .eq('code', code)
        .eq('customer_name', customerName)
        .eq('customer_phone', customerPhone)
        .eq('used', false)
        .select();

      if (error) throw error;
      
      // Se atualizou com sucesso, atualiza também os pontos do cliente
      if (data && data.length > 0) {
        await this.addPoints(customerPhone, 10);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error marking code as used:', error);
      throw error;
    }
  }

  static async getUsedCodes(): Promise<FidelityCode[]> {
    try {
      const { data, error } = await supabase
        .from('fidelity_codes')
        .select('*')
        .eq('used', true)
        .order('used_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting used codes:', error);
      throw error;
    }
  }

  static async getUnusedCodes(): Promise<FidelityCode[]> {
    try {
      const { data, error } = await supabase
        .from('fidelity_codes')
        .select('*')
        .eq('used', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting unused codes:', error);
      throw error;
    }
  }

  static async getAllCustomers(): Promise<CustomerFidelityData[]> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting all customers:', error);
      throw error;
    }
  }

  static async resetStamps(name: string, phone: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('fidelity_codes')
        .update({ 
          used: false, 
          used_date: null 
        })
        .eq('customer_name', name)
        .eq('customer_phone', phone);

      if (error) throw error;
    } catch (error) {
      console.error('Error resetting stamps:', error);
      throw error;
    }
  }
}