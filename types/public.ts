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
      family_members: {
        Row: {
          id: number
          name: string | null
          parentId: number | null
          uid: string
        }
        Insert: {
          id?: number
          name?: string | null
          parentId?: number | null
          uid: string
        }
        Update: {
          id?: number
          name?: string | null
          parentId?: number | null
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "family_members_uid_fkey"
            columns: ["uid"]
            referencedRelation: "Users"
            referencedColumns: ["uid"]
          }
        ]
      }
      Users: {
        Row: {
          Name: string
          uid: string
        }
        Insert: {
          Name: string
          uid: string
        }
        Update: {
          Name?: string
          uid?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
