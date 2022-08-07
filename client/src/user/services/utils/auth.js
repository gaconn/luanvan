export const logout = () => {
    localStorage.removeItem("loginData")
    localStorage.removeItem("USER_NAME")
    localStorage.removeItem("UID")
}
