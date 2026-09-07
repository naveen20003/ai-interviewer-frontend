let accessToken = null;

export const tokenStore = {
    getToken() {
        return accessToken;
    },
    
    setToken(token) {
      accessToken = token;
    },

    clearToken() {
      accessToken = null;
    }
};