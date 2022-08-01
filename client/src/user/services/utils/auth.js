export const logout = () => {
    localStorage.removeItem("USER_NAME")
    localStorage.removeItem("UID")
}
