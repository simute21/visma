import axios from 'axios'

export interface AuthUser {
    email: string
    password: string
}

const API_URL = 'api/users/'

const register = async (userData: AuthUser) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const login = async (userData: AuthUser) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login,
}

export default authService
