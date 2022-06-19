const setToken={
    setAuthToken: (token) => {
        if (token) {
            // Apply to every request
            instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        } else {
            // Delete auth header
            delete instance.defaults.headers.common['Authorization'];
        }
    },
}
export default setToken