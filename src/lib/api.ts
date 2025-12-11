const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Auth token management
let authToken: string | null = localStorage.getItem('eduvate_auth_token');

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    localStorage.setItem('eduvate_auth_token', token);
  } else {
    localStorage.removeItem('eduvate_auth_token');
  }
};

export const getAuthToken = () => authToken;

// API client
const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
};

// Auth API
export const authAPI = {
  signin: async (email: string, password: string) => {
    const data = await apiClient('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      setAuthToken(data.token);
    }
    return data;
  },

  signup: async (email: string, password: string, name?: string) => {
    const data = await apiClient('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    if (data.token) {
      setAuthToken(data.token);
    }
    return data;
  },

  getProfile: async () => {
    return apiClient('/auth/profile');
  },

  signout: () => {
    setAuthToken(null);
  },
};

// Colleges API
export const collegesAPI = {
  getAll: async (filters?: { type?: string; state?: string; search?: string }) => {
    const params = new URLSearchParams();
    if (filters?.type) params.append('type', filters.type);
    if (filters?.state) params.append('state', filters.state);
    if (filters?.search) params.append('search', filters.search);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiClient(`/colleges${query}`);
  },

  getById: async (id: string) => {
    return apiClient(`/colleges/${id}`);
  },

  predict: async (data: { rank: number; category: string; examType: string }) => {
    return apiClient('/colleges/predict', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Exams API
export const examsAPI = {
  getAll: async (type?: string) => {
    const query = type ? `?type=${type}` : '';
    return apiClient(`/exams${query}`);
  },

  getById: async (id: string) => {
    return apiClient(`/exams/${id}`);
  },
};

// Scholarships API
export const scholarshipsAPI = {
  getAll: async (filters?: { category?: string; examType?: string }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.examType) params.append('examType', filters.examType);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiClient(`/scholarships${query}`);
  },

  getById: async (id: string) => {
    return apiClient(`/scholarships/${id}`);
  },
};

// Hostels API
export const hostelsAPI = {
  getAll: async (filters?: { location?: string; type?: string; gender?: string; maxRent?: number }) => {
    const params = new URLSearchParams();
    if (filters?.location) params.append('location', filters.location);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.gender) params.append('gender', filters.gender);
    if (filters?.maxRent) params.append('maxRent', filters.maxRent.toString());
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiClient(`/hostels${query}`);
  },

  getById: async (id: string) => {
    return apiClient(`/hostels/${id}`);
  },
};

// Placements API
export const placementsAPI = {
  getStats: async () => {
    return apiClient('/placements/stats');
  },

  getCollegePlacements: async (collegeId: string) => {
    return apiClient(`/placements/college/${collegeId}`);
  },
};
