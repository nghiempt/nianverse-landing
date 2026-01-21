// Chat API Service
const API_BASE_URL = process.env.NEXT_PUBLIC_CHAT_API_URL || "https://your-domain.com/v1/chat";

export interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data?: T;
  error_code?: string;
  details?: string;
}

export interface CreateSessionResponse {
  SessionId: string;
  ExpiresAt: string;
}

export interface SendMessageResponse {
  MessageId: string;
  AiResponse: string;
  ExtractedData?: Record<string, unknown>;
  ValidationResults?: Record<string, unknown>;
  ConversationState?: {
    current_step: string;
    collected_fields: string[];
    next_field_to_collect: string | null;
    progress_percentage: number;
    business_type?: string;
  };
}

export interface ValidateSessionResponse {
  IsComplete: boolean;
  CanCreateStore: boolean;
  CollectedData?: Record<string, unknown>;
  MissingFields?: string[];
  ValidationErrors?: unknown[];
  ProgressPercentage: number;
  NextFieldToCollect: string | null;
}

export interface ChatMessage {
  ID: string;
  SessionId: string;
  Role: "user" | "assistant" | "system";
  Content: string;
  Metadata?: Record<string, unknown>;
  CreatedAt: string;
}

class ChatService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      const data = await response.json();
      return data;
    } catch (error: unknown) {
      console.error("API request failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Network error";
      throw new Error(errorMessage);
    }
  }

  /**
   * Create a new chat session
   */
  async createSession(
    userIdentifier: string,
    businessTypeHint?: string
  ): Promise<ApiResponse<CreateSessionResponse>> {
    return this.request<CreateSessionResponse>("/sessions", {
      method: "POST",
      body: JSON.stringify({
        UserIdentifier: userIdentifier,
        BusinessTypeHint: businessTypeHint,
      }),
    });
  }

  /**
   * Send a message to the AI
   */
  async sendMessage(
    sessionId: string,
    message: string,
    metadata?: Record<string, unknown>
  ): Promise<ApiResponse<SendMessageResponse>> {
    return this.request<SendMessageResponse>("/messages", {
      method: "POST",
      body: JSON.stringify({
        SessionId: sessionId,
        Message: message,
        Metadata: metadata,
      }),
    });
  }

  /**
   * Validate session and check completion status
   */
  async validateSession(
    sessionId: string,
    includeDetails: boolean = false
  ): Promise<ApiResponse<ValidateSessionResponse>> {
    return this.request<ValidateSessionResponse>("/validate", {
      method: "POST",
      body: JSON.stringify({
        SessionId: sessionId,
        IncludeDetails: includeDetails,
      }),
    });
  }

  /**
   * Get chat history for a session
   */
  async getChatHistory(
    sessionId: string
  ): Promise<ApiResponse<ChatMessage[]>> {
    return this.request<ChatMessage[]>(`/sessions/${sessionId}/messages`, {
      method: "GET",
    });
  }

  /**
   * Check if session is still valid
   */
  isSessionValid(): boolean {
    const expiresAt = localStorage.getItem("chatExpiresAt");
    if (!expiresAt) return false;
    return new Date(expiresAt) > new Date();
  }

  /**
   * Get stored session ID
   */
  getStoredSessionId(): string | null {
    return localStorage.getItem("chatSessionId");
  }

  /**
   * Clear session data
   */
  clearSession(): void {
    localStorage.removeItem("chatSessionId");
    localStorage.removeItem("chatExpiresAt");
  }
}

export const chatService = new ChatService();
