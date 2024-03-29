// APIManager.js

const APIManager = {
  // Base URL for your API
  baseURL: "http://127.0.0.1:5001/prm-sosu-tech/us-central1/process_reminder",

  // Default headers for all requests
  defaultHeaders: {
    "Content-Type": "application/json",
  },

  // Method to make an API request
  request: async (endpoint, method, body = null, headers = {}) => {
    const url = `${APIManager.baseURL}${endpoint}`;
    const requestHeaders = { ...APIManager.defaultHeaders, ...headers };

    const options = {
      method,
      headers: requestHeaders,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);

      //   if (!response.ok) {
      //     throw new Error(`HTTP error! status: ${response.status}`);
      //   }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error in ${method} request:`, error);
      throw error;
    }
  },

  // Specific API methods
  login: (loginInfo) => APIManager.request("/auth/login", "POST", loginInfo),
  signup: (loginInfo) => APIManager.request("/auth/signup", "POST", loginInfo),
};

export default APIManager;
