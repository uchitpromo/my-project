const API_URL = "http://127.0.0.1:5000/api";

export const apiCall = async (endpoint, method = "GET", body = null, token = null) => {
    const headers = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers,
    };
    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        
        // Check if response is actually JSON before parsing
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || data.message || "Something went wrong");
            }
            return data;
        } else {
            // Handle HTML/Text responses (like 404 or 500 errors)
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`API Endpoint not found (404): ${endpoint}. Ensure the backend server is running and routes are correct.`);
                }
                throw new Error(`Server Error (${response.status}): ${response.statusText}`);
            }
            return null;
        }
    } catch (err) {
        console.error("API Call Error:", err.message);
        throw err;
    }
};
