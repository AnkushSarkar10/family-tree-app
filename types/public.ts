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
          gender: string
          hasSpouse: boolean
          id: number
          isUser: boolean
          name: string | null
          parentId: number | null
          spouseGender: string | null
          spouseName: string | null
          uid: string
        }
        Insert: {
          gender?: string
          hasSpouse?: boolean
          id?: number
          isUser?: boolean
          name?: string | null
          parentId?: number | null
          spouseGender?: string | null
          spouseName?: string | null
          uid: string
        }
        Update: {
          gender?: string
          hasSpouse?: boolean
          id?: number
          isUser?: boolean
          name?: string | null
          parentId?: number | null
          spouseGender?: string | null
          spouseName?: string | null
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
