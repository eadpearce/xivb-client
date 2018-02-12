import jwt_decode from 'jwt-decode'

class Auth {
  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static isLoggedIn() {
    // need to check if token has expired
    // decoded.exp is in UNIX time which is in seconds
    // JS measures in milliseconds so need to multiply by 1000
    if (Auth.getToken()) {
      const token = Auth.getToken();
      const decoded = jwt_decode(token);
      const now = new Date();
      if(decoded.exp*1000 > now.getTime()) {
        return token;
      } else return null;
    }
  }

  static removeToken() {
    localStorage.removeItem('token');
  }

  static currentUser() {
    if (Auth.getToken()) {
      const token = Auth.getToken();
      const decoded = jwt_decode(token);
      const now = new Date();
      // decoded.exp is in UNIX time which is in seconds
      // JS measures in milliseconds so need to multiply by 1000
      if(decoded.exp*1000 > now.getTime()) return decoded.username;
    }
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static fetch(url, options) {
    return window.fetch(url, {
      ...options,
      body: options.body && JSON.stringify(options.body),
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  }
}
export default Auth;
