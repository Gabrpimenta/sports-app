import axios from 'axios';
import { HttpResponse } from '../../enums/HttpResponse';
import config from 'react-native-config';

// Create an axios instance with baseUrl and default headers
export const API = axios.create({
  baseURL: 'https://api-football-v1.p.rapidapi.com/v3/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    'X-Time-Zone': new Date().getTimezoneOffset() / 60,
    'X-RapidAPI-Key': config.API_KEY,
  },
  timeout: 2000, // Timeout in milliseconds
  timeoutErrorMessage: 'Limit time for request has been reached',
});

API.interceptors.request.use(
  async (conf) => {
    return conf;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let retryCount = 0;

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (__DEV__) {
      console.error('Error:', error);
      console.error('Error response:', error.response);
    }

    const originalRequest = error.config;

    if (!error.response) {
      console.error('Network error:', error);
      return Promise.reject(error);
    }

    if (
      error.response.status === HttpResponse.UNAUTHORIZED &&
      !originalRequest._retry
    ) {
      retryCount += 1;

      if (retryCount > 15) {
        // handleLogout();
        retryCount = 0;
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      return API(originalRequest);
    }

    if (error.response.status === HttpResponse.BAD_REQUEST) {
      console.warn('Bad Request:', error.response.data);
    } else if (error.response.status >= HttpResponse.SERVER_ERROR) {
      console.error('Server Error:', error.response.data);
    }

    if (error.response.status === HttpResponse.NOT_FOUND) {
      return [];
    }

    return Promise.reject(error.response);
  }
);
