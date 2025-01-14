export const saveAuthCredentials = (username, password) => {
    localStorage.setItem('auth_username', username);
    localStorage.setItem('auth_password', password);
};

export const getAuthCredentials = () => {
    return {
        username: localStorage.getItem('auth_username'),
        password: localStorage.getItem('auth_password')
    };
};

export const clearAuthCredentials = () => {
    localStorage.removeItem('auth_username');
    localStorage.removeItem('auth_password');
}