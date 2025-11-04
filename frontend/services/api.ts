// frontend/services/api.ts

// Backend URL (Render deployed backend)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Helper function for POST requests
const postRequest = async (endpoint: string, data: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: "include" // ✅ Important if backend uses cookies / JWT cookies
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Request failed');
    }

    return await response.json();
  } catch (error: any) {
    console.error("API Error:", error.message);
    throw error;
  }
};

// ----------- User APIs -----------

// Register User
export const registerUser = (username: string, email: string, password: string) => {
  return postRequest("/api/users/register", { username, email, password });
};

// Login User
export const loginUser = (email: string, password: string) => {
  return postRequest("/api/users/login", { email, password });
};
