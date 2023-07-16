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
          fid: string | null
          name: string | null
          uid: string
        }
        Insert: {
          fid?: string | null
          name?: string | null
          uid: string
        }
        Update: {
          fid?: string | null
          name?: string | null
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
          children: string[] | null
          father_id: string | null
          mother_id: string | null
          Name: string
          spouse_id: string | null
          uid: string
        }
        Insert: {
          children?: string[] | null
          father_id?: string | null
          mother_id?: string | null
          Name: string
          spouse_id?: string | null
          uid: string
        }
        Update: {
          children?: string[] | null
          father_id?: string | null
          mother_id?: string | null
          Name?: string
          spouse_id?: string | null
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
