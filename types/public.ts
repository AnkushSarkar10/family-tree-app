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
      Family: {
        Row: {
          father_id: string | null
          mother_id: string | null
          uid: string
        }
        Insert: {
          father_id?: string | null
          mother_id?: string | null
          uid: string
        }
        Update: {
          father_id?: string | null
          mother_id?: string | null
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "Family_father_id_fkey"
            columns: ["father_id"]
            referencedRelation: "Users"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "Family_mother_id_fkey"
            columns: ["mother_id"]
            referencedRelation: "Users"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "Family_uid_fkey"
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
        Relationships: [
          {
            foreignKeyName: "Users_uid_fkey"
            columns: ["uid"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
