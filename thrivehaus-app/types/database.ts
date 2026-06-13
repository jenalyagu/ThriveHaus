export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      families: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          zip_code: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          zip_code?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          zip_code?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      parents: {
        Row: {
          id: string;
          family_id: string;
          user_id: string;
          first_name: string;
          last_name: string;
          email: string;
          role: "primary" | "partner";
          work_schedule: string | null;
          support_needs: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          family_id: string;
          user_id: string;
          first_name: string;
          last_name?: string;
          email?: string;
          role: "primary" | "partner";
          work_schedule?: string | null;
          support_needs?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          family_id?: string;
          user_id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          role?: "primary" | "partner";
          work_schedule?: string | null;
          support_needs?: string[] | null;
          created_at?: string;
        };
      };
      children: {
        Row: {
          id: string;
          family_id: string;
          first_name: string;
          age: number | null;
          birth_month: string | null;
          stage: string | null;
          needs: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          family_id: string;
          first_name: string;
          age?: number | null;
          birth_month?: string | null;
          stage?: string | null;
          needs?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          family_id?: string;
          first_name?: string;
          age?: number | null;
          birth_month?: string | null;
          stage?: string | null;
          needs?: string[] | null;
          created_at?: string;
        };
      };
      blueprints: {
        Row: {
          id: string;
          family_id: string;
          version: number;
          content: Json;
          status: "generating" | "complete" | "error";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          family_id: string;
          version?: number;
          content?: Json;
          status?: "generating" | "complete" | "error";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          family_id?: string;
          version?: number;
          content?: Json;
          status?: "generating" | "complete" | "error";
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
