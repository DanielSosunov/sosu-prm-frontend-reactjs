// APIManager.js

const APIManager = {
  localMock(endpoint, method) {
    if (endpoint.includes("/analytics/monthly") && method === "GET") {
      return {
        data: {
          monthlyInteraction: {
            totalInteractions: 0,
            initiatedByMe: 0,
            initiatedByContact: 0,
            interactionTypes: {
              phone: 0,
              inPerson: 0,
              messages: 0,
            },
            interactionSentiments: {
              positive: 0,
              neutral: 0,
              negative: 0,
              other: 0,
            },
            interactionPurposes: {
              personal: 0,
              business: 0,
            },
          },
        },
      };
    } else if (
      endpoint.includes("/interaction/paginated") &&
      method === "GET"
    ) {
      return {
        data: {
          interactions: [
            {
              sentiment: "positive",
              initiatedBy: "contact",
              type: { channel: "phone" },
              contactName: "Daniel",
              purpose: "personal",
              timestamp: new Date().getTime(),
              diary: "Test diary",
            },
          ],
        },
      };
    } else if (endpoint.includes("/contact/") && method === "GET") {
      return {
        data: { contact: { name: "Daniel", phone: "7185684384", id: "test" } },
      };
    } else if (endpoint.includes("/contacts") && method === "GET") {
      return {
        data: {
          contacts: [
            {
              name: "Daniel",
              // name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
              phone: "a",
              id: "test",
            },
          ],
        },
      };
    }
    return { data: {} };
  },
  // Base URL for your API
  baseURL: "http://127.0.0.1:5001/prm-sosu-tech/us-central1/process_reminder",
  // baseURL: "https://process-reminder-w3dy3wmx2q-uc.a.run.app",
  env: "local", //Can be local,dev,prod
  // Default headers for all requests
  defaultHeaders: {
    "Content-Type": "application/json",
  },

  // Method to make an API request
  request: async (endpoint, method, body = null, headers = {}) => {
    if (APIManager.env === "local") {
      return APIManager.localMock(endpoint, method);
    }
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
  addInteraction: async (contact, contactId, interaction, diary, authToken) =>
    APIManager.request(
      "/interaction",
      "POST",
      {
        contact,
        contactId,
        interaction,
        diary,
      },
      {
        Authorization: `Bearer ${authToken}`,
      }
    ),
  getMonthlyInteractions: async (contactId, yearMonth = null, authToken) => {
    var url = `/analytics/monthly?yearMonth=${yearMonth}`;
    if (contactId) url += `&contactId=${contactId}`;
    return APIManager.request(url, "GET", null, {
      Authorization: `Bearer ${authToken}`,
    });
  },

  getPaginatedInteractions: async (contactId, startAfter, authToken) => {
    var url = `/interaction/paginated?`;
    if (contactId) url += `contactId=${contactId}`;
    if (startAfter) url += `&startAfter=${startAfter}`;
    return APIManager.request(url, "GET", null, {
      Authorization: `Bearer ${authToken}`,
    });
  },
  getContactById: async (contactId, authToken) => {
    var url = `/contact/` + contactId;
    return APIManager.request(url, "GET", null, {
      Authorization: `Bearer ${authToken}`,
    });
  },
  getContactsByUserId: async (authToken, lastVisible) => {
    var url = `/contacts/`;
    if (lastVisible) url += `?startAfter=${lastVisible}`;
    return APIManager.request(url, "GET", null, {
      Authorization: `Bearer ${authToken}`,
    });
  },
};

export default APIManager;
