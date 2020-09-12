import Api from '../api';

export default class Auth extends Api {
  checkLogin() {
    return this.isAuth();
  }

  login = (username, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.instance.post(`/login/`, {
          username,
          password,
        });
        const userData = this.getUserData(data);
        this.afterlogin(data.access, data.refresh, userData);
        resolve(userData);
      } catch (error) {
        reject(error);
      }
    });
  };

  register = (username, email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.instance.post(`/register/`, {
          username,
          email,
          password,
        });
        const userData = this.getUserData(data);
        this.afterlogin(data.access, data.refresh, userData);
        resolve(userData);
      } catch (error) {
        reject(error);
      }
    });
  };

  getUserData(response) {
    const loginPayload = JSON.parse(atob(response.access.split('.')[1]));
    return {
      username: loginPayload.username,
      email: loginPayload.email,
      userId: loginPayload.user_id,
    };
  }

  afterlogin(accessToken, refreshToken, user) {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
    this.setUser(user);
  }

  afterlogout() {
    this.setAccessToken(null);
    this.setRefreshToken(null);
    this.setUser(null);
  }
}
