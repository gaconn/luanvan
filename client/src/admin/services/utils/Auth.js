import token from "./token"

export const logout = () => {
    token.deleteToken()
    localStorage.removeItem("USER_NAME")
    localStorage.removeItem("USER_LEVEL")
    localStorage.removeItem("TOKEN")
}
