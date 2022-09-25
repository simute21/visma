import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../../features/auth/authSlice'
import { AppDispatch, RootState } from '../store'
import Spinner from '../components/Spinner/Spinner'

interface User {
    email: string
    password: string
    confirmPassword: string
}

function Register() {
    const [formData, setFormData] = useState<User>({
        email: '',
        password: '',
        confirmPassword: '',
    })

    const { email, password, confirmPassword } = formData

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
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onFormChange = (e: React.FormEvent) => {
        const { name, value } = e.target as HTMLButtonElement
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error(`Passwords don't match`)
        }
        const userData = { email, password }
        dispatch(register(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section>
                <h1>Register</h1>
                <p>Create a user here</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
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
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="confirm password"
                        value={confirmPassword}
                        name="confirmPassword"
                        onChange={onFormChange}
                    ></input>
                    <button type="submit">Register</button>
                </form>
            </section>
        </>
    )
}

export default Register
