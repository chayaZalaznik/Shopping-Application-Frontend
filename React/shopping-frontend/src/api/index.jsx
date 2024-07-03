import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const signUp = userData => api.post('/users/signup', userData);

export const login = async loginData => {
  try {
    const response = await api.post('/users/login', loginData);
    const { token, userId } = response.data;

    if (token) {
      localStorage.setItem('token', token);
    }
    if (userId) {
      localStorage.setItem('userId', userId);
    } else {
      console.error('User ID not found in response');
    }
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const fetchItems = async () => {
  try {
    const response = await api.get('/items');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchFavorites = async userId => {
  try {
    
    const response = await api.get(`/favorites/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addItemToOrder = async (orderId, item, userId) => {
  try {
    const response = await api.post(`/orders/${orderId}/user/${userId}/addItem`, item);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const removeItemFromOrder = async (orderId ,userId, itemId) => {
  try {
    const response = await api.delete(`/orders/${orderId}/user/${userId}/removeItem/${itemId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Error response:", error.response.data);
      throw new Error(error.response.data.message || 'Error removing item from order');
    } else if (error.request) {
      // No response from server
      console.error("No response from server.");
      throw new Error('No response from server. Please try again.');
    } else {
      // Other errors
      console.error("Unexpected error:", error.message);
      throw new Error('An unexpected error occurred');
    }
  }
};


export const completeOrder = async (orderDetails) => {
  try {
    const response = await api.put(`/orders/${orderDetails.orderId}/user/${orderDetails.userId}/complete`);
    return response.data;
    console.log(response.data);
  } catch (error) {
    throw error;
  }
};



export const fetchOrder = async orderId => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOrder = async userId => {
  try {
    const response = await api.post(`/orders/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOpenOrder = async () => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found in local storage.');
    }
    const response = await api.get(`/orders/open/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async userId => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addFavorite = async (userId, item) => {
  try {
    const response = await api.post(`/favorites/user/${userId}/add`, item);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeFavorite = async (userId, itemId) => {
  try {
    const response = await api.delete(`/favorites/user/${userId}/remove/${itemId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFavorites = async userId => {
  try {
    const response = await api.get(`/favorites/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateItemQuantityInOrder = async (orderId, userId, itemId, quantity) => {
  const response = await api.put(`/orders/${orderId}/users/${userId}/updateItem/${itemId}`, { quantity });
  return response.data;
};
export const getClosedOrdersByUser = async (userId) => {
  
  const response = await api.get(`/orders/closed/${userId}`);
  return response.data;
};
export const searchItems = async (query = '') => {
  try {
    const response = await api.get(`/items/search?query=${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async userId => {
  try {
    debugger
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
