/**
 * API Client for backend communication
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

// Get access token from localStorage
const getAccessToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('auth_token');
    }
    return null;
};

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        const config: RequestInit = {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            credentials: "include", // Include cookies for httpOnly tokens
        };

        // Add Authorization header if token exists
        const token = getAccessToken();
        if (token) {
            config.headers = {
                ...config.headers,
                "Authorization": `Bearer ${token}`,
            };
        }

        const response = await fetch(url, config);

        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;

            try {
                const errorData = await response.json();
                // Backend returns: { success: false, error: "CODE", message: "description" }
                errorMessage =
                    errorData.message || errorData.error || errorMessage;
            } catch (e) {
                // If response is not JSON, use status text
                errorMessage = response.statusText || errorMessage;
            }

            throw new Error(errorMessage);
        }

        const data: ApiResponse<T> = await response.json();

        // Check if response has data field
        if (data.data !== undefined) {
            return data.data;
        }

        // If no data field but success, return the whole response
        return data as unknown as T;
    }

    async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: "GET" });
    }

    async post<T>(
        endpoint: string,
        body?: unknown,
        options?: RequestInit
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: "POST",
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    async put<T>(
        endpoint: string,
        body?: unknown,
        options?: RequestInit
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: "PUT",
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: "DELETE" });
    }
}

export const apiClient = new ApiClient(API_BASE_URL);
