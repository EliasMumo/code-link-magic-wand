export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      favorites: {
        Row: {
          created_at: string | null
          id: string
          property_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          property_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          property_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiries: {
        Row: {
          created_at: string | null
          id: string
          inquiry_type: string | null
          is_read: boolean | null
          message: string
          property_id: string
          receiver_id: string
          sender_id: string
          status: string | null
          subject: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          inquiry_type?: string | null
          is_read?: boolean | null
          message: string
          property_id: string
          receiver_id: string
          sender_id: string
          status?: string | null
          subject: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          inquiry_type?: string | null
          is_read?: boolean | null
          message?: string
          property_id?: string
          receiver_id?: string
          sender_id?: string
          status?: string | null
          subject?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inquiries_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inquiries_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inquiries_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          property_id: string
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          property_id: string
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          property_id?: string
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          related_property_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          related_property_id?: string | null
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          related_property_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_related_property_id_fkey"
            columns: ["related_property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          caretaker_phone: string | null
          created_at: string | null
          display_phone_preference: string | null
          email: string
          first_name: string
          id: string
          is_verified: boolean | null
          last_name: string
          phone: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          caretaker_phone?: string | null
          created_at?: string | null
          display_phone_preference?: string | null
          email: string
          first_name: string
          id: string
          is_verified?: boolean | null
          last_name: string
          phone?: string | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          caretaker_phone?: string | null
          created_at?: string | null
          display_phone_preference?: string | null
          email?: string
          first_name?: string
          id?: string
          is_verified?: boolean | null
          last_name?: string
          phone?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          amenities: string[] | null
          bathrooms: number
          bedrooms: number
          caretaker_phone: string | null
          created_at: string | null
          description: string | null
          id: string
          images: string[] | null
          inquiry_count: number | null
          is_available: boolean | null
          is_furnished: boolean | null
          is_pet_friendly: boolean | null
          landlord_id: string
          latitude: number | null
          location: string
          longitude: number | null
          neighborhood_info: Json | null
          price: number
          property_type: string
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          amenities?: string[] | null
          bathrooms: number
          bedrooms: number
          caretaker_phone?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          inquiry_count?: number | null
          is_available?: boolean | null
          is_furnished?: boolean | null
          is_pet_friendly?: boolean | null
          landlord_id: string
          latitude?: number | null
          location: string
          longitude?: number | null
          neighborhood_info?: Json | null
          price: number
          property_type: string
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          amenities?: string[] | null
          bathrooms?: number
          bedrooms?: number
          caretaker_phone?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          inquiry_count?: number | null
          is_available?: boolean | null
          is_furnished?: boolean | null
          is_pet_friendly?: boolean | null
          landlord_id?: string
          latitude?: number | null
          location?: string
          longitude?: number | null
          neighborhood_info?: Json | null
          price?: number
          property_type?: string
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_landlord_id_fkey"
            columns: ["landlord_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      property_analytics: {
        Row: {
          avg_time_on_market: unknown | null
          conversion_rate: number | null
          created_at: string | null
          favorites_count: number | null
          id: string
          inquiries_count: number | null
          month_year: string
          price_changes_count: number | null
          property_id: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          avg_time_on_market?: unknown | null
          conversion_rate?: number | null
          created_at?: string | null
          favorites_count?: number | null
          id?: string
          inquiries_count?: number | null
          month_year: string
          price_changes_count?: number | null
          property_id: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          avg_time_on_market?: unknown | null
          conversion_rate?: number | null
          created_at?: string | null
          favorites_count?: number | null
          id?: string
          inquiries_count?: number | null
          month_year?: string
          price_changes_count?: number | null
          property_id?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      property_comparisons: {
        Row: {
          created_at: string | null
          id: string
          property_ids: string[]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          property_ids: string[]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          property_ids?: string[]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_comparisons_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      property_views: {
        Row: {
          id: string
          ip_address: unknown | null
          property_id: string
          user_agent: string | null
          user_id: string | null
          viewed_at: string | null
        }
        Insert: {
          id?: string
          ip_address?: unknown | null
          property_id: string
          user_agent?: string | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Update: {
          id?: string
          ip_address?: unknown | null
          property_id?: string
          user_agent?: string | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_views_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rent_calculations: {
        Row: {
          amenities: string[] | null
          bathrooms: number
          bedrooms: number
          calculated_rent: number
          created_at: string | null
          id: string
          location: string
          market_comparison: Json | null
          property_type: string
          user_id: string | null
        }
        Insert: {
          amenities?: string[] | null
          bathrooms: number
          bedrooms: number
          calculated_rent: number
          created_at?: string | null
          id?: string
          location: string
          market_comparison?: Json | null
          property_type: string
          user_id?: string | null
        }
        Update: {
          amenities?: string[] | null
          bathrooms?: number
          bedrooms?: number
          calculated_rent?: number
          created_at?: string | null
          id?: string
          location?: string
          market_comparison?: Json | null
          property_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          property_id: string
          rating: number
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          property_id: string
          rating: number
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          property_id?: string
          rating?: number
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_searches: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          last_notification_sent: string | null
          search_criteria: Json
          search_name: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_notification_sent?: string | null
          search_criteria: Json
          search_name: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_notification_sent?: string | null
          search_criteria?: Json
          search_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_searches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      search_preferences: {
        Row: {
          bathrooms_max: number | null
          bathrooms_min: number | null
          bedrooms_max: number | null
          bedrooms_min: number | null
          created_at: string | null
          id: string
          is_furnished: boolean | null
          is_pet_friendly: boolean | null
          max_price: number | null
          min_price: number | null
          preferred_amenities: string[] | null
          preferred_locations: string[] | null
          property_types: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bathrooms_max?: number | null
          bathrooms_min?: number | null
          bedrooms_max?: number | null
          bedrooms_min?: number | null
          created_at?: string | null
          id?: string
          is_furnished?: boolean | null
          is_pet_friendly?: boolean | null
          max_price?: number | null
          min_price?: number | null
          preferred_amenities?: string[] | null
          preferred_locations?: string[] | null
          property_types?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bathrooms_max?: number | null
          bathrooms_min?: number | null
          bedrooms_max?: number | null
          bedrooms_min?: number | null
          created_at?: string | null
          id?: string
          is_furnished?: boolean | null
          is_pet_friendly?: boolean | null
          max_price?: number | null
          min_price?: number | null
          preferred_amenities?: string[] | null
          preferred_locations?: string[] | null
          property_types?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "search_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_preferences: {
        Row: {
          created_at: string | null
          id: string
          last_search_date: string | null
          preferred_amenities: string[] | null
          preferred_bathrooms: number | null
          preferred_bedrooms: number | null
          preferred_locations: string[] | null
          preferred_price_range_max: number | null
          preferred_price_range_min: number | null
          preferred_property_types: string[] | null
          search_frequency: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_search_date?: string | null
          preferred_amenities?: string[] | null
          preferred_bathrooms?: number | null
          preferred_bedrooms?: number | null
          preferred_locations?: string[] | null
          preferred_price_range_max?: number | null
          preferred_price_range_min?: number | null
          preferred_property_types?: string[] | null
          search_frequency?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_search_date?: string | null
          preferred_amenities?: string[] | null
          preferred_bathrooms?: number | null
          preferred_bedrooms?: number | null
          preferred_locations?: string[] | null
          preferred_price_range_max?: number | null
          preferred_price_range_min?: number | null
          preferred_property_types?: string[] | null
          search_frequency?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_inquiry_count: {
        Args: { property_uuid: string }
        Returns: undefined
      }
      increment_property_views: {
        Args: { property_uuid: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
