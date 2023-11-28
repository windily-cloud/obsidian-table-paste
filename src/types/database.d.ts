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
      article: {
        Row: {
          content: string | null
          created_at: string
          hash: string | null
          title: string | null
          uid: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          hash?: string | null
          title?: string | null
          uid: string
        }
        Update: {
          content?: string | null
          created_at?: string
          hash?: string | null
          title?: string | null
          uid?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          checksum: string
          content: string | null
          description: string | null
          embedding: string | null
          id: number
          title: string | null
          url: string | null
        }
        Insert: {
          checksum: string
          content?: string | null
          description?: string | null
          embedding?: string | null
          id?: number
          title?: string | null
          url?: string | null
        }
        Update: {
          checksum?: string
          content?: string | null
          description?: string | null
          embedding?: string | null
          id?: number
          title?: string | null
          url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      match_documents: {
        Args: {
          query_embedding: string
          match_threshold: number
          match_count: number
        }
        Returns: {
          id: number
          content: string
          similarity: number
        }[]
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
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
