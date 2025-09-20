import { mockApiHandlers, getDynamicHandler } from "./mock-handlers"

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface ApiError {
  message: string
  status: number
  code?: string
}

class ApiClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl
    this.defaultHeaders = {
      "Content-Type": "application/json",
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const method = options.method || "GET"
    const body = options.body ? JSON.parse(options.body as string) : undefined

    console.log("[v0] API Request:", { method, url, body })

    try {
      // Simulate network delay for realistic behavior
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 500))

      const dynamicResponse = getDynamicHandler(url, method, body)
      if (dynamicResponse) {
        console.log("[v0] Dynamic Mock API Response:", { url, data: dynamicResponse.data })
        return dynamicResponse as ApiResponse<T>
      }

      // Check static handlers
      const mockHandler = mockApiHandlers[url as keyof typeof mockApiHandlers]
      if (mockHandler) {
        const mockResponse = mockHandler()
        console.log("[v0] Mock API Response:", { url, data: mockResponse.data })
        return mockResponse as ApiResponse<T>
      }

      // Fallback to actual fetch for real endpoints
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new ApiError({
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
        })
      }

      const data = await response.json()
      console.log("[v0] API Response:", { url, data })

      return {
        data,
        success: true,
      }
    } catch (error) {
      console.error("[v0] API Error:", { url, error })

      if (error instanceof ApiError) {
        throw error
      }

      throw new ApiError({
        message: error instanceof Error ? error.message : "Unknown error occurred",
        status: 500,
      })
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" })
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" })
  }
}

export class ApiError extends Error {
  status: number
  code?: string

  constructor({ message, status, code }: { message: string; status: number; code?: string }) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.code = code
  }
}

export const apiClient = new ApiClient()
