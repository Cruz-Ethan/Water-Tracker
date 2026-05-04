const BASE_URL = "http://127.0.0.1:8000/api";

export const apiFetch = async (endpoint, options = {}) => {
    let accessToken = localStorage.getItem("access");

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    let response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

    // Handle token expiration
    if (response.status === 401 && localStorage.getItem("refresh")) {
        const refreshRes = await fetch(`${BASE_URL}/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: localStorage.getItem("refresh") }),
        });

        if (refreshRes.ok) {
            const data = await refreshRes.json();
            localStorage.setItem("access", data.access);
            headers["Authorization"] = `Bearer ${data.access}`;
            response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
        } else {
            localStorage.clear();
            window.location.href = "/login";
        }
    }

    return response;
};