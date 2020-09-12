import axios from 'axios';

export default class Api {
  constructor(url = null, timeout = null) {
    if (!timeout) {
      timeout = 50000;
    }

    const axiosCancelToken = axios.CancelToken;
    this.source = axiosCancelToken.source();
    const cancelToken = this.source.token;

    const instance = axios.create({
      baseURL: `${
        process.env.REACT_APP_API_HOST || 'http://localhost:8000'
      }/${url}`,
      responseType: 'json',
      timeout: timeout,
      cancelToken,
    });

    instance.interceptors.request.use((request) => {
      request.headers.Authorization = `Bearer ${this.getAccessTokenFromStorage()}`;
      return request;
    });

    this.instance = instance;
    this.get = this.methodWrapper(this.instance.get);
    this.delete = this.methodWrapper(this.instance.delete);
    this.post = this.methodWrapper(this.instance.post);
    this.put = this.methodWrapper(this.instance.put);
    this.cancel = () => {
      this.source.cancel('User navigated somewhere else.');
    };
  }
  getAccessTokenFromStorage() {
    return JSON.parse(localStorage.getItem('user_access_token'));
  }

  getRefreshTokenFromStorage() {
    return JSON.parse(localStorage.getItem('user_refresh_token'));
  }

  getUserFromStorage() {
    return JSON.parse(localStorage.getItem('user'));
  }

  setAccessToken(accessToken) {
    if (accessToken)
      return localStorage.setItem(
        'user_access_token',
        JSON.stringify(accessToken)
      );
    localStorage.removeItem('user_access_token');
  }

  setRefreshToken(refreshToken) {
    if (refreshToken)
      return localStorage.setItem(
        'user_refresh_token',
        JSON.stringify(refreshToken)
      );
    return localStorage.removeItem('user_refresh_token');
  }

  setUser(userData) {
    if (userData) return localStorage.setItem('user', JSON.stringify(userData));
    return localStorage.removeItem('user');
  }

  isTokenExpired() {
    const accessToken = this.getAccessTokenFromStorage();
    if (accessToken) {
      const tokenExp = JSON.parse(atob(accessToken.split('.')[1])).exp;
      if (tokenExp > parseInt(Date.now() / 1000)) {
        return false;
      }
    }
    return true;
  }

  getAccessTokenFromRefresh() {
    return new Promise(async (resolve) => {
      const refreshToken = this.getRefreshTokenFromStorage();
      if (refreshToken) {
        try {
          const { data } = await this.instance.post(
            `${
              process.env.REACT_APP_API_HOST ?? 'http://localhost:8000'
            }/user/refresh/`,
            {
              refresh: refreshToken,
            }
          );
          this.setAccessToken(data.access);
          this.instance.defaults.headers.Authorization = `Bearer ${this.getAccessTokenFromStorage()}`;
          resolve(true);
        } catch (error) {
          console.log('Failed to get AccessToken');
          resolve(false);
        }
      }
      resolve(false);
    });
  }

  isAuth() {
    return new Promise(async (resolve) => {
      if (this.isTokenExpired()) {
        const tokenFetched = await this.getAccessTokenFromRefresh();
        if (!tokenFetched) {
          resolve(false);
        }
      }
      resolve(true);
    });
  }

  methodWrapper = function (func) {
    return function () {
      return new Promise(async (resolve, reject) => {
        if (await this.isAuth()) {
          try {
            const result = await func.apply(this, arguments);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }
        reject({ status: 401 });
      });
    };
  };
}
