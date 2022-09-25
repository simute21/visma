import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../../features/auth/authSlice'
import { AppDispatch, RootState } from '../store'
import Spinner from '../components/Spinner/Spinner'

interface User {
    email: string
    password: string
}

function Login() {
    const [formData, setFormData] = useState<User>({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state: RootState) => state.auth
    )

    const userExists = user && Object.keys(user).length

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || userExists) {
            navigate('/')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch, userExists])

    const onFormChange = (e: React.FormEvent) => {
        const { name, value } = e.target as HTMLButtonElement
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const userData = { email, password }
        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="login-container">
            <div className="login-section">
                <section>
                    <h1>Login</h1>
                    <p>username: test@test.com</p>
                    <p>password: 123</p>
                </section>
                <form className="login-form" onSubmit={onSubmit}>
                    <input
                        id="email"
                        type="email"
                        placeholder="email"
                        value={email}
                        name="email"
                        onChange={onFormChange}
                    ></input>
                    <input
                        id="password"
                        type="password"
                        placeholder="password"
                        value={password}
                        name="password"
                        onChange={onFormChange}
                    ></input>
                    <button className="btn-main" type="submit">
                        Login <i className="arrow right"></i>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
