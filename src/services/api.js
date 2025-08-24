// src/services/api.js
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    const data = await response.json();
    console.log(`API Call: ${endpoint}`, { request: options, response: data });
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ✅ Auth APIs (यह missing था!)
export const authAPI = {
  login: async (credentials) => {
    try {
      console.log('🔑 Logging in user...', credentials.email);
      const data = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      console.log('📝 Registering user...', userData.email);
      const data = await apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      return data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }
};

// ✅ Student APIs
export const studentAPI = {
  // Get all students
  getAllStudents: async () => {
    try {
      console.log('🌐 Fetching all students...');
      const data = await apiCall('/students');
      return data;
    } catch (error) {
      console.error('Get students error:', error);
      throw error;
    }
  },

  // Add new student
  addStudent: async (studentData) => {
    try {
      console.log('➕ Adding student:', studentData);
      const data = await apiCall('/students', {
        method: 'POST',
        body: JSON.stringify(studentData),
      });
      return data;
    } catch (error) {
      console.error('Add student error:', error);
      throw error;
    }
  },

  // Get student by ID
  getStudentById: async (id) => {
    try {
      const data = await apiCall(`/students/${id}`);
      return data;
    } catch (error) {
      console.error('Get student by ID error:', error);
      throw error;
    }
  },

  // Update student
  updateStudent: async (id, studentData) => {
    try {
      const data = await apiCall(`/students/${id}`, {
        method: 'PUT',
        body: JSON.stringify(studentData),
      });
      return data;
    } catch (error) {
      console.error('Update student error:', error);
      throw error;
    }
  },

  // Delete student
  deleteStudent: async (id) => {
    try {
      const data = await apiCall(`/students/${id}`, {
        method: 'DELETE',
      });
      return data;
    } catch (error) {
      console.error('Delete student error:', error);
      throw error;
    }
  },

  // Add test data
  addTestData: async () => {
    try {
      console.log('🧪 Adding test data...');
      const data = await apiCall('/students/test-data', {
        method: 'POST',
      });
      return data;
    } catch (error) {
      console.error('Add test data error:', error);
      throw error;
    }
  }
};

// ✅ Test API
export const testAPI = async () => {
  try {
    const data = await apiCall('/test');
    return data;
  } catch (error) {
    console.error('Test API error:', error);
    throw error;
  }
};

// ✅ Export default
// export default {
//   authAPI,
//   studentAPI,
//   testAPI
// };


// Fee APIs
export const feeAPI = {
  getAllFees: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) queryParams.append(key, filters[key]);
    });
    
    return await apiCall(`/fees?${queryParams.toString()}`);
  },

  generateMonthlyFees: async (data) => {
    return await apiCall('/fees/generate-monthly', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  markAsPaid: async (feeId, paymentData) => {
    return await apiCall(`/fees/${feeId}/pay`, {
      method: 'PUT',
      body: JSON.stringify(paymentData),
    });
  },

  getStudentFees: async (studentId) => {
    return await apiCall(`/fees/student/${studentId}`);
  },

  deleteFee: async (feeId) => {
    return await apiCall(`/fees/${feeId}`, {
      method: 'DELETE',
    });
  },

  getAnalytics: async (year) => {
    return await apiCall(`/fees/analytics?year=${year}`);
  }
};

// Update default export
export default {
  authAPI,
  studentAPI,
  feeAPI, // Add this
  testAPI
};
