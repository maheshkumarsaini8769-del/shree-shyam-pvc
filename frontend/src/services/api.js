const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

const getHeaders = (isJson = true) => {
  const headers = {};
  if (isJson) headers['Content-Type'] = 'application/json';
  const token = localStorage.getItem('sspi_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401 && typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
      localStorage.removeItem('sspi_token');
      localStorage.removeItem('sspi_user');
      window.location.href = '/admin/login?revoked=true';
    }
    const err = new Error(data.message || 'Something went wrong. Please try again.');
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
};

export const api = {
  // Auth
  login: (credentials) => 
    fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials)
    }).then(handleResponse),

  register: (userData) =>
    fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData)
    }).then(handleResponse),

  getMe: () =>
    fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders()
    }).then(handleResponse),

  // Services
  getServices: () =>
    fetch(`${API_BASE}/services`).then(handleResponse),

  getServiceBySlug: (slug) =>
    fetch(`${API_BASE}/services/${slug}`).then(handleResponse),

  adminGetServices: () =>
    fetch(`${API_BASE}/services/admin/all`, { headers: getHeaders() }).then(handleResponse),

  adminCreateService: (data) =>
    fetch(`${API_BASE}/services/admin`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse),

  adminUpdateService: (id, data) =>
    fetch(`${API_BASE}/services/admin/${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse),

  adminDeleteService: (id) =>
    fetch(`${API_BASE}/services/admin/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    }).then(handleResponse),

  // Bookings
  createBooking: (bookingData) =>
    fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(bookingData)
    }).then(handleResponse),

  getBookingTrack: (id) =>
    fetch(`${API_BASE}/bookings/track/${id}`).then(handleResponse),

  getMyBookings: (phone) => {
    const url = phone ? `${API_BASE}/bookings/my?phone=${encodeURIComponent(phone)}` : `${API_BASE}/bookings/my`;
    return fetch(url, { headers: getHeaders() }).then(handleResponse);
  },

  adminGetBookings: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${API_BASE}/bookings/admin/all?${query}`, { headers: getHeaders() }).then(handleResponse);
  },

  adminUpdateBookingStatus: (id, updateData) =>
    fetch(`${API_BASE}/bookings/admin/${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(updateData)
    }).then(handleResponse),

  adminDeleteBooking: (id) =>
    fetch(`${API_BASE}/bookings/admin/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    }).then(handleResponse),

  // Gallery
  getGallery: (category) => {
    const url = category && category !== 'all' ? `${API_BASE}/gallery?category=${encodeURIComponent(category)}` : `${API_BASE}/gallery`;
    return fetch(url).then(handleResponse);
  },

  adminCreateGalleryItem: (data) =>
    fetch(`${API_BASE}/gallery/admin`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse),

  adminUpdateGalleryItem: (id, data) =>
    fetch(`${API_BASE}/gallery/admin/${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse),

  adminDeleteGalleryItem: (id) =>
    fetch(`${API_BASE}/gallery/admin/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    }).then(handleResponse),

  // Enquiries
  submitEnquiry: (data) =>
    fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse),

  adminGetEnquiries: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${API_BASE}/enquiries/admin?${query}`, { headers: getHeaders() }).then(handleResponse);
  },

  adminUpdateEnquiry: (id, data) =>
    fetch(`${API_BASE}/enquiries/admin/${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse),

  adminDeleteEnquiry: (id) =>
    fetch(`${API_BASE}/enquiries/admin/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    }).then(handleResponse),

  // Reviews
  getReviews: () =>
    fetch(`${API_BASE}/reviews`).then(handleResponse),

  submitReview: (data) =>
    fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse),

  adminGetReviews: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${API_BASE}/reviews/admin?${query}`, { headers: getHeaders() }).then(handleResponse);
  },

  adminUpdateReview: (id, data) =>
    fetch(`${API_BASE}/reviews/admin/${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse),

  adminDeleteReview: (id) =>
    fetch(`${API_BASE}/reviews/admin/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    }).then(handleResponse),

  adminReplyReview: (id, replyText) =>
    fetch(`${API_BASE}/reviews/admin/${id}/reply`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ replyText })
    }).then(handleResponse),

  // FAQs
  getFaqs: (category) => {
    const url = category && category !== 'all' ? `${API_BASE}/faqs?category=${encodeURIComponent(category)}` : `${API_BASE}/faqs`;
    return fetch(url).then(handleResponse);
  },

  adminGetFaqs: () =>
    fetch(`${API_BASE}/faqs/admin`, { headers: getHeaders() }).then(handleResponse),

  adminCreateFaq: (data) =>
    fetch(`${API_BASE}/faqs/admin`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse),

  adminUpdateFaq: (id, data) =>
    fetch(`${API_BASE}/faqs/admin/${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse),

  adminDeleteFaq: (id) =>
    fetch(`${API_BASE}/faqs/admin/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    }).then(handleResponse),

  // Settings
  getSettings: () =>
    fetch(`${API_BASE}/settings`).then(handleResponse),

  adminUpdateSettings: (data) =>
    fetch(`${API_BASE}/settings/admin`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse),

  // Dashboard
  adminGetDashboardStats: () =>
    fetch(`${API_BASE}/dashboard/stats`, { headers: getHeaders() }).then(handleResponse),

  adminGetNotifications: () =>
    fetch(`${API_BASE}/dashboard/notifications`, { headers: getHeaders() }).then(handleResponse),

  adminMarkNotificationRead: (id) =>
    fetch(`${API_BASE}/dashboard/notifications/${id}/read`, {
      method: 'PATCH',
      headers: getHeaders()
    }).then(handleResponse),

  // Email Authority Whitelist Management
  adminGetEmailAuthorities: () =>
    fetch(`${API_BASE}/auth/admin/authorities`, { headers: getHeaders() }).then(handleResponse),

  adminAddEmailAuthority: (data) =>
    fetch(`${API_BASE}/auth/admin/authorities`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse),

  adminUpdateEmailAuthority: (id, data) =>
    fetch(`${API_BASE}/auth/admin/authorities/${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse),

  adminDeleteEmailAuthority: (id) =>
    fetch(`${API_BASE}/auth/admin/authorities/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    }).then(handleResponse),

  // Active Device Sessions & Remote Logout
  adminGetSessions: () =>
    fetch(`${API_BASE}/auth/admin/sessions`, { headers: getHeaders() }).then(handleResponse),

  adminRevokeSession: (sessionId) =>
    fetch(`${API_BASE}/auth/admin/sessions/${sessionId}`, {
      method: 'DELETE',
      headers: getHeaders()
    }).then(handleResponse),

  adminRevokeAllOtherSessions: () =>
    fetch(`${API_BASE}/auth/admin/sessions/revoke-others`, {
      method: 'POST',
      headers: getHeaders()
    }).then(handleResponse),

  verifySession: () =>
    fetch(`${API_BASE}/auth/verify-session`, { headers: getHeaders() }).then(handleResponse)
};
