import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../../../features/customers/customerSlice'
import { AppDispatch } from '../../store'
import { createCustomer } from '../../../features/customers/customerSlice'

export interface CustomerData {
    _id?: string
    fullName: string
    email: string
    city: string
    street: string
    houseNumber: string
    zipCode: string
}
function CustomerForm() {
    const dispatch = useDispatch<AppDispatch>()

    const [customerData, setCustomerData] = useState<CustomerData>({
        fullName: '',
        email: '',
        city: '',
        street: '',
        houseNumber: '',
        zipCode: '',
    })

    const { fullName, email, city, street, houseNumber, zipCode } = customerData

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setCustomerData({
            fullName: '',
            email: '',
            city: '',
            street: '',
            houseNumber: '',
            zipCode: '',
        })
        dispatch(createCustomer(customerData))
    }

    const onFormChange = (e: React.FormEvent) => {
        const { name, value } = e.target as HTMLButtonElement
        setCustomerData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="full name"
                    name="fullName"
                    id="fullName"
                    onChange={onFormChange}
                    value={fullName}
                ></input>
                <input
                    type="email"
                    placeholder="email"
                    name="email"
                    id="email"
                    onChange={onFormChange}
                    value={email}
                ></input>
                <input
                    type="text"
                    placeholder="city"
                    name="city"
                    id="city"
                    onChange={onFormChange}
                    value={city}
                ></input>
                <input
                    type="text"
                    placeholder="street"
                    name="street"
                    id="street"
                    onChange={onFormChange}
                    value={street}
                ></input>
                <input
                    type="text"
                    placeholder="house number"
                    name="houseNumber"
                    id="houseNumber"
                    onChange={onFormChange}
                    value={houseNumber}
                ></input>
                <input
                    type="text"
                    placeholder="zip code"
                    name="zipCode"
                    id="zipCode"
                    onChange={onFormChange}
                    value={zipCode}
                ></input>
                <button type="submit">Create new customer</button>
            </form>
        </>
    )
}

export default CustomerForm
