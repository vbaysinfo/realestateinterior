export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      listings: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          slug: string
          description: string
          location: string
          latitude: number | null
          longitude: number | null
          price: number
          currency: string
          status: 'sale' | 'rent'
          property_type: string
          area_sqft: number | null
          bedrooms: number | null
          bathrooms: number | null
          featured: boolean
          published: boolean
          meta_title: string | null
          meta_description: string | null
          agent_id: string | null
        }
        Insert: Omit<Database['public']['Tables']['listings']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Record<string, unknown>
      }
      interior_projects: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          slug: string
          description: string
          category: string
          featured: boolean
          published: boolean
          meta_title: string | null
          meta_description: string | null
          designer_id: string | null
        }
        Insert: Omit<Database['public']['Tables']['interior_projects']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['interior_projects']['Insert']>
      }
      media: {
        Row: {
          id: string
          created_at: string
          module: 'real-estate' | 'interior-design'
          type: 'image' | 'video' | 'link'
          url: string
          thumbnail_url: string | null
          alt_text: string | null
          sort_order: number
          listing_id: string | null
          project_id: string | null
          is_cover: boolean
        }
        Insert: Omit<Database['public']['Tables']['media']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['media']['Insert']>
      }
      leads: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string | null
          message: string | null
          type: 'inquiry' | 'callback' | 'general'
          listing_id: string | null
          project_id: string | null
          status: 'new' | 'contacted' | 'closed'
          source: string | null
        }
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
      }
      page_views: {
        Row: {
          id: string
          created_at: string
          page: string
          listing_id: string | null
          project_id: string | null
          referrer: string | null
          user_agent: string | null
        }
        Insert: Omit<Database['public']['Tables']['page_views']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['page_views']['Insert']>
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          email: string
          full_name: string | null
          role: 'admin' | 'agent' | 'designer'
          phone: string | null
          avatar_url: string | null
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}

export type Listing = Database['public']['Tables']['listings']['Row']
export type InteriorProject = Database['public']['Tables']['interior_projects']['Row']
export type Media = Database['public']['Tables']['media']['Row']
export type Lead = Database['public']['Tables']['leads']['Row']
export type PageView = Database['public']['Tables']['page_views']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']

export type ListingWithMedia = Listing & { media: Media[] }
export type ProjectWithMedia = InteriorProject & { media: Media[] }
